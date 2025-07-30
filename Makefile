# Claude Sub-Agents Makefile
# Development and agent management tasks

# Get package info
PACKAGE_NAME = $(shell node -p "require('./package.json').name")

# Colors for output
BLUE = \033[0;34m
GREEN = \033[0;32m
YELLOW = \033[1;33m
RED = \033[0;31m
NC = \033[0m # No Color

.PHONY: help install test lint format clean dev link unlink sync sync-copy pull-agents pull-processes pull-standards pull-commands pull-all sync-all cleanup install-agent migrate optimize validate fix-yaml publish-info publish-quick list-agents install-agents push-agents push-processes push-standards push-commands push-all push-reference reset-and-push

# Default target
help:
	@echo "$(BLUE)Claude Sub-Agents Manager$(NC)"
	@echo "$(GREEN)Available commands:$(NC)"
	@echo "  $(YELLOW)make install$(NC)      - Install dependencies"
	@echo "  $(YELLOW)make dev$(NC)          - Install and link for development"
	@echo "  $(YELLOW)make test$(NC)         - Run tests"
	@echo "  $(YELLOW)make lint$(NC)         - Run ESLint"
	@echo "  $(YELLOW)make format$(NC)       - Format code with Prettier"
	@echo "  $(YELLOW)make clean$(NC)        - Clean node_modules and lock files"
	@echo ""
	@echo "$(GREEN)Agent management:$(NC)"
	@echo "  $(YELLOW)make list-agents$(NC)  - List all installed agents"
	@echo "  $(YELLOW)make install-agents$(NC) - Install all available agents"
	@echo "  $(YELLOW)make install-agent AGENTS=\"name1 name2\"$(NC) - Install specific agents"
	@echo ""
	@echo "$(GREEN)Pull commands (global → project):$(NC)"
	@echo "  $(YELLOW)make pull-agents$(NC)    - Pull agents from ~/.claude/agents to agents/"
	@echo "  $(YELLOW)make pull-processes$(NC) - Pull processes from ~/.claude/processes to processes/"
	@echo "  $(YELLOW)make pull-standards$(NC) - Pull standards from ~/.claude/standards to standards/"
	@echo "  $(YELLOW)make pull-commands$(NC)  - Pull commands from ~/.claude/commands to commands/"
	@echo "  $(YELLOW)make pull-all$(NC)      - Pull all resources from global to project"
	@echo ""
	@echo "$(GREEN)Push commands (project → global):$(NC)"
	@echo "  $(YELLOW)make push-agents$(NC)    - Push agents from project to ~/.claude/agents"
	@echo "  $(YELLOW)make push-processes$(NC) - Push processes from project to ~/.claude/processes"
	@echo "  $(YELLOW)make push-standards$(NC) - Push standards from project to ~/.claude/standards"
	@echo "  $(YELLOW)make push-commands$(NC)  - Push commands from project to ~/.claude/commands"
	@echo "  $(YELLOW)make push-reference$(NC) - Push CLAUDE-REFERENCE.md to ~/.claude/ (catalog of all agents/processes/standards)"
	@echo "  $(YELLOW)make push-all$(NC)      - Push all resources to global directories"
	@echo "  $(YELLOW)make reset-and-push$(NC) - Delete all global directories and push fresh copies from project"
	@echo ""
	@echo "$(GREEN)Legacy sync commands:$(NC)"
	@echo "  $(YELLOW)make sync$(NC)         - Sync externally installed agents"
	@echo "  $(YELLOW)make sync-all$(NC)     - Full sync (agents + pull all resources)"
	@echo ""
	@echo "$(GREEN)Maintenance:$(NC)"
	@echo "  $(YELLOW)make validate$(NC)     - Validate agent configurations"
	@echo "  $(YELLOW)make optimize$(NC)     - Optimize agent definitions"
	@echo "  $(YELLOW)make migrate$(NC)      - Migrate agents to new format"
	@echo "  $(YELLOW)make fix-yaml$(NC)     - Fix YAML frontmatter issues"
	@echo "  $(YELLOW)make cleanup$(NC)      - Remove deprecated agents"
	@echo ""
	@echo "$(GREEN)Publishing to npm:$(NC)"
	@echo "  To publish this package to npm, use:"
	@echo "  $(YELLOW)npm version patch$(NC) - Bump patch version (1.0.2 -> 1.0.3)"
	@echo "  $(YELLOW)npm publish$(NC)       - Publish to npm registry"
	@echo "  Or in one command:"
	@echo "  $(YELLOW)npm version patch && npm publish$(NC)"
	@echo ""
	@echo "  For detailed instructions: $(YELLOW)make publish-info$(NC)"
	@echo "  For quick publish: $(YELLOW)make publish-quick$(NC)"
	@echo ""
	@echo "  Current package: @zamaz/claude-agents"
	@echo "  Registry: https://www.npmjs.com/package/@zamaz/claude-agents"

# Install dependencies
install:
	@echo "$(BLUE)Installing dependencies...$(NC)"
	npm install
	@echo "$(GREEN)✓ Dependencies installed$(NC)"

# Development setup
dev: install link
	@echo "$(GREEN)✓ Development environment ready$(NC)"

# Link package globally
link:
	@echo "$(BLUE)Linking package globally...$(NC)"
	npm link
	@echo "$(GREEN)✓ Package linked$(NC)"

# Unlink package
unlink:
	@echo "$(BLUE)Unlinking package...$(NC)"
	npm unlink -g $(PACKAGE_NAME)
	@echo "$(GREEN)✓ Package unlinked$(NC)"

# Run tests
test:
	@echo "$(BLUE)Running tests...$(NC)"
	@npm test || (echo "$(YELLOW)⚠ No tests configured$(NC)" && exit 0)

# Run linter
lint:
	@echo "$(BLUE)Running ESLint...$(NC)"
	npm run lint
	@echo "$(GREEN)✓ Linting complete$(NC)"

# Format code
format:
	@echo "$(BLUE)Formatting code...$(NC)"
	npm run format
	@echo "$(GREEN)✓ Formatting complete$(NC)"

# Clean project
clean:
	@echo "$(BLUE)Cleaning project...$(NC)"
	@rm -rf node_modules package-lock.json || true
	@echo "$(GREEN)✓ Project cleaned$(NC)"

# List installed agents
list-agents:
	@echo "$(BLUE)Listing installed agents...$(NC)"
	@./bin/claude-agents list

# Install all agents
install-agents:
	@echo "$(BLUE)Installing all available agents...$(NC)"
	@./bin/claude-agents install --all
	@echo "$(GREEN)✓ All agents installed$(NC)"

# Install specific agents by name
install-agent:
	@if [ -z "$(AGENTS)" ]; then \
		echo "$(RED)Error: Please specify AGENTS=<agent-names>$(NC)"; \
		echo "Example: make install-agent AGENTS=\"code-reviewer test-runner\""; \
		exit 1; \
	fi
	@echo "$(BLUE)Installing agents: $(AGENTS)...$(NC)"
	@./bin/claude-agents install $(AGENTS)
	@echo "$(GREEN)✓ Agents installed$(NC)"

# Pull agents from ~/.claude/agents to project
pull-agents:
	@echo "$(BLUE)Pulling agents from ~/.claude/agents to project...$(NC)"
	@mkdir -p agents
	@if [ -d ~/.claude/agents ]; then \
		cp -f ~/.claude/agents/*.md agents/ 2>/dev/null && \
		echo "$(GREEN)✓ Agents pulled to project/agents/$(NC)" || \
		echo "$(YELLOW)⚠ No agent files found in ~/.claude/agents$(NC)"; \
	else \
		echo "$(YELLOW)⚠ ~/.claude/agents directory not found$(NC)"; \
	fi

# Pull processes from ~/.claude/processes to project
pull-processes:
	@echo "$(BLUE)Pulling processes from ~/.claude/processes to project...$(NC)"
	@mkdir -p processes
	@if [ -d ~/.claude/processes ]; then \
		cp -f ~/.claude/processes/*.md processes/ 2>/dev/null && \
		echo "$(GREEN)✓ Processes pulled to project/processes/$(NC)" || \
		echo "$(YELLOW)⚠ No process files found in ~/.claude/processes$(NC)"; \
	else \
		echo "$(YELLOW)⚠ ~/.claude/processes directory not found$(NC)"; \
	fi

# Pull standards from ~/.claude/standards to project
pull-standards:
	@echo "$(BLUE)Pulling standards from ~/.claude/standards to project...$(NC)"
	@mkdir -p standards
	@if [ -d ~/.claude/standards ]; then \
		cp -f ~/.claude/standards/*.md standards/ 2>/dev/null && \
		echo "$(GREEN)✓ Standards pulled to project/standards/$(NC)" || \
		echo "$(YELLOW)⚠ No standard files found in ~/.claude/standards$(NC)"; \
	else \
		echo "$(YELLOW)⚠ ~/.claude/standards directory not found$(NC)"; \
	fi

# Pull commands from ~/.claude/commands to project
pull-commands:
	@echo "$(BLUE)Pulling commands from ~/.claude/commands to project...$(NC)"
	@mkdir -p commands
	@if [ -d ~/.claude/commands ]; then \
		cp -f ~/.claude/commands/*.md commands/ 2>/dev/null && \
		echo "$(GREEN)✓ Commands pulled to project/commands/$(NC)" || \
		echo "$(YELLOW)⚠ No command files found in ~/.claude/commands$(NC)"; \
	else \
		echo "$(YELLOW)⚠ ~/.claude/commands directory not found$(NC)"; \
	fi

# Pull all resources from global to project directories
pull-all: pull-agents pull-processes pull-standards pull-commands
	@echo "$(GREEN)✓ All resources pulled to project!$(NC)"
	@echo "$(BLUE)Pulled:$(NC)"
	@echo "  • Agents → agents/"
	@echo "  • Processes → processes/"
	@echo "  • Standards → standards/"
	@echo "  • Commands → commands/"

# Legacy sync-all for backwards compatibility
sync-all: cleanup pull-all
	@echo "$(GREEN)✓ Full sync complete!$(NC)"
	@echo "$(BLUE)Synced:$(NC)"
	@echo "  • Agents"
	@echo "  • Processes"
	@echo "  • Standards"
	@echo "  • Commands"

# Push agents from project to global directory
push-agents:
	@echo "$(BLUE)Pushing agents from project to ~/.claude/agents...$(NC)"
	@mkdir -p ~/.claude/agents
	@if [ -d "agents" ]; then \
		cp -f agents/*.md ~/.claude/agents/ 2>/dev/null && \
		echo "$(GREEN)✓ Agents pushed to ~/.claude/agents$(NC)" || \
		echo "$(RED)✗ No agent files found to push$(NC)"; \
	else \
		echo "$(YELLOW)⚠ No agents directory found$(NC)"; \
	fi

# Push processes from project to global directory
push-processes:
	@echo "$(BLUE)Pushing processes from project to ~/.claude/processes...$(NC)"
	@mkdir -p ~/.claude/processes
	@if [ -d "processes" ]; then \
		cp -f processes/*.md ~/.claude/processes/ 2>/dev/null && \
		echo "$(GREEN)✓ Processes pushed to ~/.claude/processes$(NC)" || \
		echo "$(RED)✗ No process files found to push$(NC)"; \
	else \
		echo "$(YELLOW)⚠ No processes directory found$(NC)"; \
	fi

# Push standards from project to global directory
push-standards:
	@echo "$(BLUE)Pushing standards from project to ~/.claude/standards...$(NC)"
	@mkdir -p ~/.claude/standards
	@if [ -d "standards" ]; then \
		cp -f standards/*.md ~/.claude/standards/ 2>/dev/null && \
		echo "$(GREEN)✓ Standards pushed to ~/.claude/standards$(NC)" || \
		echo "$(RED)✗ No standard files found to push$(NC)"; \
	else \
		echo "$(YELLOW)⚠ No standards directory found$(NC)"; \
	fi

# Push commands from project to global directory
push-commands:
	@echo "$(BLUE)Pushing commands from project to ~/.claude/commands...$(NC)"
	@mkdir -p ~/.claude/commands
	@if [ -d "commands" ]; then \
		cp -f commands/*.md ~/.claude/commands/ 2>/dev/null && \
		echo "$(GREEN)✓ Commands pushed to ~/.claude/commands$(NC)" || \
		echo "$(RED)✗ No command files found to push$(NC)"; \
	else \
		echo "$(YELLOW)⚠ No commands directory found$(NC)"; \
	fi

# Push all local resources to global directories
push-all: push-agents push-processes push-standards push-commands
	@echo "$(GREEN)✓ All resources pushed to global directories!$(NC)"
	@echo "$(BLUE)Pushed:$(NC)"
	@echo "  • Agents → ~/.claude/agents"
	@echo "  • Processes → ~/.claude/processes"
	@echo "  • Standards → ~/.claude/standards"
	@echo "  • Commands → ~/.claude/commands"

# Push CLAUDE-REFERENCE.md to ~/.claude/
# This file contains a comprehensive catalog of all available agents, processes, standards, and commands
# Other projects can reference this file in their CLAUDE.md to make Claude aware of all available resources
push-reference:
	@echo "$(BLUE)Pushing CLAUDE-REFERENCE.md (comprehensive agent/process/standard catalog) to ~/.claude/...$(NC)"
	@mkdir -p ~/.claude
	@if [ -f "CLAUDE-REFERENCE.md" ]; then \
		cp -f CLAUDE-REFERENCE.md ~/.claude/ && \
		echo "$(GREEN)✓ CLAUDE-REFERENCE.md pushed to ~/.claude/$(NC)"; \
		echo "$(BLUE)Other projects can now reference this catalog in their CLAUDE.md$(NC)"; \
		echo "$(YELLOW)Usage: Add 'See ~/.claude/CLAUDE-REFERENCE.md' to your project's CLAUDE.md$(NC)"; \
	else \
		echo "$(RED)✗ CLAUDE-REFERENCE.md not found in project root$(NC)"; \
		echo "$(YELLOW)This file should contain the catalog of all agents, processes, and standards$(NC)"; \
	fi

# Clean up deprecated agents
cleanup:
	@echo "$(BLUE)Cleaning up deprecated agents...$(NC)"
	@./bin/claude-agents cleanup --force
	@echo "$(GREEN)✓ Cleanup complete$(NC)"

# Migrate agents to new format
migrate:
	@echo "$(BLUE)Migrating agents to new format...$(NC)"
	@./bin/claude-agents migrate --auto
	@echo "$(GREEN)✓ Migration complete$(NC)"

# Optimize agent definitions
optimize:
	@echo "$(BLUE)Optimizing agent definitions...$(NC)"
	@./bin/claude-agents optimize --all
	@echo "$(GREEN)✓ Optimization complete$(NC)"

# Validate agent configurations
validate:
	@echo "$(BLUE)Validating agent configurations...$(NC)"
	@./bin/claude-agents validate
	@echo "$(GREEN)✓ Validation complete$(NC)"

# Fix YAML frontmatter issues
fix-yaml:
	@echo "$(BLUE)Fixing YAML frontmatter issues...$(NC)"
	@node scripts/fix-yaml-frontmatter.js
	@echo "$(GREEN)✓ YAML fixes complete$(NC)"

# Publishing instructions
publish-info:
	@echo "$(BLUE)═══════════════════════════════════════════════════$(NC)"
	@echo "$(BLUE)  NPM Publishing Instructions for @zamaz/claude-agents$(NC)"
	@echo "$(BLUE)═══════════════════════════════════════════════════$(NC)"

# Quick publish helper
publish-quick:
	@echo "$(BLUE)Quick Publish Process$(NC)"
	@echo ""
	@echo "Current version: $$(node -p "require('./package.json').version")"
	@echo ""
	@echo "$(YELLOW)1. First, ensure git is up to date:$(NC)"
	@echo "   Running: git fetch origin && git pull --rebase origin main"
	@git fetch origin
	@git pull --rebase origin main || true
	@echo ""
	@echo "$(YELLOW)2. Now run these commands:$(NC)"
	@echo "   $(GREEN)npm version patch$(NC)  # or minor/major"
	@echo "   $(GREEN)npm publish --otp=YOUR_OTP$(NC)"
	@echo "   $(GREEN)git push --follow-tags$(NC)"
	@echo ""
	@echo "$(BLUE)After running npm version, copy the OTP from your authenticator!$(NC)"
	@echo ""
	@echo "Current version: $$(node -p "require('./package.json').version")"
	@echo "Package name: @zamaz/claude-agents"
	@echo ""
	@echo "$(YELLOW)Steps to publish:$(NC)"
	@echo "1. Ensure you're logged in to npm:"
	@echo "   $(GREEN)npm whoami$(NC)"
	@echo "   If not logged in: $(GREEN)npm login$(NC)"
	@echo ""
	@echo "2. Run tests and validation:"
	@echo "   $(GREEN)make lint$(NC)"
	@echo "   $(GREEN)make validate$(NC)"
	@echo ""
	@echo "3. Update version:"
	@echo "   $(GREEN)npm version patch$(NC)  # For bug fixes (1.0.2 -> 1.0.3)"
	@echo "   $(GREEN)npm version minor$(NC)  # For new features (1.0.2 -> 1.1.0)"
	@echo "   $(GREEN)npm version major$(NC)  # For breaking changes (1.0.2 -> 2.0.0)"
	@echo ""
	@echo "4. Publish to npm:"
	@echo "   $(GREEN)npm publish$(NC)"
	@echo ""
	@echo "5. Push changes to git:"
	@echo "   $(GREEN)git push --follow-tags$(NC)"
	@echo ""
	@echo "$(YELLOW)Troubleshooting:$(NC)"
	@echo "• If npm says version already exists:"
	@echo "  - You need to bump version first"
	@echo "  - Check current published versions: $(GREEN)npm view @zamaz/claude-agents versions$(NC)"
	@echo ""
	@echo "• If git push is rejected:"
	@echo "  $(GREEN)git fetch origin$(NC)"
	@echo "  $(GREEN)git pull --rebase origin main$(NC)"
	@echo "  $(GREEN)git push origin main$(NC)"
	@echo ""
	@echo "• If npm requires OTP:"
	@echo "  $(GREEN)npm publish --otp=YOUR_6_DIGIT_CODE$(NC)"
	@echo ""
	@echo "$(BLUE)View package at:$(NC) https://www.npmjs.com/package/@zamaz/claude-agents"
	@echo "$(BLUE)═══════════════════════════════════════════════════$(NC)"

# Reset and push - Delete all global directories and push fresh copies
reset-and-push:
	@echo "$(RED)WARNING: This will delete all files in:$(NC)"
	@echo "  • ~/.claude/agents"
	@echo "  • ~/.claude/processes"
	@echo "  • ~/.claude/standards"
	@echo "  • ~/.claude/commands"
	@echo ""
	@echo "$(YELLOW)Press Ctrl+C to cancel, or wait 3 seconds to continue...$(NC)"
	@sleep 3
	@echo ""
	@echo "$(BLUE)Deleting global directories...$(NC)"
	@rm -rf ~/.claude/agents
	@rm -rf ~/.claude/processes
	@rm -rf ~/.claude/standards
	@rm -rf ~/.claude/commands
	@echo "$(GREEN)✓ Global directories deleted$(NC)"
	@echo ""
	@echo "$(BLUE)Pushing fresh copies from project...$(NC)"
	@$(MAKE) push-all
	@echo ""
	@echo "$(GREEN)✓ Reset and push complete!$(NC)"
	@echo "$(BLUE)All global directories now contain fresh copies from the project.$(NC)"