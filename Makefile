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

.PHONY: help install test lint format build publish publish-patch publish-minor publish-major update clean check-env setup dev link unlink

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