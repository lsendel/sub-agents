import { program } from 'commander';
import chalk from 'chalk';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { logger } from './utils/logger.js';
import { CLIError } from './utils/errors.js';

// Commands
import { installCommand } from './commands/install.js';
import { listCommand } from './commands/list.js';
import { enableCommand } from './commands/enable.js';
import { disableCommand } from './commands/disable.js';
import { infoCommand } from './commands/info.js';
import { createCommand } from './commands/create.js';
import { removeCommand } from './commands/remove.js';
import { updateCommand } from './commands/update.js';
import { syncCommand } from './commands/sync.js';
import { migrateCommandConfig } from './commands/migrate.js';
import { optimizeCommandConfig } from './commands/optimize.js';
import { validateCommandConfig } from './commands/validate.js';
import { checkForUpdates } from './utils/update-checker.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read package.json for version
const packageJson = JSON.parse(
  readFileSync(join(__dirname, '..', 'package.json'), 'utf-8')
);

// ASCII Art Banner
logger.info(chalk.blue(`
╔═══════════════════════════════════════════╗
║       Claude Sub-Agents Manager           ║
║   Enhance Claude Code with AI Agents      ║
╚═══════════════════════════════════════════╝
`));

program
  .name('claude-agents')
  .description('CLI tool to manage Claude Code sub-agents')
  .version(packageJson.version);

// Install command
program
  .command('install [agents...]')
  .description('Install sub-agents to your system')
  .option('-p, --project', 'Install to project directory instead of user directory')
  .option('-a, --all', 'Install all available agents')
  .action((agents, options) => installCommand(agents, options));

// List command
program
  .command('list')
  .description('List available and installed agents')
  .option('-i, --installed', 'Show only installed agents')
  .option('-a, --available', 'Show only available agents')
  .action(listCommand);

// Enable command
program
  .command('enable <agent>')
  .description('Enable a specific agent')
  .option('-p, --project', 'Enable in project scope')
  .action(enableCommand);

// Disable command
program
  .command('disable <agent>')
  .description('Disable a specific agent without removing it')
  .option('-p, --project', 'Disable in project scope')
  .action(disableCommand);

// Info command
program
  .command('info <agent>')
  .description('Show detailed information about an agent')
  .action(infoCommand);

// Create command
program
  .command('create')
  .description('Create a new custom agent')
  .option('-n, --name <name>', 'Agent name')
  .option('-t, --template <template>', 'Use a template (basic, advanced)')
  .action(createCommand);

// Remove command
program
  .command('remove <agent>')
  .alias('uninstall')
  .description('Remove an installed agent')
  .option('-p, --project', 'Remove from project scope')
  .action(removeCommand);

// Update command
program
  .command(updateCommand.name)
  .description(updateCommand.description)
  .option('-a, --all', 'Update all installed agents')
  .option('-p, --project', 'Update agents in project scope')
  .option('-f, --force', 'Force update without confirmation')
  .option('--preserve-custom', 'Preserve custom modifications')
  .action(updateCommand.action);

// Sync command
program
  .command('sync')
  .description('Sync externally installed agents with configuration')
  .option('-a, --auto', 'Auto-register without confirmation')
  .option('-c, --commands', 'Also check for orphaned commands')
  .option('-f, --force-copy', 'Force copy all agents to project directory')
  .action(syncCommand);

// Migrate command
const migrateCmd = program
  .command(migrateCommandConfig.command)
  .description(migrateCommandConfig.description);
migrateCommandConfig.options.forEach(opt => {
  migrateCmd.option(...opt);
});
migrateCmd.action(migrateCommandConfig.action);

// Optimize command
const optimizeCmd = program
  .command(optimizeCommandConfig.command)
  .description(optimizeCommandConfig.description);
optimizeCommandConfig.options.forEach(opt => {
  optimizeCmd.option(...opt);
});
optimizeCmd.action(optimizeCommandConfig.action);

// Validate command
const validateCmd = program
  .command(validateCommandConfig.command)
  .description(validateCommandConfig.description);
validateCommandConfig.options.forEach(opt => {
  validateCmd.option(...opt);
});
validateCmd.action(validateCommandConfig.action);

// Config command
program
  .command('config <setting> [value]')
  .description('Configure settings (e.g., config autosync on/off)')
  .action(async (setting, value) => {
    const { enableAutoSync, disableAutoSync, isAutoSyncEnabled } = await import('./utils/auto-sync.js');
    
    if (setting === 'autosync') {
      if (value === 'on' || value === 'true') {
        enableAutoSync();
      } else if (value === 'off' || value === 'false') {
        disableAutoSync();
      } else if (!value) {
        console.log(`Auto-sync is currently: ${isAutoSyncEnabled() ? chalk.green('enabled') : chalk.gray('disabled')}`);
      } else {
        console.log(chalk.red('Invalid value. Use "on" or "off"'));
      }
    } else {
      console.log(chalk.red(`Unknown setting: ${setting}`));
      console.log(chalk.gray('Available settings: autosync'));
    }
  });

// Version command with update check
program
  .command('version')
  .description('Show version and check for updates')
  .action(async () => {
    logger.info(`${packageJson.name} v${packageJson.version}`);
    await checkForUpdates(false);
  });

// Check for updates on startup (silently)
checkForUpdates(true);

// Wrap command execution for error handling
const originalParse = program.parse.bind(program);
program.parse = async (...args) => {
  try {
    return await originalParse(...args);
  } catch (error) {
    if (error instanceof CLIError) {
      process.exit(error.code || 1);
    } else {
      logger.error('Unexpected error:', error.message);
      if (process.env.DEBUG === 'true') {
        logger.error(error.stack);
      }
      process.exit(1);
    }
  }
};

// Parse command line arguments
program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}