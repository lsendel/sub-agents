import chalk from 'chalk';
import ora from 'ora';
import { existsSync } from 'fs';
import { getAgentsDir } from '../utils/paths.js';
import { confirmAction } from '../utils/prompts.js';
import { AgentMigrator } from '../utils/agent-migrator.js';
import { logger } from '../utils/logger.js';

export async function migrateCommand(options) {
  const spinner = ora();
  
  try {
    console.log(chalk.blue.bold('\n📦 Claude Agents Format Migration\n'));
    console.log('This will migrate your agents to the new Claude Code compatible format:');
    console.log('  • Flatten agent directories to single .md files');
    console.log('  • Merge metadata.json into YAML frontmatter');
    console.log('  • Remove slash commands');
    console.log('  • Optimize descriptions for auto-delegation\n');

    // Check both user and project directories
    const userAgentsDir = getAgentsDir(false);
    const projectAgentsDir = getAgentsDir(true);
    // Commands directories are deprecated - no longer used
    // const userCommandsDir = getCommandsDir(false);
    // const projectCommandsDir = getCommandsDir(true);

    const dirsToMigrate = [];
    const commandDirsToRemove = [];

    if (existsSync(userAgentsDir)) {
      dirsToMigrate.push({ path: userAgentsDir, scope: 'user' });
    }
    if (existsSync(projectAgentsDir)) {
      dirsToMigrate.push({ path: projectAgentsDir, scope: 'project' });
    }
    // Commands directories removal - commented out as they're deprecated
    // if (existsSync(userCommandsDir)) {
    //   commandDirsToRemove.push({ path: userCommandsDir, scope: 'user' });
    // }
    // if (existsSync(projectCommandsDir)) {
    //   commandDirsToRemove.push({ path: projectCommandsDir, scope: 'project' });
    // }

    if (dirsToMigrate.length === 0) {
      console.log(chalk.yellow('No agents found to migrate.'));
      return;
    }

    // Show what will be migrated
    console.log(chalk.bold('Found agents in:'));
    for (const dir of dirsToMigrate) {
      console.log(`  • ${dir.scope} scope: ${dir.path}`);
    }
    
    if (commandDirsToRemove.length > 0) {
      console.log(chalk.bold('\nSlash commands will be removed from:'));
      for (const dir of commandDirsToRemove) {
        console.log(`  • ${dir.scope} scope: ${dir.path}`);
      }
    }

    // Confirm migration
    const shouldBackup = !options.noBackup;
    const backupMsg = shouldBackup ? ' (with backup)' : ' (without backup)';
    
    if (!options.yes) {
      const confirmed = await confirmAction(
        `Proceed with migration${backupMsg}?`
      );
      
      if (!confirmed) {
        console.log(chalk.yellow('\nMigration cancelled.'));
        return;
      }
    }

    console.log('');
    const migrator = new AgentMigrator();
    let totalMigrated = 0;
    let totalFailed = 0;
    let totalSkipped = 0;

    // Migrate each directory
    for (const dir of dirsToMigrate) {
      spinner.start(`Migrating ${dir.scope} agents...`);
      
      try {
        const results = await migrator.migrateDirectory(dir.path, {
          backup: shouldBackup,
          cleanup: options.cleanup || false
        });
        
        totalMigrated += results.migrated.length;
        totalFailed += results.failed.length;
        totalSkipped += results.skipped.length;
        
        spinner.succeed(
          `${dir.scope} agents: ${results.migrated.length} migrated, ` +
          `${results.skipped.length} skipped, ${results.failed.length} failed`
        );
        
        // Show details if verbose
        if (options.verbose && results.migrated.length > 0) {
          console.log(chalk.gray('  Migrated: ' + results.migrated.join(', ')));
        }
        if (results.failed.length > 0) {
          console.log(chalk.red('  Failed: ' + results.failed.join(', ')));
        }
      } catch (error) {
        spinner.fail(`Failed to migrate ${dir.scope} agents: ${error.message}`);
      }
    }

    // Remove command directories
    if (commandDirsToRemove.length > 0 && !options.keepCommands) {
      console.log('');
      for (const dir of commandDirsToRemove) {
        spinner.start(`Removing ${dir.scope} slash commands...`);
        
        try {
          const results = await migrator.migrateCommands(dir.path);
          spinner.succeed(
            `Removed ${results.removed} slash command(s) from ${dir.scope} scope`
          );
          
          if (shouldBackup) {
            console.log(chalk.gray(`  Backup: ${results.backupPath}`));
          }
        } catch (error) {
          spinner.fail(`Failed to remove ${dir.scope} commands: ${error.message}`);
        }
      }
    }

    // Summary
    console.log(chalk.green.bold('\n✨ Migration Complete!\n'));
    console.log('Summary:');
    console.log(`  • Agents migrated: ${chalk.green(totalMigrated)}`);
    if (totalSkipped > 0) {
      console.log(`  • Agents skipped: ${chalk.yellow(totalSkipped)} (already migrated)`);
    }
    if (totalFailed > 0) {
      console.log(`  • Agents failed: ${chalk.red(totalFailed)}`);
    }

    // Next steps
    console.log(chalk.bold('\nNext steps:'));
    console.log('1. Review migrated agents in their new location');
    console.log('2. Test agents work correctly in Claude Code');
    if (!options.cleanup) {
      console.log('3. Run with --cleanup to remove old directories once verified');
    }
    console.log('\nAgents now use description-based auto-delegation instead of slash commands.');
    console.log('Example: "I need to review my code" will trigger the code-reviewer agent.\n');

  } catch (error) {
    spinner.fail('Migration failed');
    logger.error(error.message);
    if (options.verbose) {
      logger.debug(error.stack);
    }
    throw error;
  }
}

// Command configuration for commander
export const migrateCommandConfig = {
  command: 'migrate',
  description: 'Migrate agents to Claude Code compatible format',
  options: [
    ['-y, --yes', 'Skip confirmation prompt'],
    ['--no-backup', 'Skip creating backup'],
    ['--cleanup', 'Remove old directories after successful migration'],
    ['--keep-commands', 'Keep slash command files (not recommended)'],
    ['-v, --verbose', 'Show detailed migration information']
  ],
  action: migrateCommand
};