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
   */
  async backupConfiguration(): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = pathManager.getBackupsDir();
    const backupPath = `${backupDir}/backup-${timestamp}`;

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
          timestamp,
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
   * List all backups
   */
  async listBackups(): Promise<string[]> {
    const backupDir = pathManager.getBackupsDir();

    if (!(await fs.pathExists(backupDir))) {
      return [];
    }

    const entries = await fs.readdir(backupDir);
    const backups = entries.filter((entry) => entry.startsWith('backup-'));
    return backups.sort().reverse(); // Most recent first
  }
}

export const configManager = ConfigManager.getInstance();
