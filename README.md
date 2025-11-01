# VibeCode - The Ultimate VS Code Customization Tool

Transform your VS Code with one command. Apply beautiful themes, layouts, and moods instantly. **NEW in v1.2.0**: Share your complete setup with anyone using simple share codes! 🚀

[![Version](https://img.shields.io/badge/version-1.2.0-blue.svg)](https://github.com/KhoaWorkHub/vibecode)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)](https://github.com/KhoaWorkHub/vibecode)

## What's New in v1.2.0 🎉

**Profile Sharing** - Share your complete VS Code setup with a simple code:
- 📤 Share profiles via GitHub Gist (no files to transfer!)
- 📥 Import with a simple code: `vibecode profile import VIBE-abc123`
- 🌍 Works across all machines (no source code needed)
- 🔒 Secure: Uses GitHub's free Gist service
- ⚡ Fast: 2 commands to share and sync 100+ extensions

```bash
# Share your setup
vibecode profile share my-awesome-setup
# → VIBE-abc123def456...

# Anyone can import it
vibecode profile import VIBE-abc123def456...
# → Done! All extensions + settings synced
```

[Read the Profile Sharing Guide →](PROFILE_SHARING_GUIDE.md)

### Previous: v1.1.0

**Profile System** - Save and switch between complete VS Code environments:
- 💾 Save snapshots of settings + extensions + keybindings
- 🔄 Switch between work/personal/experimental setups
- 🛡️ Protected extensions never get removed
- 🔍 Preview changes with dry-run mode

[Read the Complete Profile Guide →](PROFILE_GUIDE.md)

---

## Table of Contents

- [What's New](#whats-new-in-v110-)
- [Quick Start](#quick-start)
- [Installation](#installation)
  - [One-Command Install](#one-command-install-recommended)
  - [Alternative Methods](#alternative-installation-methods)
- [Features](#features)
- [Usage](#usage)
  - [CLI Commands](#cli-commands)
  - [VS Code Extension](#vs-code-extension)
- [Available Themes](#available-themes)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

---

## Quick Start

<details open>
<summary>Get started in 30 seconds</summary>
### Step 1: Install VibeCode

```bash
curl -fsSL https://raw.githubusercontent.com/KhoaWorkHub/vibecode/main/install.sh | bash
```

### Step 2: Try themes OR save your current setup

**Option A: Apply a theme**
```bash
vibecode list                           # See all 9 themes
vibecode apply tokyo-drift              # Try a custom theme
```

**Option B: Save your environment** 🆕
```bash
vibecode profile save my-setup --with-theme  # Snapshot current setup
vibecode profile list                        # View all profiles
```

### Step 3: Experiment fearlessly!

```bash
# Try new extensions, change settings, customize everything
# Made a mess? No problem!
vibecode restore                        # Restore from backup
# or
vibecode profile switch my-setup        # Switch back to saved profile
```

Done! Your VS Code is now customized. And you can always go back!

</details>

---

## Installation

### One-Command Install (Recommended)

<details open>
<summary>Automatic installation - everything is handled for you</summary>

**macOS / Linux:**
```bash
curl -fsSL https://raw.githubusercontent.com/KhoaWorkHub/vibecode/main/install.sh | bash
```

**Windows (PowerShell):**
```powershell
irm https://raw.githubusercontent.com/KhoaWorkHub/vibecode/main/install.ps1 | iex
```

**What this does:**
1. Checks system requirements
2. Installs Node.js (if needed)
3. Installs pnpm (if needed)
4. Downloads VibeCode
5. Builds all packages
6. Links CLI globally
7. Verifies installation
8. Shows quick start guide

</details>

### Alternative Installation Methods

<details>
<summary>Click to expand: Other installation options</summary>

**Option 1: Clone and install manually**
```bash
git clone https://github.com/KhoaWorkHub/vibecode.git
cd vibecode
./install.sh
```

**Option 2: NPM (Coming Soon)**
```bash
npm install -g vibecode
```

**Option 3: Use without installing**
```bash
npx vibecode list
npx vibecode apply tokyo-drift
```

</details>

---

## Features

<details>
<summary>Click to expand: All features</summary>

**Theme Management**
- Browse and apply themes with one command
- 6 beautiful built-in themes
- Create custom themes
- Import and export themes
- Tag-based filtering and search

**Profile System** 🆕
- Save complete VS Code environments (settings + extensions + keybindings)
- Switch between different setups with confidence
- Strict extension isolation for clean environments
- Protected extensions support (never remove critical tools)
- Auto-backup before every switch
- Perfect for experimenting without fear

**Safety & Backup**
- Automatic backups before changes
- Easy restore to previous state
- Timestamped backup history
- Non-destructive operations

**Cross-Platform**
- Works on Windows, macOS, and Linux
- Automatic platform detection
- Platform-specific path handling
- Consistent experience everywhere

**Developer Tools**
- Full-featured CLI with 10+ commands
- VS Code extension with sidebar
- Theme gallery with search
- Interactive theme creator
- Profile management interface

**Extension Management**
- Auto-installs required extensions
- Manages VS Code settings
- Handles keybindings
- Configures layout options
- Programmatic extension install/uninstall

</details>

---

## Usage

### CLI Commands

<details open>
<summary>Click to expand: All CLI commands with examples</summary>

**List themes:**
```bash
vibecode list                    # Show all themes
vibecode list --detailed         # Show detailed information
vibecode list --tags "dark"      # Filter by tags
```

**Apply a theme:**
```bash
vibecode apply tokyo-drift       # Apply theme
vibecode apply night-hacker --no-backup  # Skip backup (not recommended)
vibecode apply minimal-daylight --settings-only  # Settings only
```

**Search themes:**
```bash
vibecode search "tokyo"          # Search by keyword
vibecode search "minimal"        # Find minimal themes
```

**Create custom theme:**
```bash
vibecode create "My Theme"       # Quick create
vibecode create --interactive    # Interactive mode (recommended)
```

**Backup and restore:**
```bash
vibecode backup                  # Create backup
vibecode restore --list          # List all backups
vibecode restore                 # Interactive restore
```

**Profile management:** 🆕
```bash
# Save complete environment snapshots
vibecode profile save <name>                    # Save current setup
vibecode profile save react-dev --with-theme    # Include theme

# Switch between environments
vibecode profile switch <name>                  # Switch profile
vibecode profile switch <name> --dry-run        # Preview changes

# Manage profiles
vibecode profile list                           # List all profiles
vibecode profile show <name>                    # Show details
vibecode profile diff <target>                  # Compare setups
vibecode profile delete <name>                  # Delete profile

# Protected extensions (never removed)
vibecode profile protected list                 # List protected
vibecode profile protected add github.copilot   # Add to protected
```

**Import and export:**
```bash
vibecode import theme.json       # Import theme
vibecode export tokyo-drift      # Export theme
```

See [CLI Guide](docs/usage/cli-guide.md) and **[Profile Guide](PROFILE_GUIDE.md)** for detailed documentation.

</details>

### VS Code Extension

<details>
<summary>Click to expand: Extension installation and usage</summary>

**Installation:**

1. Build the extension:
   ```bash
   cd packages/extension
   pnpm build
   pnpm package
   ```

2. Install in VS Code:
   - Open VS Code
   - Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
   - Type "Extensions: Install from VSIX"
   - Select the generated `.vsix` file

**Usage:**

1. Click the VibeCode icon in the Activity Bar
2. Browse themes in the sidebar
3. Click a theme to apply it
4. Or use Command Palette: "VibeCode: Show Theme Gallery"

See [Extension Guide](docs/usage/extension-guide.md) for more details.

</details>

---

## Available Themes

<details open>
<summary>Click to expand: 8 built-in themes</summary>

| Theme Name | Style | Mood | Best For | Tags |
|------------|-------|------|----------|------|
| **VS Code Default** | Dark Modern | Original | Back to basics | default, original, clean |
| **VS Code Default Light** | Light Modern | Original | Default bright | default, original, light |
| Night Hacker | Dark Neon | Night | Late-night coding | dark, neon, hacker |
| Tokyo Drift | Dark Vibrant | Creative | Colorful work | dark, vibrant, tokyo |
| Minimal Daylight | Light Clean | Morning | Focused work | light, minimal, clean |
| Forest Zen | Dark Nature | Chill | Deep focus | dark, nature, zen |
| Pastel Dream | Light Soft | Creative | Design work | light, pastel, creative |
| Monochrome Focus | Dark Minimal | Focus | Maximum concentration | dark, minimal, focus |

**Quick Apply:**
```bash
# Return to VS Code defaults
vibecode apply vscode-default         # Original dark theme
vibecode apply vscode-default-light   # Original light theme

# Try custom themes
vibecode apply night-hacker      # Dark neon cyberpunk
vibecode apply tokyo-drift       # Vibrant Tokyo-inspired
vibecode apply minimal-daylight  # Clean light theme
vibecode apply forest-zen        # Nature-inspired calm
vibecode apply pastel-dream      # Soft pastel creative
vibecode apply monochrome-focus  # Pure B&W minimal
```

**Pro Tip:** Use `vscode-default` to instantly return to VS Code's original look!

See [Theme Catalog](docs/usage/themes-catalog.md) for detailed descriptions.

</details>

---

## Documentation

<details>
<summary>Click to expand: All documentation</summary>

**Getting Started:**
- [Installation Guide](INSTALL.md) - Detailed installation instructions
- [Quick Start](docs/installation/quick-start.md) - Get started in 5 minutes
- [Troubleshooting](docs/installation/troubleshooting.md) - Common issues and solutions

**Usage Guides:**
- [CLI Commands](docs/usage/cli-guide.md) - Complete CLI reference
- [VS Code Extension](docs/usage/extension-guide.md) - Extension usage guide
- [Theme Catalog](docs/usage/themes-catalog.md) - All themes with descriptions
- **[Profile Guide](PROFILE_GUIDE.md)** 🆕 - Complete VS Code environment management
- [Backup & Restore Guide](BACKUP_RESTORE_GUIDE.md) - Manual backup/restore
- [Default Themes Guide](DEFAULT_THEMES_GUIDE.md) - VS Code default themes

**Development:**
- [Contributing Guide](CONTRIBUTING.md) - How to contribute
- [Architecture](docs/development/architecture.md) - Technical documentation
- [Creating Themes](docs/development/creating-themes.md) - Theme creation guide

**Project Information:**
- [Changelog](CHANGELOG.md) - Version history
- [License](LICENSE) - MIT License

</details>

---

## Creating Custom Themes

### Using CLI (Interactive)

```bash
vibecode create --interactive
```


<details>
<summary>Click to expand: Step-by-step theme creation</summary>

**Option 1: Interactive Mode (Recommended)**

```bash
# Start interactive theme creator
vibecode create --interactive

# Follow the prompts:
# 1. Enter theme name
# 2. Choose tags
# 3. Use current settings as base (y/n)
# 4. Add required extensions
# 5. Done!
```

**Option 2: Quick Create from Current Settings**

```bash
# Create theme with your current VS Code settings
vibecode create "My Theme Name"
```

**Option 3: Manual Creation**

1. Create a `.vibe-pack.json` file:
   ```json
   {
     "id": "my-theme",
     "name": "My Awesome Theme",
     "description": "Custom theme for my workflow",
     "tags": ["dark", "minimal"],
     "version": "1.0.0",
     "settings": {
       "workbench.colorTheme": "Monokai",
       "editor.fontFamily": "Fira Code",
       "editor.fontSize": 14
     }
   }
   ```

2. Import the theme:
   ```bash
   vibecode import my-theme.vibe-pack.json
   ```

3. Apply your theme:
   ```bash
   vibecode apply my-theme
   ```

See [Creating Themes Guide](docs/development/creating-themes.md) for advanced options.

</details>

---

## Contributing

<details>
<summary>Click to expand: How to contribute</summary>

We welcome contributions! Here's how:

**Quick Start:**
1. Fork the repository
2. Clone your fork: `git clone https://github.com/KhoaWorkHub/vibecode.git`
3. Create a branch: `git checkout -b feature/amazing-feature`
4. Make your changes
5. Test locally: `pnpm test`
6. Commit: `git commit -m 'Add amazing feature'`
7. Push: `git push origin feature/amazing-feature`
8. Open a Pull Request

**Development Setup:**
```bash
# Install dependencies
pnpm install

# Build packages
pnpm build

# Run in watch mode
pnpm dev

# Run tests
pnpm test
```

**What to Contribute:**
- New themes
- Bug fixes
- Feature enhancements
- Documentation improvements
- Test coverage

See [Contributing Guide](CONTRIBUTING.md) for detailed guidelines.

</details>

---

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

## Support

<details>
<summary>Click to expand: Get help</summary>

**Need Help?**
- Read the [Documentation](#documentation)
- Check [Troubleshooting Guide](docs/installation/troubleshooting.md)
- Search [GitHub Issues](https://github.com/KhoaWorkHub/vibecode/issues)
- Ask in [Discussions](https://github.com/KhoaWorkHub/vibecode/discussions)

**Found a Bug?**
- Open an [Issue](https://github.com/KhoaWorkHub/vibecode/issues/new)
- Include your OS, VS Code version, and error message
- Provide steps to reproduce

**Feature Request?**
- Open a [Feature Request](https://github.com/KhoaWorkHub/vibecode/issues/new)
- Describe the feature and use case
- Explain why it would be useful

**Contact:**
- Email: tkhoa7815@gmail.com
- GitHub: [@KhoaWorkHub](https://github.com/KhoaWorkHub)

</details>

---

<p align="center">
  Made with ❤️ by the VibeCode Team
</p>
