# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2025-07-28

### Added
- 17 new specialized agents for comprehensive development support:
  - **Core Development**: code-refactorer, performance-optimizer, codebase-analyzer
  - **Testing**: unit-test-writer, integration-test-writer
  - **Documentation**: documentation-writer, technical-documentation-writer, business-documentation-writer
  - **Design & UX**: ux-optimizer, design-system-creator, visual-design-enhancer, platform-redesigner
  - **Architecture & Planning**: system-architect, product-roadmap-planner, agent-orchestration-strategist, process-orchestrator
  - **Creative & Marketing**: creative-brainstormer, marketing-strategist
- Categorized agent display in documentation
- Enhanced agent descriptions for better auto-delegation

### Changed
- Package renamed to generic claude-agents format
- Updated all documentation to remove proprietary naming

## [1.0.4] - 2024-07-28

### Added
- Process management system for development workflows
- Standards management system for coding guidelines
- `sync-processes` command to sync from `~/.claude/processes`
- `sync-standards` command to sync from `~/.claude/standards`
- Separate configuration files for processes and standards
- Sample process files (code-review, feature-development)
- Sample standards files (coding-standards, api-design)
- Documentation for process and standards format
- New keywords for process and standards management

### Changed
- Updated documentation to include processes/standards features
- Enhanced CLAUDE.md with new architecture details
- Updated Makefile with processes/standards sync targets

## [1.0.3] - 2024-07-27

### Added
- Enhanced sync with automatic project copying
- Full Claude Code YAML format support
- Custom YAML parser for complex descriptions
- Improved command detection
- Gitignore support for agents
- Security checks to prevent committing sensitive files
- Update checker with automatic notifications
- Pre-commit hooks for security
- `.claude-ignore` file support
- Improved agent optimizer for better Claude Code compatibility
- Version command with update checking

### Changed
- Package renamed to generic naming structure
- Author updated to generic format
- Enhanced `.gitignore` with comprehensive security patterns
- Improved agent descriptions for better automatic delegation
- Cleaned up Makefile targets

### Fixed
- YAML parsing for complex multi-line descriptions
- Sync functionality for Claude Code created agents

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
- 4 production-ready agents:
  - code-reviewer
  - test-runner
  - debugger
  - security-scanner
- Interactive CLI interface
- Project and user scope support
- Agent enable/disable functionality
- Custom agent creation
- Comprehensive documentation

[Unreleased]: https://github.com/lsendel/sub-agents/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/lsendel/sub-agents/compare/v1.0.4...v1.1.0
[1.0.4]: https://github.com/lsendel/sub-agents/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/lsendel/sub-agents/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/lsendel/sub-agents/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/lsendel/sub-agents/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/lsendel/sub-agents/releases/tag/v1.0.0