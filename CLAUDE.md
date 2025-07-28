# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- **Run CLI**: `npm start` or `node bin/claude-agents`
- **Lint**: `npm run lint` - Runs ESLint on src/**/*.js
- **Format**: `npm run format` - Runs Prettier on src/**/*.js

### Installation
- **Global install**: `npm install -g claude-agents`
- **Link for development**: `npm link` (after cloning repo)

### Agent Commands
- **Install agents**: `npm start -- install [agents...]`
- **List agents**: `npm start -- list`
- **Sync agents**: `npm start -- sync`
- **Migrate agents**: `npm start -- migrate` - Convert to Claude Code format
- **Validate agents**: `npm start -- validate`
- **Optimize agents**: `npm start -- optimize`

### Process & Standards Commands
- **Sync processes**: `npm start -- sync-processes`
- **Sync standards**: `npm start -- sync-standards`
- **Force copy**: Add `--force-copy` flag to copy all to project

## Architecture

This is a CLI tool for managing Claude Code sub-agents. The codebase is organized as follows:

### Core Structure
- **Entry point**: `bin/claude-agents` → `src/index.js`
- **Command pattern**: Each command (install, list, enable, etc.) is implemented in `src/commands/`
- **Agent storage**: Agents can be installed in two scopes:
  - User scope: `~/.claude/agents/` (default, available globally)
  - Project scope: `.claude/agents/` (project-specific, use --project flag)
- **Process storage**: Development processes stored in:
  - User scope: `~/.claude/processes/` (global processes)
  - Project scope: `.claude/processes/` (project-specific)
- **Standards storage**: Coding standards stored in:
  - User scope: `~/.claude/standards/` (global standards)
  - Project scope: `.claude/standards/` (project-specific)

### Key Components

1. **Agent Definition Format** (Claude Code Compatible):
   - Single `.md` file per agent with YAML frontmatter
   - Stored as `agents/[agent-name].md`
   - No separate metadata.json or slash commands
   - Uses description-based auto-delegation

2. **State Management**:
   - Agent configuration: `.claude-agents.json` (user home or project root)
   - Process configuration: `.claude-processes.json`
   - Standards configuration: `.claude-standards.json`
   - Tracks installed items, versions, and installation metadata

3. **Path Management** (`src/utils/paths.js`):
   - Handles user vs project scope directories
   - Creates required directories automatically

4. **Agent Utilities** (`src/utils/agents.js`):
   - Loads and parses agent definitions
   - Handles YAML frontmatter parsing
   - Formats agents for installation

5. **Process/Standards Utilities** (`src/utils/process-standards.js`):
   - Loads process and standard definitions
   - Handles YAML frontmatter with custom parser
   - Finds and manages processes/standard files

### Important Implementation Details

- Uses ES modules (`type: "module"` in package.json)
- All file paths must use `import.meta.url` and `fileURLToPath` for __dirname
- Depends on: commander (CLI), chalk (colors), inquirer (prompts), yaml (frontmatter)
- Custom YAML parser (`src/utils/yaml-parser.js`) supports Claude Code's complex format
- No test framework currently configured (test script exits with error)

### Gitignore Support

The project includes gitignore handling utilities:
- `src/utils/gitignore.js` - Parse and apply gitignore patterns
- Agents automatically get gitignore awareness added during installation
- Supports both `.gitignore` and `.claude-ignore` files

### Adding New Features

When adding new agents:
1. Create a single `.md` file in `agents/[agent-name].md`
2. Add YAML frontmatter with name, description, and optional tools
3. Write the agent's system prompt below the frontmatter
4. Test installation in both user and project scopes

When adding new CLI commands:
1. Create command handler in `src/commands/[command].js`
2. Register in `src/index.js` using commander pattern
3. Update state management in `src/utils/config.js` if needed

When adding processes or standards:
1. Create `.md` files in `processes/` or `standards/` directories
2. Include YAML frontmatter with type, version, description
3. Sync commands will detect and manage them automatically

## How to Create a New Agent

To create a new agent compatible with Claude Code:
1. Create a single `.md` file in `agents/[agent-name].md`
2. Add YAML frontmatter with:
   ```yaml
   ---
   name: agent-name
   description: Clear description with trigger words for auto-delegation
   tools: Read, Grep, Glob  # Optional - inherits all if omitted
   ---
   ```
3. Write the agent's system prompt below the frontmatter
4. Use `claude-agents optimize` to improve description for better auto-delegation
5. Use `claude-agents validate` to check agent quality
6. Install with `claude-agents install agent-name`

## Process and Standards Format

### Process File Format
Processes are markdown files with YAML frontmatter stored in `processes/`:

```yaml
---
name: process-name
type: process
version: 1.0.0
description: Clear description of the process
author: Author Name
tags: [tag1, tag2]
related_commands: [/command1, /command2]
---

# Process Title
Process content in markdown...
```

### Standards File Format
Standards are markdown files with YAML frontmatter stored in `standards/`:

```yaml
---
name: standard-name
type: standard
version: 1.0.0
description: Clear description of the standard
author: Author Name
tags: [tag1, tag2]
related_commands: [/command1, /command2]
---

# Standard Title
Standard content in markdown...
```

### Using Processes and Standards
1. Store in `~/.claude/processes/` or `~/.claude/standards/`
2. Sync to project with `claude-agents sync-processes` or `sync-standards`
3. Reference in Claude Code conversations for consistent practices
4. Version control in your project for team collaboration