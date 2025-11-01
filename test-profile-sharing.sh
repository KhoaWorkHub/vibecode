#!/bin/bash

# Profile Sharing Test Script
# Tests the share and import workflow

set -e  # Exit on error

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  VibeCode Profile Sharing Test"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check GitHub token
if [ -z "$GITHUB_TOKEN" ] && [ ! -f "$HOME/.vibecode/github-token" ]; then
    echo "❌ GitHub token not found!"
    echo ""
    echo "Please set up a GitHub token:"
    echo "  1. Visit: https://github.com/settings/tokens"
    echo "  2. Generate token with 'gist' scope"
    echo "  3. Run one of:"
    echo "     export GITHUB_TOKEN=your_token_here"
    echo "     echo 'your_token_here' > ~/.vibecode/github-token"
    echo ""
    exit 1
fi

echo "✓ GitHub token found"
echo ""

# Build packages
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Building Packages"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd packages/core
echo "Building @vibecode/core..."
pnpm build > /dev/null 2>&1
echo "✓ Core package built"

cd ../cli
echo "Building @vibecode/cli..."
pnpm build > /dev/null 2>&1
echo "✓ CLI package built"

cd ../..

# Alias for easier testing
VIBECODE_CLI="node packages/cli/dist/cli.js"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Test 1: List Profiles"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

$VIBECODE_CLI profile list

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Test 2: Share Profile"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Sharing 'stable-setup' profile..."
echo ""

SHARE_OUTPUT=$($VIBECODE_CLI profile share stable-setup)
echo "$SHARE_OUTPUT"

# Extract share code
SHARE_CODE=$(echo "$SHARE_OUTPUT" | grep "Share Code:" | sed 's/.*Share Code: //' | tr -d ' ')

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Share Code Generated: $SHARE_CODE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Test 3: Import Profile"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Importing profile from share code..."
echo ""

$VIBECODE_CLI profile import "$SHARE_CODE" --name test-imported -y

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Test 4: Verify Import"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

$VIBECODE_CLI profile show test-imported

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅ All Tests Passed!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Summary:"
echo "  ✓ Profile shared successfully"
echo "  ✓ Share code: $SHARE_CODE"
echo "  ✓ Profile imported successfully"
echo "  ✓ Profile verified"
echo ""
echo "Cleanup:"
echo "  To remove test profile: vibecode profile delete test-imported -f"
echo ""
