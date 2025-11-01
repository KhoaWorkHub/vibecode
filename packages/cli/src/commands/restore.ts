import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { configManager } from '@vibecode/core';

interface RestoreOptions {
  list?: boolean;
}

export async function restoreCommand(backup?: string, options?: RestoreOptions) {
  const spinner = ora();

  try {
    // List backups if requested
    if (options?.list) {
      spinner.start('Loading backups...');
      const backups = await configManager.listBackups();
      spinner.stop();

      if (backups.length === 0) {
        console.log(chalk.yellow('No backups found.'));
        return;
      }

      console.log(chalk.cyan('\n📦 Available Backups:\n'));
      backups.forEach((b, index) => {
        const timestamp = b.replace('backup-', '').replace(/-/g, ':');
        console.log(chalk.gray(`${index + 1}.`), chalk.white(timestamp));
      });

      console.log(
        chalk.gray(`\nUse ${chalk.cyan('vibecode restore <backup-name>')} to restore a backup`)
      );
      return;
    }

    // Get backups list
    const backups = await configManager.listBackups();

    if (backups.length === 0) {
      console.log(chalk.yellow('No backups found.'));
      return;
    }

    let selectedBackup = backup;

    // If no backup specified, prompt user to select
    if (!selectedBackup) {
      const { backup: chosen } = await inquirer.prompt([
        {
          type: 'list',
          name: 'backup',
          message: 'Select a backup to restore:',
          choices: backups.map((b) => ({
            name: b.replace('backup-', '').replace(/-/g, ':'),
            value: b,
          })),
        },
      ]);
      selectedBackup = chosen;
    }

    // Find backup path
    const backupPath = backups.find((b) => b === selectedBackup || b.includes(selectedBackup!));

    if (!backupPath) {
      console.log(chalk.red(`Backup not found: ${selectedBackup}`));
      process.exit(1);
    }

    // Confirm restoration
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'This will overwrite your current VSCode configuration. Continue?',
        default: false,
      },
    ]);

    if (!confirm) {
      console.log(chalk.yellow('Restore cancelled.'));
      return;
    }

    // Restore backup
    spinner.start('Restoring backup...');
    const fullBackupPath = require('path').join(
      (await import('@vibecode/core')).pathManager.getBackupsDir(),
      backupPath
    );
    await configManager.restoreConfiguration(fullBackupPath);
    spinner.succeed('Backup restored successfully');

    console.log(chalk.green('\n✨ Your VSCode configuration has been restored!'));
    console.log(chalk.yellow('\n⚠️  Please restart VSCode to see the changes.'));
  } catch (error: any) {
    spinner.fail('Failed to restore backup');
    console.error(chalk.red('❌ Error:'), error.message);
    process.exit(1);
  }
}
