import chalk from "chalk";

// Simple logger utility to replace console statements
// In production, this could be replaced with a proper logging library like winston or pino

const LogLevel = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  SILENT: 4,
};

class Logger {
  constructor() {
    // Default to INFO level, can be configured via environment variable
    this.level =
      LogLevel[process.env.LOG_LEVEL?.toUpperCase()] ?? LogLevel.INFO;
    this.silent =
      process.env.NODE_ENV === "test" || process.env.SILENT === "true";
  }

  debug(...args) {
    if (this.level <= LogLevel.DEBUG && !this.silent) {
      console.log(chalk.gray("[DEBUG]"), ...args);
    }
  }

  info(...args) {
    if (this.level <= LogLevel.INFO && !this.silent) {
      console.log(...args);
    }
  }

  log(...args) {
    // Alias for info
    this.info(...args);
  }

  warn(...args) {
    if (this.level <= LogLevel.WARN && !this.silent) {
      console.warn(chalk.yellow("[WARN]"), ...args);
    }
  }

  error(...args) {
    if (this.level <= LogLevel.ERROR && !this.silent) {
      console.error(chalk.red("[ERROR]"), ...args);
    }
  }

  success(...args) {
    if (this.level <= LogLevel.INFO && !this.silent) {
      console.log(chalk.green("✓"), ...args);
    }
  }

  // Special methods for CLI output
  header(title) {
    if (this.level <= LogLevel.INFO && !this.silent) {
      console.log(
        chalk.blue.bold("\n╔═══════════════════════════════════════════╗"),
      );
      console.log(
        chalk.blue.bold("║"),
        chalk.white.bold(title.padEnd(41)),
        chalk.blue.bold("║"),
      );
      console.log(
        chalk.blue.bold("╚═══════════════════════════════════════════╝\n"),
      );
    }
  }

  section(title) {
    if (this.level <= LogLevel.INFO && !this.silent) {
      console.log(chalk.cyan(`\n=== ${title} ===`));
    }
  }

  // For structured logging in production
  json(level, message, data = {}) {
    if (process.env.LOG_FORMAT === "json" && !this.silent) {
      const logEntry = {
        timestamp: new Date().toISOString(),
        level,
        message,
        ...data,
      };
      console.log(JSON.stringify(logEntry));
    }
  }
}

// Export singleton instance
export const logger = new Logger();

// Also export for testing or custom instances
export { Logger, LogLevel };
