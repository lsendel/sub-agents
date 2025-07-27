import chalk from 'chalk';
import ora from 'ora';
import { writeFileSync, copyFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { 
  getAgentsDir, 
  getCommandsDir, 
  ensureDirectories, 
  ensureProjectDirectories 
} from '../utils/paths.js';
import { 
  selectAgents, 
  confirmAction, 
  selectInstallScope
} from '../utils/prompts.js';
import { 
  addInstalledAgent, 
  getInstalledAgents 
} from '../utils/state-manager.js';
import { getAvailableAgents } from '../utils/agents.js';
import { optimizeAgentForClaudeCode } from '../utils/agent-optimizer.js';
import { addGitignoreToAgent } from '../utils/gitignore.js';
import { 
  validateAgentName, 
  validateCommandOptions,
  validateAgentMetadata,
  sanitizeInput 
} from '../utils/validation.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function installCommand(options) {
  const spinner = ora();
  
  try {
    // Validate command options
    const optionsValidation = validateCommandOptions(options, ['project', 'all']);
    if (!optionsValidation.valid) {
      console.error(chalk.red(`Error: ${optionsValidation.error}`));
      return;
    }

    // Ensure directories exist
    ensureDirectories();
    
    // Get available agents
    spinner.start('Loading available agents...');
    const availableAgents = getAvailableAgents();
    spinner.stop();
    
    if (availableAgents.length === 0) {
      console.log(chalk.yellow('No agents available to install.'));
      return;
    }
    
    // Validate all available agents
    const validAgents = [];
    for (const agent of availableAgents) {
      const metadataValidation = validateAgentMetadata(agent);
      if (!metadataValidation.valid) {
        console.warn(chalk.yellow(`Skipping invalid agent ${agent.name}:`));
        metadataValidation.errors.forEach(err => console.warn(chalk.yellow(`  - ${err}`)));
        continue;
      }
      validAgents.push(agent);
    }

    if (validAgents.length === 0) {
      console.log(chalk.yellow('No valid agents available to install.'));
      return;
    }
    
    // Filter already installed agents
    const installedAgents = getInstalledAgents();
    const newAgents = validAgents.filter(agent => !installedAgents[agent.name]);
    
    if (newAgents.length === 0) {
      console.log(chalk.green('✓ All agents are already installed!'));
      return;
    }
    
    // Select agents to install
    let selectedAgents = [];
    
    if (options.all) {
      selectedAgents = newAgents;
    } else {
      selectedAgents = await selectAgents(newAgents);
      
      if (selectedAgents.length === 0) {
        console.log(chalk.yellow('No agents selected.'));
        return;
      }
    }
    
    // Validate selected agent names
    for (const agent of selectedAgents) {
      const nameValidation = validateAgentName(agent.name);
      if (!nameValidation.valid) {
        console.error(chalk.red(`Invalid agent name '${agent.name}': ${nameValidation.error}`));
        return;
      }
    }
    
    // Select installation scope
    const scope = options.project ? 'project' : await selectInstallScope();
    
    if (scope === 'project') {
      ensureProjectDirectories();
    }
    
    // Show summary and confirm
    console.log(chalk.cyan('\nInstallation Summary:'));
    console.log(chalk.cyan('===================='));
    console.log(`Agents to install: ${selectedAgents.map(a => chalk.bold(a.name)).join(', ')}`);
    console.log(`Installation scope: ${chalk.bold(scope)}`);
    console.log(`Target directory: ${chalk.bold(getAgentsDir(scope === 'project'))}`);
    
    const proceed = await confirmAction('Proceed with installation?');
    
    if (!proceed) {
      console.log(chalk.yellow('Installation cancelled.'));
      return;
    }
    
    // Install agents
    console.log('');
    
    for (const agent of selectedAgents) {
      spinner.start(`Installing ${agent.name}...`);
      
      try {
        const agentName = sanitizeInput(agent.name);
        const agentDir = join(getAgentsDir(scope === 'project'), agentName);
        const commandsDir = getCommandsDir(scope === 'project');
        
        // Create agent directory
        if (!existsSync(agentDir)) {
          const fs = await import('fs');
          fs.mkdirSync(agentDir, { recursive: true });
        }
        
        // Optimize agent for Claude Code
        const optimizedAgent = optimizeAgentForClaudeCode(agent);
        
        // Add gitignore awareness
        const agentWithGitignore = await addGitignoreToAgent(optimizedAgent);
        
        // Write agent.md with optimized content
        const agentPath = join(agentDir, 'agent.md');
        writeFileSync(agentPath, agentWithGitignore.content || agentWithGitignore.fullContent);
        
        // Write metadata.json
        const metadataPath = join(agentDir, 'metadata.json');
        const metadata = {
          name: agentName,
          description: agent.description,
          version: agent.version || '1.0.0',
          author: agent.author || 'Unknown',
          tags: agent.tags || [],
          requirements: agent.requirements || {},
          installedAt: new Date().toISOString(),
          scope
        };
        writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
        
        // Copy hooks.json if exists
        const sourceHooksPath = join(__dirname, '..', '..', 'agents', agentName, 'hooks.json');
        if (existsSync(sourceHooksPath)) {
          const targetHooksPath = join(agentDir, 'hooks.json');
          copyFileSync(sourceHooksPath, targetHooksPath);
        }
        
        // Install slash command if exists
        const commandName = agentName.replace(/-/g, '');
        const sourceCommandPath = join(__dirname, '..', '..', 'commands', `${commandName}.md`);
        
        if (existsSync(sourceCommandPath)) {
          if (!existsSync(commandsDir)) {
            const fs = await import('fs');
            fs.mkdirSync(commandsDir, { recursive: true });
          }
          
          const targetCommandPath = join(commandsDir, `${commandName}.md`);
          copyFileSync(sourceCommandPath, targetCommandPath);
        }
        
        // Update state
        addInstalledAgent(agentName, {
          version: metadata.version,
          scope,
          installedAt: metadata.installedAt,
          enabled: true
        });
        
        spinner.succeed(`Installed ${chalk.green(agentName)}`);
        
      } catch (error) {
        spinner.fail(`Failed to install ${agent.name}: ${error.message}`);
        console.error(chalk.red(error.stack));
      }
    }
    
    console.log(chalk.green('\n✓ Installation complete!'));
    console.log(chalk.cyan('Your agents are ready to use in Claude Code.'));
    
  } catch (error) {
    spinner.fail('Installation failed');
    console.error(chalk.red(error.stack));
    process.exit(1);
  }
}