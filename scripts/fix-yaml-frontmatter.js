#!/usr/bin/env node

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Fix YAML frontmatter issues in agent files
 */
function fixYamlFrontmatter(content, fileName) {
  // Find all YAML frontmatter sections
  const yamlPattern = /^---\n([\s\S]*?)\n---/gm;
  const matches = Array.from(content.matchAll(yamlPattern));
  
  if (matches.length === 0) {
    return { content, changed: false, error: 'No YAML frontmatter found' };
  }
  
  if (matches.length === 1) {
    // Only one frontmatter section - check if it's valid
    try {
      const frontmatter = matches[0][1];
      // Basic validation - check for multiline descriptions without proper quotes
      if (frontmatter.includes('description:') && frontmatter.includes('\\n')) {
        // Has escaped newlines in description - this is problematic
        const lines = frontmatter.split('\n');
        const fixedLines = lines.map(line => {
          if (line.trim().startsWith('description:')) {
            // Extract the description value
            const descStart = line.indexOf(':') + 1;
            const descValue = line.substring(descStart).trim();
            
            // If it contains \n or is too long, simplify it
            if (descValue.includes('\\n') || descValue.length > 200) {
              // Extract just the first sentence or meaningful part
              let simplified = descValue
                .replace(/\\n/g, ' ')
                .replace(/\s+/g, ' ')
                .split('.')[0] + '.';
              
              // Further simplify if still too long
              if (simplified.length > 150) {
                simplified = simplified.substring(0, 147) + '...';
              }
              
              return `description: ${simplified}`;
            }
          }
          return line;
        });
        
        const fixedFrontmatter = fixedLines.join('\n');
        const fixedContent = content.replace(matches[0][0], `---\n${fixedFrontmatter}\n---`);
        
        return { content: fixedContent, changed: true };
      }
      
      return { content, changed: false };
    } catch (e) {
      return { content, changed: false, error: e.message };
    }
  }
  
  // Multiple frontmatter sections - keep only the first simplified one
  if (matches.length > 1) {
    console.log(chalk.yellow(`  Found ${matches.length} YAML sections in ${fileName}, merging...`));
    
    // Extract key fields from all sections
    let name = '';
    let description = '';
    let tools = '';
    let color = '';
    
    matches.forEach((match, index) => {
      const frontmatter = match[1];
      const lines = frontmatter.split('\n');
      
      lines.forEach(line => {
        if (line.trim().startsWith('name:') && !name) {
          name = line.trim();
        }
        if (line.trim().startsWith('description:') && !description) {
          // Get the description value
          const descValue = line.substring(line.indexOf(':') + 1).trim();
          // Simplify it
          let simplified = descValue
            .replace(/\\n/g, ' ')
            .replace(/\s+/g, ' ')
            .split('.')[0];
          
          // If it's from the first section and is short, use it
          if (index === 0 && simplified.length < 150) {
            description = `description: ${simplified}.`;
          }
        }
        if (line.trim().startsWith('tools:') && !tools) {
          tools = line.trim();
        }
        if (line.trim().startsWith('color:') && !color) {
          color = line.trim();
        }
      });
    });
    
    // Build simplified frontmatter
    const simplifiedFrontmatter = [
      '---',
      name || `name: ${basename(fileName, '.md')}`,
      description || 'description: AI assistant agent.',
      tools || 'tools: ""',
      color && color,
      '---'
    ].filter(Boolean).join('\n');
    
    // Replace all frontmatter sections with the simplified one
    let newContent = content;
    
    // Remove all frontmatter sections
    matches.reverse().forEach(match => {
      newContent = newContent.replace(match[0], '');
    });
    
    // Add the simplified frontmatter at the beginning
    newContent = simplifiedFrontmatter + '\n\n' + newContent.trim();
    
    return { content: newContent, changed: true };
  }
}

/**
 * Process a single file
 */
function processFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const fileName = basename(filePath);
    
    const result = fixYamlFrontmatter(content, fileName);
    
    if (result.changed) {
      writeFileSync(filePath, result.content);
      console.log(chalk.green(`✓ Fixed ${fileName}`));
      return { success: true, changed: true };
    } else if (result.error) {
      console.log(chalk.yellow(`⚠ Skipped ${fileName}: ${result.error}`));
      return { success: true, changed: false, error: result.error };
    } else {
      console.log(chalk.gray(`✓ ${fileName} - already valid`));
      return { success: true, changed: false };
    }
  } catch (error) {
    console.log(chalk.red(`✗ Error processing ${basename(filePath)}: ${error.message}`));
    return { success: false, error: error.message };
  }
}

/**
 * Find all markdown files in agents directory
 */
function findAgentFiles(dir) {
  const files = [];
  
  function scan(currentDir) {
    const entries = readdirSync(currentDir);
    
    for (const entry of entries) {
      const fullPath = join(currentDir, entry);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory() && !entry.startsWith('.')) {
        scan(fullPath);
      } else if (stat.isFile() && extname(entry) === '.md') {
        files.push(fullPath);
      }
    }
  }
  
  scan(dir);
  return files;
}

/**
 * Main function
 */
function main() {
  console.log(chalk.blue('\nFixing YAML frontmatter in agent files...\n'));
  
  const projectRoot = join(__dirname, '..');
  const agentsDir = join(projectRoot, 'agents');
  
  // Find all markdown files
  const files = findAgentFiles(agentsDir);
  console.log(`Found ${files.length} agent files\n`);
  
  let fixed = 0;
  let errors = 0;
  
  // Process each file
  files.forEach(file => {
    const result = processFile(file);
    if (result.changed) fixed++;
    if (!result.success) errors++;
  });
  
  // Summary
  console.log('\n' + chalk.blue('Summary:'));
  console.log(`  Total files: ${files.length}`);
  console.log(`  Fixed: ${chalk.green(fixed)}`);
  console.log(`  Errors: ${errors > 0 ? chalk.red(errors) : chalk.green(errors)}`);
  console.log(`  Unchanged: ${files.length - fixed - errors}`);
  
  if (fixed > 0) {
    console.log(chalk.green('\n✓ YAML frontmatter issues have been fixed!'));
    console.log(chalk.gray('Run "claude-agents validate" to verify all agents are now valid.\n'));
  } else {
    console.log(chalk.green('\n✓ All agent files have valid YAML frontmatter!\n'));
  }
}

// Run if called directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}

export { fixYamlFrontmatter, processFile };