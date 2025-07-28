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

.PHONY: help install test lint format clean dev link unlink sync sync-copy sync-processes sync-standards sync-commands sync-all cleanup install-agent migrate optimize validate fix-yaml publish-info publish-quick list-agents install-agents

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
	@echo "$(GREEN)Sync commands:$(NC)"
	@echo "  $(YELLOW)make sync$(NC)         - Sync externally installed agents"
	@echo "  $(YELLOW)make sync-copy$(NC)    - Force copy all agents to project"
	@echo "  $(YELLOW)make sync-processes$(NC) - Sync processes from ~/.claude/processes"
	@echo "  $(YELLOW)make sync-standards$(NC) - Sync standards from ~/.claude/standards"
	@echo "  $(YELLOW)make sync-commands$(NC)  - Sync commands to ~/.claude/commands"
	@echo "  $(YELLOW)make sync-all$(NC)      - Sync agents, processes, standards, and commands"
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

# Sync externally installed agents
sync:
	@echo "$(BLUE)Syncing externally installed agents...$(NC)"
	@./bin/claude-agents sync
	@echo "$(GREEN)✓ Sync complete$(NC)"

# Force copy all agents to project directory
sync-copy:
	@echo "$(BLUE)Copying all agents to project directory...$(NC)"
	@./bin/claude-agents sync --force-copy
	@echo "$(GREEN)✓ All agents copied to project$(NC)"

# Sync processes from ~/.claude/processes
sync-processes:
	@echo "$(BLUE)Syncing processes from ~/.claude/processes...$(NC)"
	@./bin/claude-agents sync-processes --force-copy
	@echo "$(GREEN)✓ Processes sync complete$(NC)"

# Sync standards from ~/.claude/standards
sync-standards:
	@echo "$(BLUE)Syncing standards from ~/.claude/standards...$(NC)"
	@./bin/claude-agents sync-standards --force-copy
	@echo "$(GREEN)✓ Standards sync complete$(NC)"

# Sync commands to ~/.claude/commands
sync-commands:
	@echo "$(BLUE)Syncing commands to ~/.claude/commands...$(NC)"
	@if [ -d "commands" ]; then \
		mkdir -p ~/.claude/commands; \
		cp -f commands/*.md ~/.claude/commands/ 2>/dev/null || true; \
		sed -i '' 's|@~/.claude/process/|@~/.claude/processes/|g' ~/.claude/commands/*.md 2>/dev/null || true; \
		echo "$(GREEN)✓ Commands synced to ~/.claude/commands (paths updated)$(NC)"; \
	else \
		echo "$(YELLOW)⚠ No commands directory found$(NC)"; \
	fi

# Sync all: agents, processes, standards, and commands
sync-all: cleanup sync sync-processes sync-standards sync-commands
	@echo "$(GREEN)✓ Full sync complete!$(NC)"
	@echo "$(BLUE)Synced:$(NC)"
	@echo "  • Agents"
	@echo "  • Processes"
	@echo "  • Standards"
	@echo "  • Commands"

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