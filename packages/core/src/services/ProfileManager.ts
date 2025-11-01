import * as fs from 'fs-extra';
import * as path from 'path';
import {
  Profile,
  ProfileMetadata,
  ProfileSaveOptions,
  ProfileSwitchOptions,
  ProfileDiff,
} from '../types/profile';
import { pathManager } from '../utils/paths';
import { configManager } from '../utils/config';
import { extensionManager } from '../utils/extensions';

/**
 * Profile Manager - handles profile operations
 */
export class ProfileManager {
  private static instance: ProfileManager;

  private constructor() {}

  static getInstance(): ProfileManager {
    if (!ProfileManager.instance) {
      ProfileManager.instance = new ProfileManager();
    }
    return ProfileManager.instance;
  }

  /**
   * Save current setup as a profile
   */
  async saveProfile(name: string, options: ProfileSaveOptions = {}): Promise<Profile> {
    const {
      withTheme = false,
      withExtensions = true,
      description = '',
      overwrite = false,
    } = options;

    const profileDir = path.join(pathManager.getProfilesDir(), name);

    // Check if profile exists
    if ((await fs.pathExists(profileDir)) && !overwrite) {
      throw new Error(
        `Profile "${name}" already exists. Use --overwrite to replace it.`
      );
    }

    await fs.ensureDir(profileDir);

    // Get current settings and keybindings
    const [settings, keybindings] = await Promise.all([
      configManager.readSettings(),
      configManager.readKeybindings(),
    ]);

    // Get current theme if requested
    let currentTheme: string | undefined;
    if (withTheme) {
      currentTheme = settings['workbench.colorTheme'] as string;
    }

    // Get installed extensions if requested
    let extensions: string[] = [];
    if (withExtensions) {
      extensions = await extensionManager.listExtensions();
    }

    // Load protected extensions from config
    const protectedExtensions = await this.getProtectedExtensions();

    // Create profile object
    const profile: Profile = {
      name,
      description,
      theme: currentTheme,
      extensions: {
        mode: 'strict',
        list: extensions,
        protected: protectedExtensions,
      },
      settings,
      keybindings,
      metadata: {
        description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: '1.0.0',
      },
    };

    // Save profile
    await fs.writeJson(path.join(profileDir, 'profile.json'), profile, {
      spaces: 2,
    });

    return profile;
  }

  /**
   * Load a profile
   */
  async loadProfile(name: string): Promise<Profile> {
    const profilePath = path.join(pathManager.getProfilesDir(), name, 'profile.json');

    if (!(await fs.pathExists(profilePath))) {
      throw new Error(`Profile "${name}" not found`);
    }

    return await fs.readJson(profilePath);
  }

  /**
   * List all profiles
   */
  async listProfiles(): Promise<ProfileMetadata[]> {
    const profilesDir = pathManager.getProfilesDir();

    if (!(await fs.pathExists(profilesDir))) {
      return [];
    }

    const entries = await fs.readdir(profilesDir);
    const profiles: ProfileMetadata[] = [];

    for (const entry of entries) {
      const profilePath = path.join(profilesDir, entry, 'profile.json');

      if (await fs.pathExists(profilePath)) {
        try {
          const profile = await fs.readJson(profilePath);
          profiles.push({
            name: profile.name,
            description: profile.description,
            createdAt: profile.metadata.createdAt,
            updatedAt: profile.metadata.updatedAt,
            extensionCount: profile.extensions.list.length,
            theme: profile.theme,
          });
        } catch (error) {
          console.error(`Error loading profile ${entry}:`, error);
        }
      }
    }

    return profiles.sort((a, b) =>
      b.updatedAt.localeCompare(a.updatedAt)
    );
  }

  /**
   * Delete a profile
   */
  async deleteProfile(name: string): Promise<void> {
    const profileDir = path.join(pathManager.getProfilesDir(), name);

    if (!(await fs.pathExists(profileDir))) {
      throw new Error(`Profile "${name}" not found`);
    }

    await fs.remove(profileDir);
  }

  /**
   * Get diff between current state and target profile
   */
  async getProfileDiff(targetProfileName: string): Promise<ProfileDiff> {
    const targetProfile = await this.loadProfile(targetProfileName);
    const [currentSettings, currentExtensions] = await Promise.all([
      configManager.readSettings(),
      extensionManager.listExtensions(),
    ]);

    // Theme diff
    const currentTheme = (currentSettings['workbench.colorTheme'] as string) || null;
    const targetTheme = targetProfile.theme || null;

    // Extension diff
    const extDiff = extensionManager.getExtensionDiff(
      currentExtensions,
      targetProfile.extensions.list
    );

    // Filter protected extensions
    const protectedExtensions = targetProfile.extensions.protected || [];
    const filteredDiff = extensionManager.filterProtectedExtensions(
      extDiff.toRemove,
      protectedExtensions
    );

    // Settings diff (simple count for now)
    const currentKeys = Object.keys(currentSettings);
    const targetKeys = Object.keys(targetProfile.settings);
    const addedKeys = targetKeys.filter((key) => !currentKeys.includes(key));
    const removedKeys = currentKeys.filter((key) => !targetKeys.includes(key));
    const changedKeys = currentKeys.filter(
      (key) =>
        targetKeys.includes(key) &&
        JSON.stringify(currentSettings[key]) !==
          JSON.stringify(targetProfile.settings[key])
    );

    // Keybindings diff
    const keybindingsChanged = JSON.stringify(targetProfile.keybindings) !==
      JSON.stringify(await configManager.readKeybindings());

    return {
      theme: {
        from: currentTheme,
        to: targetTheme,
      },
      extensions: {
        toRemove: filteredDiff.canRemove,
        toInstall: extDiff.toInstall,
        toKeep: extDiff.toKeep,
        protected: filteredDiff.protectedList,
      },
      settings: {
        changed: changedKeys.length,
        added: addedKeys.length,
        removed: removedKeys.length,
      },
      keybindings: {
        changed: keybindingsChanged ? 1 : 0,
      },
    };
  }

  /**
   * Switch to a profile
   */
  async switchProfile(
    name: string,
    options: ProfileSwitchOptions = {}
  ): Promise<void> {
    const {
      dryRun = false,
      keepTheme = false,
      keepExtensions = false,
    } = options;

    const profile = await this.loadProfile(name);

    if (dryRun) {
      // Just return diff, don't execute
      return;
    }

    // Backup current state
    const backupName = `backup-before-${name}-${Date.now()}`;
    await this.saveProfile(backupName, {
      withTheme: true,
      withExtensions: true,
      description: `Auto-backup before switching to ${name}`,
      overwrite: true,
    });

    // Get current extensions
    const currentExtensions = await extensionManager.listExtensions();

    // Handle extensions (if not keeping)
    if (!keepExtensions) {
      const extDiff = extensionManager.getExtensionDiff(
        currentExtensions,
        profile.extensions.list
      );

      // Filter protected extensions
      const protectedExtensions = profile.extensions.protected || [];
      const filteredDiff = extensionManager.filterProtectedExtensions(
        extDiff.toRemove,
        protectedExtensions
      );

      // Uninstall extensions
      for (const ext of filteredDiff.canRemove) {
        await extensionManager.uninstallExtension(ext);
      }

      // Install new extensions
      for (const ext of extDiff.toInstall) {
        await extensionManager.installExtension(ext);
      }
    }

    // Apply settings (including theme if not keeping)
    if (keepTheme && profile.theme) {
      // Remove theme from settings before applying
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { 'workbench.colorTheme': _unused, ...settingsWithoutTheme } = profile.settings;
      await configManager.writeSettings(settingsWithoutTheme);
    } else {
      await configManager.writeSettings(profile.settings);
    }

    // Apply keybindings
    await configManager.writeKeybindings(profile.keybindings);
  }

  /**
   * Get protected extensions from config
   */
  async getProtectedExtensions(): Promise<string[]> {
    const configPath = path.join(pathManager.getConfigDir(), 'protected-extensions.json');

    if (!(await fs.pathExists(configPath))) {
      return [];
    }

    try {
      const config = await fs.readJson(configPath);
      return config.extensions || [];
    } catch {
      return [];
    }
  }

  /**
   * Set protected extensions
   */
  async setProtectedExtensions(extensions: string[]): Promise<void> {
    const configPath = path.join(pathManager.getConfigDir(), 'protected-extensions.json');
    await fs.ensureDir(pathManager.getConfigDir());
    await fs.writeJson(configPath, { extensions }, { spaces: 2 });
  }

  /**
   * Add protected extension
   */
  async addProtectedExtension(extensionId: string): Promise<void> {
    const current = await this.getProtectedExtensions();
    if (!current.includes(extensionId)) {
      await this.setProtectedExtensions([...current, extensionId]);
    }
  }

  /**
   * Remove protected extension
   */
  async removeProtectedExtension(extensionId: string): Promise<void> {
    const current = await this.getProtectedExtensions();
    await this.setProtectedExtensions(current.filter((ext) => ext !== extensionId));
  }
}

export const profileManager = ProfileManager.getInstance();
