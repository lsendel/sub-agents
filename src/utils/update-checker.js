import { execSync } from "child_process";
import chalk from "chalk";
import semver from "semver";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Check for available updates
 * @param {boolean} silent - If true, only show when updates are available
 */
export async function checkForUpdates(silent = true) {
  try {
    const packageJson = JSON.parse(
      readFileSync(join(__dirname, "../../package.json"), "utf-8"),
    );
    const currentVersion = packageJson.version;
    const packageName = packageJson.name;

    // Get latest version from npm
    const latestVersion = execSync(
      `npm view ${packageName} version 2>/dev/null`,
      { encoding: "utf-8", stdio: ["pipe", "pipe", "ignore"] },
    ).trim();

    if (!latestVersion) {
      if (!silent) {
        console.log(chalk.gray("Package not yet published to npm"));
      }
      return;
    }

    if (semver.gt(latestVersion, currentVersion)) {
      console.log(chalk.yellow("\n📦 Update available!"));
      console.log(chalk.gray(`   Current: ${currentVersion}`));
      console.log(chalk.green(`   Latest:  ${latestVersion}`));
      console.log(chalk.cyan(`   Run: npm update -g ${packageName}\n`));
      return true;
    } else if (!silent) {
      console.log(chalk.green("✓ You are using the latest version"));
    }

    return false;
  } catch (error) {
    // Silently fail - don't interrupt user
    if (!silent) {
      console.log(chalk.gray("Could not check for updates"));
    }
    return false;
  }
}

/**
 * Get version information
 */
export function getVersionInfo() {
  try {
    const packageJson = JSON.parse(
      readFileSync(join(__dirname, "../../package.json"), "utf-8"),
    );

    return {
      name: packageJson.name,
      version: packageJson.version,
      description: packageJson.description,
    };
  } catch (error) {
    return {
      name: "claude-agents",
      version: "unknown",
      description: "Claude Sub-Agents Manager",
    };
  }
}
