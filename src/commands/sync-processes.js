import chalk from "chalk";
import inquirer from "inquirer";
import {
  readdirSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  copyFileSync,
} from "fs";
import { join, basename } from "path";
import {
  getProcessesDir,
  ensureDirectories,
  ensureProjectDirectories,
} from "../utils/paths.js";
import {
  getProcessesConfig,
  updateProcessesConfig,
  initializeProcessesConfig,
} from "../utils/config.js";
import { loadProcessFromFile } from "../utils/process-standards.js";
import { logger } from "../utils/logger.js";

/**
 * Sync processes from ~/.claude/processes to project
 */
export async function syncProcessesCommand(options) {
  try {
    console.log(chalk.blue.bold("\n🔄 Process Sync Tool\n"));

    // Ensure directories exist
    ensureDirectories();
    ensureProjectDirectories();

    // Initialize processes config if needed
    initializeProcessesConfig(options.project);

    // Step 1: Scan for processes in ~/.claude/processes
    console.log(chalk.cyan("Scanning for processes..."));
    const userProcessesDir = getProcessesDir(false);
    const projectProcessesDir = getProcessesDir(true);

    const availableProcesses = [];
    const installedProcesses =
      getProcessesConfig(options.project).processes || {};

    // Scan user processes directory
    if (existsSync(userProcessesDir)) {
      const entries = readdirSync(userProcessesDir, { withFileTypes: true });

      for (const entry of entries) {
        try {
          if (entry.isFile() && entry.name.endsWith(".md")) {
            const processName = basename(entry.name, ".md");
            const processPath = join(userProcessesDir, entry.name);
            const process = loadProcessFromFile(processName, processPath);

            if (process) {
              availableProcesses.push({
                ...process,
                path: processPath,
                installed: !!installedProcesses[processName],
              });
            }
          }
        } catch (error) {
          console.error(
            chalk.red(`Error loading process ${entry.name}: ${error.message}`),
          );
        }
      }
    }

    if (availableProcesses.length === 0) {
      console.log(chalk.yellow("No processes found in ~/.claude/processes"));
      return;
    }

    // Show found processes
    console.log(
      `\nFound ${chalk.green(availableProcesses.length)} process(es):`,
    );
    availableProcesses.forEach((process) => {
      const status = process.installed
        ? chalk.green("✓ installed")
        : chalk.gray("not installed");
      console.log(
        `  • ${process.name} ${status} - ${process.description || "No description"}`,
      );
    });

    // Step 2: Filter unregistered processes
    const unregisteredProcesses = availableProcesses.filter(
      (p) => !p.installed,
    );

    if (unregisteredProcesses.length === 0) {
      console.log(chalk.green("\nAll processes are already synced!"));

      if (options.forceCopy) {
        console.log(
          chalk.cyan(
            "\nForce copy mode enabled - copying all processes to project...",
          ),
        );
        for (const process of availableProcesses) {
          await copyProcessToProject(process, projectProcessesDir);
        }
      }
      return;
    }

    console.log(
      `\n${chalk.yellow(unregisteredProcesses.length)} unregistered process(es) found.`,
    );

    // Step 3: Prompt for which processes to sync
    let processesToSync = unregisteredProcesses;

    if (!options.all && unregisteredProcesses.length > 1) {
      const { selectedProcesses } = await inquirer.prompt([
        {
          type: "checkbox",
          name: "selectedProcesses",
          message: "Select processes to sync:",
          choices: unregisteredProcesses.map((p) => ({
            name: `${p.name} - ${p.description || "No description"}`,
            value: p.name,
            checked: true,
          })),
        },
      ]);

      processesToSync = unregisteredProcesses.filter((p) =>
        selectedProcesses.includes(p.name),
      );
    }

    if (processesToSync.length === 0) {
      console.log(chalk.yellow("No processes selected for sync."));
      return;
    }

    // Step 4: Register selected processes
    console.log(`\nSyncing ${processesToSync.length} process(es)...`);

    const config = getProcessesConfig(options.project);
    const updatedProcesses = { ...config.processes };

    for (const process of processesToSync) {
      updatedProcesses[process.name] = {
        version: process.version || "1.0.0",
        installedAt: new Date().toISOString(),
        installedFrom: process.path,
        type: process.type || "process",
        description: process.description,
      };

      // Copy to project if requested
      if (options.forceCopy || options.all) {
        await copyProcessToProject(process, projectProcessesDir);
      }

      console.log(chalk.green(`  ✓ ${process.name}`));
    }

    // Update config
    updateProcessesConfig(
      {
        ...config,
        processes: updatedProcesses,
        lastSync: new Date().toISOString(),
      },
      options.project,
    );

    console.log(
      chalk.green(
        `\n✨ Successfully synced ${processesToSync.length} process(es)!`,
      ),
    );

    // Copy all processes if force-copy
    if (options.forceCopy) {
      console.log(
        chalk.cyan("\nCopying all registered processes to project..."),
      );
      for (const process of availableProcesses.filter((p) => p.installed)) {
        await copyProcessToProject(process, projectProcessesDir);
      }
    }
  } catch (error) {
    logger.error(`Sync failed: ${error.message}`);
    throw error;
  }
}

/**
 * Copy a process to the project directory
 */
async function copyProcessToProject(process, projectProcessesDir) {
  try {
    ensureDir(projectProcessesDir);

    const targetPath = join(projectProcessesDir, `${process.name}.md`);

    // Copy the process file
    if (process.path) {
      copyFileSync(process.path, targetPath);
    } else {
      // Create from content if no path
      writeFileSync(
        targetPath,
        process.fullContent || formatProcessContent(process),
      );
    }

    console.log(chalk.green(`  ✓ Copied ${process.name} to project`));
  } catch (error) {
    console.error(
      chalk.red(`  ✗ Failed to copy ${process.name}: ${error.message}`),
    );
  }
}

/**
 * Format process content with frontmatter
 */
function formatProcessContent(process) {
  const frontmatter = {
    name: process.name,
    type: process.type || "process",
    version: process.version || "1.0.0",
    description: process.description || "",
    author: process.author || "Unknown",
    tags: process.tags || [],
    related_commands: process.related_commands || [],
  };

  const yamlContent = Object.entries(frontmatter)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}: [${value.join(", ")}]`;
      }
      return `${key}: ${value}`;
    })
    .join("\n");

  return `---\n${yamlContent}\n---\n\n${process.content || ""}`;
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
export const syncProcessesCommandConfig = {
  command: "sync-processes",
  description: "Sync processes from ~/.claude/processes",
  options: [
    ["--all", "Sync all unregistered processes without prompting"],
    ["--force-copy", "Copy all processes to project directory"],
    ["--project", "Use project scope instead of user scope"],
  ],
  action: syncProcessesCommand,
};
