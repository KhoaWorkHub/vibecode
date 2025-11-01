import { VSCodeSettings, KeyBinding } from './theme';

/**
 * Extension configuration for profiles
 */
export interface ExtensionConfig {
  /** Mode for handling extensions during profile switch */
  mode: 'strict' | 'additive';
  /** List of extension IDs in this profile */
  list: string[];
  /** Extensions that should never be removed (global protection) */
  protected?: string[];
}

/**
 * Profile metadata
 */
export interface ProfileMetadata {
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  /** Number of extensions */
  extensionCount: number;
  /** Theme ID if profile has fixed theme */
  theme?: string;
}

/**
 * Complete profile definition
 */
export interface Profile {
  name: string;
  description?: string;
  /** Optional fixed theme for this profile */
  theme?: string;
  /** Extension configuration */
  extensions: ExtensionConfig;
  /** VS Code settings */
  settings: VSCodeSettings;
  /** Custom keybindings */
  keybindings: KeyBinding[];
  /** Metadata */
  metadata: {
    description?: string;
    createdAt: string;
    updatedAt: string;
    version: string;
  };
}

/**
 * Profile switch options
 */
export interface ProfileSwitchOptions {
  /** Show preview without executing */
  dryRun?: boolean;
  /** Keep current theme instead of applying profile theme */
  keepTheme?: boolean;
  /** Keep existing extensions (additive mode) */
  keepExtensions?: boolean;
  /** Skip confirmation prompts */
  skipConfirm?: boolean;
}

/**
 * Profile diff result
 */
export interface ProfileDiff {
  theme: {
    from: string | null;
    to: string | null;
  };
  extensions: {
    toRemove: string[];
    toInstall: string[];
    toKeep: string[];
    protected?: string[];
  };
  settings: {
    changed: number;
    added: number;
    removed: number;
  };
  keybindings: {
    changed: number;
  };
}

/**
 * Profile save options
 */
export interface ProfileSaveOptions {
  /** Include current theme in profile */
  withTheme?: boolean;
  /** Include extensions in profile */
  withExtensions?: boolean;
  /** Profile description */
  description?: string;
  /** Overwrite if profile exists */
  overwrite?: boolean;
}
