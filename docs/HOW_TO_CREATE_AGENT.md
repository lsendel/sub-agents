# How to Create a New Agent

This guide explains how to create a new agent for the Claude Sub-Agents system that is fully compatible with Claude Code's native format.

## Agent Structure

Each agent is now a single `.md` file with YAML frontmatter:

### Agent Definition File (`agents/[agent-name].md`)

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

### Example Agent File

```markdown
---
name: your-agent-name
description: Clear description with trigger words for auto-delegation. Use when dealing with specific tasks.
tools: Read, Grep, Glob  # Optional - inherits all tools if omitted
version: 1.0.0  # Optional
author: Your Name  # Optional
tags: [tag1, tag2]  # Optional
---

You are a [role description]. Your role is to [primary responsibility].

## Process

When invoked, immediately:
1. [First action]
2. [Second action]
3. Begin systematic work without delay

## Output Format

[Describe expected output format]
```

**Important Notes**:
- No separate metadata.json file needed
- No slash commands - agents use description-based auto-delegation
- Tools field is optional - agents inherit all tools if not specified
- Description should include trigger words for better matching

## Step-by-Step Creation Process

1. **Create the agent file**:
   ```bash
   # Create your agent file directly
   touch agents/your-agent-name.md
   ```

2. **Write the agent definition**:
   - Add YAML frontmatter with:
     - `name`: Agent identifier (lowercase with hyphens)
     - `description`: Clear description with trigger words
     - `tools`: Optional tool restrictions
   - Write the system prompt below the frontmatter
   - Include clear instructions and output format

3. **Optimize the description**:
   ```bash
   # Use the optimize command to improve auto-delegation
   claude-agents optimize your-agent-name
   ```

4. **Validate the agent**:
   ```bash
   # Check agent format and quality
   claude-agents validate your-agent-name
   ```

## Best Practices

### Agent Design
- **Single Responsibility**: Each agent should focus on one primary task
- **Clear Instructions**: Use imperative language and numbered steps
- **Immediate Action**: Design agents to start work immediately when invoked
- **Structured Output**: Use consistent formatting with emojis for sections
- **Checklists**: Include comprehensive checklists for thorough coverage

### Description Writing
- Include trigger words that users might naturally use
- Start with action verbs (e.g., "Analyzes", "Creates", "Scans")
- Mention when the agent should be used
- Keep descriptions under 200 characters for readability

### Naming Conventions
- Agent names: lowercase with hyphens (e.g., `code-reviewer`, `requirements-analyst`)
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

### Tool Selection
- Only restrict tools if the agent needs specific limitations
- Most agents should omit the tools field to inherit all available tools
- Common tool restrictions:
  - Analysis agents: `Read, Grep, Glob`
  - Modification agents: `Read, Edit, MultiEdit, Grep, Glob`
  - Generation agents: `Read, Write, Grep, Glob`

## Example: Creating a "Performance Analyzer" Agent

1. **Create the agent file**:
   ```bash
   touch agents/performance-analyzer.md
   ```

2. **Write the agent**:
   ```markdown
   ---
   name: performance-analyzer
   description: Analyzes code performance bottlenecks and suggests optimizations. Use when code is slow or needs performance tuning.
   tools: Read, Grep, Glob, Bash
   version: 1.0.0
   tags: [performance, optimization, profiling]
   ---
   
   You are a performance optimization specialist with expertise in profiling and optimizing code.
   
   ## Process
   
   When invoked, immediately:
   1. Identify the code or system to analyze
   2. Look for common performance bottlenecks
   3. Measure or estimate performance impact
   4. Suggest specific optimizations
   
   ## Analysis Areas
   
   - Algorithm complexity (time and space)
   - Database query optimization
   - Memory usage and leaks
   - I/O operations
   - Caching opportunities
   - Parallel processing potential
   
   ## Output Format
   
   ### 🔴 Critical Performance Issues
   [Issues causing major slowdowns]
   
   ### 🟡 Optimization Opportunities
   [Areas for improvement]
   
   ### 🟢 Performance Best Practices
   [Good patterns already in use]
   
   ### 📊 Recommendations
   [Prioritized list of optimizations]
   ```

## Installation and Testing

After creating your agent files:

### Installation

```bash
# Install your agent
claude-agents install performance-analyzer

# Or install directly from file
cp agents/performance-analyzer.md ~/.claude/agents/
```

### Verify Installation
```bash
# Check if your agent is installed
npm start -- list | grep your-agent-name
```

### Test in Claude Code

The agent will be triggered automatically when users mention relevant keywords:
- "analyze performance"
- "code is slow"
- "optimize this function"
- "performance bottleneck"

## Quick Start Template

Here's a minimal agent template:

```markdown
---
name: my-agent
description: Does X when Y happens. Use for Z tasks.
tools: Read, Grep, Glob
---

You are an expert in [DOMAIN]. Your primary role is to [PURPOSE].

When invoked, immediately:
1. [FIRST ACTION]
2. [SECOND ACTION]
3. [DELIVER RESULTS]

## Output Format

[DESCRIBE OUTPUT STRUCTURE]
```

Save this as `agents/my-agent.md` and install with `claude-agents install my-agent`.

## Troubleshooting

- **Agent not triggering**: Improve description with better trigger words
- **Tools not available**: Remove tools field to inherit all tools
- **Validation fails**: Run `claude-agents validate` to see specific issues
- **Poor auto-delegation**: Use `claude-agents optimize` to improve description

## Contributing

When creating agents for the community:
1. Follow the established patterns
2. Test thoroughly before sharing
3. Document any special requirements
4. Consider edge cases and error handling
5. Make the agent's purpose clear and focused