import chalk from 'chalk';
import ora from 'ora';
import { configManager } from '@vibecode/core';

export async function backupCommand() {
  const spinner = ora('Creating backup...').start();

  try {
    const backupPath = await configManager.backupConfiguration();
    spinner.succeed('Backup created successfully');

    const backupName = backupPath.split('/').pop();
    const timestamp = backupName?.replace('backup-', '').replace(/-/g, ':');

    console.log(chalk.green('\n✨ Configuration backed up!'));
    console.log(chalk.gray(`   Timestamp: ${timestamp}`));
    console.log(chalk.gray(`   Location: ${backupPath}`));
    console.log(chalk.cyan(`\nUse ${chalk.bold('vibecode restore')} to restore from this backup.`));
  } catch (error: any) {
    spinner.fail('Failed to create backup');
    console.error(chalk.red('❌ Error:'), error.message);
    process.exit(1);
  }
}
