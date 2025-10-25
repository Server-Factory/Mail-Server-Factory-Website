#!/bin/bash

#
# Comprehensive Translation Test Runner
# Runs all translation-related tests: unit, integration, e2e, and validation
#

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test results
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Test execution wrapper
run_test() {
    local test_name="$1"
    local test_command="$2"

    echo ""
    echo "========================================================================"
    log_info "Running: $test_name"
    echo "========================================================================"

    TOTAL_TESTS=$((TOTAL_TESTS + 1))

    if eval "$test_command"; then
        log_success "$test_name PASSED"
        PASSED_TESTS=$((PASSED_TESTS + 1))
        return 0
    else
        log_error "$test_name FAILED"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        return 1
    fi
}

# Check dependencies
check_dependencies() {
    log_info "Checking dependencies..."

    local missing_deps=()

    if ! command -v node &> /dev/null; then
        missing_deps+=("node")
    fi

    if ! command -v python3 &> /dev/null; then
        missing_deps+=("python3")
    fi

    if ! node -e "require('js-yaml')" &> /dev/null; then
        missing_deps+=("js-yaml (npm install js-yaml)")
    fi

    if [ ${#missing_deps[@]} -gt 0 ]; then
        log_error "Missing dependencies: ${missing_deps[*]}"
        log_info "Please install missing dependencies"
        exit 1
    fi

    log_success "All dependencies are installed"
}

# Print header
print_header() {
    clear
    echo "========================================================================"
    echo "       MAIL SERVER FACTORY - TRANSLATION TEST SUITE"
    echo "========================================================================"
    echo ""
    echo "Test Suite Components:"
    echo "  1. Translation Validation (brand names, completeness)"
    echo "  2. Unit Tests (translation system components)"
    echo "  3. Integration Tests (language selector)"
    echo "  4. End-to-End Tests (full translation workflow)"
    echo ""
    echo "========================================================================"
    echo ""
}

# Main test execution
main() {
    print_header
    check_dependencies

    cd "$PROJECT_ROOT"

    # Test 1: Translation Validator
    run_test \
        "Translation Validation" \
        "node tests/translation-validator.js"

    # Test 2: Unit Tests
    run_test \
        "Translation Unit Tests" \
        "node tests/unit/translation-unit-tests.js"

    # Test 3: Integration Tests (skip if jsdom not available)
    if node -e "require('jsdom')" &> /dev/null; then
        run_test \
            "Language Selector Integration Tests" \
            "node tests/integration/language-selector-integration-tests.js"
    else
        log_warning "Skipping integration tests (jsdom not installed)"
        log_info "Install with: npm install jsdom"
    fi

    # Test 4: End-to-End Tests
    run_test \
        "Translation End-to-End Tests" \
        "node tests/e2e/translation-e2e-tests.js"

    # Print summary
    echo ""
    echo "========================================================================"
    echo "                         TEST SUMMARY"
    echo "========================================================================"
    echo ""
    echo "Total Tests:  $TOTAL_TESTS"
    echo "Passed:       ${GREEN}$PASSED_TESTS${NC}"
    echo "Failed:       ${RED}$FAILED_TESTS${NC}"
    echo ""

    if [ $FAILED_TESTS -eq 0 ]; then
        log_success "ALL TESTS PASSED! ✓"
        echo ""
        echo "The translation system is working correctly:"
        echo "  ✓ Brand names are preserved"
        echo "  ✓ All languages have complete translations"
        echo "  ✓ Language selector functions properly"
        echo "  ✓ End-to-end workflow is validated"
        echo ""
        exit 0
    else
        log_error "SOME TESTS FAILED! ✗"
        echo ""
        echo "Please review the test output above for details."
        echo ""
        exit 1
    fi
}

# Handle script arguments
case "${1:-}" in
    --help|-h)
        echo "Usage: $0 [OPTIONS]"
        echo ""
        echo "Run all translation-related tests for Mail Server Factory website"
        echo ""
        echo "Options:"
        echo "  --help, -h     Show this help message"
        echo "  --check-deps   Check dependencies only"
        echo ""
        echo "Test Categories:"
        echo "  1. Translation Validation - Validates brand names and completeness"
        echo "  2. Unit Tests - Tests individual translation components"
        echo "  3. Integration Tests - Tests language selector integration"
        echo "  4. E2E Tests - Tests complete translation workflow"
        echo ""
        exit 0
        ;;
    --check-deps)
        check_dependencies
        exit 0
        ;;
    *)
        main
        ;;
esac
