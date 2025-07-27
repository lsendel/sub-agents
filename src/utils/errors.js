import { logger } from './logger.js';

/**
 * Custom error class for CLI operations
 */
export class CLIError extends Error {
  constructor(message, code = 1) {
    super(message);
    this.name = 'CLIError';
    this.code = code;
  }
}

/**
 * Handles errors in a consistent way across the CLI
 * @param {Error} error - The error to handle
 * @param {string} context - Context where the error occurred
 */
export function handleError(error, context = '') {
  if (error instanceof CLIError) {
    logger.error(error.message);
  } else {
    logger.error(context ? `${context}:` : 'Error:', error.message);
    if (process.env.DEBUG === 'true') {
      logger.debug(error.stack);
    }
  }
  
  // In the main CLI handler, we'll catch these and call process.exit
  // This allows the commands to be testable and reusable
  throw error;
}

/**
 * Creates a standard error for common scenarios
 */
export const Errors = {
  noAgentsInstalled: () => new CLIError('No agents installed. Use "claude-agents install" first.'),
  agentNotFound: (name) => new CLIError(`Agent "${name}" not found.`),
  agentNotInstalled: (name) => new CLIError(`Agent "${name}" is not installed.`),
  installationFailed: (name, reason) => new CLIError(`Failed to install "${name}": ${reason}`),
  invalidAgentName: (name) => new CLIError(`Invalid agent name: "${name}"`),
  configLoadFailed: (reason) => new CLIError(`Failed to load configuration: ${reason}`),
  configSaveFailed: (reason) => new CLIError(`Failed to save configuration: ${reason}`),
};