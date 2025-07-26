# Installation & Update Guide

## For Users

### Installing Claude Agents

#### From npm (When Published)
```bash
# Install globally
npm install -g @zamaz/claude-agents

# Or with yarn
yarn global add @zamaz/claude-agents

# Verify installation
claude-agents --version
```

#### From GitHub (Latest Development)
```bash
# Clone and install from source
git clone https://github.com/yourusername/sub-agents.git
cd sub-agents
npm install
npm link

# Update from source
git pull
npm install
npm link --force
```

### Updating Claude Agents

#### Update from npm
```bash
# Check current version
claude-agents --version

# Check latest version available
npm view @zamaz/claude-agents version

# Update to latest version
npm update -g @zamaz/claude-agents

# Or force reinstall
npm install -g @zamaz/claude-agents@latest
```

#### Update from Source
```bash
# Navigate to the cloned directory
cd /path/to/sub-agents

# Pull latest changes
git pull origin main

# Update dependencies
npm install

# Relink if needed
npm link --force

# Verify update
claude-agents --version
```

### Checking for Updates

#### Manual Check
```bash
# See if updates are available
npm outdated -g @zamaz/claude-agents

# View all versions
npm view @zamaz/claude-agents versions
```

#### Automatic Update Notification
The tool checks for updates automatically and notifies you when a new version is available.

## For Developers

### Publishing Updates

#### 1. Update Version
```bash
# Patch release (1.0.2 → 1.0.3)
npm version patch -m "Fix: %s"

# Minor release (1.0.2 → 1.1.0)
npm version minor -m "Feature: %s"

# Major release (1.0.2 → 2.0.0)
npm version major -m "Breaking: %s"
```

#### 2. Update Changelog
Create or update `CHANGELOG.md`:
```markdown
# Changelog

## [1.0.3] - 2024-07-26
### Fixed
- Fixed gitignore handling
- Improved security checks

### Added
- Pre-commit hooks for sensitive files
```

#### 3. Publish to npm
```bash
# Using Makefile
make publish-patch  # or publish-minor, publish-major

# Or manually
npm publish --access public
git push && git push --tags
```

### Version Management

#### Semantic Versioning
- **MAJOR**: Breaking changes (2.0.0)
- **MINOR**: New features, backward compatible (1.1.0)
- **PATCH**: Bug fixes (1.0.3)

#### Pre-release Versions
```bash
# Beta release
npm version 1.1.0-beta.1

# Release candidate
npm version 1.1.0-rc.1
```

### Update Notification System

Add update checker to your package:

```javascript
// src/utils/update-checker.js
import { execSync } from 'child_process';
import chalk from 'chalk';
import semver from 'semver';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function checkForUpdates() {
  try {
    const packageJson = JSON.parse(
      readFileSync(join(__dirname, '../../package.json'), 'utf-8')
    );
    const currentVersion = packageJson.version;
    
    // Get latest version from npm
    const latestVersion = execSync(
      `npm view ${packageJson.name} version`,
      { encoding: 'utf-8' }
    ).trim();
    
    if (semver.gt(latestVersion, currentVersion)) {
      console.log(chalk.yellow('\n📦 Update available!'));
      console.log(chalk.gray(`Current: ${currentVersion}`));
      console.log(chalk.green(`Latest: ${latestVersion}`));
      console.log(chalk.cyan(`Run: npm update -g ${packageJson.name}\n`));
    }
  } catch (error) {
    // Silently fail - don't interrupt user
  }
}
```

### Distribution Channels

#### 1. npm Registry
- Primary distribution method
- Automatic updates via npm
- Version history preserved

#### 2. GitHub Releases
```bash
# Create a release
gh release create v1.0.3 \
  --title "v1.0.3: Security Improvements" \
  --notes "Added gitignore support and security checks"
```

#### 3. Direct Downloads
Users can download specific versions:
```bash
# Download specific version
npm pack @zamaz/claude-agents@1.0.3

# Install from tarball
npm install -g zamaz-claude-agents-1.0.3.tgz
```

## Troubleshooting Updates

### Common Issues

#### Permission Errors
```bash
# On macOS/Linux
sudo npm update -g @zamaz/claude-agents

# Better: Use a Node version manager
nvm use 18
npm update -g @zamaz/claude-agents
```

#### Cache Issues
```bash
# Clear npm cache
npm cache clean --force

# Reinstall
npm install -g @zamaz/claude-agents@latest
```

#### Version Conflicts
```bash
# Fully uninstall first
npm uninstall -g @zamaz/claude-agents

# Then reinstall
npm install -g @zamaz/claude-agents@latest
```

### Rollback to Previous Version
```bash
# Install specific version
npm install -g @zamaz/claude-agents@1.0.2

# View all available versions
npm view @zamaz/claude-agents versions --json
```

## Best Practices

### For Users
1. Check for updates regularly
2. Read changelog before updating
3. Test updates in a non-critical environment first
4. Keep a note of the working version

### For Developers
1. Follow semantic versioning strictly
2. Maintain detailed changelog
3. Test thoroughly before publishing
4. Announce breaking changes clearly
5. Support at least one previous major version