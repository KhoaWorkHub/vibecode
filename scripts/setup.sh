#!/bin/bash

# VibeCode Setup Script
# This script sets up the development environment for VibeCode

set -e

echo "🎨 VibeCode Setup Script"
echo "========================"
echo ""

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Installing pnpm..."
    npm install -g pnpm
    echo "✅ pnpm installed successfully"
else
    echo "✅ pnpm is already installed"
fi

echo ""
echo "📦 Installing dependencies..."
pnpm install

echo ""
echo "🔨 Building all packages..."
pnpm build

echo ""
echo "🔗 Linking CLI globally..."
cd packages/cli
npm link
cd ../..

echo ""
echo "✨ Setup complete!"
echo ""
echo "Available commands:"
echo "  vibecode list              - List all themes"
echo "  vibecode apply <theme>     - Apply a theme"
echo "  vibecode --help            - Show all commands"
echo ""
echo "VS Code Extension:"
echo "  cd packages/extension"
echo "  pnpm package"
echo "  Then install the .vsix file in VS Code"
echo ""
echo "Happy coding! 🚀"
