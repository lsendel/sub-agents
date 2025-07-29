#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Optimization patterns
const optimizationRules = [
  // Remove verbose checklist formatting
  {
    pattern: /- \[ \] ([^\n]+)/g,
    replacement: '- $1'
  },
  // Condense multi-line descriptions
  {
    pattern: /### (.+)\n([^#\n]+\n){1,3}/g,
    replacement: (match, title, content) => {
      const condensed = content.trim().replace(/\n/g, ' ').substring(0, 100);
      return `**${title}**: ${condensed}\n`;
    }
  },
  // Remove ASCII art boxes
  {
    pattern: /[━─│┌┐└┘├┤┬┴┼═╔╗╚╝║╠╣╦╩╬]+/g,
    replacement: ''
  },
  // Simplify code examples
  {
    pattern: /```[a-z]*\n\/\/ (Vulnerable|Inefficient|Before):[^\n]*\n([^`]+)\n\/\/ (Secure|Optimized|After):[^\n]*\n([^`]+)\n```/g,
    replacement: '`$2` → `$4`'
  },
  // Remove repetitive "Remember:" sections
  {
    pattern: /Remember: [^\n]+/g,
    replacement: ''
  },
  // Condense bullet points
  {
    pattern: /^( *)- ([^:\n]+): ([^\n]+)$/gm,
    replacement: '$1**$2**: $3'
  }
];

function optimizeAgent(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalLength = content.length;
  
  // Parse frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]+?)\n---\n([\s\S]+)$/);
  if (!frontmatterMatch) return;
  
  let frontmatter = frontmatterMatch[1];
  let body = frontmatterMatch[2];
  
  // Apply optimization rules to body
  optimizationRules.forEach(rule => {
    body = body.replace(rule.pattern, rule.replacement);
  });
  
  // Remove multiple blank lines
  body = body.replace(/\n{3,}/g, '\n\n');
  
  // Trim whitespace
  body = body.trim();
  
  const optimizedContent = `---\n${frontmatter}\n---\n\n${body}\n`;
  const newLength = optimizedContent.length;
  
  if (newLength < originalLength) {
    fs.writeFileSync(filePath, optimizedContent);
    const reduction = Math.round((1 - newLength / originalLength) * 100);
    console.log(`✅ ${path.basename(filePath)}: Reduced by ${reduction}% (${originalLength} → ${newLength} chars)`);
  } else {
    console.log(`⏭️  ${path.basename(filePath)}: Already optimized`);
  }
}

// Get all agent files
const agentsDir = path.join(__dirname, 'agents');
const agentFiles = fs.readdirSync(agentsDir)
  .filter(file => file.endsWith('.md'))
  .map(file => path.join(agentsDir, file));

console.log(`🔧 Optimizing ${agentFiles.length} agents...\n`);

// Optimize each agent
agentFiles.forEach(optimizeAgent);

console.log('\n✨ Optimization complete!');