# How to Create a New Agent

This guide explains how to create a new agent for the Claude Sub-Agents system based on the patterns used in existing agents like `code-reviewer` and `requirements-analyst`.

## Agent Structure

Each agent consists of three main files:

### 1. Agent Definition File (`agents/[agent-name]/agent.md`)

This is the core agent definition with YAML frontmatter and detailed instructions.

```markdown
---
name: your-agent-name
description: Brief description of what the agent does. Shown in agent listings.
tools: Read, Grep, Glob, Bash  # List required tools
---

You are a [role description]. Your role is to [primary responsibility].

## Process

When invoked, immediately:
1. [First action]
2. [Second action]
3. Begin systematic work without delay

## Checklist

### Category 1
- [ ] Task item 1
- [ ] Task item 2
- [ ] Task item 3

### Category 2
- [ ] Task item 1
- [ ] Task item 2

## Output Format

Organize your output by sections:

### 📋 Section 1
Description of section 1 content

### 🔍 Section 2
Description of section 2 content

## Guidelines

1. **Be Specific**: Include concrete examples
2. **Be Thorough**: Cover all aspects
3. **Be Actionable**: Provide clear next steps

## Example Output

```
### 📋 Section 1
Example content here...
```

Remember: Your goal is to [restate primary objective].
```

### 2. Metadata File (`agents/[agent-name]/metadata.json`)

This file contains agent metadata, dependencies, and configuration.

```json
{
  "name": "your-agent-name",
  "version": "1.0.0",
  "description": "Brief description for the agent listing",
  "author": "Claude Sub-Agents",
  "tags": ["tag1", "tag2", "tag3"],
  "requirements": {
    "tools": ["Read", "Grep", "Glob", "Bash"],
    "optional_tools": ["WebSearch", "WebFetch"]
  },
  "hooks": {
    "recommended": ["Start", "PostToolUse:Edit"],
    "optional": ["Stop"]
  },
  "commands": ["your-command"],
  "compatible_with": ["claude-code@>=1.0.0"]
}
```

### 3. Slash Command File (`commands/[command-name].md`)

This creates a slash command to trigger your agent.

```markdown
---
description: Brief description of what the command does
allowed-tools: Task
---

Use the your-agent-name agent to [perform specific action]. [Additional context about what the agent will do and what to focus on].
```

## Step-by-Step Creation Process

1. **Create the agent directory structure**:
   ```bash
   mkdir -p agents/your-agent-name
   ```

2. **Create the agent definition file**:
   - Write `agents/your-agent-name/agent.md` with:
     - YAML frontmatter with name, description, and tools
     - Clear role definition
     - Structured process and checklists
     - Output format guidelines
     - Examples

3. **Create the metadata file**:
   - Write `agents/your-agent-name/metadata.json` with:
     - Matching name from agent.md
     - Version (start with "1.0.0")
     - Descriptive tags
     - Required and optional tools
     - Recommended hooks
     - Associated slash commands

4. **Create the slash command**:
   - Write `commands/your-command.md` with:
     - Clear description
     - `allowed-tools: Task` (standard for agent invocation)
     - Instructions that reference your agent

## Best Practices

### Agent Design
- **Single Responsibility**: Each agent should focus on one primary task
- **Clear Instructions**: Use imperative language and numbered steps
- **Immediate Action**: Design agents to start work immediately when invoked
- **Structured Output**: Use consistent formatting with emojis for sections
- **Checklists**: Include comprehensive checklists for thorough coverage

### Naming Conventions
- Agent names: lowercase with hyphens (e.g., `code-reviewer`, `requirements-analyst`)
- Commands: short, memorable names (e.g., `review`, `analyze`, `debug`)
- Tags: descriptive keywords for discoverability

### Tool Selection
- Only include tools the agent actually needs
- Common tools:
  - `Read`: For reading files
  - `Grep`: For searching code
  - `Glob`: For finding files by pattern
  - `Bash`: For running commands
  - `Edit`/`MultiEdit`: For code modifications
  - `Write`: For creating files

### Hooks Configuration
- `Start`: Run when agent begins
- `PostToolUse:Edit`: Run after file edits
- `Stop`: Run when agent completes
- Only include hooks that enhance the agent's functionality

## Example: Creating a "Performance Analyzer" Agent

1. **Create directory**:
   ```bash
   mkdir -p agents/performance-analyzer
   ```

2. **Create `agents/performance-analyzer/agent.md`**:
   ```markdown
   ---
   name: performance-analyzer
   description: Analyzes code performance and suggests optimizations
   tools: Read, Grep, Glob, Bash
   ---
   
   You are a performance optimization specialist...
   ```

3. **Create `agents/performance-analyzer/metadata.json`**:
   ```json
   {
     "name": "performance-analyzer",
     "version": "1.0.0",
     "description": "Performance analysis and optimization specialist",
     "author": "Claude Sub-Agents",
     "tags": ["performance", "optimization", "profiling"],
     "requirements": {
       "tools": ["Read", "Grep", "Glob", "Bash"]
     },
     "hooks": {
       "recommended": ["Start"]
     },
     "commands": ["perf"],
     "compatible_with": ["claude-code@>=1.0.0"]
   }
   ```

4. **Create `commands/perf.md`**:
   ```markdown
   ---
   description: Analyze code performance and suggest optimizations
   allowed-tools: Task
   ---
   
   Use the performance-analyzer agent to analyze code performance...
   ```

## Installation and Testing

After creating your agent files:

### Method 1: Direct Installation (NEW - Recommended)
```bash
# Install a specific agent by name (skips interactive prompts)
npm start -- install your-agent-name

# Example:
npm start -- install requirements-analyst
```

### Method 2: Using Quick Install Script
```bash
# Use the provided script for easier installation
./scripts/quick-install.sh your-agent-name
```

### Method 3: Interactive Installation
```bash
# Run without agent name for interactive selection
npm start -- install
```

### Verify Installation
```bash
# Check if your agent is installed
npm start -- list | grep your-agent-name
```

### Test in Claude Code
- Use the slash command: `/your-command`
- Or invoke directly with the Task tool

## Quick Start Example

Here's a complete workflow for creating and immediately using a new agent:

```bash
# 1. Create agent structure
mkdir -p agents/my-analyzer
mkdir -p commands

# 2. Create agent files (agent.md, metadata.json, command.md)
# ... (create files as shown above) ...

# 3. Install the agent immediately
npm start -- install my-analyzer

# 4. Use in Claude Code
# Type: /my-command
```

## Troubleshooting

- **Agent not appearing**: Check file paths and naming consistency
- **Command not working**: Ensure command name in metadata.json matches the filename
- **Tools not available**: Verify tool names match Claude Code's available tools
- **Installation fails**: Check JSON syntax in metadata.json

## Contributing

When creating agents for the community:
1. Follow the established patterns
2. Test thoroughly before sharing
3. Document any special requirements
4. Consider edge cases and error handling
5. Make the agent's purpose clear and focused