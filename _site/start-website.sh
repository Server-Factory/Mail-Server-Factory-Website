#!/bin/bash

# Start Website Script using Podman
# This script builds and runs the Mail Server Factory website

set -e

CONTAINER_NAME="mail-server-factory-website"
IMAGE_NAME="mail-server-factory-website-image"
PORT="4000"

echo "========================================="
echo "Starting Mail Server Factory Website"
echo "========================================="
echo ""

# Check if Podman is installed
if ! command -v podman &> /dev/null; then
    echo "ERROR: Podman is not installed!"
    echo "Please run ./install-podman.sh first."
    exit 1
fi

# Check if Podman machine is running (macOS only)
if [[ "$OSTYPE" == "darwin"* ]]; then
    if ! podman machine list | grep -q "running"; then
        echo "Starting Podman machine..."
        podman machine start
        echo ""
    fi
fi

# Stop and remove existing container if running
if podman ps -a --format "{{.Names}}" | grep -q "^${CONTAINER_NAME}$"; then
    echo "Stopping existing container..."
    podman stop ${CONTAINER_NAME} 2>/dev/null || true
    echo "Removing existing container..."
    podman rm ${CONTAINER_NAME} 2>/dev/null || true
    echo ""
fi

# Remove old image to ensure fresh build
if podman images | grep -q "^localhost/${IMAGE_NAME}"; then
    echo "Removing old image to ensure fresh build..."
    podman rmi ${IMAGE_NAME} 2>/dev/null || true
    echo ""
fi

# Build the image with --no-cache to ensure latest version
echo "Building fresh container image..."
podman build --no-cache -t ${IMAGE_NAME} -f Containerfile .
echo ""

# Create volumes if they don't exist
echo "Ensuring volumes exist..."
podman volume exists jekyll_cache 2>/dev/null || podman volume create jekyll_cache
podman volume exists bundle_cache 2>/dev/null || podman volume create bundle_cache
echo ""

# Run the container
echo "Starting container..."
podman run -d \
    --name ${CONTAINER_NAME} \
    -p ${PORT}:4000 \
    -v "$(pwd)":/srv/jekyll:z \
    -v jekyll_cache:/srv/jekyll/.jekyll-cache:z \
    -v bundle_cache:/usr/local/bundle:z \
    -e JEKYLL_ENV=development \
    -e PAGES_REPO_NWO=Server-Factory/Mail-Server-Factory-Website \
    --replace \
    ${IMAGE_NAME}

echo ""
echo "========================================="
echo "Website is starting..."
echo "========================================="
echo ""
echo "Container Name: ${CONTAINER_NAME}"
echo "Access the website at: http://localhost:${PORT}"
echo ""
echo "Waiting for Jekyll to start (this may take a minute)..."
sleep 5

# Show logs
echo ""
echo "Recent logs:"
echo "========================================="
podman logs --tail 20 ${CONTAINER_NAME}
echo "========================================="
echo ""
echo "To view live logs, run:"
echo "  podman logs -f ${CONTAINER_NAME}"
echo ""
echo "To stop the website, run:"
echo "  ./stop-website.sh"
echo ""
