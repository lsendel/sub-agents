# Update Command Documentation

## Overview

The `update` command allows you to update installed Claude agents to their latest versions from the source repository. This is useful when new features, bug fixes, or improvements are released.

## Basic Usage

```bash
# Interactive update (select agents to update)
claude-agents update

# Update a specific agent
claude-agents update code-reviewer

# Update all installed agents
claude-agents update --all

# Force update without confirmation
claude-agents update --all --force
```

## Options

- `-a, --all` - Update all installed agents at once
- `-p, --project` - Update agents in project scope (default: user scope)
- `-f, --force` - Skip confirmation prompt and update immediately
- `--preserve-custom` - Skip agents that have custom modifications

## Examples

### Update Single Agent

```bash
# Update the code-reviewer agent
claude-agents update code-reviewer
```

### Update All Agents

```bash
# Update all installed agents with confirmation
claude-agents update --all

# Update all agents without confirmation
claude-agents update --all --force
```

### Project-Specific Updates

```bash
# Update agents installed in the current project
claude-agents update --all --project
```

### Preserve Customizations

```bash
# Update all agents but skip those with custom modifications
claude-agents update --all --preserve-custom
```

## What Gets Updated

When you run the update command:

1. **Agent Definition** (`agent.md`) - Updated to latest version
2. **Metadata** (`metadata.json`) - Version and timestamp updated
3. **Hooks** (`hooks.json`) - Updated if present in source
4. **Slash Commands** - Corresponding commands updated in `.claude/commands/`

## Update Process

1. **Source Check** - Verifies agent exists in source repository
2. **Version Comparison** - Checks if update is available
3. **Custom Check** - Optionally preserves custom modifications
4. **File Update** - Copies latest files from source
5. **Config Update** - Updates version info in configuration

## Handling Custom Modifications

If you've customized an agent and want to preserve your changes:

1. Use `--preserve-custom` flag to skip modified agents
2. Or manually backup your customizations before updating
3. Custom modifications are detected by a special marker in the agent file

## Troubleshooting

### Agent Not Found
```
Error: Source not found for [agent-name]
```
The agent doesn't exist in the source repository. Check available agents with `claude-agents list`.

### Update Failed
```
Error: Failed to update [agent-name]: [error message]
```
Common causes:
- Permission issues - Check file permissions
- Corrupted source files - Re-clone the repository
- Network issues - Check your internet connection

### No Updates Available
All agents are already at the latest version.

## Best Practices

1. **Regular Updates** - Check for updates weekly or monthly
2. **Test After Update** - Verify agents work correctly after updating
3. **Backup Customizations** - Save custom modifications before updating
4. **Use Version Control** - Commit changes to track agent versions

## Integration with Make

If you're using the Makefile:

```bash
# Update all agents
make update-agents

# Update with custom options
make update-agents ARGS="--force --preserve-custom"
```

## Related Commands

- `claude-agents list` - See installed agents and versions
- `claude-agents info <agent>` - Check specific agent details
- `claude-agents install` - Install new agents
- `claude-agents version` - Check for CLI updates