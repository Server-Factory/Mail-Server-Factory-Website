#!/bin/bash

# Podman Installation Script
# This script installs Podman and its dependencies on your system

set -e

echo "========================================="
echo "Podman Installation Script"
echo "========================================="
echo ""

# Detect OS
OS="$(uname -s)"

case "${OS}" in
    Darwin*)
        echo "Detected macOS"
        echo ""

        # Check if Homebrew is installed
        if ! command -v brew &> /dev/null; then
            echo "Homebrew is not installed. Installing Homebrew..."
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        else
            echo "Homebrew is already installed."
        fi

        echo ""
        echo "Installing Podman..."
        brew install podman

        echo ""
        echo "Initializing Podman machine..."
        podman machine init --cpus 2 --memory 4096 --disk-size 50

        echo ""
        echo "Starting Podman machine..."
        podman machine start

        echo ""
        echo "Setting Podman machine to start on boot..."
        podman machine set --rootful

        ;;

    Linux*)
        echo "Detected Linux"
        echo ""

        # Detect Linux distribution
        if [ -f /etc/os-release ]; then
            . /etc/os-release
            OS_ID=$ID
        else
            echo "Cannot detect Linux distribution"
            exit 1
        fi

        case "${OS_ID}" in
            ubuntu|debian)
                echo "Installing Podman on Ubuntu/Debian..."
                sudo apt-get update
                sudo apt-get install -y podman
                ;;

            fedora)
                echo "Installing Podman on Fedora..."
                sudo dnf install -y podman
                ;;

            centos|rhel)
                echo "Installing Podman on CentOS/RHEL..."
                sudo yum install -y podman
                ;;

            arch)
                echo "Installing Podman on Arch Linux..."
                sudo pacman -S --noconfirm podman
                ;;

            *)
                echo "Unsupported Linux distribution: ${OS_ID}"
                echo "Please install Podman manually."
                exit 1
                ;;
        esac
        ;;

    *)
        echo "Unsupported operating system: ${OS}"
        echo "Please install Podman manually."
        exit 1
        ;;
esac

echo ""
echo "========================================="
echo "Verifying Podman installation..."
echo "========================================="
podman --version

echo ""
echo "========================================="
echo "Podman installed successfully!"
echo "========================================="
echo ""
echo "You can now use the start-website.sh script to run your website."
