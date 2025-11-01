# Contributing to VibeCode

Thank you for your interest in contributing to VibeCode! 🎉

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/KhoaWorkHub/vibecode.git`
3. Install dependencies: `pnpm install`
4. Create a branch: `git checkout -b feature/your-feature-name`

## 🏗️ Development Setup

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run in development mode
pnpm dev

# Run tests
pnpm test

# Lint code
pnpm lint
```

## 📝 Creating a New Theme

1. Create a new `.vibe-pack.json` file in `packages/core/themes/`
2. Follow the theme specification (see below)
3. Add a preview image to `packages/core/themes/previews/`
4. Update `docs/themes.md` with your theme description
5. Test your theme with `vibecode apply your-theme-id`

### Theme File Template

```json
{
  "id": "your-theme-id",
  "name": "Your Theme Name",
  "description": "A detailed description of your theme",
  "tags": ["tag1", "tag2"],
  "preview": "previews/your-theme.png",
  "author": "Your Name",
  "version": "1.0.0",
  "extensions": [
    "publisher.extension-id"
  ],
  "settings": {
    "workbench.colorTheme": "Base Theme",
    "editor.fontFamily": "Your Font",
    "editor.fontSize": 14
  },
  "layout": {
    "sidebarLocation": "left",
    "terminalVisible": false
  }
}
```

## 🧪 Testing

- Test your changes locally before submitting
- Ensure all tests pass: `pnpm test`
- Test the CLI: `vibecode list`, `vibecode apply your-theme`
- Test the extension in VS Code

## 📋 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Test additions/changes
- `chore:` - Build process or auxiliary tool changes

Examples:
```bash
git commit -m "feat: add ocean breeze theme"
git commit -m "fix: resolve backup restoration bug"
git commit -m "docs: update theme catalog"
```

## 🎨 Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Run `pnpm lint` before committing
- Use meaningful variable and function names
- Add comments for complex logic

## 📦 Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update CHANGELOG.md
5. Submit PR with clear description

### PR Title Format
```
[Type] Brief description

Examples:
[Feature] Add weather-based theme suggestions
[Fix] Resolve theme application bug on Windows
[Docs] Update installation instructions
```

## 🐛 Bug Reports

When filing a bug report, include:

- Operating system and version
- VS Code version
- VibeCode version
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)

## 💡 Feature Requests

We love new ideas! When suggesting a feature:

- Explain the use case
- Describe the expected behavior
- Provide examples if possible
- Explain why this would be useful

## 🌟 Theme Guidelines

When creating themes, consider:

- **Accessibility**: Ensure good contrast ratios
- **Consistency**: Match the overall vibe
- **Performance**: Don't include too many extensions
- **Documentation**: Write clear descriptions
- **Preview**: Include a quality screenshot

## 📞 Questions?

- Open an issue for questions
- Join our discussions on GitHub
- Check the documentation first

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to VibeCode! ❤️
