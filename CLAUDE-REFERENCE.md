# CLAUDE-REFERENCE.md - Sub-Agents Catalog

This file provides a comprehensive reference of all available Claude Code sub-agents, processes, and standards that can be used in your projects. Include this in your project's CLAUDE.md to make Claude aware of these resources.

## File Locations

- **Agents**: `~/.claude/agents/[agent-name].md`
- **Processes**: `~/.claude/processes/[process-name].md`
- **Standards**: `~/.claude/standards/[standard-name].md`
- **Commands**: `~/.claude/commands/[command-name].md`

## Quick Setup

```bash
# Install the CLI tool globally
npm install -g @lsendel/claude-agents

# Install recommended agents for your project
claude-agents install code-reviewer unit-test-writer documentation-writer

# Sync processes and standards from ~/.claude/ to your project
claude-agents sync-processes
claude-agents sync-standards
```

## How It Works

1. **Source Repository**: Agents, processes, and standards are maintained in the [sub-agents repository](https://github.com/lsendel/sub-agents)
2. **Installation**: The `claude-agents` CLI installs agents to `~/.claude/agents/` (global) or `.claude/agents/` (project)
3. **Syncing**: Processes and standards are synced from `~/.claude/processes/` and `~/.claude/standards/` to your project
4. **Commands**: Custom commands are stored in `~/.claude/commands/` and linked to processes

## Available Sub-Agents

### Code Quality & Review
- **`code-reviewer`** - Automatically reviews code for quality, security vulnerabilities, and best practices. Use after writing or modifying code.
  - Related: `code-review` process, `code-review-guide` standard
  
- **`code-refactorer`** - Improves code structure, readability, and maintainability without changing functionality. Use for code cleanup and optimization.
  - Related: `best-practices` standard, `code-style` standard
  
- **`debugger`** - Analyzes and fixes errors, crashes, and unexpected behavior. Interprets stack traces and identifies root causes.
  - Related: `testing-standards`, works with `test-runner`
  
- **`security-scanner`** - Scans for security vulnerabilities including OWASP Top 10, secrets, and insecure patterns. Use for security audits.
  - Related: `best-practices`, `code-review-guide`

### Testing
- **`test-runner`** - Runs tests, detects frameworks, executes tests, and fixes failing tests. Use when tests need to be run or fixed.
  - Related: `testing-standards`, `feature-development` process
  
- **`unit-test-writer`** - Writes comprehensive unit tests using JUnit, Jest, pytest, etc. Creates test suites with high coverage and edge cases.
  - Related: `testing-standards`, works with `test-runner`
  
- **`integration-test-writer`** - Creates integration tests for APIs, databases, and system interactions. Ensures components work together correctly.
  - Related: `testing-standards`, `api-design` standard

### Documentation
- **`documentation-writer`** - Creates and updates technical documentation, READMEs, and guides. Analyzes code to generate accurate docs.
  - Related: `documentation-standard`
  
- **`technical-documentation-writer`** - Specializes in API documentation, architecture guides, and developer resources with advanced formatting.
  - Related: `documentation-standard`, `api-design`
  
- **`business-documentation-writer`** - Creates business-oriented documentation including proposals, requirements, and stakeholder communications.
  - Related: `documentation-standard`, product planning processes

### Architecture & Design
- **`system-architect`** - Designs scalable system architectures using modern patterns. Recommends cloud-native solutions and best practices.
  - Related: `domain-driven-design`, `api-design`, `tech-stack` standards
  
- **`design-system-creator`** - Creates comprehensive design systems with components, tokens, and guidelines. Ensures UI consistency.
  - Related: `ui-design-guide` standard
  
- **`codebase-analyzer`** - Provides deep analysis of codebases including structure, dependencies, patterns, and improvement recommendations.
  - Related: `code-review-guide`, works with other agents

### Performance & Optimization
- **`performance-optimizer`** - Analyzes and optimizes system performance, code efficiency, and resource usage. Identifies bottlenecks.
  - Related: `best-practices`, `testing-standards`
  
- **`ux-optimizer`** - Enhances user experience through usability improvements, accessibility, and interaction design.
  - Related: `ui-design-guide`
  
- **`visual-design-enhancer`** - Improves visual design with modern aesthetics, animations, and responsive layouts.
  - Related: `ui-design-guide`

### Product & Strategy
- **`product-roadmap-planner`** - Creates detailed product roadmaps with timelines, milestones, and strategic planning.
  - Related: `plan-product`, `analyze-product` processes
  
- **`process-orchestrator`** - Manages complex development workflows by coordinating multiple agents and processes.
  - Related: All process files
  
- **`agent-orchestration-strategist`** - Develops strategies for effective multi-agent collaboration and task distribution.
  - Works with all other agents

### Creative & Business
- **`creative-brainstormer`** - Generates innovative ideas and solutions using lateral thinking and creative techniques.
  - Supports product development and problem-solving
  
- **`marketing-strategist`** - Develops marketing strategies, messaging, and go-to-market plans for products.
  - Related: Business documentation standards
  
- **`platform-redesigner`** - Redesigns platforms with modern UI/UX, improved workflows, and enhanced functionality.
  - Related: `system-architect`, `tech-stack`

## Available Processes

### Development Workflows
- **`feature-development`** - Complete workflow for developing new features from planning to deployment
- **`code-review`** - LLM-optimized code review process with automated checks and pattern detection
- **`post-deployment-automation`** - Comprehensive post-deployment automation and monitoring setup

### Product Management
- **`plan-product`** - Strategic product planning with roadmaps and milestone definitions (Command: `/plan-product`)
- **`analyze-product`** - In-depth product analysis including metrics, user feedback, and improvements (Command: `/analyze-product`)
- **`create-spec`** - Technical specification creation for features and systems (Command: `/create-spec`)
- **`execute-tasks`** - Task execution framework with progress tracking and coordination (Command: `/execute-tasks`)

## Available Standards

### Code Standards
- **`coding-standards`** - Comprehensive coding conventions across multiple languages
- **`code-style`** - Language-specific style guides and formatting rules
- **`best-practices`** - General software development best practices and patterns
- **`code-review-guide`** - LLM-optimized guide for conducting thorough code reviews

### Architecture & Design
- **`api-design`** - RESTful and GraphQL API design principles and patterns
- **`domain-driven-design`** - DDD principles, patterns, and implementation guidelines
- **`tech-stack`** - Modern technology stack recommendations and guidelines
- **`ui-design-guide`** - Comprehensive UI/UX design principles and component patterns

### Quality & Testing
- **`testing-standards`** - Comprehensive testing strategies including unit, integration, and E2E
- **`documentation-standard`** - Documentation best practices and templates

### Tools & Recommendations
- **`tool-recommendations`** - Curated list of recommended development tools and services

## Usage Examples in CLAUDE.md

### Basic Integration
```markdown
# CLAUDE.md

## Sub-Agents Reference
This project uses sub-agents from: https://github.com/lsendel/sub-agents
See full catalog: https://github.com/lsendel/sub-agents/blob/main/CLAUDE-REFERENCE.md

## Project-Specific Agent Usage
- Always use `code-reviewer` after completing features
- Use `unit-test-writer` for all new code
- Use `security-scanner` before deployments
- Use `documentation-writer` to keep docs current
```

### Advanced Integration
```markdown
# CLAUDE.md

## Development Workflow
1. **Planning**: Use `product-roadmap-planner` for feature planning
2. **Architecture**: Use `system-architect` for design decisions
3. **Implementation**: Follow `feature-development` process
4. **Testing**: Use `unit-test-writer` and `integration-test-writer`
5. **Review**: Use `code-reviewer` with `code-review` process
6. **Documentation**: Use `technical-documentation-writer`
7. **Deployment**: Follow `post-deployment-automation` process

## Standards Enforcement
- All code must pass `coding-standards` and `code-style`
- APIs must follow `api-design` standard
- Tests must meet `testing-standards` requirements
- Documentation must follow `documentation-standard`
```

## Agent Collaboration Patterns

### Bug Fix Workflow
```
1. `debugger` → Identify root cause
2. Fix implementation
3. `unit-test-writer` → Add regression tests
4. `test-runner` → Verify all tests pass
5. `code-reviewer` → Review the fix
6. `documentation-writer` → Update changelog
```

### New Feature Workflow
```
1. `product-roadmap-planner` → Define requirements
2. `system-architect` → Design solution
3. `codebase-analyzer` → Understand impact
4. Implementation
5. `unit-test-writer` + `integration-test-writer` → Full test coverage
6. `code-reviewer` → Quality check
7. `documentation-writer` → User docs
8. `technical-documentation-writer` → API docs
```

### Performance Optimization Workflow
```
1. `performance-optimizer` → Profile and identify issues
2. `code-refactorer` → Optimize code structure
3. `test-runner` → Ensure no regressions
4. `code-reviewer` → Validate changes
```

### UI/UX Enhancement Workflow
```
1. `ux-optimizer` → Identify improvements
2. `design-system-creator` → Update design system
3. `visual-design-enhancer` → Enhance aesthetics
4. Implementation
5. `test-runner` → Verify functionality
```

## Best Practices for Projects

### 1. Agent Selection Strategy
- Install only the agents relevant to your project type
- Consider your tech stack when choosing agents
- Review agent descriptions to find the best fit

### 2. Process Adoption
- Start with core processes like `feature-development`
- Customize processes to fit your team's workflow
- Document any project-specific modifications

### 3. Standards Implementation
- Choose standards that align with your tech stack
- Enforce standards through CI/CD pipelines
- Regular reviews using relevant agents

### 4. Team Collaboration
- Share installed agents across the team
- Document agent usage patterns in your CLAUDE.md
- Create custom agents for project-specific needs

## Creating Custom Agents

Custom agents are stored in `~/.claude/agents/` for global use or `.claude/agents/` for project-specific use.

```bash
# Create a new agent
claude-agents create my-custom-agent

# Validate the agent
claude-agents validate my-custom-agent

# Optimize for better auto-delegation
claude-agents optimize my-custom-agent

# Install to user scope (~/.claude/agents/)
claude-agents install my-custom-agent

# Or install to project scope (.claude/agents/)
claude-agents install my-custom-agent --project
```

## CLI Commands Reference

```bash
# Agent Management
claude-agents install [agents...]      # Install agents
claude-agents remove [agents...]       # Remove agents
claude-agents list                     # List installed agents
claude-agents info <agent>            # Show agent details
claude-agents update [agents...]      # Update agents

# Process & Standards
claude-agents sync-processes          # Sync from ~/.claude/processes/ to project
claude-agents sync-standards          # Sync from ~/.claude/standards/ to project
claude-agents sync                    # Sync all agents from ~/.claude/agents/

# Utilities
claude-agents validate [agents...]    # Validate agent quality
claude-agents optimize [agents...]    # Optimize descriptions
claude-agents migrate                 # Migrate old formats
```

## More Information

- **Repository**: https://github.com/lsendel/sub-agents
- **NPM Package**: https://www.npmjs.com/package/@lsendel/claude-agents
- **Issues**: https://github.com/lsendel/sub-agents/issues
- **Documentation**: See the `docs/` directory

---

*Last updated: 2025-07-29*
*Version: 1.3.1*
*Total Agents: 22*
*Total Processes: 7*
*Total Standards: 11*