import * as vscode from 'vscode';
import { configManager } from '@vibecode/core';

export class BackupsTreeDataProvider implements vscode.TreeDataProvider<BackupTreeItem> {
  private _onDidChangeTreeData = new vscode.EventEmitter<BackupTreeItem | undefined | void>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: BackupTreeItem): vscode.TreeItem {
    return element;
  }

  async getChildren(element?: BackupTreeItem): Promise<BackupTreeItem[]> {
    if (element) {
      return [];
    }

    const backups = await configManager.listBackups();
    return backups.map((backup) => new BackupTreeItem(backup));
  }
}

class BackupTreeItem extends vscode.TreeItem {
  constructor(public readonly backup: { name: string; path: string; themeName: string; timestamp: string; date: string }) {
    super(backup.themeName, vscode.TreeItemCollapsibleState.None);

    this.description = backup.date;
    this.tooltip = `Backup from before applying: ${backup.themeName}`;
    this.contextValue = 'backup';
    this.iconPath = new vscode.ThemeIcon('archive');

    this.command = {
      command: 'vibecode.restoreBackup',
      title: 'Restore Backup',
      arguments: [this],
    };
  }
}
