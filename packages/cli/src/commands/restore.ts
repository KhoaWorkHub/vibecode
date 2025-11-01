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
      backups.forEach((backup, index) => {
        console.log(
          chalk.gray(`${index + 1}.`), 
          chalk.white(`Before applying "${backup.themeName}"`),
          chalk.gray(`→ Contains: ${backup.actualTheme}`),
          chalk.dim(`(${backup.date})`)
        );
      });

      console.log(
        chalk.gray(`\nUse ${chalk.cyan('vibecode restore')} to interactively restore a backup`)
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
            name: `Before "${b.themeName}" ${chalk.gray(`(contains: ${b.actualTheme})`)}`,
            value: b.name,
          })),
        },
      ]);
      selectedBackup = chosen;
    }

    // Find backup
    const backupData = backups.find((b) => 
      b.name === selectedBackup || 
      b.themeName.toLowerCase().includes(selectedBackup!.toLowerCase())
    );

    if (!backupData) {
      console.log(chalk.red(`Backup not found: ${selectedBackup}`));
      process.exit(1);
    }

    // Confirm restoration
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: `Restore "${backupData.actualTheme}" theme? (from before applying "${backupData.themeName}")`,
        default: false,
      },
    ]);

    if (!confirm) {
      console.log(chalk.yellow('Restore cancelled.'));
      return;
    }

    // Restore backup
    spinner.start('Restoring backup...');
    await configManager.restoreConfiguration(backupData.path);
    spinner.succeed('Backup restored successfully');

    console.log(chalk.green(`\n✨ Restored "${backupData.actualTheme}" theme!`));
    console.log(chalk.gray(`   (from backup before applying "${backupData.themeName}")`));
    console.log(chalk.yellow('\n⚠️  Please restart VSCode to see the changes.'));
  } catch (error: any) {
    spinner.fail('Failed to restore backup');
    console.error(chalk.red('❌ Error:'), error.message);
    process.exit(1);
  }
}
