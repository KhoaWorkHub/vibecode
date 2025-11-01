import * as vscode from 'vscode';
import { themeManager, ThemePack } from '@vibecode/core';

export class ThemesTreeDataProvider implements vscode.TreeDataProvider<ThemeTreeItem> {
  private _onDidChangeTreeData = new vscode.EventEmitter<ThemeTreeItem | undefined | void>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: ThemeTreeItem): vscode.TreeItem {
    return element;
  }

  async getChildren(element?: ThemeTreeItem): Promise<ThemeTreeItem[]> {
    if (!element) {
      // Root level - show theme categories
      return [
        new ThemeCategoryItem('Dark Themes', 'dark'),
        new ThemeCategoryItem('Light Themes', 'light'),
        new ThemeCategoryItem('Minimal', 'minimal'),
        new ThemeCategoryItem('Vibrant', 'vibrant'),
        new ThemeCategoryItem('All Themes', 'all'),
      ];
    } else if (element instanceof ThemeCategoryItem) {
      // Show themes in category
      const allThemes = await themeManager.loadThemes();
      let filteredThemes: ThemePack[];

      if (element.tag === 'all') {
        filteredThemes = allThemes;
      } else {
        filteredThemes = allThemes.filter((t) => t.tags.includes(element.tag));
      }

      return filteredThemes.map((theme) => new ThemeTreeItem(theme));
    }

    return [];
  }
}

class ThemeCategoryItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly tag: string
  ) {
    super(label, vscode.TreeItemCollapsibleState.Collapsed);
    this.contextValue = 'category';
    this.iconPath = new vscode.ThemeIcon('folder');
  }
}

class ThemeTreeItem extends vscode.TreeItem {
  constructor(public readonly theme: ThemePack) {
    super(theme.name, vscode.TreeItemCollapsibleState.None);

    this.description = theme.tags.slice(0, 2).join(', ');
    this.tooltip = `${theme.name}\n\n${theme.description}\n\nTags: ${theme.tags.join(', ')}`;
    this.contextValue = 'theme';
    this.iconPath = new vscode.ThemeIcon('paintcan');

    this.command = {
      command: 'vibecode.applyTheme',
      title: 'Apply Theme',
      arguments: [this],
    };
  }
}
