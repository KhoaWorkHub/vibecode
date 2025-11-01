# VibeCode Testing & Deployment Checklist

Use this checklist to verify everything works before releasing.

## Pre-Testing Checklist

### Documentation Review
- [ ] README.md - No icons, has TOC, all sections clean
- [ ] INSTALL.md - Simplified, one-command focus
- [ ] docs/installation/quick-start.md - Complete and clear
- [ ] docs/usage/cli-guide.md - All commands documented
- [ ] docs/installation/troubleshooting.md - Common issues covered
- [ ] All markdown files properly formatted
- [ ] All links working (no broken links)

### Code Quality
- [ ] All packages build successfully (`pnpm build`)
- [ ] No TypeScript errors (`pnpm tsc --noEmit`)
- [ ] No linting errors (`pnpm lint`)
- [ ] Code properly formatted (`pnpm format`)
- [ ] All tests passing (`pnpm test`)

---

## Installation Testing

### Test install.sh (macOS/Linux)

**On macOS:**
```bash
# Test from current directory
./install.sh

# Or test download from GitHub (once pushed)
curl -fsSL https://raw.githubusercontent.com/yourusername/vibecode/main/install.sh | bash
```

**Verify:**
- [ ] Script detects macOS correctly
- [ ] Node.js version checked or installed
- [ ] pnpm installed if needed
- [ ] Repository cloned successfully
- [ ] Dependencies installed
- [ ] Build completes without errors
- [ ] CLI linked globally
- [ ] `vibecode --version` works
- [ ] `vibecode list` shows 6 themes

**On Linux (Ubuntu/Debian):**
```bash
# Test in Docker or VM
docker run -it ubuntu:22.04 bash
apt-get update && apt-get install -y curl git
curl -fsSL https://raw.githubusercontent.com/yourusername/vibecode/main/install.sh | bash
```

**Verify:**
- [ ] Script detects Linux correctly
- [ ] All steps complete successfully
- [ ] CLI works after install

---

### Test install.ps1 (Windows)

**On Windows PowerShell:**
```powershell
# Allow script execution (if needed)
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

# Test from current directory
.\install.ps1

# Or test download (once pushed)
irm https://raw.githubusercontent.com/yourusername/vibecode/main/install.ps1 | iex
```

**Verify:**
- [ ] Script runs in PowerShell
- [ ] Node.js detected or installed
- [ ] pnpm installed
- [ ] Repository cloned
- [ ] Build succeeds
- [ ] CLI linked
- [ ] Commands work

---

## CLI Testing

### Basic Commands
```bash
# Version
vibecode --version
# Expected: Version number displayed

# Help
vibecode --help
# Expected: Command list displayed

# List themes
vibecode list
# Expected: 6 themes in table format

# Detailed list
vibecode list --detailed
# Expected: Themes with descriptions

# Filter by tags
vibecode list --tags "dark"
# Expected: Only dark themes shown
```

**Verify:**
- [ ] `vibecode --version` shows correct version
- [ ] `vibecode --help` shows all commands
- [ ] `vibecode list` shows table with 6 themes
- [ ] `vibecode list --detailed` shows descriptions
- [ ] `vibecode list --tags "dark"` filters correctly

---

### Theme Operations
```bash
# Search
vibecode search "tokyo"
# Expected: tokyo-drift found

# Backup
vibecode backup
# Expected: Backup created with timestamp

# Apply theme
vibecode apply tokyo-drift
# Expected: Theme applied, backup created

# List backups
vibecode restore --list
# Expected: Shows backup(s)

# Restore
vibecode restore
# Expected: Interactive restore menu
```

**Verify:**
- [ ] Search finds themes correctly
- [ ] Backup creates timestamped folder
- [ ] Apply theme changes VS Code settings
- [ ] Restore lists backups
- [ ] Restore works (settings revert)

---

### Create & Export
```bash
# Create theme interactively
vibecode create --interactive
# Follow prompts

# Export theme
vibecode export tokyo-drift
# Expected: .vibe-pack.json created

# Import theme
vibecode import tokyo-drift.vibe-pack.json
# Expected: Theme imported successfully
```

**Verify:**
- [ ] Interactive creation works
- [ ] Theme saved to custom-themes/
- [ ] Export creates valid JSON
- [ ] Import reads JSON correctly
- [ ] Imported theme appears in list

---

## VS Code Extension Testing

### Build & Install
```bash
cd packages/extension
pnpm build
pnpm package
```

**Verify:**
- [ ] Build completes without errors
- [ ] .vsix file created
- [ ] File size reasonable (~1MB or less)

### Install in VS Code
1. Open VS Code
2. Cmd/Ctrl+Shift+P → "Install from VSIX"
3. Select vibecode-0.1.0.vsix
4. Reload VS Code

**Verify:**
- [ ] Extension installs without errors
- [ ] VibeCode icon appears in Activity Bar
- [ ] Sidebar opens when clicked
- [ ] Theme list loads
- [ ] Clicking theme applies it

### Extension Features
**Verify:**
- [ ] Theme Gallery command works
- [ ] Sidebar shows all themes
- [ ] Theme descriptions visible
- [ ] Apply theme button works
- [ ] Backup list shows in sidebar
- [ ] Restore from sidebar works

---

## Cross-Platform Testing

### macOS
- [ ] Installation script works
- [ ] CLI commands work
- [ ] Theme apply modifies correct path:
  `~/Library/Application Support/Code/User/settings.json`
- [ ] Extension loads correctly

### Linux
- [ ] Installation script works
- [ ] CLI commands work
- [ ] Theme apply modifies correct path:
  `~/.config/Code/User/settings.json`
- [ ] Extension loads correctly

### Windows
- [ ] PowerShell installer works
- [ ] CLI commands work in PowerShell
- [ ] CLI commands work in Command Prompt
- [ ] Theme apply modifies correct path:
  `%APPDATA%\Code\User\settings.json`
- [ ] Extension loads correctly

---

## Documentation Testing

### Links
```bash
# Check all markdown links
# Use markdown link checker or manually verify
```

**Verify:**
- [ ] All internal links work
- [ ] All file paths correct
- [ ] All external links valid
- [ ] All relative paths resolve

### Readability
**Read through each document as a new user:**
- [ ] README.md - Clear and inviting
- [ ] INSTALL.md - Easy to follow
- [ ] Quick Start - Can complete in 5 minutes
- [ ] CLI Guide - Commands easy to understand
- [ ] Troubleshooting - Covers common issues

---

## Performance Testing

### Build Times
```bash
time pnpm build
# Expected: Under 30 seconds
```

### CLI Response
```bash
time vibecode list
# Expected: Under 1 second
```

**Verify:**
- [ ] Build completes in reasonable time
- [ ] CLI commands respond quickly
- [ ] No memory leaks
- [ ] Extension doesn't slow VS Code

---

## Error Handling

### Invalid Commands
```bash
vibecode apply nonexistent-theme
# Expected: Clear error message

vibecode import invalid-file.json
# Expected: Validation error

vibecode restore invalid-backup
# Expected: Helpful error
```

**Verify:**
- [ ] Invalid theme name shows error
- [ ] Invalid file shows validation error
- [ ] Missing backup shows helpful message
- [ ] All errors are user-friendly

### Permission Issues
```bash
# Make settings.json read-only
chmod 444 ~/Library/Application\ Support/Code/User/settings.json

vibecode apply tokyo-drift
# Expected: Permission error with fix suggestion
```

**Verify:**
- [ ] Permission errors detected
- [ ] Helpful fix suggestions shown

---

## Security Checks

### Installers
- [ ] install.sh doesn't run as sudo unnecessarily
- [ ] install.ps1 doesn't require admin unless needed
- [ ] No hardcoded credentials
- [ ] Safe download URLs (HTTPS)

### Code
- [ ] No eval() or dangerous functions
- [ ] Input validation on all user inputs
- [ ] Safe file operations
- [ ] No secrets in code

---

## Pre-Release Checklist

### Version Numbers
- [ ] package.json versions match
- [ ] Extension version correct
- [ ] README shows correct version
- [ ] CHANGELOG updated

### Git
- [ ] All changes committed
- [ ] Meaningful commit messages
- [ ] No debug code left
- [ ] No TODO comments in production code

### Files
- [ ] node_modules/ in .gitignore
- [ ] dist/ in .gitignore
- [ ] *.vsix in .gitignore
- [ ] LICENSE file present
- [ ] All necessary files included

---

## Deployment Steps

### 1. GitHub Repository
```bash
# Create repo on GitHub
# Add remote
git remote add origin https://github.com/yourusername/vibecode.git

# Push
git push -u origin main

# Create tag
git tag v1.0.0
git push --tags
```

### 2. Test Installers from GitHub
```bash
# Test macOS/Linux
curl -fsSL https://raw.githubusercontent.com/yourusername/vibecode/main/install.sh | bash

# Test Windows
irm https://raw.githubusercontent.com/yourusername/vibecode/main/install.ps1 | iex
```

### 3. Create GitHub Release
- [ ] Go to GitHub Releases
- [ ] Create new release
- [ ] Tag: v1.0.0
- [ ] Upload vibecode-0.1.0.vsix
- [ ] Write release notes
- [ ] Publish release

### 4. npm Publishing (Optional)
```bash
# Login to npm
npm login

# Publish packages
cd packages/core && npm publish
cd ../cli && npm publish
```

---

## Post-Release

### Monitoring
- [ ] Watch GitHub Issues
- [ ] Monitor installation success rate
- [ ] Collect user feedback
- [ ] Fix critical bugs quickly

### Documentation
- [ ] Add screenshots to README
- [ ] Create video tutorial
- [ ] Write blog post
- [ ] Update examples

### Community
- [ ] Share on Twitter/X
- [ ] Post on Reddit (r/vscode)
- [ ] Submit to Awesome VS Code list
- [ ] Engage with users

---

## Quick Test Script

Save this as `test.sh` for quick validation:

```bash
#!/bin/bash

echo "Testing VibeCode..."

# Build
echo "Building..."
pnpm build || exit 1

# CLI tests
echo "Testing CLI..."
vibecode --version || exit 1
vibecode list || exit 1
vibecode search "tokyo" || exit 1

# Backup test
echo "Testing backup..."
vibecode backup || exit 1

echo "All tests passed!"
```

---

## Need Help?

If any tests fail:
1. Check error messages carefully
2. Review logs in terminal
3. Consult troubleshooting guide
4. Fix issue and re-test
5. Update documentation if needed

**Good luck with testing and deployment! 🚀**
