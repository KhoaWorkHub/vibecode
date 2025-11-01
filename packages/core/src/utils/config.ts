import * as fs from 'fs-extra';
import { pathManager } from './paths';
import { VSCodeSettings, KeyBinding } from '../types/theme';

/**
 * Configuration file management utilities
 */

export class ConfigManager {
  private static instance: ConfigManager;

  private constructor() {}

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  /**
   * Read VSCode settings.json
   */
  async readSettings(): Promise<VSCodeSettings> {
    const settingsPath = pathManager.getSettingsPath();

    try {
      if (await fs.pathExists(settingsPath)) {
        const content = await fs.readFile(settingsPath, 'utf-8');
        // Remove comments from JSON (VSCode allows comments in settings.json)
        const cleanedContent = this.removeJsonComments(content);
        return JSON.parse(cleanedContent);
      }
      return {};
    } catch (error) {
      console.error('Error reading settings:', error);
      return {};
    }
  }

  /**
   * Write VSCode settings.json
   */
  async writeSettings(settings: VSCodeSettings): Promise<void> {
    const settingsPath = pathManager.getSettingsPath();
    await fs.ensureDir(pathManager.getVSCodeUserDataDir());
    await fs.writeJson(settingsPath, settings, { spaces: 2 });
  }

  /**
   * Merge settings (deep merge)
   */
  async mergeSettings(newSettings: VSCodeSettings): Promise<void> {
    const currentSettings = await this.readSettings();
    const merged = { ...currentSettings, ...newSettings };
    await this.writeSettings(merged);
  }

  /**
   * Read VSCode keybindings.json
   */
  async readKeybindings(): Promise<KeyBinding[]> {
    const keybindingsPath = pathManager.getKeybindingsPath();

    try {
      if (await fs.pathExists(keybindingsPath)) {
        const content = await fs.readFile(keybindingsPath, 'utf-8');
        const cleanedContent = this.removeJsonComments(content);
        return JSON.parse(cleanedContent);
      }
      return [];
    } catch (error) {
      console.error('Error reading keybindings:', error);
      return [];
    }
  }

  /**
   * Write VSCode keybindings.json
   */
  async writeKeybindings(keybindings: KeyBinding[]): Promise<void> {
    const keybindingsPath = pathManager.getKeybindingsPath();
    await fs.ensureDir(pathManager.getVSCodeUserDataDir());
    await fs.writeJson(keybindingsPath, keybindings, { spaces: 2 });
  }

  /**
   * Remove JSON comments (for VSCode config files)
   */
  private removeJsonComments(jsonString: string): string {
    // Remove single-line comments
    let cleaned = jsonString.replace(/\/\/.*$/gm, '');
    // Remove multi-line comments
    cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '');
    return cleaned;
  }

  /**
   * Validate settings object
   */
  validateSettings(settings: VSCodeSettings): boolean {
    if (typeof settings !== 'object' || settings === null) {
      return false;
    }
    return true;
  }

  /**
   * Backup current configuration
   * @param themeName - Optional theme name for better organization
   */
  async backupConfiguration(themeName?: string): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = pathManager.getBackupsDir();
    
    // Use theme-based naming if provided, otherwise use timestamp
    const backupName = themeName 
      ? `before-${themeName.toLowerCase().replace(/\s+/g, '-')}`
      : `manual-backup-${timestamp}`;
    
    const backupPath = `${backupDir}/${backupName}`;

    // If backup exists for this theme, remove it (keep only latest)
    if (themeName && await fs.pathExists(backupPath)) {
      await fs.remove(backupPath);
    }

    await fs.ensureDir(backupPath);

    const [settings, keybindings] = await Promise.all([
      this.readSettings(),
      this.readKeybindings(),
    ]);

    await Promise.all([
      fs.writeJson(`${backupPath}/settings.json`, settings, { spaces: 2 }),
      fs.writeJson(`${backupPath}/keybindings.json`, keybindings, { spaces: 2 }),
      fs.writeJson(
        `${backupPath}/metadata.json`,
        {
          themeName: themeName || 'Manual Backup',
          timestamp,
          date: new Date().toLocaleString(),
          platform: process.platform,
          nodeVersion: process.version,
        },
        { spaces: 2 }
      ),
    ]);

    return backupPath;
  }

  /**
   * Restore configuration from backup
   */
  async restoreConfiguration(backupPath: string): Promise<void> {
    const settingsBackup = await fs.readJson(`${backupPath}/settings.json`);
    const keybindingsBackup = await fs.readJson(`${backupPath}/keybindings.json`);

    await this.writeSettings(settingsBackup);
    await this.writeKeybindings(keybindingsBackup);
  }

  /**
   * List all backups with metadata
   */
  async listBackups(): Promise<Array<{
    name: string;
    path: string;
    themeName: string;
    actualTheme: string;
    timestamp: string;
    date: string;
  }>> {
    const backupDir = pathManager.getBackupsDir();

    if (!(await fs.pathExists(backupDir))) {
      return [];
    }

    const entries = await fs.readdir(backupDir);
    const backups = entries.filter((entry) => 
      entry.startsWith('before-') || entry.startsWith('manual-backup-')
    );

    const backupList = await Promise.all(
      backups.map(async (backup) => {
        const backupPath = `${backupDir}/${backup}`;
        const metadataPath = `${backupPath}/metadata.json`;
        const settingsPath = `${backupPath}/settings.json`;
        
        const metadata = {
          themeName: backup,
          actualTheme: 'Unknown',
          timestamp: '',
          date: 'Unknown',
        };

        if (await fs.pathExists(metadataPath)) {
          const meta = await fs.readJson(metadataPath);
          metadata.themeName = meta.themeName || backup;
          metadata.timestamp = meta.timestamp || '';
          metadata.date = meta.date || new Date(meta.timestamp).toLocaleString() || 'Unknown';
        }

        // Read actual theme from backup settings
        if (await fs.pathExists(settingsPath)) {
          try {
            const settings = await fs.readJson(settingsPath);
            metadata.actualTheme = settings['workbench.colorTheme'] || 'VS Code Default (Dark)';
          } catch (e) {
            // Ignore errors
          }
        }

        return {
          name: backup,
          path: backupPath,
          ...metadata,
        };
      })
    );

    // Sort by timestamp (most recent first)
    return backupList.sort((a, b) => 
      b.timestamp.localeCompare(a.timestamp)
    );
  }

  /**
   * Clean up old timestamp-based backups (migration helper)
   */
  async cleanupOldBackups(): Promise<number> {
    const backupDir = pathManager.getBackupsDir();

    if (!(await fs.pathExists(backupDir))) {
      return 0;
    }

    const entries = await fs.readdir(backupDir);
    const oldBackups = entries.filter((entry) => entry.startsWith('backup-'));

    for (const backup of oldBackups) {
      await fs.remove(`${backupDir}/${backup}`);
    }

    return oldBackups.length;
  }
}

export const configManager = ConfigManager.getInstance();
