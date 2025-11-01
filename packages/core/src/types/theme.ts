/**
 * Theme Pack Type Definitions
 */

export interface ThemePack {
  id: string;
  name: string;
  description: string;
  tags: string[];
  preview?: string;
  author?: string;
  version?: string;
  extensions: string[];
  settings: VSCodeSettings;
  layout?: LayoutConfig;
  customCSS?: string;
  keybindings?: KeyBinding[];
}

export interface VSCodeSettings {
  'workbench.colorTheme'?: string;
  'workbench.iconTheme'?: string;
  'editor.fontFamily'?: string;
  'editor.fontSize'?: number;
  'editor.lineHeight'?: number;
  'editor.fontWeight'?: string;
  'editor.cursorStyle'?: string;
  'editor.cursorBlinking'?: string;
  'terminal.integrated.fontFamily'?: string;
  'terminal.integrated.fontSize'?: number;
  [key: string]: any;
}

export interface LayoutConfig {
  sidebarLocation?: 'left' | 'right';
  terminalVisible?: boolean;
  editorColumns?: number;
  panelAlignment?: 'left' | 'center' | 'right' | 'justify';
  zenMode?: boolean;
}

export interface KeyBinding {
  key: string;
  command: string;
  when?: string;
  args?: any;
}

export interface ThemeMetadata {
  id: string;
  name: string;
  description: string;
  tags: string[];
  preview?: string;
  author?: string;
  version?: string;
  rating?: number;
  downloads?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface BackupData {
  timestamp: string;
  settings: any;
  keybindings?: any[];
  extensions?: string[];
  layout?: any;
}

export interface ApplyOptions {
  installExtensions?: boolean;
  applySettings?: boolean;
  applyLayout?: boolean;
  applyKeybindings?: boolean;
  backup?: boolean;
}

export type MoodType =
  | 'morning'
  | 'night'
  | 'hacker'
  | 'chill'
  | 'focus'
  | 'creative'
  | 'minimal'
  | 'vibrant';

export type ColorTone = 'dark' | 'light' | 'neon' | 'pastel' | 'monochrome' | 'colorful';
