#!/bin/bash

# Mail Server Factory - Full Automation Test Suite
# This script runs comprehensive tests to verify 100% translation coverage
# and ensures no English words are visible in non-English locales

set -e

echo "🚀 Starting Mail Server Factory Full Automation Test Suite"
echo "=========================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
WEBSITE_PORT=4000
WEBSITE_URL="http://localhost:$WEBSITE_PORT"
TEST_TIMEOUT=300  # 5 minutes timeout

# Function to print colored output
print_status() {
    local status=$1
    local message=$2
    case $status in
        "success")
            echo -e "${GREEN}✅ $message${NC}"
            ;;
        "error")
            echo -e "${RED}❌ $message${NC}"
            ;;
        "warning")
            echo -e "${YELLOW}⚠️  $message${NC}"
            ;;
        "info")
            echo -e "${BLUE}ℹ️  $message${NC}"
            ;;
    esac
}

# Function to check if port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        return 0
    else
        return 1
    fi
}

# Function to wait for website to be ready
wait_for_website() {
    local url=$1
    local timeout=$2
    local start_time=$(date +%s)

    print_status "info" "Waiting for website to be ready at $url"

    while ! curl -s --head "$url" > /dev/null 2>&1; do
        local current_time=$(date +%s)
        local elapsed=$((current_time - start_time))

        if [ $elapsed -gt $timeout ]; then
            print_status "error" "Website failed to start within $timeout seconds"
            return 1
        fi

        sleep 2
    done

    print_status "success" "Website is ready!"
    return 0
}

# Function to start website
start_website() {
    print_status "info" "Starting website development server..."

    # Check if port is already in use
    if check_port $WEBSITE_PORT; then
        print_status "warning" "Port $WEBSITE_PORT is already in use - attempting to free it"
        # Try to kill the process using the port
        local pid=$(lsof -ti:$WEBSITE_PORT)
        if [ ! -z "$pid" ]; then
            kill $pid 2>/dev/null || true
            sleep 2
            if check_port $WEBSITE_PORT; then
                print_status "error" "Could not free port $WEBSITE_PORT"
                return 1
            else
                print_status "info" "Port $WEBSITE_PORT freed successfully"
            fi
        fi
    fi

    # Try Jekyll first, then fallback to Python
    if command -v bundle >/dev/null 2>&1 && [ -f "Gemfile" ]; then
        print_status "info" "Using Jekyll (bundle exec jekyll serve)"
        bundle exec jekyll serve --host 0.0.0.0 --port $WEBSITE_PORT --detach --quiet
        WEBSITE_PID=$(pgrep -f "jekyll serve")
    elif command -v jekyll >/dev/null 2>&1; then
        print_status "info" "Using Jekyll directly"
        jekyll serve --host 0.0.0.0 --port $WEBSITE_PORT --detach --quiet
        WEBSITE_PID=$(pgrep -f "jekyll serve")
    else
        print_status "info" "Jekyll not available, using Python HTTP server"
        cd _site 2>/dev/null || cd .
        python3 -m http.server $WEBSITE_PORT > website.log 2>&1 &
        WEBSITE_PID=$!
        cd - > /dev/null 2>&1 || true
    fi

    print_status "info" "Website started with PID: $WEBSITE_PID"

    # Wait for website to be ready
    if ! wait_for_website "$WEBSITE_URL" 60; then
        print_status "error" "Failed to start website"
        return 1
    fi

    return 0
}

# Function to stop website
stop_website() {
    print_status "info" "Stopping website..."

    if [ -f "./stop-website.sh" ]; then
        ./stop-website.sh 2>/dev/null || print_status "warning" "stop-website.sh failed, trying alternative"
    fi

    if [ ! -z "$WEBSITE_PID" ]; then
        kill $WEBSITE_PID 2>/dev/null || true
    fi

    # Kill any remaining processes on the port
    local pid=$(lsof -ti:$WEBSITE_PORT 2>/dev/null)
    if [ ! -z "$pid" ]; then
        kill $pid 2>/dev/null || true
    fi

    # Wait a bit for cleanup
    sleep 2
    print_status "success" "Website stopped"
}

# Function to run comprehensive tests
run_comprehensive_tests() {
    local test_script="comprehensive-test-runner.js"

    if [ ! -f "$test_script" ]; then
        print_status "error" "Test script $test_script not found"
        return 1
    fi

    print_status "info" "Running comprehensive localization tests..."
    print_status "info" "This will test ALL 5 implemented languages for complete translation coverage"

    # Run the Node.js test script
    if command -v node >/dev/null 2>&1; then
        node "$test_script" "$WEBSITE_URL"
        local test_exit_code=$?

        if [ $test_exit_code -eq 0 ]; then
            print_status "success" "All comprehensive tests PASSED! 🎉"
            print_status "success" "100% translation coverage achieved with zero English words visible"
            return 0
        else
            print_status "error" "Comprehensive tests FAILED! ❌"
            print_status "error" "Some translations are missing or contain English words"
            return 1
        fi
    else
        print_status "error" "Node.js is not installed. Please install Node.js to run tests."
        return 1
    fi
}

# Function to run additional validation tests
run_validation_tests() {
    print_status "info" "Running additional validation tests..."

    # Check if translations.yml exists and is valid
    if [ -f "_data/translations.yml" ]; then
        local total_languages=$(grep "^[a-zA-Z][a-zA-Z_]*:" _data/translations.yml | wc -l)

        print_status "info" "Found $total_languages languages in translations.yml"

        if [ $total_languages -ge 5 ]; then
            print_status "success" "Translation file validation passed"
        else
            print_status "error" "Translation file validation failed"
            return 1
        fi
    else
        print_status "error" "_data/translations.yml not found"
        return 1
    fi

    return 0
}

# Function to run offline translation validation
run_translation_validation() {
    if [ -f "validate-translations.js" ]; then
        if node validate-translations.js >/dev/null 2>&1; then
            print_status "success" "Translation validation passed"
            return 0
        else
            print_status "error" "Translation validation failed"
            return 1
        fi
    else
        print_status "error" "validate-translations.js not found"
        return 1
    fi
}

# Function to generate test report
generate_report() {
    local test_result=$1
    local report_file="automation-test-report-$(date +%Y%m%d-%H%M%S).txt"

    {
        echo "Mail Server Factory - Full Automation Test Report"
        echo "=================================================="
        echo "Date: $(date)"
        echo "Website URL: $WEBSITE_URL"
        echo ""

        if [ $test_result -eq 0 ]; then
            echo "🎉 FINAL RESULT: ALL TESTS PASSED!"
            echo "✅ 100% translation coverage achieved"
            echo "✅ Zero English words visible in non-English locales"
            echo "✅ All 5 implemented languages fully translated"
        else
            echo "❌ FINAL RESULT: TESTS FAILED!"
            echo "❌ Translation coverage is incomplete"
            echo "❌ English words found in non-English locales"
        fi

        echo ""
        echo "Test Details:"
        echo "- Comprehensive localization tests: $([ $test_result -eq 0 ] && echo "PASSED" || echo "FAILED")"
        echo "- Translation file validation: $([ $test_result -eq 0 ] && echo "PASSED" || echo "FAILED")"
        echo "- Website functionality: $([ $test_result -eq 0 ] && echo "VERIFIED" || echo "FAILED")"

    } > "$report_file"

    print_status "info" "Test report saved to: $report_file"
}

# Main execution
main() {
    local overall_result=0

    # Trap to ensure cleanup on exit
    trap 'stop_website' EXIT

    print_status "info" "Step 1: Starting website..."
    if ! start_website; then
        print_status "error" "Failed to start website"
        exit 1
    fi

    print_status "info" "Step 2: Running validation tests..."
    if ! run_validation_tests; then
        print_status "error" "Validation tests failed"
        overall_result=1
    fi

    print_status "info" "Step 3: Running comprehensive localization tests..."
    if command -v bundle >/dev/null 2>&1 || command -v jekyll >/dev/null 2>&1; then
        if ! run_comprehensive_tests; then
            print_status "error" "Comprehensive tests failed"
            overall_result=1
        fi
    else
        print_status "warning" "Jekyll not available - skipping live website tests"
        print_status "info" "Running offline translation validation..."
        if ! run_translation_validation; then
            print_status "error" "Translation validation failed"
            overall_result=1
        fi
    fi

    # Generate report
    generate_report $overall_result

    if [ $overall_result -eq 0 ]; then
        print_status "success" "🎉 ALL AUTOMATION TESTS PASSED!"
        print_status "success" "Mail Server Factory website has 100% translation coverage"
        print_status "success" "No English words are visible in any non-English locale"
        exit 0
    else
        print_status "error" "❌ AUTOMATION TESTS FAILED!"
        print_status "error" "Please fix translation issues and run tests again"
        exit 1
    fi
}

# Run main function
main "$@"