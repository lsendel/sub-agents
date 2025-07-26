#!/usr/bin/env node
import { execSync } from 'child_process';
import chalk from 'chalk';

/**
 * Pre-commit hook to check for sensitive files
 * Prevents accidental commits of .env files and other secrets
 */

console.log(chalk.blue('🔍 Checking for sensitive files...'));

// Patterns that should never be committed
const sensitivePatterns = [
  // Environment files
  '.env',
  '.env.*',
  '!.env.example',
  
  // Private keys and certificates
  '*.pem',
  '*.key',
  '*.crt',
  '*.cer',
  '*.p12',
  '*.pfx',
  
  // Authentication files
  '.npmrc',
  '.netrc',
  'credentials.json',
  'token.json',
  'auth.json',
  
  // AWS credentials
  '.aws/credentials',
  '.aws/config',
  
  // Other secrets
  'secrets/',
  'private/',
  '*.secret',
  '*_secret.*',
  '*-secret.*'
];

try {
  // Get list of staged files
  const stagedFiles = execSync('git diff --cached --name-only', { encoding: 'utf-8' })
    .split('\n')
    .filter(Boolean);
  
  const problematicFiles = [];
  
  // Check each staged file against sensitive patterns
  for (const file of stagedFiles) {
    for (const pattern of sensitivePatterns) {
      if (pattern.startsWith('!')) continue; // Skip exclusion patterns
      
      // Simple pattern matching (could be enhanced with minimatch)
      const regex = new RegExp(
        pattern
          .replace(/\./g, '\\.')
          .replace(/\*/g, '.*')
          .replace(/\?/g, '.')
      );
      
      if (regex.test(file)) {
        problematicFiles.push(file);
        break;
      }
    }
  }
  
  if (problematicFiles.length > 0) {
    console.log(chalk.red('\n❌ COMMIT BLOCKED: Sensitive files detected!\n'));
    console.log(chalk.yellow('The following files appear to contain sensitive information:'));
    
    problematicFiles.forEach(file => {
      console.log(chalk.red(`  • ${file}`));
    });
    
    console.log(chalk.yellow('\nTo fix this:'));
    console.log('1. Remove these files from staging:');
    console.log(chalk.cyan(`   git reset HEAD ${problematicFiles.join(' ')}`));
    console.log('2. Make sure they are in .gitignore');
    console.log('3. Commit again\n');
    
    process.exit(1);
  }
  
  console.log(chalk.green('✅ No sensitive files detected in commit\n'));
  
} catch (error) {
  console.error(chalk.red('Error checking for sensitive files:'), error.message);
  process.exit(1);
}