import * as vscode from 'vscode';
import { ThemesTreeDataProvider } from './providers/ThemesTreeDataProvider';
import { BackupsTreeDataProvider } from './providers/BackupsTreeDataProvider';
import { themeManager, configManager, pathManager } from '@vibecode/core';

export async function activate(context: vscode.ExtensionContext) {
  console.log('VibeCode extension is now active!');

  // Initialize VibeCode directories
  await pathManager.initializeDirectories();

  // Register tree data providers
  const themesProvider = new ThemesTreeDataProvider();
  const backupsProvider = new BackupsTreeDataProvider();

  vscode.window.registerTreeDataProvider('vibecode.themesView', themesProvider);
  vscode.window.registerTreeDataProvider('vibecode.backupsView', backupsProvider);

  // Show Theme Gallery command
  const showGallery = vscode.commands.registerCommand('vibecode.showGallery', async () => {
    const panel = vscode.window.createWebviewPanel(
      'vibeCodeGallery',
      'VibeCode Theme Gallery',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
      }
    );

    const themes = await themeManager.loadThemes();
    panel.webview.html = getGalleryWebviewContent(themes);

    // Handle messages from webview
    panel.webview.onDidReceiveMessage(
      async (message) => {
        switch (message.command) {
          case 'applyTheme':
            await applyThemeCommand(message.themeId);
            break;
        }
      },
      undefined,
      context.subscriptions
    );
  });

  // Apply Theme command
  const applyTheme = vscode.commands.registerCommand(
    'vibecode.applyTheme',
    async (themeItem?: any) => {
      let themeId: string | undefined;

      if (themeItem && themeItem.theme) {
        themeId = themeItem.theme.id;
      } else {
        // Show quick pick
        const themes = await themeManager.loadThemes();
        const items = themes.map((t) => ({
          label: t.name,
          description: t.description,
          detail: `Tags: ${t.tags.join(', ')}`,
          themeId: t.id,
        }));

        const selected = await vscode.window.showQuickPick(items, {
          placeHolder: 'Select a theme to apply',
          matchOnDescription: true,
          matchOnDetail: true,
        });

        if (!selected) return;
        themeId = selected.themeId;
      }

      if (themeId) {
        await applyThemeCommand(themeId);
      }
    }
  );

  // Create Theme command
  const createTheme = vscode.commands.registerCommand('vibecode.createTheme', async () => {
    const name = await vscode.window.showInputBox({
      prompt: 'Enter a name for your custom theme',
      placeHolder: 'My Awesome Theme',
    });

    if (!name) return;

    const id = name.toLowerCase().replace(/\s+/g, '-');
    const currentSettings = await configManager.readSettings();

    const theme = {
      id,
      name,
      description: `Custom theme: ${name}`,
      tags: ['custom'],
      author: 'You',
      version: '1.0.0',
      extensions: [],
      settings: currentSettings,
    };

    await themeManager.saveTheme(theme);

    vscode.window.showInformationMessage(
      `✨ Theme "${name}" created successfully!`,
      'Apply Now'
    ).then((selection) => {
      if (selection === 'Apply Now') {
        vscode.commands.executeCommand('vibecode.applyTheme');
      }
    });

    themesProvider.refresh();
  });

  // Restore Backup command
  const restoreBackup = vscode.commands.registerCommand('vibecode.restoreBackup', async () => {
    const backups = await configManager.listBackups();

    if (backups.length === 0) {
      vscode.window.showInformationMessage('No backups found.');
      return;
    }

    const items = backups.map((b) => ({
      label: b.themeName,
      description: b.date,
      detail: `Restore settings from before applying this theme`,
      backup: b,
    }));

    const selected = await vscode.window.showQuickPick(items, {
      placeHolder: 'Select a backup to restore',
    });

    if (!selected) return;

    const confirm = await vscode.window.showWarningMessage(
      `Restore settings from before applying "${selected.backup.themeName}"?`,
      { modal: true },
      'Restore'
    );

    if (confirm !== 'Restore') return;

    await configManager.restoreConfiguration(selected.backup.path);

    vscode.window.showInformationMessage(
      '✨ Configuration restored! Please reload VSCode.',
      'Reload Now'
    ).then((choice) => {
      if (choice === 'Reload Now') {
        vscode.commands.executeCommand('workbench.action.reloadWindow');
      }
    });
  });

  // Refresh Themes command
  const refreshThemes = vscode.commands.registerCommand('vibecode.refreshThemes', () => {
    themesProvider.refresh();
    backupsProvider.refresh();
    vscode.window.showInformationMessage('Themes refreshed!');
  });

  context.subscriptions.push(
    showGallery,
    applyTheme,
    createTheme,
    restoreBackup,
    refreshThemes
  );
}

async function applyThemeCommand(themeId: string) {
  const theme = await themeManager.getTheme(themeId);
  if (!theme) {
    vscode.window.showErrorMessage(`Theme not found: ${themeId}`);
    return;
  }

  // Show progress
  await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: `Applying theme: ${theme.name}`,
      cancellable: false,
    },
    async (progress) => {
      progress.report({ increment: 0 });

      // Backup current config
      progress.report({ increment: 25, message: 'Creating backup...' });
      await configManager.backupConfiguration();

      // Apply theme
      progress.report({ increment: 50, message: 'Applying settings...' });
      await themeManager.applyTheme(themeId);

      progress.report({ increment: 100, message: 'Done!' });
    }
  );

  const action = await vscode.window.showInformationMessage(
    `✨ Theme "${theme.name}" applied successfully! Reload to see all changes.`,
    'Reload Now',
    'Later'
  );

  if (action === 'Reload Now') {
    vscode.commands.executeCommand('workbench.action.reloadWindow');
  }
}

function getGalleryWebviewContent(themes: any[]): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VibeCode Gallery</title>
  <style>
    body {
      font-family: var(--vscode-font-family);
      color: var(--vscode-foreground);
      background: var(--vscode-editor-background);
      padding: 20px;
      margin: 0;
    }
    h1 {
      color: var(--vscode-foreground);
      margin-bottom: 10px;
    }
    .subtitle {
      color: var(--vscode-descriptionForeground);
      margin-bottom: 30px;
    }
    .search-box {
      width: 100%;
      padding: 10px;
      margin-bottom: 20px;
      background: var(--vscode-input-background);
      color: var(--vscode-input-foreground);
      border: 1px solid var(--vscode-input-border);
      border-radius: 4px;
      font-size: 14px;
    }
    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    .theme-card {
      background: var(--vscode-sideBar-background);
      border: 1px solid var(--vscode-panel-border);
      border-radius: 8px;
      padding: 20px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .theme-card:hover {
      transform: translateY(-2px);
      border-color: var(--vscode-focusBorder);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    .theme-name {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
      color: var(--vscode-foreground);
    }
    .theme-description {
      font-size: 13px;
      color: var(--vscode-descriptionForeground);
      margin-bottom: 12px;
      line-height: 1.5;
    }
    .theme-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 12px;
    }
    .tag {
      background: var(--vscode-badge-background);
      color: var(--vscode-badge-foreground);
      padding: 3px 8px;
      border-radius: 12px;
      font-size: 11px;
    }
    .apply-button {
      background: var(--vscode-button-background);
      color: var(--vscode-button-foreground);
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 13px;
      width: 100%;
      transition: background 0.2s;
    }
    .apply-button:hover {
      background: var(--vscode-button-hoverBackground);
    }
  </style>
</head>
<body>
  <h1>✨ VibeCode Theme Gallery</h1>
  <p class="subtitle">Find your perfect coding vibe</p>
  
  <input type="text" class="search-box" id="searchBox" placeholder="🔍 Search themes..." />
  
  <div class="gallery" id="gallery">
    ${themes
      .map(
        (theme) => `
      <div class="theme-card" data-theme-id="${theme.id}" data-tags="${theme.tags.join(' ')}">
        <div class="theme-name">${theme.name}</div>
        <div class="theme-description">${theme.description}</div>
        <div class="theme-tags">
          ${theme.tags.map((tag: string) => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <button class="apply-button" onclick="applyTheme('${theme.id}')">
          Apply Theme
        </button>
      </div>
    `
      )
      .join('')}
  </div>

  <script>
    const vscode = acquireVsCodeApi();

    function applyTheme(themeId) {
      vscode.postMessage({
        command: 'applyTheme',
        themeId: themeId
      });
    }

    // Search functionality
    document.getElementById('searchBox').addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const cards = document.querySelectorAll('.theme-card');
      
      cards.forEach(card => {
        const name = card.querySelector('.theme-name').textContent.toLowerCase();
        const description = card.querySelector('.theme-description').textContent.toLowerCase();
        const tags = card.dataset.tags.toLowerCase();
        
        if (name.includes(query) || description.includes(query) || tags.includes(query)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  </script>
</body>
</html>
  `;
}

export function deactivate() {}
