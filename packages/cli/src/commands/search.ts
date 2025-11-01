import chalk from 'chalk';
import Table from 'cli-table3';
import { themeManager } from '@vibecode/core';

export async function searchCommand(query: string) {
  try {
    console.log(chalk.cyan(`🔍 Searching for: "${query}"...\n`));

    const themes = await themeManager.searchThemes(query);

    if (themes.length === 0) {
      console.log(chalk.yellow('No themes found matching your query.'));
      console.log(chalk.gray(`\nTry using ${chalk.cyan('vibecode list')} to see all themes.`));
      return;
    }

    const table = new Table({
      head: [chalk.cyan('Name'), chalk.cyan('ID'), chalk.cyan('Description'), chalk.cyan('Tags')],
      style: { head: [], border: [] },
      wordWrap: true,
      colWidths: [20, 18, 35, 25],
    });

    themes.forEach((theme) => {
      table.push([theme.name, theme.id, theme.description, theme.tags.join(', ')]);
    });

    console.log(table.toString());
    console.log(chalk.green(`\n✨ Found ${themes.length} matching theme(s)`));
    console.log(chalk.gray(`\nUse ${chalk.cyan('vibecode apply <theme-id>')} to apply a theme`));
  } catch (error: any) {
    console.error(chalk.red('❌ Error searching themes:'), error.message);
    process.exit(1);
  }
}
