#!/bin/bash

# VibeCode Demo Script
# Demonstrates the main features of VibeCode

set -e

echo "🎨 VibeCode Demo"
echo "================"
echo ""

echo "1️⃣ Listing all available themes..."
echo ""
vibecode list
echo ""

read -p "Press Enter to continue..."
echo ""

echo "2️⃣ Searching for 'tokyo' themes..."
echo ""
vibecode search "tokyo"
echo ""

read -p "Press Enter to continue..."
echo ""

echo "3️⃣ Filtering dark themes..."
echo ""
vibecode list --tags "dark"
echo ""

read -p "Press Enter to continue..."
echo ""

echo "4️⃣ Creating a backup..."
echo ""
vibecode backup
echo ""

read -p "Press Enter to continue..."
echo ""

echo "5️⃣ Demo complete!"
echo ""
echo "To apply a theme, run: vibecode apply <theme-id>"
echo "To restore backup, run: vibecode restore"
echo ""
echo "Explore more with: vibecode --help"
