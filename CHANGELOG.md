# Changelog

All notable changes to VibeCode will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-11-02

### Added - Profile System 🆕

**Complete VS Code Environment Management**

- **Profile Manager** - Save and switch between complete VS Code setups
  - Save profiles with settings, extensions, and keybindings
  - Switch profiles with strict extension isolation
  - Auto-backup before every switch
  - Dry-run mode to preview changes
  
- **Extension Manager** - Programmatic extension control
  - List all installed extensions
  - Install/uninstall extensions via CLI
  - Calculate extension diffs between profiles
  - Protected extensions support
  
- **CLI Commands** - New `vibecode profile` command
  - `vibecode profile save <name>` - Snapshot current environment
  - `vibecode profile switch <name>` - Switch to saved profile
  - `vibecode profile list` - List all profiles
  - `vibecode profile show <name>` - Show profile details
  - `vibecode profile diff <target>` - Compare setups
  - `vibecode profile delete <name>` - Remove profile
  - `vibecode profile protected` - Manage protected extensions

**Features:**
- Strict extension isolation (removes extensions not in target profile)
- Protected extensions list (global config for critical tools)
- Theme-agnostic profiles (optional theme inclusion)
- Complete environment snapshots (settings + extensions + keybindings)
- Auto-backup system with timestamps

**Documentation:**
- New [PROFILE_GUIDE.md](PROFILE_GUIDE.md) - 500+ line complete usage guide
- Updated README with Profile System features
- Examples and use cases for real-world scenarios

**Use Cases:**
- Experiment with GitHub Copilot customizations safely
- Switch between work/personal/experimental setups
- Maintain minimal vs full-featured environments
- Clean rollback without leftover extensions

### Changed

- Updated `install.sh` to build only essential packages (core + CLI)
- Added `build:essentials` script to package.json for faster installation
- Enhanced README Quick Start with Profile examples
- Updated theme count: 9 themes total (6 custom + 3 VS Code defaults)

### Technical

- New types: `Profile`, `ProfileMetadata`, `ExtensionConfig`, `ProfileSaveOptions`, `ProfileSwitchOptions`, `ProfileDiff`
- New services: `ProfileManager` (340+ lines)
- New utilities: `ExtensionManager` (120+ lines)
- Updated `PathManager` with `getProfilesDir()` and `getConfigDir()`
- Profile storage: `~/.vibecode/profiles/`
- Config storage: `~/.vibecode/config/`

---

## [1.0.0] - 2024-11-01

### Added
- Initial release of VibeCode
- Core package with theme and configuration management
- CLI tool with full command set
- VS Code extension with sidebar panel
- 6 built-in themes:
  - Night Hacker
  - Tokyo Drift
  - Minimal Daylight
  - Forest Zen
  - Pastel Dream
  - Monochrome Focus
- Automatic backup and restore functionality
- Theme import/export capabilities
- Custom theme creation
- Cross-platform support (Windows, macOS, Linux)
- Theme search and filtering
- Tag-based organization
- Comprehensive documentation

### Features
- 🎨 Theme gallery with beautiful UI
- 💾 Automatic configuration backups
- 🎭 Mood-based theme selection
- 🌈 Tag filtering and search
- 🔧 Custom theme builder
- 📦 Extension management
- ⚡ Cross-platform compatibility
- 🚀 CLI and extension interfaces

[1.0.0]: https://github.com/KhoaWorkHub/vibecode/releases/tag/v1.0.0
