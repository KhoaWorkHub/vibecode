import chalk from 'chalk';
import ora from 'ora';
import boxen from 'boxen';
import { themeManager, pathManager } from '@vibecode/core';

interface ApplyOptions {
  backup?: boolean;
  extensions?: boolean;
  settingsOnly?: boolean;
}

export async function applyCommand(themeId: string, options: ApplyOptions) {
  const spinner = ora();

  try {
    // Check if VSCode is installed
    spinner.start('Checking VSCode installation...');
    const isInstalled = await pathManager.isVSCodeInstalled();
    if (!isInstalled) {
      spinner.fail('VSCode not found on this system');
      console.log(chalk.yellow('\nPlease make sure VSCode is installed and has been run at least once.'));
      process.exit(1);
    }
    spinner.succeed('VSCode found');

    // Load theme
    spinner.start(`Loading theme: ${themeId}...`);
    const theme = await themeManager.getTheme(themeId);

    if (!theme) {
      spinner.fail(`Theme not found: ${themeId}`);
      console.log(chalk.yellow(`\nUse ${chalk.cyan('vibecode list')} to see available themes.`));
      process.exit(1);
    }
    spinner.succeed(`Theme loaded: ${theme.name}`);

    // Apply theme
    spinner.start('Applying theme...');
    await themeManager.applyTheme(themeId, {
      backup: options.backup !== false,
      applySettings: true,
      applyLayout: !options.settingsOnly,
      applyKeybindings: !options.settingsOnly,
      installExtensions: options.extensions !== false && !options.settingsOnly,
    });
    spinner.succeed('Theme applied successfully');

    // Show success message
    const message = `
${chalk.bold.green('✨ Theme Applied Successfully!')}

${chalk.bold(theme.name)} has been applied to your VSCode.

${chalk.gray('Theme Details:')}
${chalk.gray('•')} ${theme.description}
${chalk.gray('•')} Tags: ${theme.tags.join(', ')}
${chalk.gray('•')} Extensions: ${theme.extensions.length} required

${chalk.yellow('⚠️  Please restart VSCode to see all changes.')}
`;

    console.log(
      boxen(message, {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'green',
      })
    );

    // Show extension installation note
    if (options.extensions !== false && theme.extensions.length > 0) {
      console.log(chalk.cyan('\n📦 Required Extensions:'));
      theme.extensions.forEach((ext) => {
        console.log(chalk.gray(`  • ${ext}`));
      });
      console.log(
        chalk.yellow(
          '\nNote: You may need to manually install these extensions from the VSCode marketplace.'
        )
      );
    }
  } catch (error: any) {
    spinner.fail('Failed to apply theme');
    console.error(chalk.red('❌ Error:'), error.message);
    process.exit(1);
  }
}
