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
  constructor(public readonly backup: string) {
    const timestamp = backup.replace('backup-', '').replace(/-/g, ':');
    super(timestamp, vscode.TreeItemCollapsibleState.None);

    this.description = 'Configuration backup';
    this.tooltip = `Backup created at: ${timestamp}`;
    this.contextValue = 'backup';
    this.iconPath = new vscode.ThemeIcon('archive');

    this.command = {
      command: 'vibecode.restoreBackup',
      title: 'Restore Backup',
      arguments: [this],
    };
  }
}
