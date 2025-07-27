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
  selectInstallScope,
  selectHookOptions
} from '../utils/prompts.js';
import { 
  addInstalledAgent, 
  getInstalledAgents 
} from '../utils/config.js';
import { 
  getAvailableAgents, 
  getAgentDetails
} from '../utils/agents.js';
import { 
  optimizeAgentForClaudeCode,
  validateAgentFormat
} from '../utils/agent-optimizer.js';
import { validateAgentName } from '../utils/validation.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function installCommand(agentNames, options) {
  const spinner = ora();
  
  try {
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
    
    // Get already installed agents
    const installedAgents = getInstalledAgents();
    const installedNames = Object.keys(installedAgents);
    
    // Filter out already installed agents
    const installableAgents = availableAgents.filter(
      agent => !installedNames.includes(agent.name)
    );
    
    if (installableAgents.length === 0) {
      console.log(chalk.yellow('All available agents are already installed.'));
      console.log(chalk.gray('Use "claude-agents list" to see installed agents.'));
      return;
    }
    
    // Select agents to install
    let selectedAgents;
    if (agentNames && agentNames.length > 0) {
      // Filter specified agents from available agents
      selectedAgents = agentNames.filter(name => 
        installableAgents.some(agent => agent.name === name)
      );
      
      // Warn about agents not found
      const notFound = agentNames.filter(name => 
        !installableAgents.some(agent => agent.name === name)
      );
      if (notFound.length > 0) {
        console.log(chalk.yellow(`Agents not found: ${notFound.join(', ')}`));
      }
    } else if (options.all) {
      selectedAgents = installableAgents.map(a => a.name);
    } else {
      selectedAgents = await selectAgents(installableAgents);
    }
    
    if (selectedAgents.length === 0) {
      console.log(chalk.yellow('No agents selected for installation.'));
      return;
    }
    
    // Select installation scope
    const scope = options.project ? 'project' : 
      (agentNames && agentNames.length > 0) ? 'user' : 
        await selectInstallScope();
    const isProject = scope === 'project';
    
    if (isProject) {
      ensureProjectDirectories();
    }
    
    const agentsDir = getAgentsDir(isProject);
    const commandsDir = getCommandsDir(isProject);
    
    // Confirm installation (skip if specific agents were requested)
    if (!(agentNames && agentNames.length > 0)) {
      const confirmMessage = `Install ${selectedAgents.length} agent(s) to ${scope} directory?`;
      if (!await confirmAction(confirmMessage)) {
        console.log(chalk.yellow('Installation cancelled.'));
        return;
      }
    }
    
    // Install each selected agent
    console.log('');
    for (const agentName of selectedAgents) {
      spinner.start(`Installing ${chalk.bold(agentName)}...`);
      
      try {
        // Validate agent name for security
        const nameValidation = validateAgentName(agentName);
        if (!nameValidation.valid) {
          spinner.fail(`Invalid agent name: ${nameValidation.error}`);
          continue;
        }
        
        const agentDetails = getAgentDetails(agentName);
        if (!agentDetails) {
          spinner.fail(`Failed to load agent ${agentName}`);
          continue;
        }
        
        // Validate agent format
        const validation = validateAgentFormat(agentDetails);
        if (!validation.valid) {
          spinner.warn(`Agent ${agentName} has issues: ${validation.errors.join(', ')}`);
        }
        
        // Write agent file with optimized format for Claude Code
        const agentPath = join(agentsDir, `${agentName}.md`);
        const optimizedContent = optimizeAgentForClaudeCode(agentDetails);
        writeFileSync(agentPath, optimizedContent);
        
        // Copy associated slash commands if they exist
        if (agentDetails.commands && agentDetails.commands.length > 0) {
          for (const command of agentDetails.commands) {
            const srcPath = join(__dirname, '..', '..', 'commands', `${command}.md`);
            if (existsSync(srcPath)) {
              const destPath = join(commandsDir, `${command}.md`);
              copyFileSync(srcPath, destPath);
            }
          }
        }
        
        // Add to config
        addInstalledAgent(agentName, agentDetails, isProject);
        
        spinner.succeed(`Installed ${chalk.bold(agentName)}`);
        
        // Ask about hooks configuration
        if (agentDetails.hooks?.recommended || agentDetails.hooks?.optional) {
          const hooks = await selectHookOptions();
          if (hooks && hooks.length > 0) {
            console.log(chalk.gray('  Configure hooks manually in your settings.json'));
          }
        }
        
      } catch (error) {
        spinner.fail(`Failed to install ${agentName}: ${error.message}`);
      }
    }
    
    console.log('');
    console.log(chalk.green('✓ Installation complete!'));
    console.log(chalk.gray('Use "claude-agents list" to see your installed agents.'));
    console.log(chalk.gray('Agents are automatically enabled. Use "claude-agents disable <agent>" to disable.'));
    
  } catch (error) {
    spinner.fail('Installation failed');
    console.error(chalk.red('Error:'), error.message);
    process.exit(1);
  }
}