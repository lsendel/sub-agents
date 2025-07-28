import chalk from 'chalk';
import ora from 'ora';
import {
  removeDeprecatedAgents,
  AGENT_REPLACEMENTS,
} from '../utils/agent-updater.js';
import { confirmAction } from '../utils/prompts.js';
import { logger } from '../utils/logger.js';

/**
 * Cleanup command to remove deprecated agents
 */
export async function cleanupCommand(options) {
  const spinner = ora();

  try {
    console.log(chalk.blue.bold('\n🧹 Agent Cleanup Tool\n'));

    // First, do a dry run to show what will be removed
    spinner.start('Scanning for deprecated agents...');
    const dryRunSummary = removeDeprecatedAgents(true);
    spinner.stop();

    if (dryRunSummary.removed.length === 0) {
      console.log(
        chalk.green('✓ No deprecated agents found. Your setup is up to date!'),
      );
      return;
    }

    // Show deprecated agents that will be removed
    console.log(
      chalk.yellow(
        `Found ${dryRunSummary.removed.length} deprecated agent(s):\n`,
      ),
    );

    for (const agent of dryRunSummary.removed) {
      console.log(chalk.red(`  • ${agent.name} (${agent.scope})`));
      const replacement = AGENT_REPLACEMENTS[agent.name];
      if (replacement) {
        console.log(chalk.gray(`    → Replaced by: ${replacement}`));
      } else {
        console.log(
          chalk.gray(
            '    → No direct replacement (functionality may be in other agents)',
          ),
        );
      }
    }

    console.log('');
    console.log(
      chalk.yellow(
        'These deprecated agents are from older versions and should be removed.',
      ),
    );
    console.log(
      chalk.gray(
        'The new agents provide improved functionality and better integration.\n',
      ),
    );

    // Confirm removal
    if (!options.force) {
      const confirmed = await confirmAction(
        'Remove all deprecated agents?',
        true,
      );

      if (!confirmed) {
        console.log(chalk.yellow('Cleanup cancelled.'));
        return;
      }
    }

    // Perform the actual cleanup
    spinner.start('Removing deprecated agents...');
    const actualSummary = removeDeprecatedAgents(false);

    if (actualSummary.errors.length > 0) {
      spinner.fail(
        `Cleanup completed with ${actualSummary.errors.length} error(s)`,
      );
      for (const error of actualSummary.errors) {
        console.error(chalk.red(`  ✗ ${error.name}: ${error.error}`));
      }
    } else {
      spinner.succeed('Successfully removed all deprecated agents');
    }

    // Show summary
    console.log('');
    console.log(chalk.bold('Summary:'));
    console.log(
      `  • Removed: ${chalk.green(actualSummary.removed.length)} agent(s)`,
    );
    console.log(
      `  • Config cleaned: ${actualSummary.configCleaned ? chalk.green('Yes') : chalk.gray('No')}`,
    );

    if (actualSummary.removed.length > 0) {
      console.log('');
      console.log(
        chalk.cyan(
          '💡 Tip: Run "claude-agents install" to see available replacement agents',
        ),
      );
    }
  } catch (error) {
    spinner.fail('Cleanup failed');
    logger.error(error.message);
    throw error;
  }
}

// Command configuration for commander
export const cleanupCommandConfig = {
  command: 'cleanup',
  description: 'Remove deprecated agents and clean up configuration',
  options: [['-f, --force', 'Skip confirmation prompt']],
  action: cleanupCommand,
};
