# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- **Run CLI**: `npm start` or `node bin/claude-agents`
- **Lint**: `npm run lint` - Runs ESLint on src/**/*.js
- **Format**: `npm run format` - Runs Prettier on src/**/*.js

### Installation
- **Global install**: `npm install -g @webdevtoday/claude-agents`
- **Link for development**: `npm link` (after cloning repo)

## Architecture

This is a CLI tool for managing Claude Code sub-agents. The codebase is organized as follows:

### Core Structure
- **Entry point**: `bin/claude-agents` → `src/index.js`
- **Command pattern**: Each command (install, list, enable, etc.) is implemented in `src/commands/`
- **Agent storage**: Agents can be installed in two scopes:
  - User scope: `~/.claude/agents/` (default, available globally)
  - Project scope: `.claude/agents/` (project-specific, use --project flag)

### Key Components

1. **Agent Definition Format**:
   - Each agent has: `agent.md` (main definition with YAML frontmatter), `metadata.json`, optional `hooks.json`
   - Agents are stored in `agents/[agent-name]/` directory
   - Slash commands are stored in `commands/[command].md`

2. **State Management**:
   - Configuration stored in `.claude-agents.json` (user home or project root)
   - Tracks installed agents, enabled/disabled status, versions, and installation metadata

3. **Path Management** (`src/utils/paths.js`):
   - Handles user vs project scope directories
   - Creates required directories automatically

4. **Agent Utilities** (`src/utils/agents.js`):
   - Loads and parses agent definitions
   - Handles YAML frontmatter parsing
   - Formats agents for installation

### Important Implementation Details

- Uses ES modules (`type: "module"` in package.json)
- All file paths must use `import.meta.url` and `fileURLToPath` for __dirname
- Depends on: commander (CLI), chalk (colors), inquirer (prompts), yaml (frontmatter)
- No test framework currently configured (test script exits with error)

### Gitignore Support

The project includes gitignore handling utilities:
- `src/utils/gitignore.js` - Parse and apply gitignore patterns
- Agents automatically get gitignore awareness added during installation
- Supports both `.gitignore` and `.claude-ignore` files

### Adding New Features

When adding new agents:
1. Create agent structure in `agents/[name]/` with required files
2. Add corresponding slash command in `commands/[name].md`
3. Ensure metadata.json includes all required fields
4. Test installation in both user and project scopes

When adding new CLI commands:
1. Create command handler in `src/commands/[command].js`
2. Register in `src/index.js` using commander pattern
3. Update state management in `src/utils/config.js` if needed