# 📦 VibeCode Profile System Guide

## Overview

The **Profile System** allows you to save complete VS Code environment snapshots and switch between them with confidence. Unlike themes (which only modify visual settings), profiles capture your entire setup including **extensions**, **settings**, and **keybindings**.

### Profile vs Theme

| Feature | Theme | Profile |
|---------|-------|---------|
| **Settings** | ✅ Visual settings only | ✅ Complete settings |
| **Extensions** | ❌ No | ✅ Full extension management |
| **Keybindings** | ❌ No | ✅ Custom keybindings |
| **Isolation** | ❌ Additive | ✅ Strict isolation mode |
| **Use Case** | Quick visual changes | Complete environment switching |

## Key Features

### 🔒 Strict Extension Isolation
When you switch profiles, VibeCode will:
- ✅ Install extensions in the target profile
- ❌ **Uninstall** extensions NOT in the target profile
- 🛡️ Respect protected extensions (never removed)

This ensures **clean, reproducible environments** without leftover extensions.

### 🛡️ Protected Extensions
Some extensions should never be removed (licenses, critical tools). Add them to the protected list:
```bash
vibecode profile protected add github.copilot
vibecode profile protected add ms-vscode.remote-ssh
```

### 💾 Auto-Backup
Before every profile switch, VibeCode automatically creates a backup:
```
backup-before-{profile-name}-{timestamp}
```
You can always roll back if something goes wrong.

### 🔍 Dry-Run Mode
Preview changes before applying:
```bash
vibecode profile switch my-profile --dry-run
```

## Use Cases

### 1. Experimental Setups
You want to try GitHub Copilot's recommended customizations without breaking your current setup:

```bash
# Save your current "stable" setup
vibecode profile save stable-work --with-theme -d "My stable work environment"

# Try GitHub Copilot customizations
# (Install extensions, modify settings, etc.)

# If you like it, save it
vibecode profile save copilot-experiment -d "Testing Copilot customizations"

# If you don't like it, switch back
vibecode profile switch stable-work
```

**Result**: Clean rollback, no leftover extensions or settings.

### 2. Work vs Personal
Different projects need different tools:

```bash
# Save work profile (Docker, Kubernetes, Cloud extensions)
vibecode profile save work --with-theme -d "Enterprise development setup"

# Save personal profile (Game dev, creative tools)
vibecode profile save personal --with-theme -d "Personal projects"

# Switch between them
vibecode profile switch work
vibecode profile switch personal
```

**Result**: Each environment is isolated and reproducible.

### 3. Minimal vs Full-Featured
Sometimes you need a lightweight setup:

```bash
# Save minimal profile (just essentials)
vibecode profile save minimal -d "Lightweight setup for quick edits"

# Save full-featured profile (all extensions)
vibecode profile save full-stack -d "Complete development environment"

# Switch based on task
vibecode profile switch minimal  # Quick config edits
vibecode profile switch full-stack  # Large project work
```

**Result**: Fast, lightweight VS Code when you need it.

## Commands

### Save Profile
```bash
# Basic save (settings + extensions + keybindings)
vibecode profile save <name>

# Include current theme
vibecode profile save <name> --with-theme

# Add description
vibecode profile save <name> -d "My custom setup for web development"

# Save without extensions (settings + keybindings only)
vibecode profile save <name> --no-extensions
```

**Example**:
```bash
vibecode profile save react-dev --with-theme -d "React development with TypeScript"
```

### Switch Profile
```bash
# Switch to profile
vibecode profile switch <name>

# Preview changes first (dry-run)
vibecode profile switch <name> --dry-run

# Keep current theme (don't apply profile theme)
vibecode profile switch <name> --keep-theme

# Keep current extensions (additive mode)
vibecode profile switch <name> --keep-extensions

# Skip confirmation prompt
vibecode profile switch <name> -y
```

**Example**:
```bash
# Preview what will change
vibecode profile switch react-dev --dry-run

# Apply changes
vibecode profile switch react-dev
```

**Output**:
```
🔄 Switching to profile "react-dev"...

Analyzing changes...

📊 Profile Diff:
  Theme: VS Code Default Dark → Tokyo Drift
  Extensions:
    ✓ To Install: 8
    ✗ To Remove: 3
    ○ To Keep: 42
    ⚠ Protected: 1

  Installing:
    + dbaeumer.vscode-eslint
    + esbenp.prettier-vscode
    + dsznajder.es7-react-js-snippets
    ... (5 more)

  Removing:
    - ms-python.python
    - ms-toolsai.jupyter
    - golang.go

  Protected (will not be removed):
    ⚠ github.copilot

  Settings: 12 changed, 4 added

Proceed with profile switch? (y/N): y

🚀 Applying profile...
✓ Profile switched successfully!

⚠ Please reload VS Code window for all changes to take effect.
  (Cmd+Shift+P → "Developer: Reload Window")
```

### List Profiles
```bash
# List all profiles
vibecode profile list

# Short alias
vibecode profile ls
```

**Output**:
```
📋 Available Profiles (3):

  react-dev
    React development with TypeScript
    Extensions: 50
    Theme: Tokyo Drift
    Updated: 11/2/2025, 2:45:00 AM

  minimal
    Lightweight setup for quick edits
    Extensions: 5
    Theme: N/A
    Updated: 11/1/2025, 10:30:00 PM

  stable-work
    My stable work environment
    Extensions: 47
    Theme: Synthwave Sunset
    Updated: 11/1/2025, 9:15:00 AM
```

### Show Profile Details
```bash
# Show detailed information
vibecode profile show <name>
```

**Output**:
```
📦 Profile: react-dev

Metadata:
  Description: React development with TypeScript
  Created: 11/2/2025, 2:45:00 AM
  Updated: 11/2/2025, 2:45:00 AM

Theme:
  Tokyo Drift

Extensions:
  Mode: strict (50 total)

  Installed:
    - dbaeumer.vscode-eslint
    - esbenp.prettier-vscode
    - dsznajder.es7-react-js-snippets
    ... (47 more)

Settings:
  85 settings configured

Keybindings:
  12 custom keybindings
```

### Compare Profiles
```bash
# Compare current setup with a profile
vibecode profile diff <target>
```

**Output**:
```
🔍 Comparing current setup with "react-dev"...

📊 Diff Results:

Theme:
  Current: VS Code Default Dark
  Target:  Tokyo Drift

Extensions:
  To Install: 8
  To Remove:  3
  To Keep:    42

  Installing:
    + dbaeumer.vscode-eslint
    + esbenp.prettier-vscode
    ... (6 more)

  Removing:
    - ms-python.python
    - ms-toolsai.jupyter
    - golang.go

Settings:
  Changed: 12
  Added:   4
```

### Delete Profile
```bash
# Delete a profile
vibecode profile delete <name>

# Short alias
vibecode profile rm <name>

# Skip confirmation
vibecode profile delete <name> -f
```

**Output**:
```
⚠ Delete profile "old-setup"? This cannot be undone. (y/N): y
✓ Profile "old-setup" deleted successfully!
```

### Manage Protected Extensions
```bash
# List protected extensions
vibecode profile protected list

# Add extension to protected list
vibecode profile protected add <extension-id>

# Remove extension from protected list
vibecode profile protected remove <extension-id>
```

**Example**:
```bash
# Protect GitHub Copilot (never remove it)
vibecode profile protected add github.copilot

# Protect SSH extension
vibecode profile protected add ms-vscode.remote-ssh

# List protected extensions
vibecode profile protected list
```

**Output**:
```
🛡️ Protected Extensions (2):

  - github.copilot
  - ms-vscode.remote-ssh

⚠ These extensions will never be removed when switching profiles.
```

## Advanced Usage

### Theme-Agnostic Profiles
If you want a profile that doesn't dictate the theme (useful when you change themes frequently):

```bash
# Save without theme
vibecode profile save my-setup

# Switch and keep current theme
vibecode profile switch my-setup --keep-theme
```

### Additive Extension Mode
If you want to install profile extensions WITHOUT removing current ones:

```bash
vibecode profile switch my-setup --keep-extensions
```

**Note**: This defeats the purpose of strict isolation but can be useful for temporary tasks.

## Best Practices

### 1. Save Before Experimenting
Always save your current stable setup before trying new tools:
```bash
vibecode profile save stable-$(date +%Y%m%d)
```

### 2. Use Descriptive Names
Use clear, descriptive profile names:
- ✅ `react-dev-fullstack`
- ✅ `minimal-editing`
- ✅ `python-data-science`
- ❌ `profile1`
- ❌ `test`

### 3. Add Descriptions
Future-you will thank present-you:
```bash
vibecode profile save my-setup -d "Setup for React + TypeScript with ESLint, Prettier, and custom snippets"
```

### 4. Protect Critical Extensions
Identify extensions you NEVER want removed:
```bash
vibecode profile protected add github.copilot
vibecode profile protected add ms-vscode.remote-ssh
vibecode profile protected add ms-vsliveshare.vsliveshare
```

### 5. Use Dry-Run First
Always preview major changes:
```bash
vibecode profile switch new-setup --dry-run
# Review changes
vibecode profile switch new-setup
```

### 6. Regular Backups
Create periodic backups of your favorite setups:
```bash
vibecode profile save work-backup-$(date +%Y%m%d)
```

## Troubleshooting

### Extensions Not Installing
**Problem**: Some extensions fail to install during switch.

**Solution**:
1. Check your internet connection
2. Manually install the extension: `code --install-extension <id>`
3. Try switching again

### Profile Switch Seems Incomplete
**Problem**: After switching, some settings don't apply.

**Solution**:
1. Reload VS Code window: `Cmd+Shift+P` → "Developer: Reload Window"
2. If still not applied, check VS Code output panel for errors

### Lost My Setup
**Problem**: Accidentally switched and lost my configuration.

**Solution**:
Profiles create auto-backups! Look for:
```bash
vibecode profile list
# Find: backup-before-{profile-name}-{timestamp}

vibecode profile switch backup-before-react-dev-1699000000000
```

### Extension Won't Uninstall
**Problem**: An extension refuses to uninstall during switch.

**Solution**:
1. Add it to protected list if you want to keep it:
   ```bash
   vibecode profile protected add <extension-id>
   ```
2. Or manually uninstall: `code --uninstall-extension <id>`

## Profile Storage

Profiles are stored in:
```
~/.vibecode/profiles/
├── my-profile/
│   └── profile.json
├── react-dev/
│   └── profile.json
└── minimal/
    └── profile.json
```

Protected extensions config:
```
~/.vibecode/config/protected-extensions.json
```

## Examples

### Full Workflow: Trying GitHub Copilot
```bash
# 1. Save current setup
vibecode profile save stable-work --with-theme -d "My stable work environment"

# 2. Try GitHub Copilot
code --install-extension github.copilot
# Make customizations...

# 3. Save experimental setup
vibecode profile save copilot-experiment -d "Testing Copilot"

# 4. Compare setups
vibecode profile diff stable-work

# 5. If you like it, keep copilot-experiment
# If you don't, switch back
vibecode profile switch stable-work
```

### Managing Multiple Projects
```bash
# Create profiles for different projects
vibecode profile save web-dev --with-theme -d "Web development (React, Vue, Angular)"
vibecode profile save backend-dev --with-theme -d "Backend (Node, Python, Go)"
vibecode profile save devops --with-theme -d "DevOps (Docker, Kubernetes, Terraform)"

# Switch based on current work
vibecode profile switch web-dev
# Work on frontend...

vibecode profile switch backend-dev
# Work on API...

vibecode profile switch devops
# Deploy infrastructure...
```

## FAQs

**Q: What's the difference between profiles and themes?**
A: Themes are lightweight visual customizations. Profiles are complete environment snapshots including extensions, settings, and keybindings.

**Q: Will switching profiles remove my GitHub Copilot license?**
A: No! Add it to protected extensions first:
```bash
vibecode profile protected add github.copilot
```

**Q: Can I use profiles without including themes?**
A: Yes! Just don't use `--with-theme` when saving, or use `--keep-theme` when switching.

**Q: What happens to files I have open?**
A: Open files are not affected. Only VS Code configuration changes.

**Q: Can I share profiles with my team?**
A: Yes! Export the profile JSON from `~/.vibecode/profiles/` and share it. Team members can import it.

**Q: How do I update an existing profile?**
A: Just save it again with the same name (it will ask to overwrite).

## See Also

- [Theme Guide](./THEME_GUIDE.md) - Managing visual themes
- [Backup & Restore Guide](./BACKUP_RESTORE_GUIDE.md) - Manual backups
- [README](./README.md) - Main documentation

---

**Happy Profile Switching! 🚀**
