import chalk from 'chalk';
import ora from 'ora';
import * as path from 'path';
import { themeManager } from '@vibecode/core';

export async function exportCommand(themeId: string, output?: string) {
  const spinner = ora('Exporting theme...').start();

  try {
    const theme = await themeManager.getTheme(themeId);

    if (!theme) {
      spinner.fail(`Theme not found: ${themeId}`);
      console.log(chalk.yellow(`\nUse ${chalk.cyan('vibecode list')} to see available themes.`));
      process.exit(1);
    }

    const outputPath =
      output || path.join(process.cwd(), `${themeId}.vibe-pack.json`);

    await themeManager.exportTheme(themeId, outputPath);
    spinner.succeed('Theme exported successfully');

    console.log(chalk.green(`\n✨ Theme "${theme.name}" exported!`));
    console.log(chalk.gray(`   Location: ${outputPath}`));
    console.log(
      chalk.cyan('\nYou can share this file with others or import it on another machine.')
    );
  } catch (error: any) {
    spinner.fail('Failed to export theme');
    console.error(chalk.red('❌ Error:'), error.message);
    process.exit(1);
  }
}
