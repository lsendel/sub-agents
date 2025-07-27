import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import { loadConfig, saveConfig } from '../utils/config.js';
import { getAgentPath, loadAgent, formatAgentForInstall } from '../utils/agents.js';
import { getUserAgentsDir, getProjectAgentsDir, ensureDir } from '../utils/paths.js';
import { optimizeAgentForClaudeCode } from '../utils/agent-optimizer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const updateCommand = {
  name: 'update [agent]',
  description: 'Update agent configurations from source',
  options: [
    ['-a, --all', 'Update all installed agents'],
    ['-p, --project', 'Update agents in project scope'],
    ['-f, --force', 'Force update without confirmation'],
    ['--preserve-custom', 'Preserve custom modifications']
  ],
  action: async (agentName, options) => {
    console.log(chalk.blue.bold('\n╔═══════════════════════════════════════════╗'));
    console.log(chalk.blue.bold('║       Claude Sub-Agents Manager           ║'));
    console.log(chalk.blue.bold('║   Update Agent Configurations             ║'));
    console.log(chalk.blue.bold('╚═══════════════════════════════════════════╝\n'));

    const spinner = ora();
    const config = loadConfig(options.project);
    
    if (!config.installedAgents || Object.keys(config.installedAgents).length === 0) {
      console.log(chalk.yellow('No agents installed. Use "claude-agents install" first.'));
      return;
    }

    // Determine which agents to update
    let agentsToUpdate = [];
    
    if (options.all) {
      agentsToUpdate = Object.keys(config.installedAgents);
    } else if (agentName) {
      if (!config.installedAgents[agentName]) {
        console.log(chalk.red(`Agent "${agentName}" is not installed.`));
        return;
      }
      agentsToUpdate = [agentName];
    } else {
      // Interactive selection
      const choices = Object.entries(config.installedAgents).map(([name, info]) => ({
        name: `${name} (${info.version || 'unknown'}) - ${info.scope}`,
        value: name,
        checked: true
      }));

      const answers = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'agents',
          message: 'Select agents to update:',
          choices,
          validate: (input) => input.length > 0 || 'Please select at least one agent'
        }
      ]);

      agentsToUpdate = answers.agents;
    }

    // Confirm update
    if (!options.force) {
      console.log(chalk.cyan(`\nAgents to update: ${agentsToUpdate.join(', ')}`));
      
      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: 'Proceed with update?',
          default: true
        }
      ]);

      if (!confirm) {
        console.log(chalk.yellow('Update cancelled.'));
        return;
      }
    }

    // Update each agent
    const results = {
      updated: [],
      failed: [],
      skipped: []
    };

    for (const agent of agentsToUpdate) {
      spinner.start(`Updating ${agent}...`);
      
      try {
        const agentInfo = config.installedAgents[agent];
        const sourceDir = path.join(__dirname, '..', '..', 'agents', agent);
        const targetDir = agentInfo.scope === 'project' 
          ? getProjectAgentsDir(options.project)
          : getUserAgentsDir();

        // Check if source exists
        if (!fs.existsSync(sourceDir)) {
          spinner.fail(`Source not found for ${agent}`);
          results.failed.push({ agent, reason: 'Source not found' });
          continue;
        }

        // Load source agent
        const sourceAgent = await loadAgent(sourceDir);
        if (!sourceAgent) {
          spinner.fail(`Failed to load source for ${agent}`);
          results.failed.push({ agent, reason: 'Invalid source' });
          continue;
        }

        // Check if update is needed
        const targetPath = path.join(targetDir, agent);
        const targetAgentFile = path.join(targetPath, 'agent.md');
        
        if (options.preserveCustom && fs.existsSync(targetAgentFile)) {
          // Read current agent to check for custom modifications
          const currentContent = fs.readFileSync(targetAgentFile, 'utf8');
          if (currentContent.includes('# Custom modifications below')) {
            spinner.info(`Skipping ${agent} (has custom modifications)`);
            results.skipped.push({ agent, reason: 'Custom modifications' });
            continue;
          }
        }

        // Optimize and format agent
        const optimizedAgent = optimizeAgentForClaudeCode(sourceAgent);
        const agentContent = formatAgentForInstall(optimizedAgent);

        // Update agent files
        ensureDir(targetPath);
        
        // Write updated agent.md
        fs.writeFileSync(targetAgentFile, agentContent);

        // Update metadata.json
        const metadataPath = path.join(targetPath, 'metadata.json');
        const metadata = {
          ...sourceAgent.metadata,
          version: sourceAgent.metadata.version || '1.0.0',
          updatedAt: new Date().toISOString()
        };
        fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

        // Copy hooks.json if exists
        const sourceHooks = path.join(sourceDir, 'hooks.json');
        if (fs.existsSync(sourceHooks)) {
          fs.copyFileSync(sourceHooks, path.join(targetPath, 'hooks.json'));
        }

        // Update config
        config.installedAgents[agent] = {
          ...agentInfo,
          version: metadata.version,
          updatedAt: metadata.updatedAt
        };

        spinner.succeed(`Updated ${agent} to version ${metadata.version}`);
        results.updated.push(agent);

      } catch (error) {
        spinner.fail(`Failed to update ${agent}: ${error.message}`);
        results.failed.push({ agent, reason: error.message });
      }
    }

    // Save updated config
    saveConfig(config, options.project);

    // Summary
    console.log(chalk.cyan('\n=== Update Summary ==='));
    
    if (results.updated.length > 0) {
      console.log(chalk.green(`✓ Updated: ${results.updated.join(', ')}`));
    }
    
    if (results.skipped.length > 0) {
      console.log(chalk.yellow(`⚠ Skipped: ${results.skipped.map(s => `${s.agent} (${s.reason})`).join(', ')}`));
    }
    
    if (results.failed.length > 0) {
      console.log(chalk.red(`✗ Failed: ${results.failed.map(f => `${f.agent} (${f.reason})`).join(', ')}`));
    }

    // Update slash commands if needed
    if (results.updated.length > 0) {
      spinner.start('Updating slash commands...');
      
      try {
        const commandsDir = options.project
          ? path.join(process.cwd(), '.claude', 'commands')
          : path.join(process.env.HOME, '.claude', 'commands');
        
        ensureDir(commandsDir);

        for (const agent of results.updated) {
          const sourceCommand = path.join(__dirname, '..', '..', 'commands', `${agent.replace(/-/g, '')}.md`);
          if (fs.existsSync(sourceCommand)) {
            const targetCommand = path.join(commandsDir, `${agent.replace(/-/g, '')}.md`);
            fs.copyFileSync(sourceCommand, targetCommand);
          }
        }

        spinner.succeed('Slash commands updated');
      } catch (error) {
        spinner.fail(`Failed to update slash commands: ${error.message}`);
      }
    }

    console.log(chalk.green('\n✓ Update complete!'));
    
    if (results.updated.length > 0) {
      console.log(chalk.cyan('\nUpdated agents are ready to use in Claude Code.'));
    }
  }
};