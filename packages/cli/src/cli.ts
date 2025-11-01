#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { listCommand } from './commands/list';
import { applyCommand } from './commands/apply';
import { restoreCommand } from './commands/restore';
import { createCommand } from './commands/create';
import { searchCommand } from './commands/search';
import { backupCommand } from './commands/backup';
import { importCommand } from './commands/import';
import { exportCommand } from './commands/export';
import { registerProfileCommand } from './commands/profile';

const program = new Command();

program
  .name('vibecode')
  .description('✨ VibeCode - The Ultimate VSCode Customization Tool')
  .version('1.0.0');

// List themes
program
  .command('list')
  .description('📋 List all available themes')
  .option('-t, --tags <tags>', 'Filter by tags (comma-separated)')
  .option('-d, --detailed', 'Show detailed information')
  .action(listCommand);

// Apply theme
program
  .command('apply <theme>')
  .description('🎨 Apply a theme to VSCode')
  .option('--no-backup', 'Skip backup before applying')
  .option('--no-extensions', 'Skip installing extensions')
  .option('--settings-only', 'Apply settings only')
  .action(applyCommand);

// Search themes
program
  .command('search <query>')
  .description('🔍 Search themes by name, description, or tags')
  .action(searchCommand);

// Restore backup
program
  .command('restore [backup]')
  .description('↩️  Restore VSCode configuration from backup')
  .option('-l, --list', 'List available backups')
  .action(restoreCommand);

// Create new theme
program
  .command('create [name]')
  .description('🎨 Create a new custom theme')
  .option('-i, --interactive', 'Interactive mode')
  .action(createCommand);

// Backup current configuration
program
  .command('backup')
  .description('💾 Backup current VSCode configuration')
  .action(backupCommand);

// Import theme
program
  .command('import <file>')
  .description('📥 Import a theme from a .vibe-pack.json file')
  .action(importCommand);

// Export theme
program
  .command('export <themeId> [output]')
  .description('📤 Export a theme to a .vibe-pack.json file')
  .action(exportCommand);

// Profile management
registerProfileCommand(program);

// Error handling
program.exitOverride();

try {
  program.parse(process.argv);
} catch (error: unknown) {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const errorCode = (error as { code: string }).code;
    if (errorCode !== 'commander.help' && errorCode !== 'commander.version') {
      const errorMessage = 'message' in error ? String((error as { message: unknown }).message) : 'Unknown error';
      console.error(chalk.red('❌ Error:'), errorMessage);
      process.exit(1);
    }
  }
}

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
