# VibeCode Troubleshooting Guide

Common issues and solutions.

## Table of Contents

- [Installation Issues](#installation-issues)
- [CLI Issues](#cli-issues)
- [Theme Application Issues](#theme-application-issues)
- [Extension Issues](#extension-issues)
- [Platform-Specific Issues](#platform-specific-issues)

---

## Installation Issues

### "vibecode: command not found"

**Problem:** CLI is not found after installation.

**Solutions:**

1. **Reload shell configuration:**
   ```bash
   source ~/.zshrc    # For zsh
   source ~/.bashrc   # For bash
   ```

2. **Re-link CLI:**
   ```bash
   cd packages/cli
   npm link
   ```

3. **Check if npm global bin is in PATH:**
   ```bash
   echo $PATH | grep npm
   npm config get prefix
   ```

   Add to your `.zshrc` or `.bashrc`:
   ```bash
   export PATH="$(npm config get prefix)/bin:$PATH"
   ```

---

### "pnpm: command not found"

**Problem:** pnpm is not installed.

**Solution:**
```bash
npm install -g pnpm
```

---

### "Node.js version too old"

**Problem:** Node.js version is below 18.

**Solution:**

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

### Build Errors

**Problem:** Errors during `pnpm build`.

**Solution:**

1. **Clean and rebuild:**
   ```bash
   pnpm clean
   rm -rf node_modules
   pnpm install
   pnpm build
   ```

2. **Check TypeScript errors:**
   ```bash
   pnpm tsc --noEmit
   ```

3. **Update dependencies:**
   ```bash
   pnpm update
   ```

---

## CLI Issues

### "Theme not found"

**Problem:** Theme ID not recognized.

**Solution:**

1. **List available themes:**
   ```bash
   vibecode list
   ```

2. **Check exact theme ID:**
   ```bash
   vibecode search "tokyo"
   ```

3. **Try with correct ID:**
   ```bash
   vibecode apply tokyo-drift  # Not "tokyo"
   ```

---

### "VS Code not found"

**Problem:** VibeCode can't find VS Code installation.

**Solution:**

1. **Verify VS Code is installed:**
   ```bash
   code --version
   ```

2. **Run VS Code at least once:**
   - Open VS Code
   - Let it create config files
   - Close and try again

3. **Check config directory exists:**
   ```bash
   # macOS
   ls ~/Library/Application\ Support/Code/User/

   # Linux
   ls ~/.config/Code/User/

   # Windows
   dir %APPDATA%\Code\User\
   ```

---

### "Permission denied"

**Problem:** Can't write to config files.

**Solution:**

1. **Fix permissions:**
   ```bash
   # macOS/Linux
   chmod 644 ~/Library/Application\ Support/Code/User/settings.json
   ```

2. **Close VS Code before applying:**
   - Quit VS Code completely
   - Run VibeCode command
   - Reopen VS Code

---

## Theme Application Issues

### Theme Not Applying

**Problem:** Theme applied but VS Code looks the same.

**Solutions:**

1. **Restart VS Code:**
   ```bash
   # Close VS Code completely
   # Reopen it
   ```

2. **Check required extensions:**
   ```bash
   vibecode list --detailed
   # Install any missing extensions manually
   ```

3. **Verify settings:**
   ```bash
   # Check if settings were applied
   cat ~/Library/Application\ Support/Code/User/settings.json
   ```

4. **Restore and try again:**
   ```bash
   vibecode restore
   vibecode backup
   vibecode apply tokyo-drift
   ```

---

### Colors Not Changing

**Problem:** Theme applied but colors didn't change.

**Solution:**

1. **Install base theme extension:**
   - Check theme requirements: `vibecode list --detailed`
   - Install required extensions from VS Code marketplace

2. **Reload VS Code:**
   - Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
   - Type "Reload Window"
   - Press Enter

---

### Fonts Not Applying

**Problem:** Font family not changing.

**Solution:**

1. **Install the font:**
   - Download and install the font on your system
   - Common fonts: JetBrains Mono, Fira Code, Cascadia Code

2. **Restart VS Code:**
   - Completely quit and reopen

3. **Manually set font:**
   - Open VS Code Settings
   - Search for "Font Family"
   - Enter font name

---

## Extension Issues

### Extension Not Loading

**Problem:** VS Code extension doesn't appear.

**Solution:**

1. **Rebuild extension:**
   ```bash
   cd packages/extension
   pnpm clean
   pnpm build
   pnpm package
   ```

2. **Reinstall VSIX:**
   - Uninstall old extension
   - Install new `.vsix` file

3. **Check extension host log:**
   - Press `Cmd+Shift+P` / `Ctrl+Shift+P`
   - Type "Developer: Show Extension Host Output"

---

### Sidebar Not Showing

**Problem:** VibeCode sidebar doesn't appear.

**Solution:**

1. **Click the icon:**
   - Look for VibeCode icon in Activity Bar (left side)
   - Click to open

2. **Reset layout:**
   - View → Appearance → Reset Activity Bar
   - Restart VS Code

---

## Platform-Specific Issues

### macOS Issues

**"Operation not permitted"**

**Solution:**
```bash
# Give Terminal full disk access
# System Preferences → Security & Privacy → Privacy → Full Disk Access
# Add Terminal.app or iTerm.app
```

---

**"Developer cannot be verified"**

**Solution:**
```bash
# Remove quarantine attribute
xattr -cr /path/to/vibecode
```

---

### Windows Issues

**PowerShell execution policy**

**Solution:**
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

---

**Path not updated**

**Solution:**
1. Close and reopen PowerShell/Terminal
2. Or add npm global to PATH manually:
   - System Properties → Environment Variables
   - Add `%APPDATA%\npm` to PATH

---

### Linux Issues

**"EACCES: permission denied"**

**Solution:**
```bash
# Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

---

**Missing build tools**

**Solution:**
```bash
# Ubuntu/Debian
sudo apt-get install build-essential

# Fedora/RHEL
sudo yum groupinstall "Development Tools"
```

---

## Still Having Issues?

### Get Help

1. **Check existing issues:**
   - [GitHub Issues](https://github.com/yourusername/vibecode/issues)

2. **Create new issue:**
   - Include: OS, VS Code version, Node.js version
   - Paste error messages
   - Describe steps to reproduce

3. **Community support:**
   - [GitHub Discussions](https://github.com/yourusername/vibecode/discussions)

### Collect Debug Information

```bash
# System info
node --version
pnpm --version
code --version
echo $SHELL

# VibeCode info
vibecode --version
vibecode list

# Check paths
echo $PATH
which vibecode
ls -la ~/.vibecode/
```

---

## See Also

- [Quick Start Guide](quick-start.md)
- [CLI Guide](../usage/cli-guide.md)
- [Installation Guide](../installation/quick-start.md)
