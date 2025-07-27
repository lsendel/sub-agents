# Agent Synchronization Process

This document explains how to keep agent configurations synchronized when agents are installed through different methods (Claude Code, manual installation, or other tools).

## Overview

The Claude Sub-Agents Manager includes a synchronization mechanism to detect and register agents that were installed outside of the normal `claude-agents install` process. This ensures that all agents in your system are properly tracked and managed.

**Note**: With the new Claude Code format alignment, agents are now single `.md` files and slash commands have been removed. The sync process has been updated accordingly.

## The Sync Command

### Basic Usage

```bash
# Scan and register unregistered agents
claude-agents sync

# Auto-register without confirmation prompt
claude-agents sync --auto

# Force copy all agents to project directory
claude-agents sync --force-copy
```

### What It Does

1. **Scans agent directories** - Checks both user (`~/.claude/agents/`) and project (`.claude/agents/`) directories
2. **Detects unregistered agents** - Finds `.md` files that aren't in the configuration
3. **Parses agent metadata** - Extracts YAML frontmatter from single agent files
4. **Copies to project** - Copies agent files to your project's `agents/` directory
5. **Registers agents** - Adds them to the configuration file

**Format Update**: Agents are now single `.md` files with YAML frontmatter. Slash commands have been removed in favor of description-based auto-delegation.

## Auto-Sync Feature

### Enable Auto-Sync

```bash
# Enable automatic synchronization
claude-agents config autosync on

# Disable automatic synchronization
claude-agents config autosync off

# Check current status
claude-agents config autosync
```

### How Auto-Sync Works

When enabled, auto-sync will:
- Check for external agent changes when running `list` command
- Detect directory modifications since last sync
- Automatically register new agents found
- Run silently in the background

## Installation Methods Supported

### 1. Claude Sub-Agents Manager (Native)
```bash
npm start -- install agent-name
```
- Agents installed this way are automatically registered
- No sync needed

### 2. Claude Code Direct Installation
When Claude Code installs agents directly to `~/.claude/agents/`:
- Run `npm start -- sync` to register them
- Or enable auto-sync for automatic detection

### 3. Manual Installation
If you manually copy agent files:
```bash
# Copy agent file
cp my-agent.md ~/.claude/agents/

# Register it
npm start -- sync
```

### 4. Other Tools
Agents installed by other tools will be detected as long as they:
- Are placed in the correct directories
- Have valid YAML frontmatter
- Follow the agent file format

## Agent File Format

For sync to work properly, agent files must have:

```markdown
---
name: agent-name
description: Agent description
tools: Read, Write, Edit, Grep
---

Agent content here...
```

Minimum required frontmatter fields:
- `name` - Agent identifier
- `description` - What the agent does

Optional fields:
- `tools` - Comma-separated list of required tools
- `tags` - Array of tags
- `color` - UI color hint


## Troubleshooting

### Agents Not Being Detected

1. **Check file location**
   ```bash
   ls -la ~/.claude/agents/
   ls -la .claude/agents/
   ```

2. **Verify file format**
   - Must end with `.md`
   - Must have valid YAML frontmatter
   - Frontmatter must be enclosed in `---`

3. **Check permissions**
   ```bash
   chmod 644 ~/.claude/agents/*.md
   ```

### Sync Conflicts

If an agent with the same name exists in both locations:
- User scope takes precedence
- Project scope agent will be ignored
- Use `remove` command to resolve conflicts

### Configuration Issues

If sync isn't updating the configuration:
1. Check config file permissions
   ```bash
   ls -la ~/.claude-agents.json
   ```

2. Manually backup and reset
   ```bash
   cp ~/.claude-agents.json ~/.claude-agents.backup.json
   rm ~/.claude-agents.json
   npm start -- sync
   ```

## Best Practices

1. **Regular Syncing**
   - Run sync after installing agents through Claude Code
   - Enable auto-sync for convenience
   - Check sync status with `npm start -- list`

2. **Consistent Naming**
   - Use lowercase with hyphens (e.g., `my-agent`)
   - Avoid spaces and special characters
   - Keep names descriptive but concise

3. **Metadata Maintenance**
   - Always include description in frontmatter
   - List all required tools
   - Add relevant tags for organization

4. **Version Control**
   - Commit agent files to your repository
   - Use project scope for team-shared agents
   - Document custom agents in README

## Example Workflow

### Scenario: Claude Code installed a new agent

```bash
# 1. Claude Code installs design-system agent
# (Agent appears in ~/.claude/agents/design-system.md)

# 2. Register it with the manager
npm start -- sync
# This will:
#   - Copy design-system agent to ./agents/design-system/
#   - Register in configuration

# 3. Verify registration and files
npm start -- list | grep design-system
ls -la ./agents/design-system/

# 4. Commit to version control
git add agents/design-system/
git commit -m "Add design-system agent from Claude Code"

# 5. Enable auto-sync for future installations
npm start -- config autosync on
```

### Scenario: Team sharing agents

```bash
# 1. Create agent in project scope
mkdir -p .claude/agents
cp team-agent.md .claude/agents/

# 2. Sync to register
npm start -- sync

# 3. Commit to repository
git add .claude/agents/team-agent.md
git commit -m "Add team-agent for code reviews"

# 4. Team members sync after pulling
git pull
npm start -- sync
```

## Integration with CI/CD

Add sync to your build process:

```yaml
# .github/workflows/ci.yml
steps:
  - name: Sync Claude agents
    run: |
      npm install -g @webdevtoday/claude-agents
      claude-agents sync --auto
```

## Security Considerations

- Sync only processes `.md` files in designated directories
- Agent names are validated to prevent path traversal
- No code execution during sync process
- Configuration file permissions are preserved

## Future Enhancements

Planned improvements:
- Automatic sync on file system watch
- Conflict resolution UI
- Agent version tracking
- Sync with remote agent registry
- Backup and restore functionality