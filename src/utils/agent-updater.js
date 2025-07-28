/**
 * Agent updater utility
 * Ensures we always use the latest agent names and removes deprecated ones
 */

import { existsSync, unlinkSync } from "fs";
import { join } from "path";
import { getAgentsDir } from "./paths.js";
import { getConfig, updateConfig } from "./config.js";
import { logger } from "./logger.js";

/**
 * List of deprecated agents that should be completely removed
 * These agents have been replaced with new versions
 */
export const DEPRECATED_AGENTS = [
  "design-director-platform",
  "design-system-architect",
  "doc-writer",
  "refactor",
  "interaction-design-optimizer",
  "requirements-analyst",
  "system-architect-2025",
  "debugger",
  "security-scanner",
  "test-runner",
  "code-reviewer",
];

/**
 * Map of deprecated agents to their replacements (if any)
 * Note: Some deprecated agents may not have direct replacements
 */
export const AGENT_REPLACEMENTS = {
  "design-director-platform": "platform-redesigner",
  "design-system-architect": "design-system-creator",
  "doc-writer": "documentation-writer",
  refactor: "code-refactorer",
  "interaction-design-optimizer": "ux-optimizer",
  "requirements-analyst": "codebase-analyzer",
  "system-architect-2025": "system-architect",
  // These don't have direct replacements in the new set
  debugger: null,
  "security-scanner": null,
  "test-runner": null,
  "code-reviewer": null,
};

/**
 * Remove deprecated agents from the system
 * @param {boolean} dryRun - If true, only report what would be removed
 * @returns {Object} Summary of removed agents
 */
export function removeDeprecatedAgents(dryRun = false) {
  const summary = {
    removed: [],
    errors: [],
    configCleaned: false,
  };

  // Get current config
  const config = getConfig();
  const installedAgents = { ...(config.installedAgents || {}) };
  let configModified = false;

  // Remove deprecated agents from both user and project directories
  for (const scope of [false, true]) {
    const agentsDir = getAgentsDir(scope);

    for (const deprecatedAgent of DEPRECATED_AGENTS) {
      const agentPath = join(agentsDir, `${deprecatedAgent}.md`);

      // Remove from filesystem
      if (existsSync(agentPath)) {
        try {
          if (!dryRun) {
            unlinkSync(agentPath);
          }
          summary.removed.push({
            name: deprecatedAgent,
            path: agentPath,
            scope: scope ? "project" : "user",
          });
          logger.debug(
            `${dryRun ? "Would remove" : "Removed"} deprecated agent: ${agentPath}`,
          );
        } catch (error) {
          summary.errors.push({
            name: deprecatedAgent,
            error: error.message,
          });
          logger.error(`Failed to remove ${deprecatedAgent}: ${error.message}`);
        }
      }

      // Remove from config
      if (installedAgents[deprecatedAgent]) {
        delete installedAgents[deprecatedAgent];
        configModified = true;
      }
    }
  }

  // Update config if modified
  if (configModified && !dryRun) {
    updateConfig({ ...config, installedAgents });
    summary.configCleaned = true;
  }

  return summary;
}

/**
 * Get replacement suggestion for a deprecated agent
 * @param {string} deprecatedAgent - The deprecated agent name
 * @returns {string|null} The replacement agent name or null if no replacement
 */
export function getReplacementAgent(deprecatedAgent) {
  return AGENT_REPLACEMENTS[deprecatedAgent] || null;
}

/**
 * Check if an agent is deprecated
 * @param {string} agentName - The agent name to check
 * @returns {boolean} True if the agent is deprecated
 */
export function isDeprecated(agentName) {
  return DEPRECATED_AGENTS.includes(agentName);
}

/**
 * Clean and update agent configuration
 * Removes all deprecated agents and ensures only new agents are present
 * @returns {Object} Summary of the cleanup operation
 */
export function cleanupAgentConfiguration() {
  const summary = {
    deprecatedRemoved: [],
    configUpdated: false,
    errors: [],
  };

  try {
    // Remove deprecated agents from filesystem and config
    const removalSummary = removeDeprecatedAgents(false);
    summary.deprecatedRemoved = removalSummary.removed;
    summary.configUpdated = removalSummary.configCleaned;

    if (removalSummary.errors.length > 0) {
      summary.errors = removalSummary.errors;
    }

    // Log replacement suggestions
    const replacements = {};
    for (const removed of summary.deprecatedRemoved) {
      const replacement = getReplacementAgent(removed.name);
      if (replacement) {
        replacements[removed.name] = replacement;
      }
    }

    if (Object.keys(replacements).length > 0) {
      logger.info("Suggested replacements:");
      for (const [old, newAgent] of Object.entries(replacements)) {
        logger.info(`  ${old} → ${newAgent}`);
      }
    }
  } catch (error) {
    summary.errors.push({
      operation: "cleanup",
      error: error.message,
    });
    logger.error(`Cleanup failed: ${error.message}`);
  }

  return summary;
}

/**
 * Ensure only the latest agents are installed
 * This function removes all deprecated agents and verifies the current setup
 * @returns {boolean} True if the cleanup was successful
 */
export function ensureLatestAgents() {
  try {
    logger.info("Ensuring only latest agents are installed...");

    // Clean up deprecated agents
    const cleanupSummary = cleanupAgentConfiguration();

    if (cleanupSummary.deprecatedRemoved.length > 0) {
      logger.info(
        `Removed ${cleanupSummary.deprecatedRemoved.length} deprecated agent(s)`,
      );
    }

    if (cleanupSummary.errors.length > 0) {
      logger.warn(
        `Encountered ${cleanupSummary.errors.length} error(s) during cleanup`,
      );
      return false;
    }

    return true;
  } catch (error) {
    logger.error(`Failed to ensure latest agents: ${error.message}`);
    return false;
  }
}
