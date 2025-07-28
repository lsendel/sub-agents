import { readdirSync, readFileSync, existsSync } from 'fs';
import { join, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import { extractFrontmatter } from './yaml-parser.js';
import { getProcessesDir, getStandardsDir } from './paths.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Load a process from file
 */
export function loadProcessFromFile(processName, processPath) {
  try {
    const content = readFileSync(processPath, 'utf-8');

    // Use custom parser that supports Claude Code format
    const { frontmatter, content: body } = extractFrontmatter(content);

    if (!frontmatter) {
      throw new Error('No YAML frontmatter found');
    }

    // Extract metadata from frontmatter
    const metadata = {
      name: frontmatter.name || processName,
      type: frontmatter.type || 'process',
      version: frontmatter.version || '1.0.0',
      description: frontmatter.description || '',
      author: frontmatter.author || 'Unknown',
      tags: frontmatter.tags || [],
      related_commands: frontmatter.related_commands || [],
      dependencies: frontmatter.dependencies || [],
    };

    return {
      name: processName,
      ...metadata,
      frontmatter,
      content: body,
      fullContent: content,
    };
  } catch (error) {
    console.error(`Error loading process ${processName}:`, error.message);
    return null;
  }
}

/**
 * Load a standard from file
 */
export function loadStandardFromFile(standardName, standardPath) {
  try {
    const content = readFileSync(standardPath, 'utf-8');

    // Use custom parser that supports Claude Code format
    const { frontmatter, content: body } = extractFrontmatter(content);

    if (!frontmatter) {
      throw new Error('No YAML frontmatter found');
    }

    // Extract metadata from frontmatter
    const metadata = {
      name: frontmatter.name || standardName,
      type: frontmatter.type || 'standard',
      version: frontmatter.version || '1.0.0',
      description: frontmatter.description || '',
      author: frontmatter.author || 'Unknown',
      tags: frontmatter.tags || [],
      related_commands: frontmatter.related_commands || [],
      dependencies: frontmatter.dependencies || [],
    };

    return {
      name: standardName,
      ...metadata,
      frontmatter,
      content: body,
      fullContent: content,
    };
  } catch (error) {
    console.error(`Error loading standard ${standardName}:`, error.message);
    return null;
  }
}

/**
 * Get available processes from project
 */
export function getAvailableProcesses() {
  const projectRoot = join(__dirname, '..', '..');
  const processesDir = join(projectRoot, 'processes');

  if (!existsSync(processesDir)) {
    return [];
  }

  const processes = [];
  const entries = readdirSync(processesDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const processPath = join(processesDir, entry.name, 'process.md');
      if (existsSync(processPath)) {
        const process = loadProcessFromFile(entry.name, processPath);
        if (process) {
          processes.push(process);
        }
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const processName = basename(entry.name, '.md');
      const process = loadProcessFromFile(
        processName,
        join(processesDir, entry.name),
      );
      if (process) {
        processes.push(process);
      }
    }
  }

  return processes;
}

/**
 * Get available standards from project
 */
export function getAvailableStandards() {
  const projectRoot = join(__dirname, '..', '..');
  const standardsDir = join(projectRoot, 'standards');

  if (!existsSync(standardsDir)) {
    return [];
  }

  const standards = [];
  const entries = readdirSync(standardsDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const standardPath = join(standardsDir, entry.name, 'standard.md');
      if (existsSync(standardPath)) {
        const standard = loadStandardFromFile(entry.name, standardPath);
        if (standard) {
          standards.push(standard);
        }
      }
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const standardName = basename(entry.name, '.md');
      const standard = loadStandardFromFile(
        standardName,
        join(standardsDir, entry.name),
      );
      if (standard) {
        standards.push(standard);
      }
    }
  }

  return standards;
}

/**
 * Find process by name in user or project directories
 */
export function findProcess(processName, searchProject = true) {
  // Check user directory first
  const userProcessPath = join(getProcessesDir(false), `${processName}.md`);
  if (existsSync(userProcessPath)) {
    return loadProcessFromFile(processName, userProcessPath);
  }

  // Check project directory
  if (searchProject) {
    const projectProcessPath = join(getProcessesDir(true), `${processName}.md`);
    if (existsSync(projectProcessPath)) {
      return loadProcessFromFile(processName, projectProcessPath);
    }

    // Also check subdirectory format
    const projectProcessDirPath = join(
      getProcessesDir(true),
      processName,
      'process.md',
    );
    if (existsSync(projectProcessDirPath)) {
      return loadProcessFromFile(processName, projectProcessDirPath);
    }
  }

  return null;
}

/**
 * Find standard by name in user or project directories
 */
export function findStandard(standardName, searchProject = true) {
  // Check user directory first
  const userStandardPath = join(getStandardsDir(false), `${standardName}.md`);
  if (existsSync(userStandardPath)) {
    return loadStandardFromFile(standardName, userStandardPath);
  }

  // Check project directory
  if (searchProject) {
    const projectStandardPath = join(
      getStandardsDir(true),
      `${standardName}.md`,
    );
    if (existsSync(projectStandardPath)) {
      return loadStandardFromFile(standardName, projectStandardPath);
    }

    // Also check subdirectory format
    const projectStandardDirPath = join(
      getStandardsDir(true),
      standardName,
      'standard.md',
    );
    if (existsSync(projectStandardDirPath)) {
      return loadStandardFromFile(standardName, projectStandardDirPath);
    }
  }

  return null;
}
