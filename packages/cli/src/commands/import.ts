import chalk from 'chalk';
import ora from 'ora';
import * as path from 'path';
import { themeManager } from '@vibecode/core';

export async function importCommand(filePath: string) {
  const spinner = ora('Importing theme...').start();

  try {
    const theme = await themeManager.importTheme(filePath);
    spinner.succeed('Theme imported successfully');

    console.log(chalk.green(`\n✨ Theme "${theme.name}" imported!`));
    console.log(chalk.gray(`   ID: ${theme.id}`));
    console.log(chalk.gray(`   Description: ${theme.description}`));
    console.log(chalk.gray(`   Tags: ${theme.tags.join(', ')}`));
    console.log(chalk.cyan(`\nUse ${chalk.bold(`vibecode apply ${theme.id}`)} to apply it.`));
  } catch (error: any) {
    spinner.fail('Failed to import theme');
    console.error(chalk.red('❌ Error:'), error.message);
    process.exit(1);
  }
}
