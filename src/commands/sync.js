import chalk from 'chalk';
import ora from 'ora';
import { readdirSync, readFileSync, existsSync, writeFileSync, mkdirSync, copyFileSync } from 'fs';
import { join, basename, dirname } from 'path';
import yaml from 'yaml';
import { fileURLToPath } from 'url';
import { 
  getAgentsDir, 
  getCommandsDir,
  ensureDirectories 
} from '../utils/paths.js';
import { 
  getInstalledAgents,
  addInstalledAgent
} from '../utils/config.js';
import { logger } from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Get the project root directory (where package.json is)
 */
function getProjectRoot() {
  return join(__dirname, '..', '..');
}

/**
 * Copy agent files to project directory
 */
async function copyAgentToProject(agent) {
  const projectRoot = getProjectRoot();
  const projectAgentsDir = join(projectRoot, 'agents', agent.name);
  const projectCommandsDir = join(projectRoot, 'commands');
  
  try {
    // Create agent directory
    mkdirSync(projectAgentsDir, { recursive: true });
    
    // Copy agent.md file
    const agentTargetPath = join(projectAgentsDir, 'agent.md');
    writeFileSync(agentTargetPath, agent.fullContent || readFileSync(agent.path, 'utf-8'));
    
    // Create metadata.json
    const metadata = {
      name: agent.name,
      version: '1.0.0',
      description: agent.frontmatter.description || `${agent.name} agent`,
      author: 'External',
      tags: agent.frontmatter.tags || [],
      requirements: {
        tools: agent.frontmatter.tools ? 
          agent.frontmatter.tools.split(',').map(t => t.trim()) : 
          []
      },
      compatible_with: ['claude-code@>=1.0.0']
    };
    
    const metadataPath = join(projectAgentsDir, 'metadata.json');
    writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    
    // Look for corresponding command file in user directory
    const userCommandsDir = getCommandsDir(false);
    const possibleCommands = [];
    
    logger.debug(`Looking for commands for agent ${agent.name} in ${userCommandsDir}`);
    
    // Check for command with agent name
    const commandPath = join(userCommandsDir, `${agent.name}.md`);
    if (existsSync(commandPath)) {
      possibleCommands.push({ name: agent.name, path: commandPath });
      logger.debug(`Found command: ${agent.name}.md`);
    }
    
    // Check for common command variations
    const variations = [
      agent.name.replace(/-/g, ''),  // Remove hyphens
      agent.name.split('-')[0],      // First part only
      agent.name.split('-').pop()    // Last part only
    ];
    
    // For single-word agents, also check for shortened versions
    if (!agent.name.includes('-')) {
      // Try common single-word command patterns
      const singleWordVariations = [
        agent.name.replace(/er$/, ''),     // Remove 'er' suffix (debugger -> debug)
        agent.name.replace(/or$/, ''),     // Remove 'or' suffix 
        agent.name.replace(/ist$/, ''),    // Remove 'ist' suffix
        agent.name.substring(0, 4),        // First 4 chars
        agent.name.substring(0, 5)         // First 5 chars
      ];
      variations.push(...singleWordVariations);
    }
    
    // Remove duplicates
    const uniqueVariations = [...new Set(variations)];
    
    logger.debug(`Checking variations: ${uniqueVariations.join(', ')}`);
    
    for (const variant of uniqueVariations) {
      const variantPath = join(userCommandsDir, `${variant}.md`);
      if (existsSync(variantPath) && !possibleCommands.find(c => c.path === variantPath)) {
        possibleCommands.push({ name: variant, path: variantPath });
        logger.debug(`Found variant command: ${variant}.md`);
      }
    }
    
    // Copy command files
    mkdirSync(projectCommandsDir, { recursive: true });
    for (const cmd of possibleCommands) {
      const targetPath = join(projectCommandsDir, `${cmd.name}.md`);
      copyFileSync(cmd.path, targetPath);
      logger.debug(`Copied command ${cmd.name} to project`);
    }
    
    return true;
  } catch (error) {
    logger.error(`Failed to copy agent ${agent.name} to project: ${error.message}`);
    return false;
  }
}

/**
 * Sync command to detect and register agents installed through Claude Code
 * or other external methods
 */
export async function syncCommand(options) {
  const spinner = ora();
  
  try {
    ensureDirectories();
    
    // Force copy mode - copy all registered agents to project
    if (options.forceCopy) {
      spinner.start('Copying all agents to project directory...');
      
      const registeredAgents = getInstalledAgents();
      let copied = 0;
      let failed = 0;
      
      for (const [agentName, agentData] of Object.entries(registeredAgents)) {
        try {
          // Read agent file from user directory
          const userAgentPath = join(getAgentsDir(false), `${agentName}.md`);
          
          if (existsSync(userAgentPath)) {
            const fullContent = readFileSync(userAgentPath, 'utf-8');
            
            const agent = {
              name: agentName,
              path: userAgentPath,
              frontmatter: agentData.frontmatter || {
                name: agentName,
                description: agentData.description,
                tools: agentData.requirements?.tools?.join(', ') || ''
              },
              fullContent
            };
            
            const success = await copyAgentToProject(agent);
            if (success) {
              copied++;
            } else {
              failed++;
            }
          } else {
            logger.debug(`Agent file not found: ${userAgentPath}`);
            failed++;
          }
        } catch (error) {
          logger.error(`Failed to copy ${agentName}: ${error.message}`);
          failed++;
        }
      }
      
      spinner.succeed(`Copied ${copied} agent(s) to project directory${failed > 0 ? ` (${failed} failed)` : ''}`);
      return;
    }
    
    spinner.start('Scanning for unregistered agents...');
    
    // Get paths for both user and project scopes
    const userAgentsDir = getAgentsDir(false);
    const projectAgentsDir = getAgentsDir(true);
    
    // Get currently registered agents
    const registeredAgents = getInstalledAgents();
    const registeredNames = Object.keys(registeredAgents);
    
    // Scan both directories for agent files
    const unregisteredAgents = [];
    const scopes = [
      { dir: userAgentsDir, scope: 'user' },
      { dir: projectAgentsDir, scope: 'project' }
    ];
    
    for (const { dir, scope } of scopes) {
      if (!existsSync(dir)) continue;
      
      const files = readdirSync(dir, { withFileTypes: true })
        .filter(dirent => dirent.isFile() && dirent.name.endsWith('.md'))
        .map(dirent => dirent.name);
      
      for (const file of files) {
        const agentName = basename(file, '.md');
        
        // Skip if already registered
        if (registeredNames.includes(agentName)) {
          logger.debug(`Skipping ${agentName} - already registered`);
          continue;
        }
        
        try {
          const agentPath = join(dir, file);
          const content = readFileSync(agentPath, 'utf-8');
          
          // Parse YAML frontmatter
          const frontmatterMatch = RegExp(/^---\n([\s\S]*?)\n---/).exec(content);
          if (!frontmatterMatch) continue;
          
          let frontmatter;
          try {
            frontmatter = yaml.parse(frontmatterMatch[1]);
          } catch (yamlError) {
            // Try to extract basic info manually for problematic YAML
            const nameMatch = /^name:\s*(.+)$/m.exec(frontmatterMatch[1]);
            const descMatch = /^description:\s*(.+)$/m.exec(frontmatterMatch[1]);
            
            if (nameMatch) {
              frontmatter = {
                name: nameMatch[1].trim(),
                description: descMatch ? descMatch[1].trim().split('\\n')[0] : 'No description available'
              };
              logger.debug(`Manually parsed frontmatter for ${agentName}`);
            } else {
              logger.debug(`Failed to parse YAML for ${agentName}: ${yamlError.message}`);
              continue;
            }
          }
          
          // Extract agent details
          const agentInfo = {
            name: agentName,
            path: agentPath,
            scope,
            frontmatter,
            content: content.replace(frontmatterMatch[0], '').trim(),
            fullContent: content  // Keep the full content including frontmatter
          };
          
          unregisteredAgents.push(agentInfo);
        } catch (error) {
          logger.debug(`Error parsing agent ${agentName}: ${error.message}`);
        }
      }
    }
    
    spinner.stop();
    
    if (unregisteredAgents.length === 0) {
      console.log(chalk.green('✓ All agents are properly registered'));
      return;
    }
    
    // Display found agents
    console.log(chalk.yellow(`\nFound ${unregisteredAgents.length} unregistered agent(s):\n`));
    
    for (const agent of unregisteredAgents) {
      console.log(chalk.bold(`  • ${agent.name}`));
      const desc = agent.frontmatter.description || 'No description available';
      const shortDesc = desc.split('\\n')[0].substring(0, 60);
      console.log(chalk.gray(`    ${shortDesc}${desc.length > 60 ? '...' : ''}`));
    }
    console.log('');
    
    // In auto mode, register all. Otherwise, let user select
    let agentsToRegister = unregisteredAgents;
    
    if (!options.auto) {
      const { default: inquirer } = await import('inquirer');
      
      // Let user select which agents to register
      const { selectedAgents } = await inquirer.prompt([{
        type: 'checkbox',
        name: 'selectedAgents',
        message: 'Select agents to register:',
        choices: unregisteredAgents.map(agent => ({
          name: `${agent.name} - ${agent.frontmatter.description || 'No description'}`.substring(0, 80),
          value: agent.name,
          checked: true
        }))
      }]);
      
      if (selectedAgents.length === 0) {
        console.log(chalk.yellow('No agents selected'));
        return;
      }
      
      // Filter to only selected agents
      agentsToRegister = unregisteredAgents.filter(a => selectedAgents.includes(a.name));
    }
    
    // Register each selected agent
    spinner.start('Registering agents and copying to project...');
    let registered = 0;
    let copied = 0;
    
    for (const agent of agentsToRegister) {
      try {
        // Ensure we have the full content
        if (!agent.fullContent) {
          agent.fullContent = readFileSync(agent.path, 'utf-8');
        }
        
        // Copy agent files to project directory
        const copySuccess = await copyAgentToProject(agent);
        if (copySuccess) {
          copied++;
          logger.debug(`Copied agent ${agent.name} to project directory`);
        }
        
        // Create metadata structure
        const metadata = {
          version: '1.0.0',
          description: agent.frontmatter.description || `${agent.name} agent`,
          author: 'External',
          tags: agent.frontmatter.tags || [],
          requirements: {
            tools: agent.frontmatter.tools ? 
              agent.frontmatter.tools.split(',').map(t => t.trim()) : 
              []
          },
          compatible_with: ['claude-code@>=1.0.0']
        };
        
        // Add to configuration
        const agentData = {
          name: agent.name,
          ...metadata,
          frontmatter: agent.frontmatter,
          content: agent.content,
          fullContent: agent.fullContent
        };
        
        addInstalledAgent(agent.name, agentData, agent.scope === 'project');
        registered++;
        
        logger.debug(`Registered agent: ${agent.name}`);
      } catch (error) {
        logger.error(`Failed to register ${agent.name}: ${error.message}`);
      }
    }
    
    spinner.succeed(`Registered ${registered} agent(s), copied ${copied} to project`);
    
    // Check for orphaned commands
    if (options.commands) {
      spinner.start('Checking for orphaned commands...');
      
      const userCommandsDir = getCommandsDir(false);
      const projectCommandsDir = getCommandsDir(true);
      const commandDirs = [userCommandsDir, projectCommandsDir].filter(existsSync);
      
      let orphanedCommands = 0;
      
      for (const dir of commandDirs) {
        const files = readdirSync(dir, { withFileTypes: true })
          .filter(dirent => dirent.isFile() && dirent.name.endsWith('.md'))
          .map(dirent => dirent.name);
        
        for (const file of files) {
          const commandName = basename(file, '.md');
          
          // Check if there's a corresponding agent
          const hasAgent = unregisteredAgents.some(a => 
            a.frontmatter.commands && a.frontmatter.commands.includes(commandName)
          ) || registeredNames.some(name => {
            const agent = registeredAgents[name];
            return agent.commands && agent.commands.includes(commandName);
          });
          
          if (!hasAgent) {
            console.log(chalk.yellow(`  Orphaned command: ${commandName}`));
            orphanedCommands++;
          }
        }
      }
      
      spinner.stop();
      
      if (orphanedCommands > 0) {
        console.log(chalk.yellow(`\nFound ${orphanedCommands} orphaned command(s)`));
      }
    }
    
    console.log('');
    console.log(chalk.green('✓ Sync complete!'));
    console.log(chalk.gray('Use "claude-agents list" to see all agents'));
    
  } catch (error) {
    spinner.fail('Sync failed');
    console.error(chalk.red('Error:'), error.message);
    logger.debug(error.stack);
    process.exit(1);
  }
}