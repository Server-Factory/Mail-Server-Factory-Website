#!/bin/bash

# Mail Server Factory Website - Start Script
# This script starts the Jekyll website using Docker Compose

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
    print_error "Docker is not running. Please start Docker first."
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose > /dev/null 2>&1; then
    print_error "docker-compose is not installed. Please install docker-compose first."
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "docker-compose.yml" ]; then
    print_error "docker-compose.yml not found. Please run this script from the website root directory."
    exit 1
fi

print_status "Starting Mail Server Factory website..."
print_status "Building Docker image (this may take a few minutes on first run)..."

# Build and start the containers
docker-compose up --build -d

# Wait for the container to be ready
print_status "Waiting for the website to be ready..."
sleep 10

# Check if the container is running
if docker-compose ps | grep -q "Up"; then
    print_success "Website is now running!"
    echo ""
    echo -e "${GREEN}🌐 Website URL:${NC} http://localhost:4000"
    echo -e "${GREEN}📊 Live Reload:${NC} Enabled - changes will be reflected automatically"
    echo -e "${GREEN}🐳 Container:${NC} mail-server-factory-website"
    echo ""
    echo -e "${BLUE}Useful commands:${NC}"
    echo -e "  • View logs: ${YELLOW}docker-compose logs -f${NC}"
    echo -e "  • Stop website: ${YELLOW}./stop-website.sh${NC}"
    echo -e "  • Restart: ${YELLOW}docker-compose restart${NC}"
    echo ""
    print_status "The website will automatically reload when you make changes to files."
else
    print_error "Failed to start the website. Check the logs with: docker-compose logs"
    exit 1
fi