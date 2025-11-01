import * as fs from 'fs-extra';
import * as path from 'path';
import { glob } from 'glob';
import { ThemePack, ThemeMetadata, ApplyOptions } from '../types/theme';
import { pathManager } from '../utils/paths';
import { configManager } from '../utils/config';

/**
 * Theme Manager - handles theme loading, applying, and management
 */
export class ThemeManager {
  private static instance: ThemeManager;
  private themesCache: Map<string, ThemePack> = new Map();

  private constructor() {}

  static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  /**
   * Load all available themes
   */
  async loadThemes(): Promise<ThemePack[]> {
    const themes: ThemePack[] = [];

    // Load built-in themes
    const builtInThemes = await this.loadThemesFromDirectory(
      path.join(__dirname, '../../../themes')
    );
    themes.push(...builtInThemes);

    // Load custom themes
    const customThemesDir = pathManager.getCustomThemesDir();
    if (await fs.pathExists(customThemesDir)) {
      const customThemes = await this.loadThemesFromDirectory(customThemesDir);
      themes.push(...customThemes);
    }

    // Update cache
    this.themesCache.clear();
    themes.forEach((theme) => this.themesCache.set(theme.id, theme));

    return themes;
  }

  /**
   * Load themes from a specific directory
   */
  private async loadThemesFromDirectory(dir: string): Promise<ThemePack[]> {
    const themes: ThemePack[] = [];

    if (!(await fs.pathExists(dir))) {
      return themes;
    }

    const themeFiles = await glob('**/*.vibe-pack.json', {
      cwd: dir,
      absolute: true,
    });

    for (const file of themeFiles) {
      try {
        const theme = await fs.readJson(file);
        if (this.validateTheme(theme)) {
          themes.push(theme);
        }
      } catch (error) {
        console.error(`Error loading theme from ${file}:`, error);
      }
    }

    return themes;
  }

  /**
   * Get theme by ID
   */
  async getTheme(themeId: string): Promise<ThemePack | null> {
    if (this.themesCache.has(themeId)) {
      return this.themesCache.get(themeId)!;
    }

    // Reload themes if not in cache
    await this.loadThemes();
    return this.themesCache.get(themeId) || null;
  }

  /**
   * Get theme metadata (lightweight)
   */
  async getThemeMetadata(): Promise<ThemeMetadata[]> {
    const themes = await this.loadThemes();
    return themes.map((theme) => ({
      id: theme.id,
      name: theme.name,
      description: theme.description,
      tags: theme.tags,
      preview: theme.preview,
      author: theme.author,
      version: theme.version,
    }));
  }

  /**
   * Apply a theme
   */
  async applyTheme(
    themeId: string,
    options: ApplyOptions = {
      installExtensions: true,
      applySettings: true,
      applyLayout: true,
      applyKeybindings: true,
      backup: true,
    }
  ): Promise<void> {
    const theme = await this.getTheme(themeId);
    if (!theme) {
      throw new Error(`Theme not found: ${themeId}`);
    }

    // Backup current configuration
    if (options.backup) {
      await configManager.backupConfiguration(theme.name);
    }

    // Apply settings
    if (options.applySettings && theme.settings) {
      // For default themes, completely replace settings instead of merging
      // This ensures we return to exact default state
      const isDefaultTheme = theme.tags.includes('default') || theme.tags.includes('factory');
      
      if (isDefaultTheme) {
        await configManager.writeSettings(theme.settings);
      } else {
        await configManager.mergeSettings(theme.settings);
      }
    }

    // Apply keybindings
    if (options.applyKeybindings && theme.keybindings) {
      await configManager.writeKeybindings(theme.keybindings);
    }

    // Apply layout settings
    if (options.applyLayout && theme.layout) {
      const layoutSettings = this.convertLayoutToSettings(theme.layout);
      await configManager.mergeSettings(layoutSettings);
    }

    // Note: Extension installation requires VSCode API or CLI
    // This will be handled by the extension/CLI packages
  }

  /**
   * Convert layout config to VSCode settings
   */
  private convertLayoutToSettings(layout: any): any {
    const settings: any = {};

    if (layout.sidebarLocation) {
      settings['workbench.sideBar.location'] = layout.sidebarLocation;
    }

    if (layout.panelAlignment) {
      settings['workbench.panel.defaultLocation'] = layout.panelAlignment;
    }

    if (layout.zenMode !== undefined) {
      settings['zenMode.centerLayout'] = layout.zenMode;
    }

    return settings;
  }

  /**
   * Search themes by tags, mood, or keywords
   */
  async searchThemes(query: string): Promise<ThemePack[]> {
    const allThemes = await this.loadThemes();
    const lowerQuery = query.toLowerCase();

    return allThemes.filter(
      (theme) =>
        theme.name.toLowerCase().includes(lowerQuery) ||
        theme.description.toLowerCase().includes(lowerQuery) ||
        theme.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  }

  /**
   * Filter themes by tags
   */
  async filterByTags(tags: string[]): Promise<ThemePack[]> {
    const allThemes = await this.loadThemes();
    const lowerTags = tags.map((t) => t.toLowerCase());

    return allThemes.filter((theme) =>
      theme.tags.some((tag) => lowerTags.includes(tag.toLowerCase()))
    );
  }

  /**
   * Save a custom theme
   */
  async saveTheme(theme: ThemePack): Promise<void> {
    if (!this.validateTheme(theme)) {
      throw new Error('Invalid theme structure');
    }

    const customThemesDir = pathManager.getCustomThemesDir();
    await fs.ensureDir(customThemesDir);

    const themePath = path.join(customThemesDir, `${theme.id}.vibe-pack.json`);
    await fs.writeJson(themePath, theme, { spaces: 2 });

    // Update cache
    this.themesCache.set(theme.id, theme);
  }

  /**
   * Delete a custom theme
   */
  async deleteTheme(themeId: string): Promise<void> {
    const customThemesDir = pathManager.getCustomThemesDir();
    const themePath = path.join(customThemesDir, `${themeId}.vibe-pack.json`);

    if (await fs.pathExists(themePath)) {
      await fs.remove(themePath);
      this.themesCache.delete(themeId);
    } else {
      throw new Error('Cannot delete built-in theme');
    }
  }

  /**
   * Validate theme structure
   */
  private validateTheme(theme: any): theme is ThemePack {
    return (
      theme &&
      typeof theme.id === 'string' &&
      typeof theme.name === 'string' &&
      typeof theme.description === 'string' &&
      Array.isArray(theme.tags) &&
      Array.isArray(theme.extensions) &&
      typeof theme.settings === 'object'
    );
  }

  /**
   * Export theme to file
   */
  async exportTheme(themeId: string, outputPath: string): Promise<void> {
    const theme = await this.getTheme(themeId);
    if (!theme) {
      throw new Error(`Theme not found: ${themeId}`);
    }

    await fs.writeJson(outputPath, theme, { spaces: 2 });
  }

  /**
   * Import theme from file
   */
  async importTheme(filePath: string): Promise<ThemePack> {
    const theme = await fs.readJson(filePath);

    if (!this.validateTheme(theme)) {
      throw new Error('Invalid theme file');
    }

    await this.saveTheme(theme);
    return theme;
  }
}

export const themeManager = ThemeManager.getInstance();
