import yaml from 'yaml';

/**
 * Optimizes agent format for Claude Code compatibility
 * Merges metadata into YAML frontmatter and simplifies structure
 */
export function optimizeAgentForClaudeCode(agent) {
  const { frontmatter, fullContent, metadata } = agent;
  
  // Create optimized frontmatter combining existing frontmatter and metadata
  const optimizedFrontmatter = {
    name: agent.name,
    description: improveDescription(frontmatter.description || metadata.description),
    tools: frontmatter.tools || metadata.requirements?.tools?.join(', ') || ''
  };
  
  // Extract the content without frontmatter
  const cleanContent = fullContent.replace(/^---\n[\s\S]*?\n---\n/, '').trim();
  
  // Add gitignore awareness to the agent
  const gitignoreSection = createGitignoreSection(agent.name);
  
  // Generate the optimized agent file
  const yamlFrontmatter = yaml.stringify(optimizedFrontmatter).trim();
  return `---\n${yamlFrontmatter}\n---\n\n${cleanContent}\n\n${gitignoreSection}`;
}

/**
 * Creates gitignore awareness section for agents
 */
function createGitignoreSection(agentName) {
  // Agents that need strong gitignore awareness
  const needsGitignore = ['code-reviewer', 'security-scanner', 'debugger', 'refactor', 'test-runner'];
  
  if (!needsGitignore.includes(agentName)) {
    return '';
  }
  
  return `
## File Patterns to Ignore

When searching, reading, or analyzing files, always respect the project's .gitignore patterns.
Common patterns to ignore:
- node_modules/
- .git/
- dist/, build/
- *.log
- .env, .env.*
- coverage/
- .DS_Store, Thumbs.db
- IDE files (.idea/, .vscode/)

Use the LS tool's ignore parameter or filter results to exclude these patterns.`;
}

/**
 * Improves agent descriptions for better automatic delegation
 */
function improveDescription(description) {
  const improvements = {
    'code-reviewer': 'Use after writing or modifying code to review for quality, security, performance, and best practices',
    'test-runner': 'Use to run tests, fix failing tests, or when code changes require test verification',
    'debugger': 'Use when encountering errors, crashes, or unexpected behavior to analyze and fix issues',
    'refactor': 'Use to improve code structure, apply design patterns, or modernize legacy code',
    'doc-writer': 'Use to create or update documentation, API docs, README files, or code comments',
    'security-scanner': 'Use to scan for security vulnerabilities, exposed secrets, or compliance issues'
  };
  
  // Check if we have a specific improvement for this agent
  for (const [agentName, improvedDesc] of Object.entries(improvements)) {
    if (description.toLowerCase().includes(agentName.replace('-', ' '))) {
      return improvedDesc;
    }
  }
  
  // Otherwise, ensure description starts with "Use when" or "Use to"
  if (!description.startsWith('Use ')) {
    return `Use to ${description.charAt(0).toLowerCase() + description.slice(1)}`;
  }
  
  return description;
}

/**
 * Validates agent has required fields for Claude Code
 */
export function validateAgentFormat(agent) {
  const errors = [];
  
  if (!agent.name || !agent.name.match(/^[a-z0-9-]+$/)) {
    errors.push('Agent name must be lowercase with hyphens only');
  }
  
  if (!agent.frontmatter?.description && !agent.metadata?.description) {
    errors.push('Agent must have a description');
  }
  
  if (!agent.content || agent.content.trim().length < 100) {
    errors.push('Agent must have substantial system prompt content');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Suggests tool optimization for each agent type
 */
export function suggestToolOptimization(agentName, currentTools) {
  const optimizedTools = {
    'code-reviewer': ['Read', 'Grep', 'Glob'], // Remove Edit - reviewers shouldn't modify
    'test-runner': ['Bash', 'Read', 'Edit', 'Grep', 'Glob'], // All tools needed
    'debugger': ['Read', 'Grep', 'Glob', 'Bash'], // Add Bash for running debug commands
    'refactor': ['Read', 'Edit', 'MultiEdit', 'Grep', 'Glob'], // Add MultiEdit for efficiency
    'doc-writer': ['Read', 'Write', 'Edit', 'Grep', 'Glob'], // Write for new docs
    'security-scanner': ['Read', 'Grep', 'Glob'] // Read-only for scanning
  };
  
  return optimizedTools[agentName] || currentTools;
}