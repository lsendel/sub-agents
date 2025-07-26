# Publishing Guide

This guide explains how to publish the Claude Sub-Agents package to npm using the Makefile.

## Security Checks

The project includes automatic security checks to prevent accidental exposure of sensitive files:

### Pre-commit Hook
Automatically installed when you run `npm install`, checks for:
- `.env` files
- Private keys (`.pem`, `.key`)
- Authentication tokens
- Other sensitive patterns

### Manual Check
```bash
# Run sensitive file check manually
make check-sensitive
# or
npm run check-sensitive
```

## Setup

### 1. Initial Setup
```bash
# Copy .env.example to .env
make setup

# Edit .env file and add your NPM token
# You can get your NPM token from: https://www.npmjs.com/settings/[username]/tokens
```

### 2. Get NPM Token
1. Login to [npmjs.com](https://www.npmjs.com)
2. Click your profile → Access Tokens
3. Generate New Token → Classic Token
4. Select "Automation" type
5. Copy the token to your `.env` file

## Development Workflow

### Local Development
```bash
# Install dependencies and link globally
make dev

# Test the CLI locally
claude-agents list
```

### Code Quality
```bash
# Run linter
make lint

# Format code
make format

# Build and check what will be published
make build
```

## Publishing

### First Time Publishing
```bash
# Check everything is ready
make dry-run

# Publish current version
make publish
```

### Version Updates
```bash
# Patch version (1.0.2 → 1.0.3) - for bug fixes
make publish-patch

# Minor version (1.0.2 → 1.1.0) - for new features
make publish-minor

# Major version (1.0.2 → 2.0.0) - for breaking changes
make publish-major
```

### Quick Publish
```bash
# Lint, build, and publish patch version in one command
make quick-publish
```

## Makefile Commands

| Command | Description |
|---------|-------------|
| `make help` | Show all available commands |
| `make setup` | Initial setup (create .env from example) |
| `make install` | Install dependencies |
| `make dev` | Setup for local development |
| `make lint` | Run ESLint |
| `make format` | Format code with Prettier |
| `make test` | Run tests |
| `make build` | Prepare for publishing (lint + dry run) |
| `make publish` | Publish current version |
| `make publish-patch` | Bump patch version and publish |
| `make publish-minor` | Bump minor version and publish |
| `make publish-major` | Bump major version and publish |
| `make update` | Update all dependencies |
| `make clean` | Remove node_modules and lock files |
| `make info` | Check package info on npm |
| `make dry-run` | See what files would be published |

## Environment Variables

The `.env` file supports:
```bash
# Required
NPM_TOKEN=your-npm-token-here

# Optional
NPM_REGISTRY=https://registry.npmjs.org/
NPM_SCOPE=@webdevtoday
```

## Troubleshooting

### NPM Token Issues
- Make sure your token has "Automation" permissions
- Check token hasn't expired
- Ensure `.env` file is in project root

### Publishing Errors
- **E403**: Check npm login and package name availability
- **E409**: Version already exists, bump version first
- **ENEEDAUTH**: NPM_TOKEN not set correctly

### Pre-publish Checklist
- [ ] All tests pass (when implemented)
- [ ] Code is linted (`make lint`)
- [ ] Version number is correct
- [ ] CHANGELOG is updated
- [ ] README is current
- [ ] .env has valid NPM_TOKEN

## Automated Publishing (CI/CD)

For GitHub Actions, add NPM_TOKEN as a secret:
1. Go to Settings → Secrets → Actions
2. Add `NPM_TOKEN` with your token value
3. Use in workflow:
```yaml
- name: Publish to npm
  run: make publish
  env:
    NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```