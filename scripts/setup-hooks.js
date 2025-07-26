#!/usr/bin/env node
import { writeFileSync, existsSync, mkdirSync, chmodSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

/**
 * Setup git hooks for the project
 */

console.log(chalk.blue('Setting up git hooks...'));

// Pre-commit hook content
const preCommitHook = `#!/bin/sh
# Pre-commit hook to check for sensitive files

# Run the sensitive files check
npm run check-sensitive

# Exit with the same status as the check
exit $?
`;

try {
  const gitHooksDir = join(projectRoot, '.git', 'hooks');
  
  // Check if .git directory exists (not in CI)
  if (!existsSync(join(projectRoot, '.git'))) {
    console.log(chalk.gray('Not in a git repository, skipping hook setup'));
    process.exit(0);
  }
  
  // Create hooks directory if it doesn't exist
  if (!existsSync(gitHooksDir)) {
    mkdirSync(gitHooksDir, { recursive: true });
  }
  
  // Write pre-commit hook
  const preCommitPath = join(gitHooksDir, 'pre-commit');
  writeFileSync(preCommitPath, preCommitHook);
  
  // Make it executable
  chmodSync(preCommitPath, '755');
  
  console.log(chalk.green('✅ Git hooks installed successfully'));
  console.log(chalk.gray('Pre-commit hook will check for sensitive files before each commit'));
  
} catch (error) {
  console.error(chalk.yellow('Warning: Could not install git hooks:'), error.message);
  // Don't fail npm install if hooks can't be installed
  process.exit(0);
}