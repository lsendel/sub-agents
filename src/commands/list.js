import chalk from 'chalk';
import Table from 'cli-table3';
import { getAvailableAgents } from '../utils/agents.js';
import { getInstalledAgents, isAgentEnabled } from '../utils/config.js';
import { logger } from '../utils/logger.js';
export async function listCommand(options) {
  try {
    const availableAgents = getAvailableAgents();
    const installedAgents = getInstalledAgents();

    // Create table
    const table = new Table({
      head: [
        chalk.bold('Agent'),
        chalk.bold('Status'),
        chalk.bold('Scope'),
        chalk.bold('Version'),
        chalk.bold('Description'),
      ],
      colWidths: [20, 12, 10, 10, 50],
      wordWrap: true,
    });

    // Process agents
    const allAgents = new Map();

    // Add available agents
    if (availableAgents && Array.isArray(availableAgents)) {
      availableAgents.forEach((agent) => {
        allAgents.set(agent.name, {
          ...agent,
          available: true,
          installed: false,
        });
      });
    }

    // Update with installed agents
    Object.entries(installedAgents).forEach(([name, info]) => {
      const agent = allAgents.get(name) || {
        name,
        description: info.description,
      };
      agent.installed = true;
      agent.installedInfo = info;
      allAgents.set(name, agent);
    });

    // Filter based on options
    let agentsToShow = Array.from(allAgents.values());

    if (options.installed) {
      agentsToShow = agentsToShow.filter((a) => a.installed);
    } else if (options.available) {
      agentsToShow = agentsToShow.filter((a) => a.available && !a.installed);
    }

    // Sort by name
    agentsToShow.sort((a, b) => a.name.localeCompare(b.name));

    // Add to table
    agentsToShow.forEach((agent) => {
      let status = '';
      let scope = '-';
      let version = agent.version || '-';

      if (agent.installed) {
        const enabled = isAgentEnabled(agent.name);
        if (enabled) {
          status = chalk.green('✓ In Use');
        } else {
          status = chalk.yellow('⚠ Disabled');
        }
        scope = agent.installedInfo?.scope || 'unknown';
        version = agent.installedInfo?.version || version;
      } else {
        status = chalk.gray('Available');
      }

      table.push([
        chalk.bold(agent.name),
        status,
        scope,
        version,
        agent.description || '-',
      ]);
    });

    // Display results
    if (agentsToShow.length === 0) {
      if (options.installed) {
        logger.warn('No agents installed yet.');
        logger.info(
          chalk.gray('Use "claude-agents install" to install agents.'),
        );
      } else if (options.available) {
        logger.warn('No new agents available.');
      } else {
        logger.warn('No agents found.');
      }
    } else {
      logger.info(table.toString());

      // Show summary
      logger.info('');
      const installedCount = agentsToShow.filter((a) => a.installed).length;
      const availableCount = agentsToShow.filter((a) => !a.installed).length;
      const enabledCount = agentsToShow.filter(
        (a) => a.installed && isAgentEnabled(a.name),
      ).length;

      if (!options.installed && !options.available) {
        logger.info(chalk.gray(`Total: ${agentsToShow.length} agents`));
        logger.info(
          chalk.gray(`Installed: ${installedCount} (${enabledCount} enabled)`),
        );
        logger.info(chalk.gray(`Available: ${availableCount}`));
      }
    }
  } catch (error) {
    logger.error('Error:', error.message);
    throw error;
  }
}
