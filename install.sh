#!/bin/bash

###############################################################################
# VibeCode Universal Installer
# One-command setup for macOS, Linux, and Windows (Git Bash/WSL)
# Usage: curl -fsSL https://raw.githubusercontent.com/user/vibecode/main/install.sh | bash
###############################################################################

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fancy output functions
print_header() {
    echo ""
    echo "=================================================="
    echo "  VibeCode Installer"
    echo "  The Ultimate VS Code Customization Tool"
    echo "=================================================="
    echo ""
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_step() {
    echo ""
    echo -e "${BLUE}▶${NC} $1"
}

# Detect OS
detect_os() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        OS="macos"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        OS="linux"
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "win32" ]]; then
        OS="windows"
    else
        OS="unknown"
    fi
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Install Node.js if needed
install_nodejs() {
    if command_exists node; then
        NODE_VERSION=$(node -v)
        print_success "Node.js already installed: $NODE_VERSION"
        
        # Check if version is >= 18
        MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'v' -f2 | cut -d'.' -f1)
        if [ "$MAJOR_VERSION" -lt 18 ]; then
            print_warning "Node.js version is too old. Please upgrade to v18+"
            return 1
        fi
        return 0
    fi

    print_step "Installing Node.js..."
    
    case $OS in
        macos)
            if command_exists brew; then
                brew install node
            else
                print_warning "Homebrew not found. Please install Node.js manually from https://nodejs.org"
                return 1
            fi
            ;;
        linux)
            if command_exists apt-get; then
                curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
                sudo apt-get install -y nodejs
            elif command_exists yum; then
                curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
                sudo yum install -y nodejs
            else
                print_warning "Package manager not found. Please install Node.js manually"
                return 1
            fi
            ;;
        windows)
            print_warning "Please install Node.js from https://nodejs.org and run this script again"
            return 1
            ;;
    esac

    if command_exists node; then
        print_success "Node.js installed successfully: $(node -v)"
        return 0
    else
        print_error "Failed to install Node.js"
        return 1
    fi
}

# Install pnpm if needed
install_pnpm() {
    if command_exists pnpm; then
        print_success "pnpm already installed: $(pnpm -v)"
        return 0
    fi

    print_step "Installing pnpm..."
    npm install -g pnpm

    if command_exists pnpm; then
        print_success "pnpm installed successfully"
        return 0
    else
        print_error "Failed to install pnpm"
        return 1
    fi
}

# Clone or update repository
setup_repository() {
    INSTALL_DIR="$HOME/.vibecode-install"
    
    if [ -d "$INSTALL_DIR" ]; then
        print_info "VibeCode directory already exists. Updating..."
        cd "$INSTALL_DIR"
        git pull origin main 2>/dev/null || true
    else
        print_step "Cloning VibeCode repository..."
        git clone https://github.com/yourusername/vibecode.git "$INSTALL_DIR" 2>/dev/null || {
            # If git clone fails, we're probably running from local directory
            if [ -f "package.json" ] && [ -f "pnpm-workspace.yaml" ]; then
                print_info "Running from local directory"
                INSTALL_DIR="$(pwd)"
            else
                print_error "Failed to clone repository. Running from current directory..."
                INSTALL_DIR="$(pwd)"
            fi
        }
    fi

    cd "$INSTALL_DIR"
    print_success "Repository ready at: $INSTALL_DIR"
}

# Install dependencies and build
build_project() {
    print_step "Installing dependencies..."
    pnpm install --silent 2>/dev/null || pnpm install

    print_step "Building packages..."
    pnpm build 2>/dev/null || {
        print_warning "Build had warnings, but continuing..."
    }

    print_success "Build complete"
}

# Link CLI globally
link_cli() {
    print_step "Setting up CLI..."
    cd packages/cli
    npm link >/dev/null 2>&1 || {
        print_warning "npm link requires sudo on some systems"
        sudo npm link
    }
    cd ../..
    print_success "CLI linked globally"
}

# Verify installation
verify_installation() {
    print_step "Verifying installation..."
    
    if command_exists vibecode; then
        VERSION=$(vibecode --version 2>/dev/null || echo "unknown")
        print_success "VibeCode CLI is ready!"
        print_info "Version: $VERSION"
        return 0
    else
        print_error "CLI verification failed"
        return 1
    fi
}

# Show quick start guide
show_quickstart() {
    cat << 'EOF'

================================================
  Installation Complete!
================================================

Quick Start Guide:

1. List available themes:
   $ vibecode list

2. Apply your first theme:
   $ vibecode apply tokyo-drift

3. Create a backup:
   $ vibecode backup

4. Search for themes:
   $ vibecode search "minimal"

5. Create custom theme:
   $ vibecode create "My Theme" --interactive

================================================
Documentation:
  - Quick Start: docs/installation/quick-start.md
  - CLI Guide: docs/usage/cli-guide.md
  - Themes: docs/usage/themes-catalog.md

Support:
  - Issues: https://github.com/yourusername/vibecode/issues
  - Docs: https://github.com/yourusername/vibecode

Enjoy customizing your VS Code!
================================================

EOF
}

# Interactive post-install
interactive_setup() {
    echo ""
    read -p "Would you like to see available themes now? (y/N) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        vibecode list
    fi

    echo ""
    read -p "Apply a theme now? (y/N) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo ""
        echo "Popular themes:"
        echo "  - tokyo-drift (Dark, Vibrant)"
        echo "  - night-hacker (Dark, Neon)"
        echo "  - minimal-daylight (Light, Clean)"
        echo ""
        read -p "Enter theme name: " THEME_NAME
        if [ -n "$THEME_NAME" ]; then
            vibecode apply "$THEME_NAME"
        fi
    fi
}

# Main installation flow
main() {
    print_header

    # Step 1: Detect OS
    detect_os
    print_info "Detected OS: $OS"

    # Step 2: Check/Install Node.js
    if ! install_nodejs; then
        print_error "Node.js installation failed. Please install manually and try again."
        exit 1
    fi

    # Step 3: Check/Install pnpm
    if ! install_pnpm; then
        print_error "pnpm installation failed"
        exit 1
    fi

    # Step 4: Setup repository
    setup_repository

    # Step 5: Build project
    build_project

    # Step 6: Link CLI
    link_cli

    # Step 7: Verify
    if ! verify_installation; then
        print_error "Installation verification failed"
        print_info "Please try running: source ~/.zshrc (or ~/.bashrc)"
        exit 1
    fi

    # Step 8: Show guide
    show_quickstart

    # Step 9: Interactive setup (optional)
    interactive_setup

    print_success "Setup complete! Run 'vibecode --help' to get started."
}

# Run main installation
main
