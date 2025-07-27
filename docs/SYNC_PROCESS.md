# Agent Synchronization Process

This document explains how to keep agent configurations synchronized when agents are installed through different methods (Claude Code, manual installation, or other tools).

## Overview

The Claude Sub-Agents Manager now includes a synchronization mechanism to detect and register agents that were installed outside of the normal `claude-agents install` process. This ensures that all agents in your system are properly tracked and managed.

## The Sync Command

### Basic Usage

```bash
# Scan and register unregistered agents
npm start -- sync

# Auto-register without confirmation prompt
npm start -- sync --auto

# Also check for orphaned commands
npm start -- sync --commands
```

### What It Does

1. **Scans agent directories** - Checks both user (`~/.claude/agents/`) and project (`.claude/agents/`) directories
2. **Detects unregistered agents** - Finds `.md` files that aren't in the configuration
3. **Parses agent metadata** - Extracts frontmatter and agent details
4. **Copies to project** - Copies agent files and commands to your project's `agents/` and `commands/` directories
5. **Registers agents** - Adds them to the configuration file
6. **Checks for orphaned commands** (optional) - Identifies command files without corresponding agents

**New in v1.2.0**: The sync command now automatically copies externally installed agents to your project directory, ensuring they're version-controlled and available to your team.

## Auto-Sync Feature

### Enable Auto-Sync

```bash
# Enable automatic synchronization
npm start -- config autosync on

# Disable automatic synchronization
npm start -- config autosync off

# Check current status
npm start -- config autosync
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

## Command Detection

The sync process automatically detects and copies slash commands for agents. It looks for commands using these patterns:

1. **Exact match**: `agent-name.md` → `/agent-name`
2. **Hyphen removal**: `code-reviewer` → `/codereviewer`
3. **First part**: `code-reviewer` → `/code`
4. **Last part**: `code-reviewer` → `/reviewer`
5. **Suffix removal** (for single words):
   - `debugger` → `/debug` (removes 'er')
   - `refactor` → `/refact` (first 6 chars)
   - `documenter` → `/document` (removes 'er')

This intelligent matching ensures that common command patterns are automatically detected and copied to your project.

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
#   - Copy any related commands to ./commands/
#   - Register in configuration

# 3. Verify registration and files
npm start -- list | grep design-system
ls -la ./agents/design-system/
ls -la ./commands/

# 4. Commit to version control
git add agents/design-system/ commands/
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