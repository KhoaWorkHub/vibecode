import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Extension Manager - handles VS Code extensions
 */
export class ExtensionManager {
  private static instance: ExtensionManager;

  private constructor() {}

  static getInstance(): ExtensionManager {
    if (!ExtensionManager.instance) {
      ExtensionManager.instance = new ExtensionManager();
    }
    return ExtensionManager.instance;
  }

  /**
   * List all installed extensions
   */
  async listExtensions(): Promise<string[]> {
    try {
      const { stdout } = await execAsync('code --list-extensions');
      return stdout
        .trim()
        .split('\n')
        .filter((ext) => ext.length > 0);
    } catch (error) {
      throw new Error(`Failed to list extensions: ${error}`);
    }
  }

  /**
   * Install an extension
   */
  async installExtension(extensionId: string): Promise<void> {
    try {
      await execAsync(`code --install-extension ${extensionId} --force`);
    } catch (error) {
      throw new Error(`Failed to install extension ${extensionId}: ${error}`);
    }
  }

  /**
   * Uninstall an extension
   */
  async uninstallExtension(extensionId: string): Promise<void> {
    try {
      await execAsync(`code --uninstall-extension ${extensionId}`);
    } catch (error) {
      throw new Error(`Failed to uninstall extension ${extensionId}: ${error}`);
    }
  }

  /**
   * Install multiple extensions
   */
  async installExtensions(extensionIds: string[]): Promise<void> {
    for (const extensionId of extensionIds) {
      await this.installExtension(extensionId);
    }
  }

  /**
   * Uninstall multiple extensions
   */
  async uninstallExtensions(extensionIds: string[]): Promise<void> {
    for (const extensionId of extensionIds) {
      await this.uninstallExtension(extensionId);
    }
  }

  /**
   * Check if extension is installed
   */
  async isExtensionInstalled(extensionId: string): Promise<boolean> {
    const installed = await this.listExtensions();
    return installed.includes(extensionId);
  }

  /**
   * Get diff between two extension lists
   */
  getExtensionDiff(
    current: string[],
    target: string[]
  ): {
    toInstall: string[];
    toRemove: string[];
    toKeep: string[];
  } {
    const currentSet = new Set(current);
    const targetSet = new Set(target);

    const toInstall = target.filter((ext) => !currentSet.has(ext));
    const toRemove = current.filter((ext) => !targetSet.has(ext));
    const toKeep = current.filter((ext) => targetSet.has(ext));

    return { toInstall, toRemove, toKeep };
  }

  /**
   * Filter out protected extensions from removal list
   */
  filterProtectedExtensions(
    toRemove: string[],
    protectedExtensions: string[]
  ): {
    canRemove: string[];
    protectedList: string[];
  } {
    const protectedSet = new Set(protectedExtensions);
    const canRemove = toRemove.filter((ext) => !protectedSet.has(ext));
    const protectedList = toRemove.filter((ext) => protectedSet.has(ext));

    return { canRemove, protectedList };
  }
}

export const extensionManager = ExtensionManager.getInstance();
