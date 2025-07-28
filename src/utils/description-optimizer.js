import yaml from "yaml";
import { readFileSync, writeFileSync } from "fs";

/**
 * Keywords that trigger auto-delegation in Claude Code
 */
const TRIGGER_KEYWORDS = {
  "code-reviewer": [
    "review",
    "code review",
    "quality",
    "security check",
    "after edits",
    "before commit",
  ],
  "test-runner": [
    "run tests",
    "test",
    "failing tests",
    "test failure",
    "coverage",
  ],
  debugger: ["debug", "error", "crash", "stack trace", "bug", "fix issue"],
  refactor: [
    "refactor",
    "restructure",
    "improve code",
    "clean up",
    "modernize",
  ],
  "doc-writer": ["document", "documentation", "readme", "api docs", "comments"],
  "security-scanner": [
    "security",
    "vulnerability",
    "scan",
    "audit",
    "compliance",
  ],
  "requirements-analyst": [
    "analyze",
    "requirements",
    "architecture",
    "dependencies",
  ],
  "design-director-platform": [
    "redesign",
    "platform",
    "accessibility",
    "conversion",
  ],
  "design-system-architect": [
    "design system",
    "UI components",
    "brand",
    "theming",
  ],
  "interaction-design-optimizer": [
    "UX",
    "interaction",
    "conversion rate",
    "user flow",
  ],
  "system-architect-2025": [
    "architecture",
    "system design",
    "scalability",
    "microservices",
  ],
};

/**
 * Optimize agent description for Claude Code auto-delegation
 */
export function optimizeDescription(currentDescription, agentName) {
  // If no description, create a basic one
  if (!currentDescription) {
    return createDefaultDescription(agentName);
  }

  // Check if description already has good trigger words
  const hasTriggers = checkTriggerWords(currentDescription, agentName);
  if (hasTriggers.score > 0.8) {
    return currentDescription; // Already well-optimized
  }

  // Enhance the description
  return enhanceDescription(currentDescription, agentName);
}

/**
 * Create a default description based on agent name
 */
function createDefaultDescription(agentName) {
  const defaults = {
    "code-reviewer":
      "Automatically reviews code after edits. Checks for quality, security vulnerabilities, performance issues, and best practices.",
    "test-runner":
      "Runs tests when code changes or tests fail. Automatically detects test framework and fixes failing tests.",
    debugger:
      "Analyzes and fixes errors, crashes, and unexpected behavior. Interprets stack traces and identifies root causes.",
    refactor:
      "Improves code structure without changing functionality. Applies design patterns and modernizes legacy code.",
    "doc-writer":
      "Creates and updates documentation. Generates API docs, README files, and inline comments.",
    "security-scanner":
      "Scans for security vulnerabilities and compliance issues. Detects exposed secrets and suggests fixes.",
  };

  return (
    defaults[agentName] ||
    `${agentName} agent for specialized tasks. Use when working with ${agentName.replace(/-/g, " ")} related tasks.`
  );
}

/**
 * Check if description has good trigger words
 */
function checkTriggerWords(description, agentName) {
  const keywords = TRIGGER_KEYWORDS[agentName] || [];
  const descLower = description.toLowerCase();

  let matchCount = 0;
  for (const keyword of keywords) {
    if (descLower.includes(keyword.toLowerCase())) {
      matchCount++;
    }
  }

  return {
    score: keywords.length > 0 ? matchCount / keywords.length : 0,
    missing: keywords.filter((k) => !descLower.includes(k.toLowerCase())),
  };
}

/**
 * Enhance description with better triggers
 */
function enhanceDescription(description, agentName) {
  const { missing } = checkTriggerWords(description, agentName);

  // Add trigger conditions if missing
  if (missing.length > 0 && !description.includes("Use when")) {
    const triggers = missing.slice(0, 2).join(" or ");
    description += ` Use when ${triggers}.`;
  }

  // Ensure it starts with action verb
  if (
    !/^(Automatically|Analyzes|Creates|Generates|Scans|Runs|Modifies|Improves)/.test(
      description,
    )
  ) {
    description =
      "Automatically " +
      description.charAt(0).toLowerCase() +
      description.slice(1);
  }

  return description;
}

/**
 * Analyze all agents and suggest optimizations
 */
export function analyzeAgentDescriptions(agents) {
  const suggestions = [];

  for (const agent of agents) {
    const currentDesc = agent.frontmatter?.description || agent.description;
    const optimized = optimizeDescription(currentDesc, agent.name);

    if (currentDesc !== optimized) {
      suggestions.push({
        name: agent.name,
        current: currentDesc,
        suggested: optimized,
        triggerScore: checkTriggerWords(currentDesc, agent.name).score,
      });
    }
  }

  return suggestions;
}

/**
 * Update agent file with optimized description
 */
export function updateAgentDescription(agentPath, newDescription) {
  const content = readFileSync(agentPath, "utf-8");
  const frontmatterMatch = /^---\n([\s\S]*?)\n---/.exec(content);

  if (!frontmatterMatch) {
    throw new Error("No frontmatter found in agent file");
  }

  const frontmatter = yaml.parse(frontmatterMatch[1]);
  frontmatter.description = newDescription;

  const newFrontmatter = yaml.stringify(frontmatter).trim();
  const newContent = content.replace(
    frontmatterMatch[0],
    `---\n${newFrontmatter}\n---`,
  );

  writeFileSync(agentPath, newContent);
}

/**
 * Validate agent description quality
 */
export function validateDescription(description, agentName) {
  const issues = [];

  // Check length
  if (!description || description.length < 20) {
    issues.push("Description too short (min 20 characters)");
  }
  if (description && description.length > 200) {
    issues.push("Description too long (max 200 characters)");
  }

  // Check for trigger words
  const { score } = checkTriggerWords(description, agentName);
  if (score < 0.5) {
    issues.push("Missing trigger keywords for auto-delegation");
  }

  // Check for action clarity
  if (description && !/(when|after|before|during|for|to)/.test(description)) {
    issues.push("Description should indicate when to use the agent");
  }

  return {
    valid: issues.length === 0,
    issues,
    score: 1 - issues.length / 4, // Simple quality score
  };
}
