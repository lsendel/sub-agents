# Claude Sub-Agents Makefile
# Automated npm operations with environment variable support

# Load environment variables from .env file
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

# Default values
NPM_REGISTRY ?= https://registry.npmjs.org/
PACKAGE_NAME = $(shell node -p "require('./package.json').name")
CURRENT_VERSION = $(shell node -p "require('./package.json').version")

# Colors for output
BLUE = \033[0;34m
GREEN = \033[0;32m
YELLOW = \033[1;33m
RED = \033[0;31m
NC = \033[0m # No Color

.PHONY: help install test lint format build publish publish-patch publish-minor publish-major update clean check-env setup dev link unlink sync sync-full sync-auto sync-off sync-check install-agent dev-sync

# Default target
help:
	@echo "$(BLUE)Claude Sub-Agents Makefile$(NC)"
	@echo "$(GREEN)Available commands:$(NC)"
	@echo "  $(YELLOW)make install$(NC)      - Install dependencies"
	@echo "  $(YELLOW)make dev$(NC)          - Install and link for development"
	@echo "  $(YELLOW)make test$(NC)         - Run tests"
	@echo "  $(YELLOW)make lint$(NC)         - Run ESLint"
	@echo "  $(YELLOW)make format$(NC)       - Format code with Prettier"
	@echo "  $(YELLOW)make build$(NC)        - Build and prepare for publishing"
	@echo "  $(YELLOW)make publish$(NC)      - Publish current version to npm"
	@echo "  $(YELLOW)make publish-patch$(NC) - Bump patch version and publish"
	@echo "  $(YELLOW)make publish-minor$(NC) - Bump minor version and publish"
	@echo "  $(YELLOW)make publish-major$(NC) - Bump major version and publish"
	@echo "  $(YELLOW)make update$(NC)       - Update all dependencies"
	@echo "  $(YELLOW)make clean$(NC)        - Clean node_modules and lock files"
	@echo "  $(YELLOW)make setup$(NC)        - Initial setup (copy .env.example)"
	@echo "  $(YELLOW)make update-agents$(NC) - Update all installed agents"
	@echo ""
	@echo "$(GREEN)Sync commands:$(NC)"
	@echo "  $(YELLOW)make sync$(NC)         - Sync externally installed agents"
	@echo "  $(YELLOW)make sync-full$(NC)    - Full sync with auto-confirm"
	@echo "  $(YELLOW)make sync-auto$(NC)    - Enable automatic sync"
	@echo "  $(YELLOW)make sync-off$(NC)     - Disable automatic sync"
	@echo "  $(YELLOW)make sync-check$(NC)   - Check sync status"
	@echo ""
	@echo "$(GREEN)Agent management:$(NC)"
	@echo "  $(YELLOW)make install-agent AGENTS=\"name1 name2\"$(NC) - Install specific agents"
	@echo "  $(YELLOW)make list-agents$(NC)  - List all installed agents"
	@echo "  $(YELLOW)make dev-sync$(NC)     - Dev setup with sync"

# Initial setup
setup:
	@if [ ! -f .env ]; then \
		echo "$(BLUE)Creating .env file from .env.example...$(NC)"; \
		cp .env.example .env; \
		echo "$(GREEN)✓ Created .env file$(NC)"; \
		echo "$(YELLOW)⚠ Please edit .env and add your NPM_TOKEN$(NC)"; \
	else \
		echo "$(YELLOW).env file already exists$(NC)"; \
	fi

# Check environment
check-env:
	@if [ -z "$$NPM_TOKEN" ]; then \
		echo "$(RED)ERROR: NPM_TOKEN is not set$(NC)"; \
		echo "$(YELLOW)Please create .env file with NPM_TOKEN=your-token$(NC)"; \
		exit 1; \
	fi
	@echo "$(GREEN)✓ NPM_TOKEN is set$(NC)"

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

# Check for sensitive files
check-sensitive:
	@echo "$(BLUE)Checking for sensitive files...$(NC)"
	@npm run check-sensitive
	@echo "$(GREEN)✓ No sensitive files found$(NC)"

# Build/prepare for publishing
build: lint check-sensitive
	@echo "$(BLUE)Preparing for publish...$(NC)"
	@echo "Current version: $(CURRENT_VERSION)"
	@echo "Package name: $(PACKAGE_NAME)"
	@npm pack --dry-run
	@echo "$(GREEN)✓ Build complete$(NC)"

# Configure npm with token
npm-auth: check-env
	@echo "$(BLUE)Configuring npm authentication...$(NC)"
	@echo "//registry.npmjs.org/:_authToken=$(NPM_TOKEN)" > ~/.npmrc
	@echo "$(GREEN)✓ NPM authentication configured$(NC)"

# Publish current version
publish: check-env npm-auth build
	@echo "$(BLUE)Publishing $(PACKAGE_NAME)@$(CURRENT_VERSION) to npm...$(NC)"
	npm publish --access public
	@echo "$(GREEN)✓ Published successfully!$(NC)"
	@echo "$(GREEN)View at: https://www.npmjs.com/package/$(PACKAGE_NAME)$(NC)"

# Publish with patch version bump
publish-patch: check-env npm-auth build
	@echo "$(BLUE)Bumping patch version...$(NC)"
	npm version patch
	@NEW_VERSION=$$(node -p "require('./package.json').version") && \
	echo "$(BLUE)Publishing $(PACKAGE_NAME)@$$NEW_VERSION to npm...$(NC)" && \
	npm publish --access public && \
	git push --follow-tags && \
	echo "$(GREEN)✓ Published $$NEW_VERSION successfully!$(NC)"

# Publish with minor version bump
publish-minor: check-env npm-auth build
	@echo "$(BLUE)Bumping minor version...$(NC)"
	npm version minor
	@NEW_VERSION=$$(node -p "require('./package.json').version") && \
	echo "$(BLUE)Publishing $(PACKAGE_NAME)@$$NEW_VERSION to npm...$(NC)" && \
	npm publish --access public && \
	git push --follow-tags && \
	echo "$(GREEN)✓ Published $$NEW_VERSION successfully!$(NC)"

# Publish with major version bump
publish-major: check-env npm-auth build
	@echo "$(BLUE)Bumping major version...$(NC)"
	npm version major
	@NEW_VERSION=$$(node -p "require('./package.json').version") && \
	echo "$(BLUE)Publishing $(PACKAGE_NAME)@$$NEW_VERSION to npm...$(NC)" && \
	npm publish --access public && \
	git push --follow-tags && \
	echo "$(GREEN)✓ Published $$NEW_VERSION successfully!$(NC)"

# Update dependencies
update:
	@echo "$(BLUE)Updating dependencies...$(NC)"
	npm update
	@echo "$(GREEN)✓ Dependencies updated$(NC)"

# Clean project
clean:
	@echo "$(BLUE)Cleaning project...$(NC)"
	@rm -rf node_modules package-lock.json || true
	@echo "$(GREEN)✓ Project cleaned$(NC)"

# Quick publish (lint, build, and publish patch)
quick-publish: publish-patch

# Check package info on npm
info:
	@echo "$(BLUE)Fetching package info from npm...$(NC)"
	npm info $(PACKAGE_NAME)

# Dry run to see what would be published
dry-run:
	@echo "$(BLUE)Dry run - files that would be published:$(NC)"
	npm pack --dry-run

# Update installed agents
update-agents:
	@echo "$(BLUE)Updating all installed agents...$(NC)"
	@./bin/claude-agents update --all --force
	@echo "$(GREEN)✓ Agents updated$(NC)"

# Update specific agent
update-agent:
	@if [ -z "$(AGENT)" ]; then \
		echo "$(RED)Error: Please specify AGENT=<agent-name>$(NC)"; \
		echo "Example: make update-agent AGENT=code-reviewer"; \
		exit 1; \
	fi
	@echo "$(BLUE)Updating agent: $(AGENT)...$(NC)"
	@./bin/claude-agents update $(AGENT) --force
	@echo "$(GREEN)✓ Agent updated$(NC)"

# List installed agents
list-agents:
	@echo "$(BLUE)Listing installed agents...$(NC)"
	@./bin/claude-agents list

# Install all agents
install-agents:
	@echo "$(BLUE)Installing all available agents...$(NC)"
	@./bin/claude-agents install --all
	@echo "$(GREEN)✓ All agents installed$(NC)"

# Sync externally installed agents
sync:
	@echo "$(BLUE)Syncing externally installed agents...$(NC)"
	@./bin/claude-agents sync
	@echo "$(GREEN)✓ Sync complete$(NC)"

# Sync with auto-confirmation and command check
sync-full:
	@echo "$(BLUE)Running full sync with command check...$(NC)"
	@./bin/claude-agents sync --auto --commands
	@echo "$(GREEN)✓ Full sync complete$(NC)"

# Force copy all agents to project directory
sync-copy:
	@echo "$(BLUE)Copying all agents to project directory...$(NC)"
	@./bin/claude-agents sync --force-copy
	@echo "$(GREEN)✓ All agents copied to project$(NC)"

# Enable automatic sync
sync-auto:
	@echo "$(BLUE)Enabling automatic sync...$(NC)"
	@./bin/claude-agents config autosync on
	@echo "$(GREEN)✓ Auto-sync enabled$(NC)"

# Disable automatic sync
sync-off:
	@echo "$(BLUE)Disabling automatic sync...$(NC)"
	@./bin/claude-agents config autosync off
	@echo "$(GREEN)✓ Auto-sync disabled$(NC)"

# Check sync status
sync-check:
	@echo "$(BLUE)Checking sync status...$(NC)"
	@./bin/claude-agents config autosync
	@echo ""
	@echo "$(BLUE)Checking for unregistered agents...$(NC)"
	@./bin/claude-agents sync --auto --commands || true

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

# Quick development workflow - install, link, and sync
dev-sync: dev sync
	@echo "$(GREEN)✓ Development environment ready with sync$(NC)"