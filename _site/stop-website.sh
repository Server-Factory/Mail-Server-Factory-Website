#!/bin/bash

# Stop Website Script using Podman
# This script stops the Mail Server Factory website

set -e

CONTAINER_NAME="mail-server-factory-website"

echo "========================================="
echo "Stopping Mail Server Factory Website"
echo "========================================="
echo ""

# Check if Podman is installed
if ! command -v podman &> /dev/null; then
    echo "ERROR: Podman is not installed!"
    exit 1
fi

# Check if container exists
if ! podman ps -a --format "{{.Names}}" | grep -q "^${CONTAINER_NAME}$"; then
    echo "Container '${CONTAINER_NAME}' is not running or does not exist."
    exit 0
fi

# Check if container is running
if podman ps --format "{{.Names}}" | grep -q "^${CONTAINER_NAME}$"; then
    echo "Stopping container '${CONTAINER_NAME}'..."
    podman stop ${CONTAINER_NAME}
    echo "Container stopped successfully."
else
    echo "Container '${CONTAINER_NAME}' is not running."
fi

# Remove the container
echo "Removing container '${CONTAINER_NAME}'..."
podman rm ${CONTAINER_NAME} 2>/dev/null || true

echo ""
echo "========================================="
echo "Website stopped successfully!"
echo "========================================="
echo ""
echo "To start the website again, run:"
echo "  ./start-website.sh"
echo ""
