---
description: Repository Information Overview
alwaysApply: true
---

# Claude Sub-Agents Manager Information

## Summary
Claude Sub-Agents Manager is a CLI tool that enhances Claude Code with specialized AI assistants designed for specific development tasks. Each sub-agent is an expert in its domain - from automated code reviews and test fixing to intelligent debugging and documentation generation.

## Structure
- **agents/**: Contains individual agent definitions and metadata
- **bin/**: CLI executable entry point
- **commands/**: Slash command definitions for Claude Code
- **docs/**: Additional documentation
- **scripts/**: Utility scripts for setup and maintenance
- **src/**: Main source code for the CLI application

## Language & Runtime
**Language**: JavaScript (Node.js)
**Version**: Node.js >=16.0.0, npm >=8.0.0
**Type**: ES Modules (import/export)
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- commander: ^11.1.0 (CLI framework)
- chalk: ^5.3.0 (Terminal styling)
- inquirer: ^9.2.12 (Interactive prompts)
- fs-extra: ^11.2.0 (Enhanced file system operations)
- yaml: ^2.3.4 (YAML parsing)
- ora: ^8.0.1 (Terminal spinners)
- semver: ^7.7.2 (Semantic versioning)
- minimatch: ^10.0.3 (Glob pattern matching)

**Development Dependencies**:
- eslint: ^8.56.0 (Code linting)
- prettier: ^3.1.1 (Code formatting)

## Build & Installation
```bash
# Install globally
npm install -g @zamaz/claude-agents

# Install from source
git clone https://github.com/lsendel/sub-agents.git
cd sub-agents
npm install
npm link
```

## Main Files & Resources
**Entry Point**: src/index.js
**CLI Executable**: bin/claude-agents
**Agent Definitions**: agents/*/agent.md
**Command Definitions**: commands/*.md

## Project Components
- **Agent System**: Specialized AI assistants with domain expertise
- **Command System**: Slash commands for Claude Code integration
- **Installation Manager**: Handles agent installation and updates
- **Configuration System**: Manages user and project-level settings

## Usage
```bash
# List available agents
claude-agents list

# Install agents
claude-agents install

# Use agents in Claude Code
/review
/test
/debug
/document
/refactor
/security-scan
```