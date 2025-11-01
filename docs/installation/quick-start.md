# VibeCode Quick Start Guide

Get up and running with VibeCode in 5 minutes.

## Table of Contents

- [Installation](#installation)
- [First Steps](#first-steps)
- [Basic Commands](#basic-commands)
- [Next Steps](#next-steps)

---

## Installation

### One-Command Install

<details open>
<summary>Automatic installation (Recommended)</summary>

**macOS / Linux:**
```bash
curl -fsSL https://raw.githubusercontent.com/yourusername/vibecode/main/install.sh | bash
```

**Windows (PowerShell):**
```powershell
irm https://raw.githubusercontent.com/yourusername/vibecode/main/install.ps1 | iex
```

This script will automatically:
1. Check system requirements
2. Install Node.js (if needed)
3. Install pnpm (if needed)
4. Download and build VibeCode
5. Link CLI globally
6. Verify installation

</details>

<details>
<summary>Manual installation</summary>

**Step 1: Clone repository**
```bash
git clone https://github.com/yourusername/vibecode.git
cd vibecode
```

**Step 2: Run installer**
```bash
./install.sh
```

</details>

---

## First Steps

### Step 1: Verify Installation

```bash
vibecode --version
```

You should see the version number.

### Step 2: List Available Themes

```bash
vibecode list
```

You'll see 6 built-in themes.

### Step 3: Apply Your First Theme

```bash
vibecode apply tokyo-drift
```

### Step 4: Restart VS Code

Close and reopen VS Code to see the changes.

---

## Basic Commands

### List Themes

```bash
vibecode list                    # Show all themes
vibecode list --detailed         # Show details
vibecode list --tags "dark"      # Filter by tag
```

### Apply Themes

```bash
vibecode apply tokyo-drift       # Apply theme
```

### Search Themes

```bash
vibecode search "minimal"        # Find minimal themes
vibecode search "dark"           # Find dark themes
```

### Backup Configuration

```bash
vibecode backup                  # Create backup
```

### Restore Configuration

```bash
vibecode restore --list          # List backups
vibecode restore                 # Interactive restore
```

---

## Next Steps

### Create a Custom Theme

```bash
vibecode create --interactive
```

### Explore More Commands

```bash
vibecode --help                  # Show all commands
```

### Read Full Documentation

- [CLI Guide](../usage/cli-guide.md) - All CLI commands
- [Theme Catalog](../usage/themes-catalog.md) - Theme descriptions
- [Extension Guide](../usage/extension-guide.md) - VS Code extension

### Get Help

- [Troubleshooting](troubleshooting.md) - Common issues
- [GitHub Issues](https://github.com/yourusername/vibecode/issues)

---

**You're all set! Enjoy customizing your VS Code with VibeCode!**
