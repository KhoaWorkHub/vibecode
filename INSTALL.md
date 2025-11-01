# Installation Guide

Complete installation instructions for VibeCode.

## Table of Contents

- [Quick Install (Recommended)](#quick-install-recommended)
- [Manual Installation](#manual-installation)
- [VS Code Extension](#vs-code-extension)
- [Troubleshooting](#troubleshooting)
- [Next Steps](#next-steps)

---

## Quick Install (Recommended)

**One command to install everything!**

<details open>
<parameter name="summary">macOS / Linux</summary>

```bash
curl -fsSL https://raw.githubusercontent.com/KhoaWorkHub/vibecode/main/install.sh | bash
```

This automatically:
- Checks system requirements
- Installs Node.js (if needed)
- Installs pnpm (if needed)
- Downloads and builds VibeCode
- Links CLI globally
- Verifies installation

</details>

<details>
<summary>Windows (PowerShell)</summary>

```powershell
irm https://raw.githubusercontent.com/KhoaWorkHub/vibecode/main/install.ps1 | iex
```

This automatically:
- Checks system requirements
- Installs Node.js (if needed)
- Installs pnpm (if needed)
- Downloads and builds VibeCode
- Links CLI globally
- Verifies installation

</details>

---

## Manual Installation

<details>
<summary>Click to expand manual installation steps</summary>

### Prerequisites

- Node.js 18 or later
- pnpm 8 or later
- Git

### Step 1: Clone Repository

```bash
git clone https://github.com/KhoaWorkHub/vibecode.git
cd vibecode
```

### Step 2: Install Dependencies

```bash
pnpm install
```

### Step 3: Build Project

```bash
pnpm build
```

### Step 4: Link CLI Globally

```bash
cd packages/cli
npm link
```

### Step 5: Verify Installation

```bash
vibecode --version
```

You should see the version number.

</details>

---

## VS Code Extension

<details>
<summary>Install Extension (Optional)</summary>

The VS Code extension provides a visual interface for managing themes.

### Method 1: Install from VSIX

**Step 1: Build extension**
```bash
cd packages/extension
pnpm package
```

**Step 2: Install in VS Code**
1. Open VS Code
2. Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
3. Type "Install from VSIX"
4. Select `packages/extension/vibecode-0.1.0.vsix`

### Method 2: Development Mode

```bash
cd packages/extension
code .
```

Then press `F5` to open Extension Development Host.

</details>

---

## Troubleshooting

<details>
<summary>Common Issues and Solutions</summary>

### "vibecode: command not found"

**Solution 1: Reload shell**
```bash
source ~/.zshrc    # For zsh
source ~/.bashrc   # For bash
```

**Solution 2: Re-link CLI**
```bash
cd packages/cli
npm link
```

**Solution 3: Add npm global bin to PATH**
```bash
echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

---

### Permission Errors

**macOS/Linux:**
```bash
sudo npm link
```

**Windows:**
Run PowerShell as Administrator and re-run installation.

---

### Build Errors

```bash
pnpm clean
rm -rf node_modules
pnpm install
pnpm build
```

---

### Node.js Version Too Old

**macOS:**
```bash
brew upgrade node
```

**Linux:**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Windows:**
Download from [nodejs.org](https://nodejs.org)

---

### pnpm Not Found

```bash
npm install -g pnpm
```

</details>

---

## Next Steps

After installation:

1. **List available themes:**
   ```bash
   vibecode list

   ```

2. **Apply a theme:**
   ```bash
   vibecode apply tokyo-drift
   ```

3. **Read the guides:**
   - [Quick Start Guide](docs/installation/quick-start.md)
   - [CLI Guide](docs/usage/cli-guide.md)
   - [Troubleshooting](docs/installation/troubleshooting.md)

---

**Need help?** See the full [Troubleshooting Guide](docs/installation/troubleshooting.md) or [create an issue](https://github.com/KhoaWorkHub/vibecode/issues).
```

### Try the Extension

1. Open VS Code
2. Click the VibeCode icon in the Activity Bar
3. Browse themes in the sidebar
4. Click a theme to apply it
5. Or use Command Palette: "VibeCode: Show Theme Gallery"

## Troubleshooting

### "vibecode: command not found"

**Solution**: Make sure you ran `npm link` in the CLI package:

```bash
cd packages/cli
npm link
```

If still not working, try:
```bash
npm unlink -g @vibecode/cli
npm link
```

### "VS Code not found"

**Solution**: Make sure VS Code is installed and has been run at least once. VibeCode looks for configuration in:

- **macOS**: `~/Library/Application Support/Code/User/`
- **Windows**: `%APPDATA%\Code\User\`
- **Linux**: `~/.config/Code/User/`

### Extension Not Loading

**Solution**:
1. Rebuild the extension:
   ```bash
   cd packages/extension
   pnpm clean
   pnpm build
   pnpm package
   ```
2. Reinstall the `.vsix` file
3. Reload VS Code (⌘+R or Ctrl+R)

### TypeScript Errors During Build

**Solution**: Make sure you have the correct Node.js version:

```bash
node --version  # Should be 18+
```

Reinstall dependencies:
```bash
pnpm clean
rm -rf node_modules
pnpm install
pnpm build
```

### Theme Not Applying

**Solution**:
1. Check that required extensions are installed
2. Reload VS Code after applying a theme
3. Check the backup was created: `vibecode restore --list`

## Development Setup

If you want to contribute or modify VibeCode:

```bash
# Install dependencies
pnpm install

# Run all packages in watch mode
pnpm dev

# Run tests
pnpm test

# Lint code
pnpm lint

# Format code
pnpm format
```

### Working on CLI

```bash
cd packages/cli
pnpm dev  # Watch mode

# Test your changes
vibecode list
```

### Working on Extension

```bash
cd packages/extension
pnpm dev  # Watch mode

# Press F5 in VS Code to launch Extension Development Host
```

### Working on Core

```bash
cd packages/core
pnpm dev  # Watch mode
pnpm test  # Run tests
```

## Uninstall

### Unlink CLI

```bash
cd packages/cli
npm unlink -g
```

Or:
```bash
npm unlink -g @vibecode/cli
```

### Uninstall Extension

1. Open VS Code
2. Go to Extensions
3. Find "VibeCode"
4. Click "Uninstall"

### Remove Files

```bash
# Remove project
rm -rf vibecode/

# Remove user data (optional - this deletes your custom themes and backups!)
rm -rf ~/.vibecode/
```

## Updating

```bash
cd vibecode

# Pull latest changes
git pull origin main

# Reinstall dependencies
pnpm install

# Rebuild
pnpm build

# Relink CLI (if needed)
cd packages/cli
npm unlink -g
npm link
```

## Platform-Specific Notes

### macOS

Everything should work out of the box. If you get permission errors:

```bash
chmod +x scripts/*.sh
```

### Windows

Use Git Bash or WSL for the best experience. PowerShell and CMD also work but may need adjustments to the scripts.

For PowerShell:
```powershell
# Instead of ./scripts/setup.sh
pnpm install
pnpm build
cd packages/cli
npm link
```

### Linux

Make sure you have build essentials:

```bash
sudo apt-get install build-essential  # Debian/Ubuntu
sudo yum groupinstall "Development Tools"  # Fedora/RHEL
```

## Configuration

VibeCode stores data in `~/.vibecode/`:

```
~/.vibecode/
├── backups/        # Configuration backups
├── themes/         # Built-in themes (symlinked)
└── custom-themes/  # Your custom themes
```

You can change the location by setting environment variables (future feature).

## Getting Help

- 📖 [Read the docs](./README.md)
- 🚀 [Quick start guide](./docs/quick-start.md)
- 🎨 [Theme catalog](./docs/themes.md)
- 🐛 [Report issues](https://github.com/KhoaWorkHub/vibecode/issues)
- 💬 [Discussions](https://github.com/KhoaWorkHub/vibecode/discussions)

## What's Next?

1. Try the demo: `./scripts/demo.sh`
2. Apply your first theme: `vibecode apply tokyo-drift`
3. Create a custom theme: `vibecode create --interactive`
4. Explore the VS Code extension
5. Read the [theme catalog](./docs/themes.md)

---

**Happy coding with VibeCode!** 🎨✨
