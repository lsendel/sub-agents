import path from 'path';


// Regex patterns for validation
const AGENT_NAME_PATTERN = /^[a-z0-9-]+$/;
const COMMAND_INJECTION_PATTERNS = [
  /[;&|`$(){}[\]<>]/,
  /\.\./,
  /~\//
];

/**
 * Validates agent name format
 * @param {string} agentName - The agent name to validate
 * @returns {import('../../types').ValidationResult} - Validation result
 */
export function validateAgentName(agentName) {
  if (!agentName || typeof agentName !== 'string') {
    return { valid: false, error: 'Agent name must be a non-empty string' };
  }

  if (agentName.length < 3 || agentName.length > 50) {
    return { valid: false, error: 'Agent name must be between 3 and 50 characters' };
  }

  if (!AGENT_NAME_PATTERN.test(agentName)) {
    return { valid: false, error: 'Agent name can only contain lowercase letters, numbers, and hyphens' };
  }

  if (agentName.startsWith('-') || agentName.endsWith('-')) {
    return { valid: false, error: 'Agent name cannot start or end with a hyphen' };
  }

  // Prevent path traversal attacks
  if (agentName.includes('..') || agentName.includes('/') || agentName.includes('\\')) {
    return { valid: false, error: 'Agent name contains invalid characters' };
  }

  // Block common path traversal patterns
  const dangerousPatterns = ['%2e', '%2f', '%5c', '%252e', '%252f', '%255c', '~'];
  for (const pattern of dangerousPatterns) {
    if (agentName.toLowerCase().includes(pattern)) {
      return { valid: false, error: 'Agent name contains potentially dangerous patterns' };
    }
  }

  return { valid: true };
}

/**
 * Validates file path for safety
 * @param {string} filePath - The file path to validate
 * @returns {Object} - { valid: boolean, error?: string }
 */
export function validateFilePath(filePath) {
  if (!filePath || typeof filePath !== 'string') {
    return { valid: false, error: 'File path must be a non-empty string' };
  }

  // Check for command injection attempts
  for (const pattern of COMMAND_INJECTION_PATTERNS) {
    if (pattern.test(filePath)) {
      return { valid: false, error: 'File path contains invalid characters' };
    }
  }

  // Ensure path doesn't escape project boundaries
  const normalizedPath = path.normalize(filePath);
  const resolvedPath = path.resolve(filePath);
  
  if (normalizedPath !== filePath || !resolvedPath.startsWith(process.cwd())) {
    return { valid: false, error: 'File path attempts to access restricted directories' };
  }

  return { valid: true };
}

/**
 * Sanitizes user input to prevent injection attacks
 * @param {string} input - The input to sanitize
 * @returns {string} - Sanitized input
 */
export function sanitizeInput(input) {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Remove null bytes
  let sanitized = input.replace(/\0/g, '');

  // Escape shell metacharacters
  sanitized = sanitized.replace(/([`$\\])/g, '\\$1');

  // Limit length to prevent DoS
  if (sanitized.length > 1000) {
    sanitized = sanitized.substring(0, 1000);
  }

  return sanitized;
}

/**
 * Validates command options
 * @param {Object} options - Command options to validate
 * @param {Array<string>} allowedOptions - List of allowed option names
 * @returns {Object} - { valid: boolean, error?: string }
 */
export function validateCommandOptions(options, allowedOptions) {
  if (!options || typeof options !== 'object') {
    return { valid: true }; // Options are optional
  }

  const optionKeys = Object.keys(options);
  const invalidOptions = optionKeys.filter(key => !allowedOptions.includes(key));

  if (invalidOptions.length > 0) {
    return { 
      valid: false, 
      error: `Invalid options: ${invalidOptions.join(', ')}` 
    };
  }

  return { valid: true };
}

/**
 * Validates agent metadata
 * @param {Object} metadata - Agent metadata to validate
 * @returns {Object} - { valid: boolean, errors: string[] }
 */
export function validateAgentMetadata(metadata) {
  const errors = [];

  if (!metadata || typeof metadata !== 'object') {
    return { valid: false, errors: ['Metadata must be an object'] };
  }

  // Required fields
  const requiredFields = ['name', 'description', 'version'];
  for (const field of requiredFields) {
    if (!metadata[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  }

  // Validate name
  if (metadata.name) {
    const nameValidation = validateAgentName(metadata.name);
    if (!nameValidation.valid) {
      errors.push(`Invalid name: ${nameValidation.error}`);
    }
  }

  // Validate description
  if (metadata.description && metadata.description.length > 200) {
    errors.push('Description must be 200 characters or less');
  }

  // Validate version format
  if (metadata.version && !/^\d+\.\d+\.\d+$/.test(metadata.version)) {
    errors.push('Version must follow semantic versioning (e.g., 1.0.0)');
  }

  // Validate tools array
  if (metadata.tools && !Array.isArray(metadata.tools)) {
    errors.push('Tools must be an array');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Validates environment for safe execution
 * @returns {Object} - { valid: boolean, warnings: string[] }
 */
export function validateEnvironment() {
  const warnings = [];

  // Check if running as root (not recommended)
  if (process.getuid && process.getuid() === 0) {
    warnings.push('Running as root is not recommended for security reasons');
  }

  // Check Node.js version
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.split('.')[0].substring(1));
  if (majorVersion < 16) {
    warnings.push(`Node.js ${nodeVersion} is outdated. Please upgrade to v16 or later`);
  }


  return {
    valid: true,
    warnings
  };
}

/**
 * Escape special characters for safe display
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
export function escapeForDisplay(text) {
  if (!text || typeof text !== 'string') {
    return '';
  }

  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}