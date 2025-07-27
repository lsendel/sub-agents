import chalk from 'chalk';
import ora from 'ora';
import { existsSync } from 'fs';
import { join } from 'path';
import inquirer from 'inquirer';
import { getAgentsDir } from '../utils/paths.js';
import { getInstalledAgents } from '../utils/config.js';
import { 
  analyzeAgentDescriptions, 
  updateAgentDescription,
  validateDescription 
} from '../utils/description-optimizer.js';

export async function optimizeCommand(agentName, options) {
  const spinner = ora();
  
  try {
    console.log(chalk.blue.bold('\n🔧 Agent Description Optimizer\n'));
    
    // Get installed agents
    const installedAgents = getInstalledAgents();
    const agentNames = Object.keys(installedAgents);
    
    if (agentNames.length === 0) {
      console.log(chalk.yellow('No agents installed to optimize.'));
      return;
    }
    
    // If specific agent requested
    if (agentName) {
      if (!installedAgents[agentName]) {
        console.log(chalk.red(`Agent "${agentName}" not found.`));
        return;
      }
      await optimizeAgent(agentName, installedAgents[agentName], options);
      return;
    }
    
    // Analyze all agents
    spinner.start('Analyzing agent descriptions...');
    const agents = agentNames.map(name => ({
      name,
      ...installedAgents[name]
    }));
    
    const suggestions = analyzeAgentDescriptions(agents);
    spinner.stop();
    
    if (suggestions.length === 0) {
      console.log(chalk.green('✓ All agent descriptions are already well-optimized!'));
      return;
    }
    
    // Show analysis results
    console.log(`Found ${chalk.yellow(suggestions.length)} agent(s) that could be improved:\n`);
    
    for (const suggestion of suggestions) {
      console.log(chalk.bold(`📝 ${suggestion.name}`));
      console.log(chalk.gray('  Current:  ') + suggestion.current);
      console.log(chalk.green('  Suggested: ') + suggestion.suggested);
      console.log(chalk.gray(`  Trigger score: ${(suggestion.triggerScore * 100).toFixed(0)}%\n`));
    }
    
    // Interactive mode - let user choose what to optimize
    if (!options.all && !options.auto) {
      const { selectedAgents } = await inquirer.prompt([{
        type: 'checkbox',
        name: 'selectedAgents',
        message: 'Select agents to optimize:',
        choices: suggestions.map(s => ({
          name: `${s.name} - ${s.suggested.substring(0, 60)}...`,
          value: s.name,
          checked: true
        }))
      }]);
      
      if (selectedAgents.length === 0) {
        console.log(chalk.yellow('No agents selected.'));
        return;
      }
      
      // Optimize selected agents
      for (const agentName of selectedAgents) {
        const suggestion = suggestions.find(s => s.name === agentName);
        await applyOptimization(agentName, suggestion.suggested, options);
      }
    } else {
      // Auto mode - optimize all
      for (const suggestion of suggestions) {
        await applyOptimization(suggestion.name, suggestion.suggested, options);
      }
    }
    
    console.log(chalk.green('\n✓ Optimization complete!'));
    console.log(chalk.gray('Agent descriptions have been updated for better auto-delegation.'));
    
  } catch (error) {
    spinner.fail('Optimization failed');
    console.error(chalk.red('Error:'), error.message);
    process.exit(1);
  }
}

/**
 * Optimize a single agent
 */
async function optimizeAgent(agentName, agentData, options) {
  const currentDesc = agentData.frontmatter?.description || agentData.description;
  
  // Validate current description
  const validation = validateDescription(currentDesc, agentName);
  
  console.log(chalk.bold(`\nAnalyzing ${agentName}...\n`));
  console.log('Current description:');
  console.log(chalk.gray(`  ${currentDesc || '(none)'}`));
  
  if (validation.valid) {
    console.log(chalk.green('\n✓ Description is already well-optimized!'));
    console.log(chalk.gray(`  Quality score: ${(validation.score * 100).toFixed(0)}%`));
    return;
  }
  
  // Show issues
  console.log(chalk.yellow('\nIssues found:'));
  validation.issues.forEach(issue => {
    console.log(chalk.yellow(`  • ${issue}`));
  });
  
  // Get suggestion
  const agents = [{ name: agentName, ...agentData }];
  const suggestions = analyzeAgentDescriptions(agents);
  
  if (suggestions.length === 0) {
    console.log(chalk.gray('\nNo optimization needed.'));
    return;
  }
  
  const suggestion = suggestions[0];
  console.log(chalk.green('\nSuggested improvement:'));
  console.log(chalk.green(`  ${suggestion.suggested}`));
  
  // Apply if confirmed or auto mode
  if (options.auto || await confirmOptimization()) {
    await applyOptimization(agentName, suggestion.suggested, options);
  }
}

/**
 * Apply optimization to agent file
 */
async function applyOptimization(agentName, newDescription) {
  const spinner = ora(`Updating ${agentName}...`).start();
  
  try {
    // Check both user and project directories
    const userPath = join(getAgentsDir(false), `${agentName}.md`);
    const projectPath = join(getAgentsDir(true), `${agentName}.md`);
    
    let updated = false;
    
    if (existsSync(userPath)) {
      updateAgentDescription(userPath, newDescription);
      updated = true;
    }
    
    if (existsSync(projectPath)) {
      updateAgentDescription(projectPath, newDescription);
      updated = true;
    }
    
    if (updated) {
      spinner.succeed(`Updated ${agentName}`);
    } else {
      spinner.fail(`Agent file not found for ${agentName}`);
    }
  } catch (error) {
    spinner.fail(`Failed to update ${agentName}: ${error.message}`);
  }
}

/**
 * Confirm optimization
 */
async function confirmOptimization() {
  const { confirmed } = await inquirer.prompt([{
    type: 'confirm',
    name: 'confirmed',
    message: 'Apply this optimization?',
    default: true
  }]);
  
  return confirmed;
}

// Command configuration for commander
export const optimizeCommandConfig = {
  command: 'optimize [agent]',
  description: 'Optimize agent descriptions for better auto-delegation',
  options: [
    ['-a, --all', 'Optimize all agents without prompting'],
    ['--auto', 'Apply optimizations without confirmation'],
    ['-v, --validate', 'Only validate descriptions without changing']
  ],
  action: optimizeCommand
};