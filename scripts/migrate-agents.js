#!/usr/bin/env node

/**
 * Script to migrate existing agents to new Claude Code compatible format
 */

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { AgentMigrator } from '../src/utils/agent-migrator.js';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  console.log(chalk.blue.bold('\n🔄 Migrating Agents to Claude Code Format\n'));
  
  const migrator = new AgentMigrator();
  const agentsDir = join(__dirname, '..', 'agents');
  
  try {
    // Perform migration with backup
    const results = await migrator.migrateDirectory(agentsDir, {
      backup: true,
      cleanup: false // Don't remove old directories yet
    });
    
    console.log(chalk.green.bold('\n✅ Migration Results:\n'));
    console.log(`  Migrated: ${chalk.green(results.migrated.length)}`);
    console.log(`  Skipped: ${chalk.yellow(results.skipped.length)}`);
    console.log(`  Failed: ${chalk.red(results.failed.length)}`);
    
    if (results.migrated.length > 0) {
      console.log(chalk.gray('\nMigrated agents:'));
      results.migrated.forEach(agent => {
        console.log(chalk.gray(`  • ${agent}`));
      });
    }
    
    if (results.failed.length > 0) {
      console.log(chalk.red('\nFailed agents:'));
      results.failed.forEach(agent => {
        console.log(chalk.red(`  • ${agent}`));
      });
    }
    
    console.log(chalk.yellow('\n⚠️  Old agent directories preserved. Run with --cleanup to remove them.\n'));
    
  } catch (error) {
    console.error(chalk.red('Migration failed:'), error.message);
    process.exit(1);
  }
}

main();