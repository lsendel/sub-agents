import { readdirSync, readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { extractFrontmatter } from "./yaml-parser.js";
import yaml from "yaml";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Load agent from new format (single .md file)
 */
function loadAgentFromFile(agentName, agentPath) {
  try {
    const agentContent = readFileSync(agentPath, "utf-8");

    // Use custom parser that supports Claude Code format
    const { frontmatter, content } = extractFrontmatter(agentContent);

    if (!frontmatter) {
      throw new Error("No YAML frontmatter found");
    }

    // Extract metadata from frontmatter
    const metadata = {
      name: frontmatter.name || agentName,
      version: frontmatter.version || "1.0.0",
      description: frontmatter.description || "",
      author: frontmatter.author || "Unknown",
      tags: frontmatter.tags || [],
      requirements: {
        tools: frontmatter.tools
          ? typeof frontmatter.tools === "string"
            ? frontmatter.tools.split(",").map((t) => t.trim())
            : frontmatter.tools
          : [],
      },
    };

    return {
      name: agentName,
      ...metadata,
      frontmatter,
      content,
      fullContent: agentContent,
      commands: frontmatter.commands || [],
      hooks: frontmatter.hooks_config || null,
    };
  } catch (error) {
    console.error(`Error loading agent from file ${agentPath}:`, error);
    return null;
  }
}

/**
 * Load agent from old format (directory structure)
 */
function loadAgentFromDirectory(
  agentName,
  agentPath,
  metadataPath,
  hooksPath = null,
) {
  try {
    const metadata = JSON.parse(readFileSync(metadataPath, "utf-8"));
    const agentContent = readFileSync(agentPath, "utf-8");
    const hooks =
      hooksPath && existsSync(hooksPath)
        ? JSON.parse(readFileSync(hooksPath, "utf-8"))
        : null;

    // Parse YAML frontmatter
    const frontmatterMatch = RegExp(/^---\n([\s\S]*?)\n---/).exec(agentContent);
    let frontmatter = {};
    let content = agentContent;

    if (frontmatterMatch) {
      frontmatter = yaml.parse(frontmatterMatch[1]);
      content = agentContent.replace(frontmatterMatch[0], "").trim();
    }

    return {
      name: agentName,
      ...metadata,
      frontmatter,
      content,
      fullContent: agentContent,
      hooks,
    };
  } catch (error) {
    console.error(`Error loading agent from directory ${agentName}:`, error);
    return null;
  }
}

export function getAvailableAgents() {
  const agentsDir = join(__dirname, "..", "..", "agents");
  const agents = [];

  if (!existsSync(agentsDir)) {
    return agents;
  }

  const entries = readdirSync(agentsDir, { withFileTypes: true });

  // Handle both old format (directories) and new format (.md files)
  for (const entry of entries) {
    try {
      let agent = null;

      if (entry.isDirectory()) {
        // Old format: agent in directory
        const agentName = entry.name;
        const metadataPath = join(agentsDir, agentName, "metadata.json");
        const agentPath = join(agentsDir, agentName, "agent.md");

        if (existsSync(metadataPath) && existsSync(agentPath)) {
          agent = loadAgentFromDirectory(agentName, agentPath, metadataPath);
        }
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        // New format: single .md file
        const agentName = entry.name.replace(".md", "");
        const agentPath = join(agentsDir, entry.name);
        agent = loadAgentFromFile(agentName, agentPath);
      }

      if (agent) {
        agents.push(agent);
      }
    } catch (error) {
      console.error(`Error loading agent ${entry.name}:`, error);
    }
  }

  return agents;
}

export function getAgentDetails(agentName) {
  const agentsDir = join(__dirname, "..", "..", "agents");

  // Try new format first (single .md file)
  const singleFilePath = join(agentsDir, `${agentName}.md`);
  if (existsSync(singleFilePath)) {
    return loadAgentFromFile(agentName, singleFilePath);
  }

  // Fall back to old format (directory)
  const agentDir = join(agentsDir, agentName);
  const metadataPath = join(agentDir, "metadata.json");
  const agentPath = join(agentDir, "agent.md");

  if (existsSync(metadataPath) && existsSync(agentPath)) {
    const hooksPath = join(agentDir, "hooks.json");
    return loadAgentFromDirectory(
      agentName,
      agentPath,
      metadataPath,
      hooksPath,
    );
  }

  return null;
}

export function formatAgentForInstall(agent) {
  const { frontmatter, fullContent } = agent;

  // For new format, just return the full content as-is
  if (fullContent && fullContent.includes("---")) {
    return fullContent;
  }

  // For old format or creating new agents, ensure proper frontmatter
  const formattedFrontmatter = {
    name: agent.name,
    description: frontmatter.description || agent.description,
    tools: frontmatter.tools || agent.requirements?.tools?.join(", ") || "",
  };

  // Add optional fields if present
  if (agent.version) formattedFrontmatter.version = agent.version;
  if (agent.author) formattedFrontmatter.author = agent.author;
  if (agent.tags && agent.tags.length > 0)
    formattedFrontmatter.tags = agent.tags;

  // Create the properly formatted agent file
  const yamlFrontmatter = yaml.stringify(formattedFrontmatter).trim();
  const content =
    agent.content || fullContent.replace(/^---\n[\s\S]*?\n---/, "").trim();

  return `---\n${yamlFrontmatter}\n---\n\n${content}`;
}

export function getAgentPath(agentName) {
  return join(__dirname, "..", "..", "agents", agentName);
}

export async function loadAgent(agentDir) {
  const metadataPath = join(agentDir, "metadata.json");
  const agentPath = join(agentDir, "agent.md");
  const hooksPath = join(agentDir, "hooks.json");

  if (!existsSync(metadataPath) || !existsSync(agentPath)) {
    return null;
  }

  try {
    const metadata = JSON.parse(readFileSync(metadataPath, "utf-8"));
    const agentContent = readFileSync(agentPath, "utf-8");
    const hooks = existsSync(hooksPath)
      ? JSON.parse(readFileSync(hooksPath, "utf-8"))
      : null;

    // Parse YAML frontmatter
    const frontmatterMatch = RegExp(/^---\n([\s\S]*?)\n---/).exec(agentContent);
    let frontmatter = {};
    let content = agentContent;

    if (frontmatterMatch) {
      frontmatter = yaml.parse(frontmatterMatch[1]);
      content = agentContent.replace(frontmatterMatch[0], "").trim();
    }

    return {
      name: metadata.name,
      ...metadata,
      frontmatter,
      content,
      fullContent: agentContent,
      hooks,
      metadata,
    };
  } catch (error) {
    console.error(`Error loading agent from ${agentDir}:`, error);
    return null;
  }
}
