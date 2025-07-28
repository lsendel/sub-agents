import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import { loadConfig, saveConfig } from '../utils/config.js';
import { loadAgent, formatAgentForInstall } from '../utils/agents.js';
import {
  getUserAgentsDir,
  getProjectAgentsDir,
  ensureDir,
} from '../utils/paths.js';
import { logger } from '../utils/logger.js';
import { validateAgentName } from '../utils/validation.js';
import { Errors, handleError } from '../utils/errors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Display update header
 */
function displayHeader() {
  logger.header('Claude Sub-Agents Manager');
  logger.info(chalk.blue.bold('Update Agent Configurations'));
}

/**
 * Get list of agents to update based on options
 */
async function getAgentsToUpdate(config, agentName, options) {
  if (
    !config.installedAgents ||
    Object.keys(config.installedAgents).length === 0
  ) {
    throw Errors.noAgentsInstalled();
  }

  if (options.all) {
    return Object.keys(config.installedAgents);
  }

  if (agentName) {
    if (!config.installedAgents[agentName]) {
      throw Errors.agentNotInstalled(agentName);
    }
    return [agentName];
  }

  // Interactive selection
  const choices = Object.entries(config.installedAgents).map(
    ([name, info]) => ({
      name: `${name} (${info.version || 'unknown'}) - ${info.scope}`,
      value: name,
      checked: true,
    }),
  );

  const answers = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'agents',
      message: 'Select agents to update:',
      choices,
      validate: (input) =>
        input.length > 0 || 'Please select at least one agent',
    },
  ]);

  return answers.agents;
}

/**
 * Confirm update operation
 */
async function confirmUpdate(agentsToUpdate, options) {
  if (options.force) {
    return true;
  }

  logger.info(chalk.cyan(`\nAgents to update: ${agentsToUpdate.join(', ')}`));

  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Proceed with update?',
      default: true,
    },
  ]);

  return confirm;
}

/**
 * Check if agent has custom modifications
 */
function hasCustomModifications(targetAgentFile) {
  if (!fs.existsSync(targetAgentFile)) {
    return false;
  }

  const currentContent = fs.readFileSync(targetAgentFile, 'utf8');
  return currentContent.includes('# Custom modifications below');
}

/**
 * Update a single agent
 */
async function updateSingleAgent(agent, config, options) {
  // Validate agent name
  const nameValidation = validateAgentName(agent);
  if (!nameValidation.valid) {
    throw new Error(nameValidation.error);
  }

  const agentInfo = config.installedAgents[agent];
  const sourceDir = path.join(__dirname, '..', '..', 'agents', agent);
  const targetDir =
    agentInfo.scope === 'project'
      ? getProjectAgentsDir(options.project)
      : getUserAgentsDir();

  // Check if source exists
  if (!fs.existsSync(sourceDir)) {
    throw new Error('Source not found');
  }

  // Load source agent
  const sourceAgent = await loadAgent(sourceDir);
  if (!sourceAgent) {
    throw new Error('Invalid source');
  }

  // Check for custom modifications
  const targetPath = path.join(targetDir, agent);
  const targetAgentFile = path.join(targetPath, 'agent.md');

  if (options.preserveCustom && hasCustomModifications(targetAgentFile)) {
    return { status: 'skipped', reason: 'Custom modifications' };
  }

  // Update agent files
  await updateAgentFiles(sourceAgent, targetPath, sourceDir);

  // Update config
  const metadata = sourceAgent.metadata;
  config.installedAgents[agent] = {
    ...agentInfo,
    version: metadata.version || '1.0.0',
    updatedAt: new Date().toISOString(),
  };

  return { status: 'updated', version: metadata.version };
}

/**
 * Update agent files
 */
async function updateAgentFiles(sourceAgent, targetPath, sourceDir) {
  // Format agent content
  const agentContent = formatAgentForInstall(sourceAgent);

  // Ensure directory exists
  ensureDir(targetPath);

  // Write updated agent.md
  const targetAgentFile = path.join(targetPath, 'agent.md');
  fs.writeFileSync(targetAgentFile, agentContent);

  // Update metadata.json
  const metadataPath = path.join(targetPath, 'metadata.json');
  const metadata = {
    ...sourceAgent.metadata,
    version: sourceAgent.metadata.version || '1.0.0',
    updatedAt: new Date().toISOString(),
  };
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

  // Copy hooks.json if exists
  const sourceHooks = path.join(sourceDir, 'hooks.json');
  if (fs.existsSync(sourceHooks)) {
    fs.copyFileSync(sourceHooks, path.join(targetPath, 'hooks.json'));
  }
}

/**
 * Update slash commands for updated agents
 */
async function updateSlashCommands(updatedAgents, options) {
  const commandsDir = options.project
    ? path.join(process.cwd(), '.claude', 'commands')
    : path.join(process.env.HOME, '.claude', 'commands');

  ensureDir(commandsDir);

  for (const agent of updatedAgents) {
    const sourceCommand = path.join(
      __dirname,
      '..',
      '..',
      'commands',
      `${agent.replace(/-/g, '')}.md`,
    );
    if (fs.existsSync(sourceCommand)) {
      const targetCommand = path.join(
        commandsDir,
        `${agent.replace(/-/g, '')}.md`,
      );
      fs.copyFileSync(sourceCommand, targetCommand);
    }
  }
}

/**
 * Display update summary
 */
function displaySummary(results) {
  logger.section('Update Summary');

  if (results.updated.length > 0) {
    logger.success(`Updated: ${results.updated.join(', ')}`);
  }

  if (results.skipped.length > 0) {
    logger.warn(
      `Skipped: ${results.skipped.map((s) => `${s.agent} (${s.reason})`).join(', ')}`,
    );
  }

  if (results.failed.length > 0) {
    logger.error(
      `Failed: ${results.failed.map((f) => `${f.agent} (${f.reason})`).join(', ')}`,
    );
  }
}

/**
 * Main update command
 */
export const updateCommand = {
  name: 'update [agent]',
  description: 'Update agent configurations from source',
  options: [
    ['-a, --all', 'Update all installed agents'],
    ['-p, --project', 'Update agents in project scope'],
    ['-f, --force', 'Force update without confirmation'],
    ['--preserve-custom', 'Preserve custom modifications'],
  ],
  action: async (agentName, options) => {
    const spinner = ora();

    try {
      displayHeader();

      const config = loadConfig(options.project);
      const agentsToUpdate = await getAgentsToUpdate(
        config,
        agentName,
        options,
      );

      if (!(await confirmUpdate(agentsToUpdate, options))) {
        logger.warn('Update cancelled.');
        return;
      }

      // Update each agent
      const results = {
        updated: [],
        failed: [],
        skipped: [],
      };

      for (const agent of agentsToUpdate) {
        spinner.start(`Updating ${agent}...`);

        try {
          const result = await updateSingleAgent(agent, config, options);

          if (result.status === 'updated') {
            spinner.succeed(`Updated ${agent} to version ${result.version}`);
            results.updated.push(agent);
          } else if (result.status === 'skipped') {
            spinner.info(`Skipped ${agent} (${result.reason})`);
            results.skipped.push({ agent, reason: result.reason });
          }
        } catch (error) {
          spinner.fail(`Failed to update ${agent}: ${error.message}`);
          results.failed.push({ agent, reason: error.message });
        }
      }

      // Save updated config
      saveConfig(config, options.project);

      // Update slash commands if needed
      if (results.updated.length > 0) {
        spinner.start('Updating slash commands...');
        try {
          await updateSlashCommands(results.updated, options);
          spinner.succeed('Slash commands updated');
        } catch (error) {
          spinner.fail(`Failed to update slash commands: ${error.message}`);
        }
      }

      displaySummary(results);

      if (results.updated.length > 0) {
        logger.success('\n✓ Update complete!');
        logger.info(
          chalk.cyan('Updated agents are ready to use in Claude Code.'),
        );
      }
    } catch (error) {
      spinner.stop();
      handleError(error, 'Update command');
    }
  },
};
