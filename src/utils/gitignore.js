import { readFileSync, existsSync } from 'fs';
import { join, relative } from 'path';
import { minimatch } from 'minimatch';

/**
 * Default patterns that should always be ignored
 */
const DEFAULT_IGNORE_PATTERNS = [
  'node_modules/**',
  '.git/**',
  '*.log',
  '.DS_Store',
  'Thumbs.db',
  '.env',
  '.env.*',
  '*.swp',
  '*.swo',
  '*~',
  '.idea/**',
  '.vscode/**',
  'coverage/**',
  'dist/**',
  'build/**',
  '*.tgz',
  '.npm/**',
  '.npmrc',
];

/**
 * Parse a .gitignore file and return an array of patterns
 */
export function parseGitignore(gitignorePath) {
  if (!existsSync(gitignorePath)) {
    return [];
  }

  try {
    const content = readFileSync(gitignorePath, 'utf-8');
    return content
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'))
      .map((pattern) => {
        // Convert gitignore patterns to minimatch patterns
        if (pattern.endsWith('/')) {
          return pattern + '**';
        }
        return pattern;
      });
  } catch (error) {
    console.error(`Error reading .gitignore: ${error.message}`);
    return [];
  }
}

/**
 * Check if a file path should be ignored based on gitignore patterns
 */
export function shouldIgnore(
  filePath,
  patterns = [],
  basePath = process.cwd(),
) {
  const relativePath = relative(basePath, filePath);

  // Always use default patterns
  const allPatterns = [...DEFAULT_IGNORE_PATTERNS, ...patterns];

  // Check if the file matches any ignore pattern
  return allPatterns.some((pattern) => {
    // Handle negation patterns (starting with !)
    if (pattern.startsWith('!')) {
      return false; // Negation patterns need special handling
    }

    // Check if the pattern matches
    return minimatch(relativePath, pattern, {
      dot: true,
      matchBase: true,
    });
  });
}

/**
 * Get all gitignore patterns for a project
 */
export function getProjectIgnorePatterns(projectPath = process.cwd()) {
  const patterns = [];

  // Check for .gitignore in project root
  const gitignorePath = join(projectPath, '.gitignore');
  if (existsSync(gitignorePath)) {
    patterns.push(...parseGitignore(gitignorePath));
  }

  // Check for .claude-ignore (custom ignore file for Claude agents)
  const claudeIgnorePath = join(projectPath, '.claude-ignore');
  if (existsSync(claudeIgnorePath)) {
    patterns.push(...parseGitignore(claudeIgnorePath));
  }

  return patterns;
}

/**
 * Create a filter function for use with file operations
 */
export function createIgnoreFilter(basePath = process.cwd()) {
  const patterns = getProjectIgnorePatterns(basePath);

  return (filePath) => {
    return !shouldIgnore(filePath, patterns, basePath);
  };
}

/**
 * Format ignore patterns for display in agent prompts
 */
export function formatIgnorePatternsForPrompt(patterns = []) {
  const allPatterns = [...DEFAULT_IGNORE_PATTERNS, ...patterns];

  return `
The following patterns should be ignored:
${allPatterns.map((p) => `  - ${p}`).join('\n')}

Always use these patterns when:
- Searching for files (Glob, Grep)
- Reading directory contents (LS)
- Analyzing code structure
`;
}
