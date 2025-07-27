import chalk from 'chalk';
import { getInstalledAgents, disableAgent, isAgentEnabled } from '../utils/config.js';
import { logger } from '../utils/logger.js';
import { Errors, handleError } from '../utils/errors.js';

export async function disableCommand(agentName, options) {
  try {
    const installedAgents = getInstalledAgents();
    
    // Check if agent is installed
    if (!installedAgents[agentName]) {
      logger.error(`❌ Agent "${agentName}" is not installed.`);
      logger.info(chalk.gray('\nTo see installed agents:'));
      logger.info(chalk.cyan('  claude-agents list --installed'));
      logger.info(chalk.gray('\nTo install this agent:'));
      logger.info(chalk.cyan(`  claude-agents install ${agentName}`));
      throw Errors.agentNotInstalled(agentName);
    }
    
    // Check if already disabled
    if (!isAgentEnabled(agentName)) {
      logger.warn(`Agent "${agentName}" is already disabled.`);
      return;
    }
    
    // Disable the agent
    const isProject = options.project || installedAgents[agentName].scope === 'project';
    const success = disableAgent(agentName, isProject);
    
    if (success) {
      logger.success(`Disabled agent "${agentName}"`);
      logger.info(chalk.gray(`Scope: ${isProject ? 'project' : 'user'}`));
      logger.info(chalk.gray(`Use "claude-agents enable ${agentName}" to re-enable.`));
    } else {
      throw new Error(`Failed to disable agent "${agentName}"`);
    }
    
  } catch (error) {
    handleError(error, 'Disable command');
  }
}