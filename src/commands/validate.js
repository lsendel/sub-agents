import chalk from "chalk";
import Table from "cli-table3";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { getAgentsDir } from "../utils/paths.js";
import { getInstalledAgents } from "../utils/config.js";
import { validateDescription } from "../utils/description-optimizer.js";
import { extractFrontmatter } from "../utils/yaml-parser.js";
import { logger } from "../utils/logger.js";

export async function validateCommand(agentName, options) {
  try {
    console.log(chalk.blue.bold("\n🔍 Agent Validator\n"));

    // Get installed agents
    const installedAgents = getInstalledAgents();
    const agentNames = agentName ? [agentName] : Object.keys(installedAgents);

    if (agentNames.length === 0) {
      console.log(chalk.yellow("No agents installed to validate."));
      return;
    }

    // Validate specific agent
    if (agentName && !installedAgents[agentName]) {
      console.log(chalk.red(`Agent "${agentName}" not found.`));
      return;
    }

    const results = [];

    // Validate each agent
    for (const name of agentNames) {
      const validation = await validateAgent(name, options);
      results.push(validation);
    }

    // Display results
    if (options.json) {
      console.log(JSON.stringify(results, null, 2));
    } else {
      displayValidationResults(results, options);
    }

    // Throw error if any validation failed and strict mode
    if (options.strict && results.some((r) => !r.valid)) {
      throw new Error("Validation failed");
    }
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
}

/**
 * Validate a single agent
 */
async function validateAgent(agentName) {
  const result = {
    name: agentName,
    valid: true,
    issues: [],
    warnings: [],
    score: 1.0,
  };

  try {
    // Find agent file
    const userPath = join(getAgentsDir(false), `${agentName}.md`);
    const projectPath = join(getAgentsDir(true), `${agentName}.md`);
    const agentPath = existsSync(userPath)
      ? userPath
      : existsSync(projectPath)
        ? projectPath
        : null;

    if (!agentPath) {
      result.valid = false;
      result.issues.push("Agent file not found");
      result.score = 0;
      return result;
    }

    // Read and parse agent file
    const content = readFileSync(agentPath, "utf-8");

    // Use our custom parser that supports Claude Code format
    const { frontmatter, content: agentBody } = extractFrontmatter(content);

    if (!frontmatter) {
      result.valid = false;
      result.issues.push("No YAML frontmatter found");
      result.score = 0;
      return result;
    }

    // Validate required fields
    if (!frontmatter.name) {
      result.issues.push("Missing required field: name");
      result.valid = false;
    }

    if (!frontmatter.description) {
      result.issues.push("Missing required field: description");
      result.valid = false;
    }

    // Validate description quality
    const descValidation = validateDescription(
      frontmatter.description,
      agentName,
    );
    if (!descValidation.valid) {
      result.warnings.push(...descValidation.issues);
      result.score *= descValidation.score;
    }

    // Validate tools
    if (frontmatter.tools) {
      const validTools = [
        "Read",
        "Write",
        "Edit",
        "MultiEdit",
        "Bash",
        "Grep",
        "Glob",
        "WebSearch",
        "WebFetch",
        "Task",
        "TodoWrite",
        "NotebookRead",
        "NotebookEdit",
      ];

      const tools =
        typeof frontmatter.tools === "string"
          ? frontmatter.tools.split(",").map((t) => t.trim())
          : frontmatter.tools;

      const invalidTools = tools.filter((t) => !validTools.includes(t));
      if (invalidTools.length > 0) {
        result.warnings.push(`Unknown tools: ${invalidTools.join(", ")}`);
        result.score *= 0.9;
      }
    }

    // Validate content
    if (agentBody.length < 100) {
      result.warnings.push("Agent content seems too short (< 100 characters)");
      result.score *= 0.8;
    }

    // Check for common patterns
    if (!agentBody.includes("role") && !agentBody.includes("expert")) {
      result.warnings.push("Agent should define its role or expertise");
      result.score *= 0.9;
    }

    // Additional metadata
    result.metadata = {
      hasVersion: !!frontmatter.version,
      hasAuthor: !!frontmatter.author,
      hasTags: !!frontmatter.tags && frontmatter.tags.length > 0,
      toolCount: frontmatter.tools
        ? typeof frontmatter.tools === "string"
          ? frontmatter.tools.split(",").length
          : frontmatter.tools.length
        : 0,
    };
  } catch (error) {
    result.valid = false;
    result.issues.push(`Validation error: ${error.message}`);
    result.score = 0;
  }

  return result;
}

/**
 * Display validation results in a table
 */
function displayValidationResults(results, options) {
  // Summary
  const validCount = results.filter((r) => r.valid).length;
  const totalCount = results.length;
  const avgScore = results.reduce((sum, r) => sum + r.score, 0) / totalCount;

  console.log("Validation Summary:");
  console.log(`  Total agents: ${totalCount}`);
  console.log(`  Valid: ${chalk.green(validCount)}`);
  console.log(`  Invalid: ${chalk.red(totalCount - validCount)}`);
  console.log(`  Average score: ${(avgScore * 100).toFixed(1)}%\n`);

  // Detailed results table
  const table = new Table({
    head: ["Agent", "Status", "Score", "Issues", "Warnings"],
    colWidths: [25, 10, 10, 30, 30],
    style: { head: ["cyan"] },
  });

  for (const result of results) {
    const status = result.valid
      ? chalk.green("✓ Valid")
      : chalk.red("✗ Invalid");
    const score = `${(result.score * 100).toFixed(0)}%`;
    const issues =
      result.issues.length > 0
        ? chalk.red(result.issues.join("\n"))
        : chalk.gray("None");
    const warnings =
      result.warnings.length > 0
        ? chalk.yellow(result.warnings.join("\n"))
        : chalk.gray("None");

    table.push([result.name, status, score, issues, warnings]);
  }

  console.log(table.toString());

  // Show metadata if verbose
  if (options.verbose) {
    console.log("\nAgent Metadata:");
    const metaTable = new Table({
      head: ["Agent", "Version", "Author", "Tags", "Tools"],
      colWidths: [25, 10, 15, 15, 10],
      style: { head: ["cyan"] },
    });

    for (const result of results) {
      if (result.metadata) {
        const m = result.metadata;
        metaTable.push([
          result.name,
          m.hasVersion ? "✓" : "✗",
          m.hasAuthor ? "✓" : "✗",
          m.hasTags ? "✓" : "✗",
          m.toolCount || "All",
        ]);
      }
    }

    console.log(metaTable.toString());
  }

  // Recommendations
  const invalidAgents = results.filter((r) => !r.valid);
  const lowScoreAgents = results.filter((r) => r.valid && r.score < 0.7);

  if (invalidAgents.length > 0 || lowScoreAgents.length > 0) {
    console.log(chalk.bold("\nRecommendations:"));

    if (invalidAgents.length > 0) {
      console.log(
        chalk.red(
          `  • Fix critical issues in: ${invalidAgents.map((a) => a.name).join(", ")}`,
        ),
      );
    }

    if (lowScoreAgents.length > 0) {
      console.log(
        chalk.yellow(
          `  • Run 'claude-agents optimize' to improve: ${lowScoreAgents.map((a) => a.name).join(", ")}`,
        ),
      );
    }
  }
}

// Command configuration for commander
export const validateCommandConfig = {
  command: "validate [agent]",
  description: "Validate agent format and quality",
  options: [
    ["-v, --verbose", "Show detailed validation information"],
    ["-j, --json", "Output results as JSON"],
    ["-s, --strict", "Exit with error code if validation fails"],
  ],
  action: validateCommand,
};
