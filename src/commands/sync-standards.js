import chalk from 'chalk';
import inquirer from 'inquirer';
import { readdirSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from 'fs';
import { join, basename } from 'path';
import { 
  getStandardsDir, 
  ensureDirectories,
  ensureProjectDirectories
} from '../utils/paths.js';
import { 
  getStandardsConfig, 
  updateStandardsConfig, 
  initializeStandardsConfig 
} from '../utils/config.js';
import { 
  loadStandardFromFile
} from '../utils/process-standards.js';
import { logger } from '../utils/logger.js';

/**
 * Sync standards from ~/.claude/standards to project
 */
export async function syncStandardsCommand(options) {
  try {
    console.log(chalk.blue.bold('\n🔄 Standards Sync Tool\n'));
    
    // Ensure directories exist
    ensureDirectories();
    ensureProjectDirectories();
    
    // Initialize standards config if needed
    initializeStandardsConfig(options.project);
    
    // Step 1: Scan for standards in ~/.claude/standards
    console.log(chalk.cyan('Scanning for standards...'));
    const userStandardsDir = getStandardsDir(false);
    const projectStandardsDir = getStandardsDir(true);
    
    const availableStandards = [];
    const installedStandards = getStandardsConfig(options.project).standards || {};
    
    // Scan user standards directory
    if (existsSync(userStandardsDir)) {
      const entries = readdirSync(userStandardsDir, { withFileTypes: true });
      
      for (const entry of entries) {
        try {
          if (entry.isFile() && entry.name.endsWith('.md')) {
            const standardName = basename(entry.name, '.md');
            const standardPath = join(userStandardsDir, entry.name);
            const standard = loadStandardFromFile(standardName, standardPath);
            
            if (standard) {
              availableStandards.push({
                ...standard,
                path: standardPath,
                installed: !!installedStandards[standardName]
              });
            }
          }
        } catch (error) {
          console.error(chalk.red(`Error loading standard ${entry.name}: ${error.message}`));
        }
      }
    }
    
    if (availableStandards.length === 0) {
      console.log(chalk.yellow('No standards found in ~/.claude/standards'));
      return;
    }
    
    // Show found standards
    console.log(`\nFound ${chalk.green(availableStandards.length)} standard(s):`);
    availableStandards.forEach(standard => {
      const status = standard.installed ? chalk.green('✓ installed') : chalk.gray('not installed');
      console.log(`  • ${standard.name} ${status} - ${standard.description || 'No description'}`);
    });
    
    // Step 2: Filter unregistered standards
    const unregisteredStandards = availableStandards.filter(s => !s.installed);
    
    if (unregisteredStandards.length === 0) {
      console.log(chalk.green('\nAll standards are already synced!'));
      
      if (options.forceCopy) {
        console.log(chalk.cyan('\nForce copy mode enabled - copying all standards to project...'));
        for (const standard of availableStandards) {
          await copyStandardToProject(standard, projectStandardsDir);
        }
      }
      return;
    }
    
    console.log(`\n${chalk.yellow(unregisteredStandards.length)} unregistered standard(s) found.`);
    
    // Step 3: Prompt for which standards to sync
    let standardsToSync = unregisteredStandards;
    
    if (!options.all && unregisteredStandards.length > 1) {
      const { selectedStandards } = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'selectedStandards',
          message: 'Select standards to sync:',
          choices: unregisteredStandards.map(s => ({
            name: `${s.name} - ${s.description || 'No description'}`,
            value: s.name,
            checked: true
          }))
        }
      ]);
      
      standardsToSync = unregisteredStandards.filter(s => selectedStandards.includes(s.name));
    }
    
    if (standardsToSync.length === 0) {
      console.log(chalk.yellow('No standards selected for sync.'));
      return;
    }
    
    // Step 4: Register selected standards
    console.log(`\nSyncing ${standardsToSync.length} standard(s)...`);
    
    const config = getStandardsConfig(options.project);
    const updatedStandards = { ...config.standards };
    
    for (const standard of standardsToSync) {
      updatedStandards[standard.name] = {
        version: standard.version || '1.0.0',
        installedAt: new Date().toISOString(),
        installedFrom: standard.path,
        type: standard.type || 'standard',
        description: standard.description
      };
      
      // Copy to project if requested
      if (options.forceCopy || options.all) {
        await copyStandardToProject(standard, projectStandardsDir);
      }
      
      console.log(chalk.green(`  ✓ ${standard.name}`));
    }
    
    // Update config
    updateStandardsConfig({
      ...config,
      standards: updatedStandards,
      lastSync: new Date().toISOString()
    }, options.project);
    
    console.log(chalk.green(`\n✨ Successfully synced ${standardsToSync.length} standard(s)!`));
    
    // Copy all standards if force-copy
    if (options.forceCopy) {
      console.log(chalk.cyan('\nCopying all registered standards to project...'));
      for (const standard of availableStandards.filter(s => s.installed)) {
        await copyStandardToProject(standard, projectStandardsDir);
      }
    }
    
  } catch (error) {
    logger.error(`Sync failed: ${error.message}`);
    throw error;
  }
}

/**
 * Copy a standard to the project directory
 */
async function copyStandardToProject(standard, projectStandardsDir) {
  try {
    ensureDir(projectStandardsDir);
    
    const targetPath = join(projectStandardsDir, `${standard.name}.md`);
    
    // Copy the standard file
    if (standard.path) {
      copyFileSync(standard.path, targetPath);
    } else {
      // Create from content if no path
      writeFileSync(targetPath, standard.fullContent || formatStandardContent(standard));
    }
    
    console.log(chalk.green(`  ✓ Copied ${standard.name} to project`));
  } catch (error) {
    console.error(chalk.red(`  ✗ Failed to copy ${standard.name}: ${error.message}`));
  }
}

/**
 * Format standard content with frontmatter
 */
function formatStandardContent(standard) {
  const frontmatter = {
    name: standard.name,
    type: standard.type || 'standard',
    version: standard.version || '1.0.0',
    description: standard.description || '',
    author: standard.author || 'Unknown',
    tags: standard.tags || [],
    related_commands: standard.related_commands || []
  };
  
  const yamlContent = Object.entries(frontmatter)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}: [${value.join(', ')}]`;
      }
      return `${key}: ${value}`;
    })
    .join('\n');
  
  return `---\n${yamlContent}\n---\n\n${standard.content || ''}`;
}

/**
 * Ensure directory exists
 */
function ensureDir(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

// Command configuration for commander
export const syncStandardsCommandConfig = {
  command: 'sync-standards',
  description: 'Sync standards from ~/.claude/standards',
  options: [
    ['--all', 'Sync all unregistered standards without prompting'],
    ['--force-copy', 'Copy all standards to project directory'],
    ['--project', 'Use project scope instead of user scope']
  ],
  action: syncStandardsCommand
};