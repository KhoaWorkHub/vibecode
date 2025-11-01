/**
 * VibeCode Core Package
 * Shared logic for theme and layout management
 */

export * from './types/theme';
export * from './types/profile';
export * from './utils/paths';
export * from './utils/config';
export * from './utils/extensions';
export * from './services/ThemeManager';
export * from './services/ProfileManager';

export { pathManager } from './utils/paths';
export { configManager } from './utils/config';
export { extensionManager } from './utils/extensions';
export { themeManager } from './services/ThemeManager';
export { profileManager } from './services/ProfileManager';
