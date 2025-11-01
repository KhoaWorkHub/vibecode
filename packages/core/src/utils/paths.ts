import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs-extra';

/**
 * Platform-specific path utilities for VSCode configuration
 */

export class PathManager {
  private static instance: PathManager;

  private constructor() {}

  static getInstance(): PathManager {
    if (!PathManager.instance) {
      PathManager.instance = new PathManager();
    }
    return PathManager.instance;
  }

  /**
   * Get VSCode user data directory based on platform
   */
  getVSCodeUserDataDir(): string {
    const platform = os.platform();
    const homeDir = os.homedir();

    switch (platform) {
      case 'win32':
        return path.join(process.env.APPDATA || '', 'Code', 'User');
      case 'darwin':
        return path.join(homeDir, 'Library', 'Application Support', 'Code', 'User');
      case 'linux':
        return path.join(homeDir, '.config', 'Code', 'User');
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }

  /**
   * Get VSCode settings.json path
   */
  getSettingsPath(): string {
    return path.join(this.getVSCodeUserDataDir(), 'settings.json');
  }

  /**
   * Get VSCode keybindings.json path
   */
  getKeybindingsPath(): string {
    return path.join(this.getVSCodeUserDataDir(), 'keybindings.json');
  }

  /**
   * Get VSCode extensions directory
   */
  getExtensionsDir(): string {
    const homeDir = os.homedir();
    return path.join(homeDir, '.vscode', 'extensions');
  }

  /**
   * Get VibeCode data directory
   */
  getVibeCodeDataDir(): string {
    const homeDir = os.homedir();
    return path.join(homeDir, '.vibecode');
  }

  /**
   * Get VibeCode backups directory
   */
  getBackupsDir(): string {
    return path.join(this.getVibeCodeDataDir(), 'backups');
  }

  /**
   * Get VibeCode themes directory
   */
  getThemesDir(): string {
    return path.join(this.getVibeCodeDataDir(), 'themes');
  }

  /**
   * Get VibeCode custom themes directory
   */
  getCustomThemesDir(): string {
    return path.join(this.getVibeCodeDataDir(), 'custom-themes');
  }

  /**
   * Initialize VibeCode directories
   */
  async initializeDirectories(): Promise<void> {
    const dirs = [
      this.getVibeCodeDataDir(),
      this.getBackupsDir(),
      this.getThemesDir(),
      this.getCustomThemesDir(),
    ];

    for (const dir of dirs) {
      await fs.ensureDir(dir);
    }
  }

  /**
   * Check if VSCode is installed
   */
  async isVSCodeInstalled(): Promise<boolean> {
    try {
      const userDataDir = this.getVSCodeUserDataDir();
      return await fs.pathExists(userDataDir);
    } catch {
      return false;
    }
  }
}

export const pathManager = PathManager.getInstance();
