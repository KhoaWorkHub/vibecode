# Profile Sharing Setup Guide

## Overview

VibeCode v1.2.0 introduces **Profile Sharing** - the ability to share your complete VS Code setup (extensions, settings, keybindings) with a simple share code.

## Quick Start

```bash
# 1. Save your current setup
vibecode profile save my-awesome-setup

# 2. Share it (generates a share code)
vibecode profile share my-awesome-setup
# → VIBE-abc123def456...

# 3. Anyone can import it
vibecode profile import VIBE-abc123def456...
```

## Setup (One-Time)

To share profiles, you need a GitHub token (for creating Gists):

### Option 1: Environment Variable

```bash
export GITHUB_TOKEN=ghp_your_token_here
```

### Option 2: Config File

```bash
echo "ghp_your_token_here" > ~/.vibecode/github-token
```

### Getting a GitHub Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name: `VibeCode Profile Sharing`
4. Expiration: No expiration (or your preference)
5. Scopes: Check **only** `gist`
6. Click "Generate token"
7. Copy the token (starts with `ghp_...`)

## How It Works

```
┌─────────────────┐
│  Your Computer  │
│                 │
│  vibecode       │
│  profile share  │
└────────┬────────┘
         │
         │ Upload profile.json
         ↓
    ┌────────────┐
    │   GitHub   │
    │    Gist    │  (Free, Public Storage)
    │            │
    └────┬───────┘
         │
         │ Download with code
         ↓
┌──────────────────┐
│  Any Computer    │
│                  │
│  vibecode        │
│  profile import  │
└──────────────────┘
```

## Use Cases

### 1. Personal - Multiple Machines

```bash
# On Laptop
vibecode profile save my-laptop-setup
vibecode profile share my-laptop-setup
# → VIBE-abc123

# On Desktop
vibecode profile import VIBE-abc123
vibecode profile switch my-laptop-setup
```

### 2. Team Onboarding

```bash
# Team Lead creates setup
vibecode profile save team-python-2024
vibecode profile share team-python-2024
# → Share code with team

# New team member
curl -fsSL https://vibecode.dev/install.sh | bash
vibecode profile import VIBE-xyz789
vibecode profile switch team-python-2024
# → Done! 50+ extensions installed
```

### 3. AI Agent Customization

```bash
# User asks AI to customize VS Code
vibecode agent "set up Python data science environment"
# → AI installs 30+ extensions, configures settings

# Save and share the AI's work
vibecode profile save ai-data-science
vibecode profile share ai-data-science
# → Share with colleagues
```

## Commands

### Share a Profile

```bash
vibecode profile share <name>
```

Output:
```
✓ Profile shared successfully!

  Share Code: VIBE-abc123def456789...

Anyone can import this profile with:
  vibecode profile import VIBE-abc123def456789...
```

### Import a Profile

```bash
# With prompt
vibecode profile import VIBE-abc123

# Skip confirmation
vibecode profile import VIBE-abc123 -y

# Custom name
vibecode profile import VIBE-abc123 --name my-imported-setup
```

Output:
```
📋 Profile Information:
  Name: team-python-2024
  Description: Python development setup
  Extensions: 42
  Theme: One Dark Pro
  Created: 11/1/2025, 10:30 AM

Import this profile? (y/N): y

✓ Profile imported as "team-python-2024"!

To switch to this profile:
  vibecode profile switch team-python-2024
```

## Security & Privacy

- **Public Gists**: Share codes create public GitHub Gists (anyone with code can access)
- **No Secrets**: Profiles only contain extension IDs and settings (no API keys, passwords, etc.)
- **Token Safety**: Your GitHub token is stored locally only (`~/.vibecode/github-token`)
- **Permanent**: Share codes don't expire (Gists remain until you delete them)

## Troubleshooting

### "GitHub token required"

You haven't set up a GitHub token. See [Getting a GitHub Token](#getting-a-github-token).

### "GitHub authentication failed"

Your token is invalid or expired. Generate a new one.

### "Invalid share code: Gist not found"

The share code is incorrect, or the Gist was deleted.

### "Profile already exists"

Import with a custom name:
```bash
vibecode profile import VIBE-abc123 --name different-name
```

## FAQ

**Q: Do I need the source code to share profiles?**  
A: No! Just install via curl, and `vibecode profile share/import` works immediately.

**Q: Can I share custom CSS/themes/sounds?**  
A: Not yet. Currently only extensions, settings, and keybindings are shared. Custom assets require manual setup.

**Q: How many extensions can I share?**  
A: Unlimited! Profiles can contain hundreds of extensions.

**Q: Does this work offline?**  
A: No, sharing/importing requires internet (GitHub API). But once imported, profiles work offline.

**Q: Can I delete a shared profile?**  
A: Yes, delete the Gist from your GitHub account: https://gist.github.com/

## What's Shared vs. Not Shared

| Item | Shared? | Notes |
|------|---------|-------|
| Extensions | ✅ Yes | Extension IDs only (re-downloads from marketplace) |
| Settings | ✅ Yes | Full `settings.json` |
| Keybindings | ✅ Yes | Full `keybindings.json` |
| Theme Reference | ✅ Yes | Theme name (if `--with-theme` used) |
| Custom CSS Files | ❌ No | Only path stored, not file content |
| Custom Images | ❌ No | Only path stored, not files |
| Custom Sounds | ❌ No | Only path stored, not files |
| System Fonts | ❌ No | Cannot be shared |

## Examples

### Share Current Setup

```bash
vibecode profile save current-setup --description "My VS Code setup as of Nov 2024"
vibecode profile share current-setup
```

### Import and Auto-Switch

```bash
vibecode profile import VIBE-xyz789 -y && vibecode profile switch team-setup -y
```

### List All Profiles (Including Imported)

```bash
vibecode profile list
```

## Version History

- **v1.2.0** (Nov 2024): Initial release of Profile Sharing
- **v1.1.0** (Nov 2024): Profile system (local only)
- **v1.0.0** (Oct 2024): Theme and layout management

## Related Documentation

- [Profile Guide](./PROFILE_GUIDE.md) - Full profile system documentation
- [Installation Guide](./INSTALL.md) - Installing VibeCode CLI
- [Theme Guide](./DEFAULT_THEMES_GUIDE.md) - Theme customization

---

**Need Help?** Open an issue: https://github.com/KhoaWorkHub/vibecode/issues
