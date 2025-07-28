import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  copyFileSync,
  rmSync,
} from "fs";
import { join, basename, dirname } from "path";
import yaml from "yaml";
import { logger } from "./logger.js";

/**
 * Migrates agents from old multi-file format to new single .md format
 */
export class AgentMigrator {
  constructor() {
    this.backupDir = join(process.cwd(), ".claude-agents-backup");
  }

  /**
   * Migrate all agents in a directory
   */
  async migrateDirectory(agentsDir, options = {}) {
    const results = {
      migrated: [],
      failed: [],
      skipped: [],
    };

    if (!existsSync(agentsDir)) {
      throw new Error(`Agents directory not found: ${agentsDir}`);
    }

    // Create backup if requested
    if (options.backup) {
      await this.createBackup(agentsDir);
    }

    // Get all agent directories
    const entries = readdirSync(agentsDir, { withFileTypes: true });
    const agentDirs = entries.filter((d) => d.isDirectory()).map((d) => d.name);

    for (const agentName of agentDirs) {
      const agentPath = join(agentsDir, agentName);

      try {
        // Check if already migrated (single .md file exists)
        const mdPath = join(agentsDir, `${agentName}.md`);
        if (existsSync(mdPath)) {
          results.skipped.push(agentName);
          logger.debug(`Skipping ${agentName} - already migrated`);
          continue;
        }

        // Migrate the agent
        const migrated = await this.migrateAgent(agentPath);
        if (migrated) {
          results.migrated.push(agentName);

          // Remove old directory if cleanup enabled
          if (options.cleanup) {
            rmSync(agentPath, { recursive: true, force: true });
          }
        } else {
          results.failed.push(agentName);
        }
      } catch (error) {
        logger.error(`Failed to migrate ${agentName}: ${error.message}`);
        results.failed.push(agentName);
      }
    }

    return results;
  }

  /**
   * Migrate a single agent from old format to new
   */
  async migrateAgent(agentDir) {
    const agentName = basename(agentDir);
    const agentFile = join(agentDir, "agent.md");
    const metadataFile = join(agentDir, "metadata.json");
    const hooksFile = join(agentDir, "hooks.json");

    // Check required files exist
    if (!existsSync(agentFile)) {
      logger.error(`Agent file not found: ${agentFile}`);
      return false;
    }

    // Read agent content
    const agentContent = readFileSync(agentFile, "utf-8");
    let frontmatter = {};
    let content = agentContent;

    // Parse existing frontmatter
    const frontmatterMatch = /^---\n([\s\S]*?)\n---\n([\s\S]*)/.exec(
      agentContent,
    );
    if (frontmatterMatch) {
      try {
        frontmatter = yaml.parse(frontmatterMatch[1]);
        content = frontmatterMatch[2];
      } catch (e) {
        logger.warn(`Failed to parse frontmatter for ${agentName}`);
      }
    }

    // Read and merge metadata if exists
    if (existsSync(metadataFile)) {
      try {
        const metadata = JSON.parse(readFileSync(metadataFile, "utf-8"));

        // Merge metadata into frontmatter
        frontmatter = {
          name: agentName,
          description: frontmatter.description || metadata.description,
          tools:
            frontmatter.tools ||
            (metadata.requirements?.tools || []).join(", "),
          version: metadata.version || "1.0.0",
          author: metadata.author || "Claude Sub-Agents",
          tags: metadata.tags || [],
        };

        // Add hooks information if exists
        if (metadata.hooks) {
          frontmatter.hooks_recommended = metadata.hooks.recommended || [];
          frontmatter.hooks_optional = metadata.hooks.optional || [];
        }
      } catch (e) {
        logger.warn(`Failed to parse metadata for ${agentName}`);
      }
    }

    // Read hooks file if exists
    if (existsSync(hooksFile)) {
      try {
        const hooks = JSON.parse(readFileSync(hooksFile, "utf-8"));
        // Add hooks info to frontmatter if not already present
        if (!frontmatter.hooks_config) {
          frontmatter.hooks_config = hooks;
        }
      } catch (e) {
        logger.warn(`Failed to parse hooks for ${agentName}`);
      }
    }

    // Optimize description for Claude Code auto-delegation
    frontmatter.description = this.optimizeDescription(
      frontmatter.description,
      agentName,
    );

    // Create new agent file
    const newAgentPath = join(dirname(agentDir), `${agentName}.md`);
    const newContent = this.formatAgent(frontmatter, content);

    writeFileSync(newAgentPath, newContent);
    logger.debug(`Migrated ${agentName} to ${newAgentPath}`);

    return true;
  }

  /**
   * Optimize agent description for better auto-delegation
   */
  optimizeDescription(description, agentName) {
    if (!description) return `${agentName} agent`;

    const optimizations = {
      "code-reviewer":
        "Automatically reviews code after edits. Checks for quality, security vulnerabilities, performance issues, and best practices. Use after writing or modifying code.",
      "test-runner":
        "Runs tests when code changes or tests fail. Automatically detects test framework, executes tests, and fixes failing tests. Use when tests need to be run or fixed.",
      debugger:
        "Analyzes and fixes errors, crashes, and unexpected behavior. Interprets stack traces, identifies root causes, and suggests solutions. Use when debugging issues.",
      refactor:
        "Improves code structure without changing functionality. Applies design patterns, modernizes legacy code, and enhances maintainability. Use when code needs restructuring.",
      "doc-writer":
        "Creates and updates documentation. Generates API docs, README files, architecture documentation, and inline comments. Use when documentation is needed.",
      "security-scanner":
        "Scans for security vulnerabilities and compliance issues. Detects exposed secrets, OWASP violations, and suggests fixes. Use for security analysis.",
      "requirements-analyst":
        "Analyzes codebase to extract requirements and dependencies. Maps architecture patterns and identifies technical debt. Use for codebase analysis.",
      "design-director-platform":
        "Coordinates comprehensive platform redesigns. Addresses accessibility, conversion rates, and technical debt. Use for large-scale platform improvements.",
      "design-system-architect":
        "Creates and enhances design systems with AI personalization. Implements adaptive interfaces and brand consistency. Use for design system work.",
      "interaction-design-optimizer":
        "Optimizes user interactions and conversion rates. Implements psychological triggers and adaptive personalization. Use for UX optimization.",
      "system-architect-2025":
        "Provides modern system architecture guidance. Designs scalable, cloud-native solutions with cutting-edge patterns. Use for architecture decisions.",
    };

    return optimizations[agentName] || description;
  }

  /**
   * Format agent with frontmatter and content
   */
  formatAgent(frontmatter, content) {
    // Clean up frontmatter - only include essential fields
    const cleanFrontmatter = {
      name: frontmatter.name,
      description: frontmatter.description,
      tools: frontmatter.tools || "",
    };

    // Add optional fields if present
    if (frontmatter.version) cleanFrontmatter.version = frontmatter.version;
    if (frontmatter.author) cleanFrontmatter.author = frontmatter.author;
    if (frontmatter.tags && frontmatter.tags.length > 0) {
      cleanFrontmatter.tags = frontmatter.tags;
    }

    const yamlStr = yaml.stringify(cleanFrontmatter).trim();
    return `---\n${yamlStr}\n---\n\n${content.trim()}\n`;
  }

  /**
   * Create backup of agents directory
   */
  async createBackup(agentsDir) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupPath = join(this.backupDir, timestamp);

    mkdirSync(backupPath, { recursive: true });

    // Copy entire agents directory
    this.copyDirectory(agentsDir, backupPath);

    logger.info(`Backup created at: ${backupPath}`);
    return backupPath;
  }

  /**
   * Recursively copy directory
   */
  copyDirectory(src, dest) {
    mkdirSync(dest, { recursive: true });

    const entries = readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = join(src, entry.name);
      const destPath = join(dest, entry.name);

      if (entry.isDirectory()) {
        this.copyDirectory(srcPath, destPath);
      } else {
        copyFileSync(srcPath, destPath);
      }
    }
  }

  /**
   * Migrate commands directory (remove it)
   */
  async migrateCommands(commandsDir) {
    if (!existsSync(commandsDir)) {
      return { removed: 0 };
    }

    const files = readdirSync(commandsDir);
    const removed = files.filter((f) => f.endsWith(".md")).length;

    // Create backup
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupPath = join(this.backupDir, `commands-${timestamp}`);
    this.copyDirectory(commandsDir, backupPath);

    // Remove commands directory
    rmSync(commandsDir, { recursive: true, force: true });

    return { removed, backupPath };
  }
}

/**
 * Quick migration helper
 */
export async function migrateAgents(agentsDir, options = {}) {
  const migrator = new AgentMigrator();
  return await migrator.migrateDirectory(agentsDir, options);
}
