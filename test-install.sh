#!/bin/bash

###############################################################################
# VibeCode Installation Test Script
# Tests the one-command install experience
###############################################################################

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo "🧪 Testing VibeCode Installation..."
echo ""

# Test 1: Check if vibecode is installed
echo -n "Test 1: CLI Installation... "
if command -v vibecode >/dev/null 2>&1; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${RED}✗ FAIL${NC} - vibecode command not found"
    exit 1
fi

# Test 2: Check version
echo -n "Test 2: CLI Version... "
VERSION=$(vibecode --version 2>/dev/null || echo "unknown")
if [[ "$VERSION" == *"1.1.0"* ]]; then
    echo -e "${GREEN}✓ PASS${NC} (v1.1.0)"
else
    echo -e "${YELLOW}⚠ WARNING${NC} - Version: $VERSION (expected 1.1.0)"
fi

# Test 3: Test theme commands
echo -n "Test 3: Theme Commands... "
if vibecode list >/dev/null 2>&1; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${RED}✗ FAIL${NC} - vibecode list failed"
    exit 1
fi

# Test 4: Test profile commands (NEW!)
echo -n "Test 4: Profile Commands... "
if vibecode profile --help >/dev/null 2>&1; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${RED}✗ FAIL${NC} - vibecode profile command not found"
    exit 1
fi

# Test 5: Test profile subcommands
echo -n "Test 5: Profile Subcommands... "
SUBCOMMANDS=("save" "switch" "list" "show" "delete" "diff" "protected")
ALL_FOUND=true
for cmd in "${SUBCOMMANDS[@]}"; do
    if ! vibecode profile --help 2>&1 | grep -q "$cmd"; then
        echo -e "${RED}✗ FAIL${NC} - Missing subcommand: $cmd"
        ALL_FOUND=false
        break
    fi
done
if $ALL_FOUND; then
    echo -e "${GREEN}✓ PASS${NC} (7/7 subcommands)"
else
    exit 1
fi

# Test 6: Check VibeCode directories
echo -n "Test 6: Directory Structure... "
if [[ -d "$HOME/.vibecode/themes" ]] && [[ -d "$HOME/.vibecode/backups" ]]; then
    echo -e "${GREEN}✓ PASS${NC}"
else
    echo -e "${YELLOW}⚠ WARNING${NC} - Some directories missing (will be created on first use)"
fi

# Test 7: Test theme count
echo -n "Test 7: Theme Catalog... "
THEME_COUNT=$(vibecode list 2>/dev/null | grep -c "│" || echo "0")
if [[ $THEME_COUNT -ge 9 ]]; then
    echo -e "${GREEN}✓ PASS${NC} ($THEME_COUNT themes found)"
else
    echo -e "${YELLOW}⚠ WARNING${NC} - Expected 9+ themes, found $THEME_COUNT"
fi

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✓ All Critical Tests Passed!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🎉 VibeCode is ready to use!"
echo ""
echo "Quick Start:"
echo "  ${BLUE}vibecode list${NC}                    # List all themes"
echo "  ${BLUE}vibecode apply tokyo-drift${NC}       # Apply a theme"
echo "  ${BLUE}vibecode profile save my-setup${NC}   # Save current setup"
echo "  ${BLUE}vibecode profile list${NC}            # List profiles"
echo ""
echo "Documentation:"
echo "  README: https://github.com/KhoaWorkHub/vibecode"
echo "  Profile Guide: PROFILE_GUIDE.md"
echo ""
