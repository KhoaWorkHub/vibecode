import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import { themeManager, configManager, ThemePack } from '@vibecode/core';

interface CreateOptions {
  interactive?: boolean;
}

export async function createCommand(name?: string, options?: CreateOptions) {
  const spinner = ora();

  try {
    console.log(chalk.cyan('🎨 Creating a new custom theme...\n'));

    let themeName = name;
    let themeId: string;
    let description: string;
    let tags: string[];

    if (options?.interactive || !name) {
      // Interactive mode
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Theme name:',
          default: themeName || 'My Custom Theme',
          validate: (input) => (input.trim() ? true : 'Theme name is required'),
        },
        {
          type: 'input',
          name: 'id',
          message: 'Theme ID (lowercase, no spaces):',
          default: (answers: any) => answers.name.toLowerCase().replace(/\s+/g, '-'),
          validate: (input) => {
            if (!/^[a-z0-9-]+$/.test(input)) {
              return 'Theme ID must contain only lowercase letters, numbers, and hyphens';
            }
            return true;
          },
        },
        {
          type: 'input',
          name: 'description',
          message: 'Description:',
          default: 'A custom VibeCode theme',
        },
        {
          type: 'checkbox',
          name: 'tags',
          message: 'Select tags (space to select):',
          choices: [
            'dark',
            'light',
            'minimal',
            'vibrant',
            'neon',
            'pastel',
            'monochrome',
            'morning',
            'night',
            'hacker',
            'chill',
            'focus',
            'creative',
          ],
        },
        {
          type: 'confirm',
          name: 'useCurrentSettings',
          message: 'Use current VSCode settings as base?',
          default: true,
        },
      ]);

      themeName = answers.name;
      themeId = answers.id;
      description = answers.description;
      tags = answers.tags;

      // Get current settings if requested
      let settings = {};
      if (answers.useCurrentSettings) {
        spinner.start('Reading current VSCode settings...');
        settings = await configManager.readSettings();
        spinner.succeed('Current settings loaded');
      }

      // Build theme pack
      const theme: ThemePack = {
        id: themeId,
        name: themeName,
        description,
        tags,
        author: process.env.USER || 'Unknown',
        version: '1.0.0',
        extensions: [],
        settings,
      };

      // Prompt for extensions
      const { addExtensions } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'addExtensions',
          message: 'Add required extensions?',
          default: false,
        },
      ]);

      if (addExtensions) {
        const { extensions } = await inquirer.prompt([
          {
            type: 'input',
            name: 'extensions',
            message: 'Enter extension IDs (comma-separated):',
            filter: (input) =>
              input
                .split(',')
                .map((e: string) => e.trim())
                .filter((e: string) => e),
          },
        ]);
        theme.extensions = extensions;
      }

      // Save theme
      spinner.start('Saving theme...');
      await themeManager.saveTheme(theme);
      spinner.succeed('Theme saved successfully');

      console.log(chalk.green(`\n✨ Theme "${themeName}" created successfully!`));
      console.log(chalk.gray(`   ID: ${themeId}`));
      console.log(chalk.gray(`   Location: ~/.vibecode/custom-themes/${themeId}.vibe-pack.json`));
      console.log(chalk.cyan(`\nUse ${chalk.bold(`vibecode apply ${themeId}`)} to apply it.`));
    } else {
      // Quick create with current settings
      if (!themeName) {
        console.error(chalk.red('❌ Theme name is required'));
        process.exit(1);
      }

      themeId = themeName.toLowerCase().replace(/\s+/g, '-');

      spinner.start('Creating theme from current settings...');

      const settings = await configManager.readSettings();
      const theme: ThemePack = {
        id: themeId,
        name: themeName,
        description: `Custom theme: ${themeName}`,
        tags: ['custom'],
        author: process.env.USER || 'Unknown',
        version: '1.0.0',
        extensions: [],
        settings,
      };

      await themeManager.saveTheme(theme);
      spinner.succeed('Theme created successfully');

      console.log(chalk.green(`\n✨ Theme "${themeName}" created!`));
      console.log(chalk.cyan(`\nUse ${chalk.bold(`vibecode apply ${themeId}`)} to apply it.`));
    }
  } catch (error: any) {
    spinner.fail('Failed to create theme');
    console.error(chalk.red('❌ Error:'), error.message);
    process.exit(1);
  }
}
