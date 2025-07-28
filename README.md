# Claude Sub-Agents Manager - AI-Powered Development Assistants for Claude Code

<div align="center">

![Claude Sub-Agents](https://img.shields.io/badge/Claude-Sub--Agents-blue?style=for-the-badge&logo=anthropic)
[![npm version](https://img.shields.io/npm/v/@zamaz/claude-agents?style=flat-square)](https://www.npmjs.com/package/@zamaz/claude-agents)
[![npm downloads](https://img.shields.io/npm/dm/@zamaz/claude-agents?style=flat-square)](https://www.npmjs.com/package/@zamaz/claude-agents)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![GitHub release](https://img.shields.io/github/release/lsendel/sub-agents.svg?style=flat-square)](https://github.com/lsendel/sub-agents/releases)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red.svg?style=flat-square)](https://github.com/lsendel)

**🚀 Enhance Claude Code with Specialized AI Agents - Now Fully Compatible with Claude Code Format**

**A powerful management tool for Claude Code agents that adds discovery, optimization, and bulk operations**

[Installation](#-installation) • [Quick Start](#-quick-start) • [Available Agents](#-available-sub-agents) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 🙏 Acknowledgments

This project is forked from [https://github.com/webdevtodayjason/sub-agents.git](https://github.com/webdevtodayjason/sub-agents.git). A warm thanks to webdevtodayjason for the excellent project contribution and foundation!

**\ud83d\udd04 Major Update**: Now fully compatible with Claude Code's native agent format! Use the `migrate` command to update existing agents.

## 🎯 What is Claude Sub-Agents Manager?

Claude Sub-Agents Manager is a complementary CLI tool for Claude Code that helps you discover, install, and optimize AI agents. It fully supports Claude Code's native agent format while adding powerful features like bulk operations, description optimization for better auto-delegation, and quality validation. Think of it as a package manager for Claude Code agents.

### ✨ Why Use This Tool?

- **🧠 Agent Discovery**: Browse and install community agents easily
- **⚡ Bulk Operations**: Install, update, or validate multiple agents at once
- **🎨 Description Optimization**: Improve agent descriptions for better auto-delegation
- **🔍 Quality Validation**: Ensure agents follow best practices
- **🔄 Format Migration**: Convert legacy agents to Claude Code format
- **🛠️ Developer Friendly**: Simplifies agent management workflow

## 🚀 Installation

### NPM (Recommended)
```bash
npm install -g @zamaz/claude-agents
```

### Yarn
```bash
yarn global add @zamaz/claude-agents
```

### From Source
```bash
git clone https://github.com/lsendel/sub-agents.git
cd sub-agents
npm install
npm link
```

## 🔄 Updating

### Check Current Version
```bash
claude-agents --version
# or
claude-agents version
```

### Update to Latest
```bash
# NPM
npm update -g @zamaz/claude-agents

# Yarn
yarn global upgrade @zamaz/claude-agents

# From source
cd sub-agents
git pull
npm install
npm link --force
```

### Check for Updates
```bash
# Manual check
claude-agents version

# Automatic check on every run
# (notifies when updates are available)
```

## ⚡ Quick Start

```bash
# See what's available
claude-agents list

# Install your first agent interactively
claude-agents install

# Or install all agents at once
claude-agents install --all

# Install specific agents directly
claude-agents install code-reviewer test-runner

# Validate all agents (supports Claude Code format)
claude-agents validate

# Optimize agent descriptions for better auto-delegation
claude-agents optimize --all

# Agents now use description-based auto-delegation
# In Claude Code, just describe what you need:
> "Review my recent code changes"
> "Run the tests and fix any failures"
> "Debug this TypeError in production"
```

## 🔄 Keeping Agents in Sync

Claude Code may install agents directly to `~/.claude/agents/`. Use the sync command to register these agents and copy them to your project:

```bash
# Detect and register externally installed agents
claude-agents sync

# Force copy all agents to project directory (NEW!)
claude-agents sync --force-copy

# Fix YAML parsing issues in Claude Code agents
make fix-yaml

# The sync feature now:
# - Detects agents installed by Claude Code
# - Registers them in configuration
# - Copies them to your project's agents/ directory
# - Preserves Claude Code's complex YAML format
```

The sync feature ensures all agents are properly tracked, managed, and version-controlled. See [SYNC_PROCESS.md](docs/SYNC_PROCESS.md) for details.

## 🔑 Key Features

### 🆕 New in v1.0.3
- **Enhanced Sync**: Automatically copies Claude Code agents to your project directory
- **YAML Compatibility**: Full support for Claude Code's complex YAML format
- **Bulk Operations**: Install, validate, and optimize multiple agents at once
- **Smart Command Detection**: Automatically finds and copies related slash commands
- **Git-Friendly**: All agents are version-controlled in your project

### Core Features
- **🔍 Agent Discovery**: Browse and install community agents
- **📦 Package Management**: Install, update, remove agents like npm packages
- **✨ Description Optimization**: Improve agent descriptions for better auto-delegation
- **✅ Quality Validation**: Ensure agents follow best practices
- **🔄 Format Migration**: Convert legacy agents to Claude Code format
- **🛡️ Security Scanning**: Check for sensitive data before commits
- **📊 Update Notifications**: Get notified when new versions are available

## 📋 Available Sub-Agents

| Agent Name | Description | Trigger Examples |
|------------|-------------|------------------|
| **code-reviewer** | Automatically reviews code after edits. Checks for quality, security vulnerabilities, performance issues, and best practices. | "Review my code", "Check for security issues" |
| **test-runner** | Runs tests when code changes or tests fail. Automatically detects test framework and fixes failing tests. | "Run tests", "Fix failing tests" |
| **debugger** | Analyzes and fixes errors, crashes, and unexpected behavior. Interprets stack traces and identifies root causes. | "Debug this error", "Fix the crash" |
| **refactor** | Improves code structure without changing functionality. Applies design patterns and modernizes legacy code. | "Refactor this code", "Apply SOLID principles" |
| **doc-writer** | Creates and updates documentation. Generates API docs, README files, and inline comments. | "Document this API", "Update the README" |
| **security-scanner** | Scans for security vulnerabilities and compliance issues. Detects exposed secrets and suggests fixes. | "Scan for vulnerabilities", "Check security" |
| **requirements-analyst** | Analyzes codebases to identify requirements, dependencies, and potential improvements. | "Analyze this codebase", "What are the dependencies" |
| **design-director-platform** | Coordinates comprehensive platform redesigns addressing accessibility, conversion rates, and technical debt. | "Redesign our platform", "Fix accessibility issues" |
| **design-system-architect** | Creates and enhances design systems with AI personalization and adaptive interfaces. | "Create a design system", "Implement adaptive UI" |
| **interaction-design-optimizer** | Optimizes user interactions and improves UX through data-driven design decisions. | "Optimize user experience", "Improve interaction flow" |
| **system-architect-2025** | Designs modern system architectures with focus on scalability and best practices. | "Design system architecture", "Plan microservices" |

## 📚 CLI Commands Reference

### Basic Commands
```bash
# Install agents
claude-agents install                    # Interactive installation
claude-agents install --all              # Install all available agents
claude-agents install code-reviewer test-runner  # Install specific agents

# List agents
claude-agents list                       # Show all agents
claude-agents list --installed           # Show only installed agents
claude-agents list --available           # Show available to install

# Manage agents
claude-agents enable <agent>             # Enable an agent
claude-agents disable <agent>            # Disable an agent
claude-agents remove <agent>             # Remove an agent
claude-agents info <agent>               # Show agent details
```

### Advanced Commands
```bash
# Sync and manage external agents
claude-agents sync                       # Detect and register external agents
claude-agents sync --force-copy          # Copy all agents to project directory

# Quality and optimization
claude-agents validate                   # Validate all agents
claude-agents validate <agent>           # Validate specific agent
claude-agents optimize --all             # Optimize all agent descriptions
claude-agents optimize <agent>           # Optimize specific agent

# Migration and maintenance
claude-agents migrate                    # Convert to Claude Code format
claude-agents migrate --cleanup          # Migrate and remove old files
```

### Development Commands (with Makefile)
```bash
# Quick commands
make list-agents                         # List all installed agents
make sync                               # Sync external agents
make sync-copy                          # Force copy all agents to project
make validate                           # Validate all agents
make fix-yaml                           # Fix YAML frontmatter issues

# Publishing (for contributors)
make publish-info                       # Show publishing instructions
make publish-quick                      # Quick publish helper
```

## 🤖 Detailed Agent Descriptions

### 🔍 Code Reviewer
*Your personal code quality guardian*

- Comprehensive security analysis
- Best practices enforcement
- Performance optimization suggestions
- Clean code principles

```bash
# Install
claude-agents install code-reviewer

# Use in Claude Code (auto-delegation)
> "I need to review my recent changes for security issues"
```

### 🧪 Test Runner
*Intelligent test automation specialist*

- Auto-detects test frameworks
- Fixes failing tests automatically
- Improves test coverage
- Supports all major languages

```bash
# Install
claude-agents install test-runner

# Use
> /test
> /test src/**/*.test.js
```

### 🐛 Debugger
*Expert problem solver and bug hunter*

- Root cause analysis
- Stack trace interpretation
- Performance profiling
- Memory leak detection

```bash
# Install
claude-agents install debugger

# Use
> /debug Cannot read property 'map' of undefined
```

### 🔧 Refactor Assistant
*Code transformation specialist*

- Apply design patterns
- Modernize legacy code
- Improve code structure
- Maintain functionality

```bash
# Install
claude-agents install refactor

# Use
> /refactor improve performance
> /refactor apply SOLID principles
```

### 📝 Documentation Writer
*Technical writing expert*

- API documentation
- README generation
- Architecture docs
- Code comments

```bash
# Install
claude-agents install doc-writer

# Use
> /document API
> /document architecture
```

### 🔒 Security Scanner
*Vulnerability detection specialist*

- Secret detection
- OWASP compliance
- Dependency auditing
- Security best practices

```bash
# Install
claude-agents install security-scanner

# Use
> /security-scan
> /security-scan src/api/
```

## 📖 Documentation

### 📚 Command Reference

| Command | Description | Example |
|---------|-------------|---------|
| `install` | Install agents interactively | `claude-agents install` |
| `install --all` | Install all available agents | `claude-agents install --all` |
| `install --project` | Install to project directory | `claude-agents install --project` |
| `list` | Show all agents | `claude-agents list` |
| `list --installed` | Show only installed agents | `claude-agents list --installed` |
| `enable <agent>` | Enable a disabled agent | `claude-agents enable code-reviewer` |
| `disable <agent>` | Disable an agent | `claude-agents disable test-runner` |
| `remove <agent>` | Remove/uninstall an agent | `claude-agents remove debugger` |
| `info <agent>` | Show agent details | `claude-agents info debugger` |
| `create` | Create a custom agent | `claude-agents create` |
| `migrate` | Migrate to Claude Code format | `claude-agents migrate` |
| `optimize [agent]` | Optimize descriptions | `claude-agents optimize` |
| `validate [agent]` | Validate agent quality | `claude-agents validate` |
| `update [agent]` | Update agent configurations | `claude-agents update` |
| `update --all` | Update all installed agents | `claude-agents update --all` |
| `update --force` | Force update without confirmation | `claude-agents update --force` |

### 🔄 Updating Agents

Keep your agents up-to-date with the latest improvements and features:

#### Update Commands

```bash
# Interactive update - select which agents to update
claude-agents update

# Update a specific agent
claude-agents update code-reviewer

# Update all installed agents at once
claude-agents update --all

# Force update without confirmation prompt
claude-agents update --all --force

# Preserve custom modifications during update
claude-agents update --all --preserve-custom
```

#### Using Make

```bash
# Update all agents quickly
make update-agents

# Update specific agent
make update-agent AGENT=code-reviewer

# List installed agents first
make list-agents
```

#### What Gets Updated

- **Agent Definitions** - Latest prompts and configurations
- **Metadata** - Version information and timestamps
- **Hooks** - Any associated automation hooks
- **Slash Commands** - Corresponding command files

### 🔄 New Features for Claude Code Compatibility

#### Migrate Existing Agents
```bash
# Convert old format to Claude Code format
claude-agents migrate

# With options
claude-agents migrate --cleanup  # Remove old directories after migration
```

#### Optimize Agent Descriptions
```bash
# Improve descriptions for better auto-delegation
claude-agents optimize

# Optimize specific agent
claude-agents optimize code-reviewer
```

#### Validate Agent Quality
```bash
# Check agent format and quality
claude-agents validate

# Detailed validation
claude-agents validate --verbose
```

### Creating Custom Agents

#### Simple Agent Creation
Create `~/.claude/agents/my-agent.md`:

```markdown
---
name: my-agent
description: Automatically handles X when Y occurs. Use when dealing with Z tasks.
tools: Read, Edit, Grep  # Optional - inherits all if omitted
---

You are an expert in [DOMAIN]. Your role is to [PURPOSE].

## Process
When invoked, immediately:
1. [STEP 1]
2. [STEP 2]
3. [STEP 3]
```

### \ud83d\udcdd Agent Format (Claude Code Compatible)

Agents are now single `.md` files with YAML frontmatter:

```markdown
---
name: agent-name
description: Clear description with trigger words for auto-delegation
tools: Read, Grep, Glob  # Optional - inherits all if omitted
---

Agent system prompt here...
```

**Key Points**:
- No more slash commands - uses description-based auto-delegation
- No separate metadata.json or hooks.json files
- Tools are optional - agents inherit all tools if not specified
- Descriptions should include trigger words for better matching

### Installation Scopes

**User Scope** (`~/.claude/agents/`)
- Available in all projects
- Personal agents
- Default installation location

**Project Scope** (`.claude/agents/`)
- Project-specific agents
- Shared with team via version control
- Use `--project` flag

### Advanced Configuration

#### State Management
Agent states are tracked in `.claude-agents.json`:

```json
{
  "installedAgents": {
    "code-reviewer": {
      "version": "1.0.0",
      "scope": "user",
      "installedAt": "2024-01-20T10:00:00Z"
    }
  },
  "enabledAgents": ["code-reviewer"],
  "disabledAgents": []
}
```

#### Hook Integration
Trigger agents automatically with hooks:

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{
        "type": "command",
        "command": "echo 'Consider running /review' >&2"
      }]
    }]
  }
}
```

## 🌟 Our Ecosystem

Check out our other tools for Claude Code:

### 🪝 [Claude Hooks Manager](https://github.com/lsendel/claude-hooks)
Powerful hook management system for Claude Code automation

### 🔨 [Context Forge](https://github.com/lsendel/context-forge)
Our flagship tool for intelligent context generation and management

## 🚫 Gitignore Support

Claude agents now respect gitignore patterns to avoid processing unnecessary files:

### Automatic Exclusions
Agents automatically ignore:
- `node_modules/` - Dependencies
- `.git/` - Version control
- `dist/`, `build/` - Build outputs
- `.env` files - Secrets
- IDE configurations
- OS-specific files

### Custom Ignore Patterns
Create a `.claude-ignore` file in your project root:
```bash
# Example .claude-ignore
*.log
coverage/
temp/
secrets/
```

### How It Works
- Agents read both `.gitignore` and `.claude-ignore`
- File searches automatically exclude ignored patterns
- Improves performance by skipping irrelevant files
- Prevents accidental exposure of sensitive data

## 🤝 Contributing

We love contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-agent`)
3. **Commit** your changes (`git commit -m 'Add amazing agent'`)
4. **Push** to the branch (`git push origin feature/amazing-agent`)
5. **Open** a Pull Request

### Adding New Agents

1. Create agent structure:
```
agents/
└── your-agent/
    ├── agent.md       # Agent definition
    ├── metadata.json  # Agent metadata
    └── hooks.json     # Optional hooks
```

2. Add slash command:
```
commands/
└── your-command.md
```

3. Submit PR with description

## 🐛 Troubleshooting

### Agent Not Working?

```bash
# Check installation
claude-agents list

# Verify agent status
claude-agents info <agent-name>

# Re-enable if disabled
claude-agents enable <agent-name>
```

### Debug Mode

```bash
# Run Claude with debug output
claude --debug
```

### Common Issues

- **Permission denied**: Use `sudo` for global install
- **Agent not found**: Check spelling and installation
- **Command not working**: Ensure Claude Code is updated

## 📊 Release Notes

## 🐛 Troubleshooting

### Common Issues and Solutions

#### YAML Parsing Errors
If you see "Invalid YAML frontmatter" errors:
```bash
# Fix YAML issues automatically
make fix-yaml
# Or manually
node scripts/fix-yaml-frontmatter.js
```

#### Agents Not Showing After Claude Code Installation
```bash
# Sync externally installed agents
claude-agents sync
# Copy all agents to your project
claude-agents sync --force-copy
```

#### Git Push Rejected
```bash
# Sync with remote before pushing
git fetch origin
git pull --rebase origin main
git push origin main
```

#### NPM Publishing Issues
```bash
# Version already exists
npm version patch  # Bump version first
# OTP required
npm publish --otp=123456  # Use your authenticator code
```

#### Agent Not Working
```bash
# Verify installation
claude-agents list
claude-agents info <agent-name>
# Validate format
claude-agents validate <agent-name>
# Re-enable if needed
claude-agents enable <agent-name>
```

### Debug Mode
```bash
# Run with debug logging
LOG_LEVEL=DEBUG claude-agents sync
# Check configuration
cat ~/.claude-agents.json
```

## 📊 Release Notes

### Version 1.0.3 (Latest)
- Enhanced sync with automatic project copying
- Full Claude Code YAML format support
- Fixed YAML parsing for complex descriptions
- Improved command detection
- Cleaned up Makefile

### Version 1.0.2
- Added requirements-analyst agent
- Improved sync functionality
- Better error handling

### Version 1.0.0
- 🎉 Initial release
- 6 production-ready agents
- Interactive CLI interface
- Custom agent creation
- Project/user scope support
- Comprehensive documentation

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Claude Code team at Anthropic
- Our amazing community of developers
- All contributors and testers
- Special thanks to webdevtodayjason for the original project

## 🔧 Development & Testing

### Running Tests
```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Code Quality
```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

### Security
```bash
# Run security audit
npm audit

# Fix vulnerabilities
npm run audit:fix
```

See [IMPROVEMENTS.md](./docs/IMPROVEMENTS.md) for detailed documentation on:
- 🧪 Testing framework setup
- 🔒 Security enhancements
- 📊 Type safety with JSDoc
- 🚀 CI/CD pipelines
- 📦 Dependency management

## 📬 Connect

- 🐛 [Report Issues](https://github.com/lsendel/sub-agents/issues)
- 💡 [Request Features](https://github.com/lsendel/sub-agents/discussions)
- 🐦 [Follow Updates](https://twitter.com/lsendel)
- ⭐ [Star on GitHub](https://github.com/lsendel/sub-agents)

## 🔍 SEO Keywords & Use Cases

### Perfect for developers who want to:
- **Automate code reviews** with AI-powered analysis
- **Fix failing tests automatically** using intelligent test runners
- **Debug complex issues** with expert error analysis
- **Generate documentation** from existing code
- **Scan for security vulnerabilities** proactively
- **Refactor legacy code** with modern patterns
- **Enhance Claude Code** with specialized capabilities
- **Create custom AI agents** for specific workflows

### Technologies & Integrations:
- Works with **Claude Code** by Anthropic
- Supports all major programming languages
- Integrates with existing development workflows
- Compatible with Git, npm, yarn, and more
- Extensible through custom agent creation

---

<div align="center">

**Made with ❤️ by [lsendel](https://github.com/lsendel)**

*Building AI-powered developer tools to enhance productivity and code quality*

**Claude Sub-Agents Manager** - Your AI-Powered Development Team in Claude Code

[![Star History Chart](https://api.star-history.com/svg?repos=lsendel/sub-agents&type=Date)](https://star-history.com/#lsendel/sub-agents&Date)

</div>
