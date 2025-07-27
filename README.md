# Claude Sub-Agents Manager - AI-Powered Development Assistants for Claude Code

<div align="center">

![Claude Sub-Agents](https://img.shields.io/badge/Claude-Sub--Agents-blue?style=for-the-badge&logo=anthropic)
[![npm version](https://img.shields.io/npm/v/@webdevtoday/claude-agents?style=flat-square)](https://www.npmjs.com/package/@webdevtoday/claude-agents)
[![npm downloads](https://img.shields.io/npm/dm/@webdevtoday/claude-agents?style=flat-square)](https://www.npmjs.com/package/@webdevtoday/claude-agents)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![GitHub release](https://img.shields.io/github/release/lsendel/sub-agents.svg?style=flat-square)](https://github.com/lsendel/sub-agents/releases)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red.svg?style=flat-square)](https://github.com/lsendel)

**🚀 Supercharge Claude Code with Specialized AI Sub-Agents for Code Review, Testing, Debugging & More**

**Transform your development workflow with intelligent AI assistants that excel at specific programming tasks**

[Installation](#-installation) • [Quick Start](#-quick-start) • [Available Agents](#-available-sub-agents) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 🙏 Acknowledgments

This project is forked from [https://github.com/webdevtodayjason/sub-agents.git](https://github.com/webdevtodayjason/sub-agents.git). A warm thanks to webdevtodayjason for the excellent project contribution and foundation!

## 🎯 What is Claude Sub-Agents Manager?

Claude Sub-Agents Manager is a powerful CLI tool that enhances Claude Code with specialized AI assistants designed for specific development tasks. Each sub-agent is an expert in its domain - from automated code reviews and test fixing to intelligent debugging and documentation generation. Install production-ready agents instantly or create custom agents tailored to your unique workflow needs.

### ✨ Why Claude Sub-Agents?

- **🧠 Specialized Intelligence**: Each agent is an expert in its domain
- **⚡ Zero Configuration**: Pre-built agents work out of the box
- **🎨 Fully Customizable**: Create agents that match your workflow
- **🔄 Smart Context Management**: Agents operate in isolated contexts
- **🛠️ Developer First**: Built by developers, for developers

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

# Use an agent via slash command
# In Claude Code:
> /review
> /test
> /debug TypeError in production
```

## 📋 Available Sub-Agents

| Agent Name | Description | Slash Command |
|------------|-------------|---------------|
| **code-reviewer** | Expert code review specialist for quality, security, and maintainability | `/review` |
| **test-runner** | Automated test execution specialist that runs tests and fixes failures | `/test [pattern]` |
| **debugger** | Expert debugging specialist for analyzing errors, stack traces, and fixing issues | `/debug [error]` |
| **refactor** | Code refactoring specialist for improving code structure, patterns, and maintainability | `/refactor [target]` |
| **doc-writer** | Documentation specialist for creating and updating technical documentation, API docs, and README files | `/document [type]` |
| **security-scanner** | Security vulnerability scanner that detects common security issues and suggests fixes | `/security-scan [path]` |

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

# Use
> /review
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

### Creating Custom Agents

#### Interactive Creation
```bash
claude-agents create
```

#### Manual Creation
Create `~/.claude/agents/my-agent.md`:

```markdown
---
name: my-agent
description: What this agent does and when to use it
tools: Read, Edit, Grep, Bash
---

You are an expert in [DOMAIN]. Your role is to [PURPOSE].

When invoked, you will:
1. [STEP 1]
2. [STEP 2]
3. [STEP 3]

Always ensure [KEY PRINCIPLE].
```

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

### Version 1.0.0 (Latest)
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
