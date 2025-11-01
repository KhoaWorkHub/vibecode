# VibeCode CLI Guide

Complete reference for all VibeCode CLI commands.

## Table of Contents

- [Installation](#installation)
- [Commands](#commands)
  - [list](#list)
  - [apply](#apply)
  - [search](#search)
  - [create](#create)
  - [backup](#backup)
  - [restore](#restore)
  - [import](#import)
  - [export](#export)
- [Examples](#examples)
- [Tips and Tricks](#tips-and-tricks)

---

## Installation

Make sure VibeCode is installed:

```bash
vibecode --version
```

If not installed, see [Installation Guide](../installation/quick-start.md).

---

## Commands

### list

List all available themes.

**Syntax:**
```bash
vibecode list [options]
```

**Options:**
- `--tags <tags>` - Filter by tags (comma-separated)
- `--detailed` - Show detailed information

**Examples:**
```bash
vibecode list                    # Show all themes
vibecode list --detailed         # Detailed view
vibecode list --tags "dark"      # Dark themes only
vibecode list --tags "dark,minimal"  # Dark AND minimal themes
```

**Output:**
- Table view with theme names, IDs, tags, and extension count
- Detailed view shows full descriptions

---

### apply

Apply a theme to VS Code.

**Syntax:**
```bash
vibecode apply <theme-id> [options]
```

**Options:**
- `--no-backup` - Skip backup before applying (not recommended)
- `--no-extensions` - Don't install required extensions
- `--settings-only` - Apply settings only (skip layout and keybindings)

**Examples:**
```bash
vibecode apply tokyo-drift       # Apply theme with backup
vibecode apply night-hacker --no-backup  # Skip backup
vibecode apply minimal-daylight --settings-only  # Settings only
```

**What it does:**
1. Creates automatic backup of current settings
2. Applies new theme settings
3. Applies layout configuration
4. Shows required extensions list
5. Prompts to restart VS Code

---

### search

Search themes by keyword.

**Syntax:**
```bash
vibecode search <query>
```

**Examples:**
```bash
vibecode search "tokyo"          # Find Tokyo-related themes
vibecode search "minimal"        # Find minimal themes
vibecode search "dark"           # Find dark themes
```

**Output:**
- Table showing matching themes
- Searches in: name, description, tags

---

### create

Create a custom theme.

**Syntax:**
```bash
vibecode create [name] [options]
```

**Options:**
- `--interactive` - Interactive mode (recommended)

**Examples:**
```bash
vibecode create --interactive    # Guided creation
vibecode create "My Theme"       # Quick create from current settings
```

**Interactive Mode Steps:**
1. Enter theme name
2. Choose theme ID
3. Write description
4. Select tags
5. Use current settings as base (y/n)
6. Add required extensions
7. Save

**Output:**
- Theme saved to `~/.vibecode/custom-themes/`
- Can be applied immediately

---

### backup

Create a backup of current VS Code configuration.

**Syntax:**
```bash
vibecode backup
```

**What it backs up:**
- settings.json
- keybindings.json
- Metadata (timestamp, platform)

**Backup location:**
```
~/.vibecode/backups/backup-<timestamp>/
```

**Example:**
```bash
vibecode backup
# Output: Backup created at ~/.vibecode/backups/backup-2024-11-01T10-30-00-000Z
```

---

### restore

Restore VS Code configuration from backup.

**Syntax:**
```bash
vibecode restore [backup-name] [options]
```

**Options:**
- `--list` - List all available backups

**Examples:**
```bash
vibecode restore --list          # Show all backups
vibecode restore                 # Interactive restore
vibecode restore backup-2024-11-01T10-30-00-000Z  # Restore specific backup
```

**Interactive Mode:**
1. Shows list of backups with timestamps
2. Select backup to restore
3. Confirm restoration
4. Restores settings

---

### import

Import a theme from a file.

**Syntax:**
```bash
vibecode import <file-path>
```

**Examples:**
```bash
vibecode import ./my-theme.vibe-pack.json
vibecode import ~/Downloads/awesome-theme.vibe-pack.json
```

**What it does:**
1. Validates theme file
2. Saves to custom themes directory
3. Theme becomes available for use

---

### export

Export a theme to a file.

**Syntax:**
```bash
vibecode export <theme-id> [output-path]
```

**Examples:**
```bash
vibecode export tokyo-drift      # Export to current directory
vibecode export night-hacker ~/themes/night-hacker.json  # Custom path
```

**Output:**
- Creates `.vibe-pack.json` file
- Can be shared with others
- Can be imported on other machines

---

## Examples

### Daily Workflow

```bash
# Morning: Light theme
vibecode apply minimal-daylight

# Afternoon: Keep it light
vibecode apply pastel-dream

# Evening: Switch to dark
vibecode apply forest-zen

# Night: Go dark
vibecode apply night-hacker
```

### Before Trying New Themes

```bash
# Create backup
vibecode backup

# Try different themes
vibecode apply tokyo-drift
vibecode apply monochrome-focus

# Restore if needed
vibecode restore
```

### Share Your Setup

```bash
# Create your theme
vibecode create "My Perfect Setup" --interactive

# Export it
vibecode export my-perfect-setup

# Share the .vibe-pack.json file
```

### Find the Right Theme

```bash
# Search by mood
vibecode search "chill"
vibecode search "focus"

# Filter by type
vibecode list --tags "dark"
vibecode list --tags "minimal"
```

---

## Tips and Tricks

### Create Aliases

Add to your `.zshrc` or `.bashrc`:

```bash
alias vibe="vibecode apply"
alias vibes="vibecode list"
alias vibe-backup="vibecode backup"
```

Usage:
```bash
vibe tokyo-drift    # Apply theme
vibes              # List themes
```

### Auto-Backup Before Apply

```bash
# Always create backup first
vibecode backup && vibecode apply tokyo-drift
```

### Quick Theme Switching

```bash
# Create a script for quick switching
echo '#!/bin/bash
vibecode apply "$1"' > ~/bin/vibe-switch
chmod +x ~/bin/vibe-switch

# Usage
vibe-switch tokyo-drift
```

### Export All Custom Themes

```bash
# List custom themes
vibecode list --tags "custom"

# Export each one
for theme in my-theme-1 my-theme-2; do
  vibecode export $theme ~/themes/
done
```

---

## See Also

- [Quick Start Guide](../installation/quick-start.md)
- [Theme Catalog](themes-catalog.md)
- [Troubleshooting](../installation/troubleshooting.md)
