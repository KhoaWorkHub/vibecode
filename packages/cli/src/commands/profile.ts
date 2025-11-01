/**
 * Profile Management Commands
 * Complete VS Code environment snapshots with extension isolation
 */

import { Command } from 'commander';
import chalk from 'chalk';
import { profileManager, profileSharing } from '@vibecode/core';
import type { ProfileSwitchOptions, ProfileSaveOptions } from '@vibecode/core';

/**
 * Save current VS Code setup as a profile
 */
async function saveProfile(name: string, options: ProfileSaveOptions) {
  try {
    console.log(chalk.blue(`💾 Saving profile "${name}"...`));

    const profile = await profileManager.saveProfile(name, options);

    console.log(chalk.green('✓ Profile saved successfully!'));
    console.log(chalk.gray(`  Name: ${profile.name}`));
    console.log(chalk.gray(`  Description: ${profile.metadata.description || 'N/A'}`));
    console.log(chalk.gray(`  Extensions: ${profile.extensions.list.length}`));
    console.log(
      chalk.gray(`  Theme: ${profile.theme || 'Not included'}`)
    );
    console.log(chalk.gray(`  Created: ${new Date(profile.metadata.createdAt).toLocaleString()}`));
  } catch (error) {
    console.error(chalk.red('✗ Failed to save profile:'), error);
    process.exit(1);
  }
}

/**
 * Switch to a different profile
 */
async function switchProfile(name: string, options: ProfileSwitchOptions) {
  try {
    console.log(chalk.blue(`🔄 Switching to profile "${name}"...`));

    // Show diff first
    console.log(chalk.gray('\nAnalyzing changes...'));
    const diff = await profileManager.getProfileDiff(name);

    // Display diff
    console.log(chalk.cyan('\n📊 Profile Diff:'));

    if (diff.theme) {
      console.log(
        chalk.gray(
          `  Theme: ${diff.theme.from || 'N/A'} → ${diff.theme.to || 'Keep current'}`
        )
      );
    }

    if (diff.extensions) {
      console.log(chalk.gray(`  Extensions:`));
      console.log(chalk.green(`    ✓ To Install: ${diff.extensions.toInstall.length}`));
      console.log(chalk.red(`    ✗ To Remove: ${diff.extensions.toRemove.length}`));
      console.log(chalk.gray(`    ○ To Keep: ${diff.extensions.toKeep.length}`));

      if (diff.extensions.protected && diff.extensions.protected.length > 0) {
        console.log(
          chalk.yellow(`    ⚠ Protected: ${diff.extensions.protected.length}`)
        );
        diff.extensions.protected.forEach((ext: string) => {
          console.log(chalk.yellow(`      - ${ext}`));
        });
      }

      // Show detailed changes if not too many
      if (diff.extensions.toInstall.length > 0 && diff.extensions.toInstall.length <= 10) {
        console.log(chalk.green('\n  Installing:'));
        diff.extensions.toInstall.forEach((ext) => {
          console.log(chalk.green(`    + ${ext}`));
        });
      }

      if (diff.extensions.toRemove.length > 0 && diff.extensions.toRemove.length <= 10) {
        console.log(chalk.red('\n  Removing:'));
        diff.extensions.toRemove.forEach((ext) => {
          console.log(chalk.red(`    - ${ext}`));
        });
      }
    }

    if (diff.settings) {
      console.log(
        chalk.gray(`  Settings: ${diff.settings.changed} changed, ${diff.settings.added} added`)
      );
    }

    // Dry run mode
    if (options.dryRun) {
      console.log(chalk.yellow('\n🔍 Dry run mode - no changes made'));
      return;
    }

    // Confirm if not skipped
    if (!options.skipConfirm) {
      const readline = await import('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const answer = await new Promise<string>((resolve) => {
        rl.question(chalk.yellow('\nProceed with profile switch? (y/N): '), resolve);
      });
      rl.close();

      if (answer.toLowerCase() !== 'y') {
        console.log(chalk.gray('Cancelled.'));
        return;
      }
    }

    // Perform switch
    console.log(chalk.blue('\n🚀 Applying profile...'));
    await profileManager.switchProfile(name, options);

    console.log(chalk.green('\n✓ Profile switched successfully!'));
    console.log(
      chalk.yellow(
        '\n⚠ Please reload VS Code window for all changes to take effect.'
      )
    );
    console.log(chalk.gray('  (Cmd+Shift+P → "Developer: Reload Window")'));
  } catch (error) {
    console.error(chalk.red('\n✗ Failed to switch profile:'), error);
    process.exit(1);
  }
}

/**
 * List all available profiles
 */
async function listProfiles() {
  try {
    const profiles = await profileManager.listProfiles();

    if (profiles.length === 0) {
      console.log(chalk.gray('No profiles found.'));
      console.log(chalk.blue('\nCreate your first profile:'));
      console.log(chalk.gray('  vibecode profile save <name>'));
      return;
    }

    console.log(chalk.cyan(`\n📋 Available Profiles (${profiles.length}):\n`));

    for (const profile of profiles) {
      console.log(chalk.bold(`  ${profile.name}`));
      if (profile.description) {
        console.log(chalk.gray(`    ${profile.description}`));
      }
      console.log(chalk.gray(`    Extensions: ${profile.extensionCount}`));
      console.log(chalk.gray(`    Theme: ${profile.theme || 'N/A'}`));
      console.log(
        chalk.gray(`    Updated: ${new Date(profile.updatedAt).toLocaleString()}`)
      );
      console.log();
    }
  } catch (error) {
    console.error(chalk.red('✗ Failed to list profiles:'), error);
    process.exit(1);
  }
}

/**
 * Delete a profile
 */
async function deleteProfile(name: string, options: { force?: boolean }) {
  try {
    if (!options.force) {
      const readline = await import('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const answer = await new Promise<string>((resolve) => {
        rl.question(
          chalk.yellow(`\n⚠ Delete profile "${name}"? This cannot be undone. (y/N): `),
          resolve
        );
      });
      rl.close();

      if (answer.toLowerCase() !== 'y') {
        console.log(chalk.gray('Cancelled.'));
        return;
      }
    }

    await profileManager.deleteProfile(name);
    console.log(chalk.green(`✓ Profile "${name}" deleted successfully!`));
  } catch (error) {
    console.error(chalk.red('✗ Failed to delete profile:'), error);
    process.exit(1);
  }
}

/**
 * Show detailed information about a profile
 */
async function showProfile(name: string) {
  try {
    const profile = await profileManager.loadProfile(name);

    console.log(chalk.cyan(`\n📦 Profile: ${profile.name}\n`));
    console.log(chalk.bold('Metadata:'));
    console.log(chalk.gray(`  Description: ${profile.metadata.description || 'N/A'}`));
    console.log(
      chalk.gray(`  Created: ${new Date(profile.metadata.createdAt).toLocaleString()}`)
    );
    console.log(
      chalk.gray(`  Updated: ${new Date(profile.metadata.updatedAt).toLocaleString()}`)
    );

    console.log(chalk.bold('\nTheme:'));
    if (profile.theme) {
      console.log(chalk.gray(`  ${profile.theme}`));
    } else {
      console.log(chalk.gray(`  Not included (theme-agnostic)`));
    }

    console.log(chalk.bold('\nExtensions:'));
    console.log(
      chalk.gray(`  Mode: ${profile.extensions.mode} (${profile.extensions.list.length} total)`)
    );
    if (profile.extensions.protected && profile.extensions.protected.length > 0) {
      console.log(chalk.yellow(`  Protected: ${profile.extensions.protected.length}`));
    }

    if (profile.extensions.list.length <= 20) {
      console.log(chalk.gray('\n  Installed:'));
      profile.extensions.list.forEach((ext) => {
        console.log(chalk.gray(`    - ${ext}`));
      });
    } else {
      console.log(
        chalk.gray(`\n  (${profile.extensions.list.length} extensions - too many to display)`)
      );
    }

    console.log(chalk.bold('\nSettings:'));
    const settingsCount = Object.keys(profile.settings).length;
    console.log(chalk.gray(`  ${settingsCount} settings configured`));

    if (profile.keybindings && profile.keybindings.length > 0) {
      console.log(chalk.bold('\nKeybindings:'));
      console.log(chalk.gray(`  ${profile.keybindings.length} custom keybindings`));
    }
  } catch (error) {
    console.error(chalk.red('✗ Failed to show profile:'), error);
    process.exit(1);
  }
}

/**
 * Compare two profiles or current state vs profile
 */
async function diffProfiles(target: string) {
  try {
    console.log(chalk.blue(`🔍 Comparing current setup with "${target}"...\n`));

    const diff = await profileManager.getProfileDiff(target);

    console.log(chalk.cyan('📊 Diff Results:\n'));

    // Theme diff
    if (diff.theme) {
      console.log(chalk.bold('Theme:'));
      console.log(chalk.gray(`  Current: ${diff.theme.from || 'N/A'}`));
      console.log(chalk.gray(`  Target:  ${diff.theme.to || 'Keep current'}`));
      console.log();
    }

    // Extension diff
    if (diff.extensions) {
      console.log(chalk.bold('Extensions:'));
      console.log(chalk.green(`  To Install: ${diff.extensions.toInstall.length}`));
      console.log(chalk.red(`  To Remove:  ${diff.extensions.toRemove.length}`));
      console.log(chalk.gray(`  To Keep:    ${diff.extensions.toKeep.length}`));

      if (diff.extensions.protected && diff.extensions.protected.length > 0) {
        console.log(
          chalk.yellow(`  Protected:  ${diff.extensions.protected.length}`)
        );
      }

      // Show details
      if (diff.extensions.toInstall.length > 0) {
        console.log(chalk.green('\n  Installing:'));
        diff.extensions.toInstall.slice(0, 10).forEach((ext) => {
          console.log(chalk.green(`    + ${ext}`));
        });
        if (diff.extensions.toInstall.length > 10) {
          console.log(
            chalk.gray(`    ... and ${diff.extensions.toInstall.length - 10} more`)
          );
        }
      }

      if (diff.extensions.toRemove.length > 0) {
        console.log(chalk.red('\n  Removing:'));
        diff.extensions.toRemove.slice(0, 10).forEach((ext) => {
          console.log(chalk.red(`    - ${ext}`));
        });
        if (diff.extensions.toRemove.length > 10) {
          console.log(
            chalk.gray(`    ... and ${diff.extensions.toRemove.length - 10} more`)
          );
        }
      }

      if (
        diff.extensions.protected &&
        diff.extensions.protected.length > 0
      ) {
        console.log(chalk.yellow('\n  Protected (will not be removed):'));
        diff.extensions.protected.forEach((ext: string) => {
          console.log(chalk.yellow(`    ⚠ ${ext}`));
        });
      }

      console.log();
    }

    // Settings diff
    if (diff.settings) {
      console.log(chalk.bold('Settings:'));
      console.log(chalk.gray(`  Changed: ${diff.settings.changed}`));
      console.log(chalk.gray(`  Added:   ${diff.settings.added}`));
      console.log();
    }
  } catch (error) {
    console.error(chalk.red('✗ Failed to diff profiles:'), error);
    process.exit(1);
  }
}

/**
 * Manage protected extensions
 */
async function manageProtectedExtensions(action: 'list' | 'add' | 'remove', extensionId?: string) {
  try {
    const protectedExtensions = await profileManager.getProtectedExtensions();

    if (action === 'list') {
      if (protectedExtensions.length === 0) {
        console.log(chalk.gray('No protected extensions configured.'));
        console.log(chalk.blue('\nAdd protected extensions:'));
        console.log(chalk.gray('  vibecode profile protected add <extension-id>'));
        return;
      }

      console.log(chalk.cyan(`\n🛡️ Protected Extensions (${protectedExtensions.length}):\n`));
      protectedExtensions.forEach((ext) => {
        console.log(chalk.gray(`  - ${ext}`));
      });
      console.log(
        chalk.yellow(
          '\n⚠ These extensions will never be removed when switching profiles.'
        )
      );
      return;
    }

    if (!extensionId) {
      console.error(chalk.red('✗ Extension ID is required for add/remove actions'));
      process.exit(1);
    }

    if (action === 'add') {
      if (protectedExtensions.includes(extensionId)) {
        console.log(chalk.yellow(`Extension "${extensionId}" is already protected.`));
        return;
      }

      const updated = [...protectedExtensions, extensionId];
      await profileManager.setProtectedExtensions(updated);
      console.log(chalk.green(`✓ Added "${extensionId}" to protected extensions.`));
    }

    if (action === 'remove') {
      if (!protectedExtensions.includes(extensionId)) {
        console.log(chalk.yellow(`Extension "${extensionId}" is not in protected list.`));
        return;
      }

      const updated = protectedExtensions.filter((ext) => ext !== extensionId);
      await profileManager.setProtectedExtensions(updated);
      console.log(chalk.green(`✓ Removed "${extensionId}" from protected extensions.`));
    }
  } catch (error) {
    console.error(chalk.red('✗ Failed to manage protected extensions:'), error);
    process.exit(1);
  }
}

/**
 * Share a profile via GitHub Gist
 */
async function shareProfile(name: string) {
  try {
    console.log(chalk.blue(`📤 Sharing profile "${name}"...`));
    
    const shareCode = await profileSharing.shareProfile(name);
    
    console.log(chalk.green('\n✓ Profile shared successfully!\n'));
    console.log(chalk.cyan.bold(`  Share Code: ${shareCode}\n`));
    console.log(chalk.gray('Anyone can import this profile with:'));
    console.log(chalk.white(`  vibecode profile import ${shareCode}\n`));
    console.log(chalk.gray('This code is permanent and works across all machines.'));
  } catch (error) {
    console.error(chalk.red('✗ Failed to share profile:'), error);
    process.exit(1);
  }
}

/**
 * Import a profile from a share code
 */
async function importProfile(shareCode: string, options: { name?: string; yes?: boolean }) {
  try {
    console.log(chalk.blue(`📥 Importing profile from ${shareCode}...`));
    
    // Get profile info first
    const info = await profileSharing.getProfileInfo(shareCode);
    
    console.log(chalk.cyan('\n📋 Profile Information:'));
    console.log(chalk.gray(`  Name: ${info.name}`));
    console.log(chalk.gray(`  Description: ${info.description}`));
    console.log(chalk.gray(`  Extensions: ${info.extensionCount}`));
    console.log(chalk.gray(`  Theme: ${info.theme || 'N/A'}`));
    console.log(chalk.gray(`  Created: ${new Date(info.createdAt).toLocaleString()}\n`));
    
    // Confirm if not skipped
    if (!options.yes) {
      const readline = await import('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const answer = await new Promise<string>((resolve) => {
        rl.question(chalk.yellow('Import this profile? (y/N): '), resolve);
      });
      rl.close();

      if (answer.toLowerCase() !== 'y') {
        console.log(chalk.gray('Cancelled.'));
        return;
      }
    }
    
    // Import profile
    const profile = await profileSharing.importProfile(shareCode, options.name);
    
    console.log(chalk.green(`\n✓ Profile imported as "${profile.name}"!`));
    console.log(chalk.gray('\nTo switch to this profile:'));
    console.log(chalk.white(`  vibecode profile switch ${profile.name}\n`));
  } catch (error) {
    console.error(chalk.red('✗ Failed to import profile:'), error);
    process.exit(1);
  }
}

/**
 * Register profile command and subcommands
 */
export function registerProfileCommand(program: Command) {
  const profile = program
    .command('profile')
    .description('Manage complete VS Code environment profiles');

  // Save profile
  profile
    .command('save')
    .description('Save current VS Code setup as a profile')
    .argument('<name>', 'Profile name')
    .option('-d, --description <desc>', 'Profile description')
    .option('--with-theme', 'Include current theme in profile (default: false)')
    .option('--no-extensions', 'Exclude extensions from profile')
    .action((name: string, options: { description?: string; withTheme?: boolean; extensions?: boolean }) => {
      const saveOptions: ProfileSaveOptions = {
        description: options.description,
        withTheme: options.withTheme || false,
        withExtensions: options.extensions !== false,
      };
      saveProfile(name, saveOptions);
    });

  // Switch profile
  profile
    .command('switch')
    .description('Switch to a different profile')
    .argument('<name>', 'Profile name')
    .option('--dry-run', 'Show changes without applying them')
    .option('--keep-theme', 'Keep current theme instead of applying profile theme')
    .option('--keep-extensions', 'Keep current extensions (additive mode)')
    .option('-y, --yes', 'Skip confirmation prompt')
    .action((name: string, options: { dryRun?: boolean; keepTheme?: boolean; keepExtensions?: boolean; yes?: boolean }) => {
      const switchOptions: ProfileSwitchOptions = {
        dryRun: options.dryRun || false,
        keepTheme: options.keepTheme || false,
        keepExtensions: options.keepExtensions || false,
        skipConfirm: options.yes || false,
      };
      switchProfile(name, switchOptions);
    });

  // List profiles
  profile
    .command('list')
    .alias('ls')
    .description('List all available profiles')
    .action(listProfiles);

  // Show profile details
  profile
    .command('show')
    .description('Show detailed information about a profile')
    .argument('<name>', 'Profile name')
    .action(showProfile);

  // Delete profile
  profile
    .command('delete')
    .alias('rm')
    .description('Delete a profile')
    .argument('<name>', 'Profile name')
    .option('-f, --force', 'Skip confirmation prompt')
    .action((name: string, options: { force?: boolean }) => {
      deleteProfile(name, options);
    });

  // Share profile
  profile
    .command('share')
    .description('Share a profile via GitHub Gist (get share code)')
    .argument('<name>', 'Profile name to share')
    .action(shareProfile);

  // Import profile
  profile
    .command('import')
    .description('Import a profile from a share code')
    .argument('<code>', 'Share code (e.g., VIBE-abc123...)')
    .option('-n, --name <name>', 'Custom name for imported profile')
    .option('-y, --yes', 'Skip confirmation prompt')
    .action((code: string, options: { name?: string; yes?: boolean }) => {
      importProfile(code, options);
    });

  // Diff profiles
  profile
    .command('diff')
    .description('Compare current setup with a profile')
    .argument('<target>', 'Target profile name')
    .action(diffProfiles);

  // Protected extensions
  const protectedCmd = profile
    .command('protected')
    .description('Manage protected extensions (never removed when switching)');

  protectedCmd
    .command('list')
    .description('List protected extensions')
    .action(() => manageProtectedExtensions('list'));

  protectedCmd
    .command('add')
    .description('Add extension to protected list')
    .argument('<extension-id>', 'Extension ID (e.g., github.copilot)')
    .action((extensionId: string) => manageProtectedExtensions('add', extensionId));

  protectedCmd
    .command('remove')
    .description('Remove extension from protected list')
    .argument('<extension-id>', 'Extension ID')
    .action((extensionId: string) => manageProtectedExtensions('remove', extensionId));
}
