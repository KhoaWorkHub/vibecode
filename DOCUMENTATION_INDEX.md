# 🎨 VibeCode - Complete Documentation Index

Welcome to VibeCode! This index will help you navigate the documentation.

## 📚 Quick Links

### Getting Started
- **[INSTALL.md](./INSTALL.md)** - Installation and setup instructions
- **[Quick Start Guide](./docs/quick-start.md)** - Get up and running in 5 minutes
- **[README.md](./README.md)** - Main project overview and features

### Using VibeCode
- **[Theme Catalog](./docs/themes.md)** - Browse all available themes with descriptions
- **CLI Commands** - See README.md for full command reference
- **Extension Guide** - See README.md for extension usage

### Development
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - How to contribute to VibeCode
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Complete project architecture and structure
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history and changes

### Legal
- **[LICENSE](./LICENSE)** - MIT License

## 🗂️ Documentation Structure

```
vibecode/
├── 📄 README.md                 ⭐ Start here! Project overview
├── 📄 INSTALL.md                🚀 Installation guide
├── 📄 CONTRIBUTING.md           🤝 Contribution guidelines
├── 📄 PROJECT_SUMMARY.md        📋 Technical architecture
├── 📄 CHANGELOG.md              📝 Version history
├── 📄 LICENSE                   ⚖️  MIT License
│
└── 📁 docs/
    ├── quick-start.md          ⚡ 5-minute tutorial
    └── themes.md               🎨 Theme catalog
```

## 🎯 Find What You Need

### I want to...

#### Install and Use
- ✅ **Install VibeCode** → [INSTALL.md](./INSTALL.md)
- ✅ **Quick start tutorial** → [Quick Start Guide](./docs/quick-start.md)
- ✅ **See available themes** → [Theme Catalog](./docs/themes.md)
- ✅ **Learn CLI commands** → [README.md](./README.md#usage)

#### Develop and Contribute
- ✅ **Contribute code** → [CONTRIBUTING.md](./CONTRIBUTING.md)
- ✅ **Understand architecture** → [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
- ✅ **Create a theme** → [CONTRIBUTING.md](./CONTRIBUTING.md#creating-a-new-theme)
- ✅ **Report a bug** → [GitHub Issues](https://github.com/KhoaWorkHub/vibecode/issues)

#### Advanced Usage
- ✅ **Create custom theme** → [README.md](./README.md#creating-custom-themes)
- ✅ **Backup & restore** → [Quick Start](./docs/quick-start.md#backup--restore)
- ✅ **Import/export themes** → [README.md](./README.md#usage)

## 📦 Package Documentation

### @vibecode/core
- **Location**: `packages/core/`
- **Purpose**: Shared logic for theme management
- **Key Files**:
  - `src/types/theme.ts` - Type definitions
  - `src/services/ThemeManager.ts` - Theme management
  - `src/utils/paths.ts` - Path resolution
  - `src/utils/config.ts` - Configuration handling

### @vibecode/cli
- **Location**: `packages/cli/`
- **Purpose**: Command-line interface
- **Key Files**:
  - `src/cli.ts` - CLI entry point
  - `src/commands/` - All CLI commands

### @vibecode/extension
- **Location**: `packages/extension/`
- **Purpose**: VS Code extension
- **Key Files**:
  - `src/extension.ts` - Extension activation
  - `src/providers/` - Tree view providers

## 🎨 Built-in Themes

| Theme | Type | Mood | Description |
|-------|------|------|-------------|
| [Night Hacker](./docs/themes.md#night-hacker) | Dark | 🌙 Night | Cyberpunk neon style |
| [Tokyo Drift](./docs/themes.md#tokyo-drift) | Dark | 🗼 Vibrant | Tokyo-inspired colors |
| [Minimal Daylight](./docs/themes.md#minimal-daylight) | Light | ☀️ Morning | Clean & minimal |
| [Forest Zen](./docs/themes.md#forest-zen) | Dark | 🌲 Chill | Nature-inspired calm |
| [Pastel Dream](./docs/themes.md#pastel-dream) | Light | 🎨 Creative | Soft pastel colors |
| [Monochrome Focus](./docs/themes.md#monochrome-focus) | Dark | ⚫ Focus | Pure B&W minimal |

See [Theme Catalog](./docs/themes.md) for full descriptions.

## 🚀 Quick Commands Reference

```bash
# Installation
./scripts/setup.sh              # Automated setup

# CLI Usage
vibecode list                   # List all themes
vibecode apply <theme>          # Apply a theme
vibecode search <query>         # Search themes
vibecode create <name>          # Create custom theme
vibecode backup                 # Backup config
vibecode restore                # Restore backup
vibecode import <file>          # Import theme
vibecode export <theme> <file>  # Export theme

# Development
pnpm install                    # Install dependencies
pnpm build                      # Build all packages
pnpm dev                        # Watch mode
pnpm test                       # Run tests
pnpm lint                       # Lint code
```

## 💡 Common Use Cases

### First Time User
1. Read [README.md](./README.md)
2. Follow [INSTALL.md](./INSTALL.md)
3. Try [Quick Start Guide](./docs/quick-start.md)
4. Browse [Theme Catalog](./docs/themes.md)

### Theme Creator
1. Read [CONTRIBUTING.md](./CONTRIBUTING.md)
2. Check theme specification in [README.md](./README.md#creating-custom-themes)
3. Look at examples in `packages/core/themes/`
4. Submit via GitHub Issues

### Developer/Contributor
1. Read [CONTRIBUTING.md](./CONTRIBUTING.md)
2. Study [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
3. Check codebase structure
4. Submit pull requests

## 🔗 External Links

- **GitHub Repository**: https://github.com/KhoaWorkHub/vibecode
- **Issue Tracker**: https://github.com/KhoaWorkHub/vibecode/issues
- **Discussions**: https://github.com/KhoaWorkHub/vibecode/discussions
- **VS Code Marketplace**: (Coming soon)
- **npm Package**: (Coming soon)

## 📞 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/KhoaWorkHub/vibecode/issues)
- 💬 **Questions**: [GitHub Discussions](https://github.com/KhoaWorkHub/vibecode/discussions)
- 📧 **Email**: support@vibecode.dev
- 🌟 **Feature Requests**: [GitHub Issues](https://github.com/KhoaWorkHub/vibecode/issues)

## 🎓 Learning Path

### Beginner
1. Install VibeCode
2. Try applying different themes
3. Create your first backup
4. Explore the theme catalog

### Intermediate
1. Create a custom theme
2. Learn CLI commands
3. Try the VS Code extension
4. Import/export themes

### Advanced
1. Study the architecture
2. Contribute a theme
3. Contribute code improvements
4. Help with documentation

## 📱 Stay Updated

- ⭐ Star the repository
- 👁️ Watch for updates
- 🍴 Fork for your modifications
- 📢 Share with colleagues

---

**Made with ❤️ by the VibeCode Team**

*Last updated: November 1, 2024*
