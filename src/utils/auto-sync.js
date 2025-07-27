import { existsSync, statSync } from 'fs';
import { getAgentsDir } from './paths.js';
import { loadConfig, saveConfig } from './config.js';
import { logger } from './logger.js';
import chalk from 'chalk';

/**
 * Auto-sync utility to detect and sync external agent installations
 */

let lastSyncCheck = null;
const SYNC_CHECK_INTERVAL = 60000; // 1 minute

/**
 * Check if auto-sync is needed based on file system changes
 * @param {boolean} force - Force sync check regardless of interval
 * @returns {boolean} - Whether sync is needed
 */
export async function shouldAutoSync(force = false) {
  try {
    // Check if enough time has passed since last check
    if (!force && lastSyncCheck && Date.now() - lastSyncCheck < SYNC_CHECK_INTERVAL) {
      return false;
    }
    
    lastSyncCheck = Date.now();
    
    const config = loadConfig();
    const lastSyncTime = config.lastSyncTime || 0;
    
    // Check both user and project agent directories
    const userAgentsDir = getAgentsDir(false);
    const projectAgentsDir = getAgentsDir(true);
    
    for (const dir of [userAgentsDir, projectAgentsDir]) {
      if (!existsSync(dir)) continue;
      
      // Get directory modification time
      const stats = statSync(dir);
      const dirModTime = stats.mtimeMs;
      
      // If directory was modified after last sync, sync is needed
      if (dirModTime > lastSyncTime) {
        logger.debug(`Directory ${dir} modified after last sync`);
        return true;
      }
    }
    
    return false;
  } catch (error) {
    logger.debug(`Error checking auto-sync: ${error.message}`);
    return false;
  }
}

/**
 * Update the last sync time in configuration
 */
export function updateLastSyncTime() {
  const config = loadConfig();
  config.lastSyncTime = Date.now();
  saveConfig(config);
}

/**
 * Run auto-sync if needed
 * @param {boolean} silent - Whether to suppress output
 * @returns {Promise<boolean>} - Whether sync was performed
 */
export async function runAutoSyncIfNeeded(silent = false) {
  if (await shouldAutoSync()) {
    if (!silent) {
      console.log(chalk.dim('Detected external agent changes, running sync...'));
    }
    
    try {
      // Import sync command dynamically to avoid circular dependencies
      const { syncCommand } = await import('../commands/sync.js');
      await syncCommand({ auto: true });
      updateLastSyncTime();
      return true;
    } catch (error) {
      logger.error(`Auto-sync failed: ${error.message}`);
      return false;
    }
  }
  
  return false;
}

/**
 * Enable auto-sync in configuration
 */
export function enableAutoSync() {
  const config = loadConfig();
  config.autoSync = true;
  saveConfig(config);
  console.log(chalk.green('✓ Auto-sync enabled'));
}

/**
 * Disable auto-sync in configuration
 */
export function disableAutoSync() {
  const config = loadConfig();
  config.autoSync = false;
  saveConfig(config);
  console.log(chalk.yellow('Auto-sync disabled'));
}

/**
 * Check if auto-sync is enabled
 * @returns {boolean}
 */
export function isAutoSyncEnabled() {
  const config = loadConfig();
  return config.autoSync === true;
}