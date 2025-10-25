#!/bin/bash

# Mail Server Factory Website - Stop Script
# This script stops the Jekyll website using Docker Compose

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running."
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose > /dev/null 2>&1; then
    print_error "docker-compose is not installed."
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "docker-compose.yml" ]; then
    print_error "docker-compose.yml not found. Please run this script from the website root directory."
    exit 1
fi

# Check if the container is running
if docker-compose ps | grep -q "Up"; then
    print_status "Stopping Mail Server Factory website..."

    # Stop the containers
    docker-compose down

    # Optional: Remove volumes (uncomment if you want to clean up completely)
    # docker-compose down --volumes

    print_success "Website has been stopped successfully!"
    echo ""
    echo -e "${BLUE}To start the website again, run:${NC} ${YELLOW}./start-website.sh${NC}"
else
    print_warning "The website is not currently running."
    echo ""
    echo -e "${BLUE}To start the website, run:${NC} ${YELLOW}./start-website.sh${NC}"
fi

# Restore original docker-compose.yml if backup exists
if [ -f "docker-compose.yml.bak" ]; then
    print_status "Restoring original docker-compose.yml..."
    mv docker-compose.yml.bak docker-compose.yml
    print_success "Original configuration restored."
fi