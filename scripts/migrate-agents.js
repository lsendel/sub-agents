#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import ora from 'ora';
import { getAgentDetails } from '../src/utils/agents.js';
import { optimizeAgentForClaudeCode } from '../src/utils/agent-optimizer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spinner = ora();

console.log(chalk.blue(`
╔═══════════════════════════════════════════╗
║        Agent Migration Tool               ║
║   Update agents for better Claude Code    ║
║          compatibility                    ║
╚═══════════════════════════════════════════╝
`));

// Get all agents
const agentsDir = join(__dirname, '..', 'agents');
const agentDirs = readdirSync(agentsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

console.log(`Found ${agentDirs.length} agents to migrate\n`);

// Process each agent
for (const agentName of agentDirs) {
  spinner.start(`Migrating ${chalk.bold(agentName)}...`);
  
  try {
    // Load agent details
    const agentDetails = getAgentDetails(agentName);
    if (!agentDetails) {
      spinner.fail(`Failed to load ${agentName}`);
      continue;
    }
    
    // Generate optimized content
    const optimizedContent = optimizeAgentForClaudeCode(agentDetails);
    
    // Create improved version
    const improvedPath = join(agentsDir, agentName, 'agent-improved.md');
    writeFileSync(improvedPath, optimizedContent);
    
    spinner.succeed(`Migrated ${chalk.bold(agentName)} → ${chalk.green('agent-improved.md')}`);
    
    // Show what changed
    const originalDesc = agentDetails.frontmatter?.description || agentDetails.metadata?.description;
    const improvedDesc = optimizedContent.match(/description: (.+)/)?.[1];
    
    if (originalDesc !== improvedDesc) {
      console.log(chalk.gray(`  Description: ${improvedDesc}`));
    }
    
  } catch (error) {
    spinner.fail(`Failed to migrate ${agentName}: ${error.message}`);
  }
}

console.log(`\n${chalk.green('✓')} Migration complete!`);
console.log(chalk.gray('\nNext steps:'));
console.log(chalk.gray('1. Review the agent-improved.md files'));
console.log(chalk.gray('2. If satisfied, replace agent.md with the improved version'));
console.log(chalk.gray('3. Test the agents in Claude Code'));