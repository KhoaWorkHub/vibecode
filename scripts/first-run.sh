#!/bin/bash

# VibeCode - First Run Guide
# This script helps you get started with VibeCode

echo "🎨 Welcome to VibeCode!"
echo "======================"
echo ""
echo "This is your first time using VibeCode. Let's get you set up!"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the vibecode root directory"
    exit 1
fi

echo "Step 1: Checking prerequisites..."
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
else
    NODE_VERSION=$(node --version)
    echo "✅ Node.js $NODE_VERSION installed"
fi

# Check pnpm
if ! command -v pnpm &> /dev/null; then
    echo "⚠️  pnpm is not installed. Installing pnpm..."
    npm install -g pnpm
    echo "✅ pnpm installed"
else
    PNPM_VERSION=$(pnpm --version)
    echo "✅ pnpm $PNPM_VERSION installed"
fi

echo ""
echo "Step 2: Installing dependencies..."
echo ""
pnpm install

echo ""
echo "Step 3: Building packages..."
echo ""
pnpm build

echo ""
echo "Step 4: Linking CLI globally..."
echo ""
cd packages/cli
npm link
cd ../..

echo ""
echo "✨ Setup complete!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🎉 You're all set! Here's what you can do now:"
echo ""
echo "1️⃣  List available themes:"
echo "   $ vibecode list"
echo ""
echo "2️⃣  Apply your first theme:"
echo "   $ vibecode apply tokyo-drift"
echo ""
echo "3️⃣  Search for themes:"
echo "   $ vibecode search \"minimal\""
echo ""
echo "4️⃣  Create a backup:"
echo "   $ vibecode backup"
echo ""
echo "5️⃣  Create a custom theme:"
echo "   $ vibecode create \"My Theme\" --interactive"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📚 Documentation:"
echo "   • README.md - Main documentation"
echo "   • INSTALL.md - Installation guide"
echo "   • docs/quick-start.md - Quick tutorial"
echo "   • docs/themes.md - Theme catalog"
echo ""
echo "💡 Tip: Run './scripts/demo.sh' to see VibeCode in action!"
echo ""
echo "Happy coding! 🚀"
