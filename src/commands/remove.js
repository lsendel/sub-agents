import chalk from 'chalk';
import ora from 'ora';
import { unlinkSync, existsSync } from 'fs';
import { join } from 'path';
import { getAgentsDir, getCommandsDir } from '../utils/paths.js';
import { getInstalledAgents, removeInstalledAgent } from '../utils/config.js';
import { confirmAction } from '../utils/prompts.js';
import { getAgentDetails } from '../utils/agents.js';
import { logger } from '../utils/logger.js';
import { Errors, handleError } from '../utils/errors.js';
import { validateAgentName } from '../utils/validation.js';

export async function removeCommand(agentName, options) {
  const spinner = ora();
  
  try {
    // Get installed agents
    const installedAgents = getInstalledAgents();
    
    // Check if agent is installed
    if (!installedAgents[agentName]) {
      logger.error(`Agent "${agentName}" is not installed.`);
      logger.info(chalk.gray('Use "claude-agents list --installed" to see installed agents.'));
      throw Errors.agentNotInstalled(agentName);
    }
    
    // Get agent info
    const agentInfo = installedAgents[agentName];
    const isProject = options.project || agentInfo.scope === 'project';
    
    // Check if trying to remove from wrong scope
    if (options.project && agentInfo.scope === 'user') {
      logger.warn(`Agent "${agentName}" is installed in user scope, not project scope.`);
      logger.info(chalk.gray('Remove --project flag to uninstall from user scope.'));
      throw new Error('Scope mismatch');
    }
    
    if (!options.project && agentInfo.scope === 'project') {
      logger.warn(`Agent "${agentName}" is installed in project scope, not user scope.`);
      logger.info(chalk.gray('Add --project flag to uninstall from project scope.'));
      throw new Error('Scope mismatch');
    }
    
    // Validate agent name
    const nameValidation = validateAgentName(agentName);
    if (!nameValidation.valid) {
      throw new Error(nameValidation.error);
    }
    
    // Show agent details
    logger.info(chalk.bold(`\nAgent to remove: ${agentName}`));
    logger.info(`Scope: ${agentInfo.scope}`);
    logger.info(`Version: ${agentInfo.version || 'unknown'}`);
    logger.info(`Installed: ${new Date(agentInfo.installedAt).toLocaleDateString()}`);
    
    // Confirm removal
    const confirmMessage = `Are you sure you want to remove the "${agentName}" agent?`;
    if (!await confirmAction(confirmMessage, false)) {
      logger.warn('Removal cancelled.');
      return;
    }
    
    spinner.start(`Removing ${chalk.bold(agentName)}...`);
    
    // Get directories
    const agentsDir = getAgentsDir(isProject);
    const commandsDir = getCommandsDir(isProject);
    
    // Remove agent file
    const agentPath = join(agentsDir, `${agentName}.md`);
    if (existsSync(agentPath)) {
      unlinkSync(agentPath);
    }
    
    // Remove associated slash commands
    const agentDetails = getAgentDetails(agentName);
    if (agentDetails && agentDetails.commands && agentDetails.commands.length > 0) {
      for (const command of agentDetails.commands) {
        const commandPath = join(commandsDir, `${command}.md`);
        if (existsSync(commandPath)) {
          try {
            unlinkSync(commandPath);
          } catch (error) {
            // Ignore errors for command removal
          }
        }
      }
    }
    
    // Remove from config
    removeInstalledAgent(agentName, isProject);
    
    spinner.succeed(`Removed ${chalk.bold(agentName)}`);
    
    logger.info('');
    logger.success('Agent removed successfully!');
    logger.info(chalk.gray('The agent has been uninstalled from your system.'));
    
    // Suggest reinstallation
    logger.info('');
    logger.info(chalk.gray('To reinstall this agent, use:'));
    logger.info(chalk.gray(`claude-agents install ${agentName}`));
    
  } catch (error) {
    spinner.fail('Removal failed');
    handleError(error, 'Remove command');
  }
}