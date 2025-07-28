/**
 * Mapping of old agent names to new agent names
 * This ensures backward compatibility when syncing agents
 */
export const AGENT_NAME_MAPPING = {
  // Old name -> New name
  'design-director-platform': 'platform-redesigner',
  'design-system-architect': 'design-system-creator',
  'doc-writer': 'documentation-writer',
  'refactor': 'code-refactorer',
  'interaction-design-optimizer': 'ux-optimizer',
  'requirements-analyst': 'codebase-analyzer',
  'system-architect-2025': 'system-architect',
  'debugger': 'performance-optimizer',
  'security-scanner': 'security-scanner', // Keep same name but ensure it's removed if not in new set
  'test-runner': 'test-runner', // Keep same name but ensure it's removed if not in new set
  'code-reviewer': 'code-reviewer' // Keep same name but ensure it's removed if not in new set
};

/**
 * Get the new name for an agent (if it has been renamed)
 * @param {string} oldName - The old agent name
 * @returns {string} The new agent name or the original if not mapped
 */
export function getNewAgentName(oldName) {
  return AGENT_NAME_MAPPING[oldName] || oldName;
}

/**
 * Check if an agent name is deprecated (old name that should be replaced)
 * @param {string} agentName - The agent name to check
 * @returns {boolean} True if the agent name is deprecated
 */
export function isDeprecatedAgentName(agentName) {
  return Object.keys(AGENT_NAME_MAPPING).includes(agentName);
}

/**
 * Get all deprecated agent names
 * @returns {string[]} Array of deprecated agent names
 */
export function getDeprecatedAgentNames() {
  return Object.keys(AGENT_NAME_MAPPING);
}

/**
 * Clean up old agents that have been replaced
 * @param {Object} installedAgents - Currently installed agents
 * @returns {Object} Cleaned up agent list with old names removed
 */
export function cleanupOldAgents(installedAgents) {
  const cleaned = { ...installedAgents };
  
  // Remove all deprecated agent names
  for (const oldName of getDeprecatedAgentNames()) {
    delete cleaned[oldName];
  }
  
  return cleaned;
}