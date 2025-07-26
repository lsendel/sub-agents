# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Gitignore support for agents
- Security checks to prevent committing sensitive files
- Update checker with automatic notifications
- Pre-commit hooks for security
- `.claude-ignore` file support
- Improved agent optimizer for better Claude Code compatibility
- Version command with update checking

### Changed
- Package renamed from `@webdevtoday/claude-agents` to `@zamaz/claude-agents`
- Author updated to ZAMAZ AI
- Enhanced `.gitignore` with comprehensive security patterns
- Improved agent descriptions for better automatic delegation

### Security
- Added pre-commit hook to block sensitive files
- Enhanced gitignore patterns for private keys, tokens, and credentials
- Added `check-sensitive` command for manual security checks

## [1.0.2] - 2024-07-20

### Fixed
- Fixed package.json configuration issues
- Improved npm publishing setup

## [1.0.1] - 2024-07-15

### Added
- Agent removal functionality
- Improved status indicators
- SEO optimization for npm

### Fixed
- __dirname error in ESM modules

## [1.0.0] - 2024-07-10

### Added
- Initial release
- 6 production-ready agents:
  - code-reviewer
  - test-runner
  - debugger
  - refactor
  - doc-writer
  - security-scanner
- Interactive CLI interface
- Project and user scope support
- Agent enable/disable functionality
- Custom agent creation
- Comprehensive documentation

[Unreleased]: https://github.com/yourusername/sub-agents/compare/v1.0.2...HEAD
[1.0.2]: https://github.com/yourusername/sub-agents/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/yourusername/sub-agents/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/yourusername/sub-agents/releases/tag/v1.0.0