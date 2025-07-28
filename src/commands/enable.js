import chalk from 'chalk';
import {
  getInstalledAgents,
  enableAgent,
  isAgentEnabled,
} from '../utils/config.js';
import { logger } from '../utils/logger.js';
import { Errors, handleError } from '../utils/errors.js';

export async function enableCommand(agentName, options) {
  try {
    const installedAgents = getInstalledAgents();

    // Check if agent is installed
    if (!installedAgents[agentName]) {
      logger.error(`❌ Agent "${agentName}" is not installed.`);
      logger.info(chalk.gray('\nTo see available agents:'));
      logger.info(chalk.cyan('  claude-agents list'));
      logger.info(chalk.gray('\nTo install this agent:'));
      logger.info(chalk.cyan(`  claude-agents install ${agentName}`));
      throw Errors.agentNotInstalled(agentName);
    }

    // Check if already enabled
    if (isAgentEnabled(agentName)) {
      logger.warn(`Agent "${agentName}" is already enabled.`);
      return;
    }

    // Enable the agent
    const isProject =
      options.project || installedAgents[agentName].scope === 'project';
    const success = enableAgent(agentName, isProject);

    if (success) {
      logger.success(`Enabled agent "${agentName}"`);
      logger.info(chalk.gray(`Scope: ${isProject ? 'project' : 'user'}`));
    } else {
      throw new Error(`Failed to enable agent "${agentName}"`);
    }
  } catch (error) {
    handleError(error, 'Enable command');
  }
}
