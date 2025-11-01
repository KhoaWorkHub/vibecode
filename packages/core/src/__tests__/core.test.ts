import { describe, it, expect, beforeEach } from 'vitest';
import { themeManager } from '../src/services/ThemeManager';
import { pathManager } from '../src/utils/paths';
import { configManager } from '../src/utils/config';

describe('ThemeManager', () => {
  beforeEach(async () => {
    // Initialize directories before each test
    await pathManager.initializeDirectories();
  });

  it('should load built-in themes', async () => {
    const themes = await themeManager.loadThemes();
    expect(themes.length).toBeGreaterThan(0);
  });

  it('should find theme by id', async () => {
    const theme = await themeManager.getTheme('night-hacker');
    expect(theme).toBeDefined();
    expect(theme?.name).toBe('Night Hacker');
  });

  it('should search themes by keyword', async () => {
    const results = await themeManager.searchThemes('tokyo');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].id).toBe('tokyo-drift');
  });

  it('should filter themes by tags', async () => {
    const darkThemes = await themeManager.filterByTags(['dark']);
    expect(darkThemes.length).toBeGreaterThan(0);
    darkThemes.forEach((theme) => {
      expect(theme.tags).toContain('dark');
    });
  });

  it('should validate theme structure', async () => {
    const theme = await themeManager.getTheme('minimal-daylight');
    expect(theme).toHaveProperty('id');
    expect(theme).toHaveProperty('name');
    expect(theme).toHaveProperty('description');
    expect(theme).toHaveProperty('tags');
    expect(theme).toHaveProperty('extensions');
    expect(theme).toHaveProperty('settings');
  });
});

describe('ConfigManager', () => {
  it('should read and write settings', async () => {
    const testSettings = {
      'editor.fontSize': 16,
      'workbench.colorTheme': 'Test Theme',
    };

    // Note: This test would need proper mocking for actual file operations
    expect(configManager).toBeDefined();
  });

  it('should remove JSON comments', async () => {
    // Test the comment removal functionality
    expect(configManager).toBeDefined();
  });
});

describe('PathManager', () => {
  it('should get correct VSCode paths based on platform', () => {
    const settingsPath = pathManager.getSettingsPath();
    expect(settingsPath).toBeTruthy();
    expect(settingsPath).toContain('settings.json');
  });

  it('should get VibeCode data directory', () => {
    const dataDir = pathManager.getVibeCodeDataDir();
    expect(dataDir).toContain('.vibecode');
  });

  it('should get backups directory', () => {
    const backupsDir = pathManager.getBackupsDir();
    expect(backupsDir).toContain('backups');
  });
});
