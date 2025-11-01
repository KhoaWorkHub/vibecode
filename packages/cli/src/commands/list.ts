import chalk from 'chalk';
import Table from 'cli-table3';
import { themeManager } from '@vibecode/core';

interface ListOptions {
  tags?: string;
  detailed?: boolean;
}

export async function listCommand(options: ListOptions) {
  try {
    console.log(chalk.cyan('📋 Loading themes...\n'));

    let themes = await themeManager.loadThemes();

    // Filter by tags if provided
    if (options.tags) {
      const tags = options.tags.split(',').map((t) => t.trim());
      themes = await themeManager.filterByTags(tags);
      console.log(chalk.gray(`Filtering by tags: ${tags.join(', ')}\n`));
    }

    if (themes.length === 0) {
      console.log(chalk.yellow('No themes found.'));
      return;
    }

    if (options.detailed) {
      // Detailed view
      themes.forEach((theme, index) => {
        console.log(chalk.bold.cyan(`${index + 1}. ${theme.name}`));
        console.log(chalk.gray(`   ID: ${theme.id}`));
        console.log(chalk.gray(`   Description: ${theme.description}`));
        console.log(chalk.gray(`   Tags: ${theme.tags.join(', ')}`));
        console.log(chalk.gray(`   Extensions: ${theme.extensions.length} required`));
        if (theme.author) {
          console.log(chalk.gray(`   Author: ${theme.author}`));
        }
        console.log('');
      });
    } else {
      // Table view
      const table = new Table({
        head: [
          chalk.cyan('Name'),
          chalk.cyan('ID'),
          chalk.cyan('Tags'),
          chalk.cyan('Extensions'),
        ],
        style: { head: [], border: [] },
        wordWrap: true,
        colWidths: [25, 20, 30, 12],
      });

      themes.forEach((theme) => {
        table.push([
          theme.name,
          theme.id,
          theme.tags.join(', '),
          theme.extensions.length.toString(),
        ]);
      });

      console.log(table.toString());
    }

    console.log(chalk.green(`\n✨ Found ${themes.length} theme(s)`));
    console.log(chalk.gray(`\nTip: Use ${chalk.cyan('vibecode apply <theme-id>')} to apply a theme`));
  } catch (error: any) {
    console.error(chalk.red('❌ Error listing themes:'), error.message);
    process.exit(1);
  }
}
