# VibeCode Quick Start Guide

## Installation

### Option 1: Clone and Build (Recommended for Development)

```bash
# Clone the repository
git clone https://github.com/yourusername/vibecode.git
cd vibecode

# Install pnpm if you don't have it
npm install -g pnpm

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Link CLI globally
cd packages/cli
npm link
```

### Option 2: npm Install (Coming Soon)

```bash
# Install CLI globally
npm install -g @vibecode/cli

# Or use with npx
npx @vibecode/cli list
```

## Using the CLI

### List Themes

```bash
# List all themes
vibecode list

# List with details
vibecode list --detailed

# Filter by tags
vibecode list --tags "dark,minimal"
```

### Apply a Theme

```bash
# Apply a theme by ID
vibecode apply tokyo-drift

# Apply without backup (not recommended)
vibecode apply night-hacker --no-backup

# Apply settings only (skip extensions and layout)
vibecode apply minimal-daylight --settings-only
```

### Search Themes

```bash
# Search by keyword
vibecode search "hacker"
vibecode search "minimal"
vibecode search "tokyo"
```

### Backup & Restore

```bash
# Create a manual backup
vibecode backup

# List all backups
vibecode restore --list

# Restore a specific backup
vibecode restore backup-2024-11-01T10-30-00-000Z

# Interactive restore (will show you a list to choose from)
vibecode restore
```

### Create Custom Themes

```bash
# Interactive mode (recommended)
vibecode create --interactive

# Quick create from current settings
vibecode create "My Theme"
```

### Import/Export Themes

```bash
# Import a theme
vibecode import ./downloads/awesome-theme.vibe-pack.json

# Export a theme
vibecode export tokyo-drift ./my-themes/tokyo.vibe-pack.json
```

## Using the VS Code Extension

### Installation

1. Build the extension:
   ```bash
   cd packages/extension
   pnpm build
   pnpm package
   ```

2. Install the `.vsix` file:
   - Open VS Code
   - Go to Extensions (⌘+Shift+X or Ctrl+Shift+X)
   - Click "..." menu → "Install from VSIX..."
   - Select the generated `.vsix` file

### Usage

1. **Open VibeCode Sidebar**
   - Click the VibeCode icon in the Activity Bar (left side)

2. **Browse Themes**
   - Expand categories: Dark Themes, Light Themes, Minimal, Vibrant, All Themes
   - Click on any theme to see details
   - Click "Apply" to activate

3. **Search Themes**
   - Use Command Palette (⌘+Shift+P or Ctrl+Shift+P)
   - Type "VibeCode: Show Theme Gallery"
   - Search in the gallery webview

4. **Create Custom Theme**
   - Command Palette → "VibeCode: Create Custom Theme"
   - Enter a name
   - Theme will be saved with your current settings

5. **Restore Backup**
   - Command Palette → "VibeCode: Restore Backup"
   - Select a backup from the list
   - Confirm and reload

## Available Themes

| Theme | Mood | Best For | Tags |
|-------|------|----------|------|
| Night Hacker | 🌙 Night | Late-night coding | dark, neon, hacker |
| Tokyo Drift | 🗼 Vibrant | Creative work | dark, colorful, tokyo |
| Minimal Daylight | ☀️ Morning | Focused work | light, minimal, clean |
| Forest Zen | 🌲 Chill | Deep focus | dark, nature, zen |
| Pastel Dream | 🎨 Creative | Design work | light, pastel, creative |
| Monochrome Focus | ⚫ Focus | Maximum focus | dark, minimal, distraction-free |

## Tips & Tricks

### 1. Mood-Based Workflow

Match themes to your daily schedule:

```bash
# Morning: Start fresh
vibecode apply minimal-daylight

# Afternoon: Stay focused
vibecode apply forest-zen

# Evening: Get creative
vibecode apply tokyo-drift

# Night: Deep work
vibecode apply night-hacker
```

### 2. Project-Based Themes

Different themes for different projects:

```bash
# Frontend project
cd ~/projects/my-react-app
vibecode apply pastel-dream

# Backend project
cd ~/projects/my-api
vibecode apply monochrome-focus
```

### 3. Quick Switch Alias

Add to your `.zshrc` or `.bashrc`:

```bash
alias vibe="vibecode apply"
alias vibes="vibecode list"
```

Then use:
```bash
vibe tokyo-drift
vibes
```

### 4. Backup Before Experimenting

```bash
# Create a backup
vibecode backup

# Try different themes
vibecode apply tokyo-drift
vibecode apply night-hacker

# Restore if needed
vibecode restore
```

## Troubleshooting

### Theme Not Applying?

1. Make sure VS Code is installed and has been run at least once
2. Try reloading VS Code after applying
3. Check if required extensions are installed

### CLI Not Found?

Make sure you ran `npm link` in the `packages/cli` directory:

```bash
cd packages/cli
npm link
```

### Extension Not Working?

1. Rebuild the extension:
   ```bash
   cd packages/extension
   pnpm build
   ```

2. Reload VS Code window (⌘+R or Ctrl+R)

### Backups Not Found?

Backups are stored in `~/.vibecode/backups/`. Make sure the directory exists:

```bash
ls -la ~/.vibecode/backups/
```

## Next Steps

- [Read full documentation](./README.md)
- [Browse theme catalog](./docs/themes.md)
- [Create your own theme](./CONTRIBUTING.md)
- [Report issues](https://github.com/yourusername/vibecode/issues)

---

Happy coding with VibeCode! 🎨✨
