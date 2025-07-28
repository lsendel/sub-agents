# Process & Standards Management Guide

## Overview

Claude Sub-Agents Manager now supports managing development processes and coding standards alongside AI agents. This feature allows teams to maintain consistent practices across projects by syncing shared processes and standards.

## Directory Structure

```
~/.claude/
├── agents/          # AI agents
├── processes/       # Development processes
└── standards/       # Coding standards

.claude/             # Project-specific versions
├── agents/
├── processes/
└── standards/
```

## Process Management

### What are Processes?

Processes are documented workflows that guide development activities. They ensure consistency and quality across projects and teams.

### Process File Format

Process files are markdown documents with YAML frontmatter:

```markdown
---
name: code-review
type: process
version: 1.0.0
description: Standard code review process for ensuring quality and consistency
author: Claude Code Team
tags: [review, quality, best-practices]
related_commands: [/review, /check-code]
dependencies: []
---

# Code Review Process

## Overview
[Process description...]

## Steps
[Detailed steps...]

## Checklist
[Checklist items...]
```

### Required Fields

- `name`: Unique identifier for the process
- `type`: Must be "process"
- `version`: Semantic version (e.g., 1.0.0)
- `description`: Clear, concise description

### Optional Fields

- `author`: Process creator
- `tags`: Array of categorization tags
- `related_commands`: Related Claude commands
- `dependencies`: Other processes this depends on

### Example Processes

1. **code-review.md** - Code review workflow
2. **feature-development.md** - Feature development lifecycle
3. **bug-fixing.md** - Bug resolution process
4. **release-process.md** - Release management workflow
5. **incident-response.md** - Production incident handling

### Syncing Processes

```bash
# Sync all processes from ~/.claude/processes
claude-agents sync-processes

# Force copy all processes to project
claude-agents sync-processes --force-copy

# Using Make
make sync-processes
```

## Standards Management

### What are Standards?

Standards are documented guidelines and best practices that ensure code quality and consistency. They cover coding conventions, architectural patterns, and technical requirements.

### Standards File Format

Standards files follow the same format as processes:

```markdown
---
name: api-design
type: standard
version: 1.0.0
description: RESTful API design standards
author: Claude Code Team
tags: [api, rest, design, standards]
related_commands: [/design-api, /api-review]
---

# API Design Standards

## Overview
[Standards description...]

## Guidelines
[Detailed guidelines...]

## Examples
[Code examples...]
```

### Required Fields

- `name`: Unique identifier for the standard
- `type`: Must be "standard"
- `version`: Semantic version
- `description`: Clear description

### Example Standards

1. **coding-standards.md** - General coding conventions
2. **api-design.md** - REST API design patterns
3. **database-schema.md** - Database design standards
4. **security-standards.md** - Security best practices
5. **testing-standards.md** - Testing requirements

### Syncing Standards

```bash
# Sync all standards from ~/.claude/standards
claude-agents sync-standards

# Force copy all standards to project
claude-agents sync-standards --force-copy

# Using Make
make sync-standards
```

## Configuration Files

### Process Configuration (.claude-processes.json)

```json
{
  "version": "1.0.0",
  "processes": {
    "code-review": {
      "version": "1.0.0",
      "installedAt": "2024-01-20T10:00:00Z",
      "installedFrom": "/Users/you/.claude/processes/code-review.md",
      "type": "process",
      "description": "Standard code review process"
    }
  },
  "lastSync": "2024-01-20T10:00:00Z"
}
```

### Standards Configuration (.claude-standards.json)

```json
{
  "version": "1.0.0",
  "standards": {
    "api-design": {
      "version": "1.0.0",
      "installedAt": "2024-01-20T10:00:00Z",
      "installedFrom": "/Users/you/.claude/standards/api-design.md",
      "type": "standard",
      "description": "RESTful API design standards"
    }
  },
  "lastSync": "2024-01-20T10:00:00Z"
}
```

## Using Processes & Standards in Claude Code

### Referencing in Conversations

Once synced to your project, you can reference processes and standards in Claude Code conversations:

```
User: "Follow our code review process for the recent changes"
Claude: *References the synced code-review.md process*

User: "Make sure the API follows our standards"
Claude: *References the synced api-design.md standard*
```

### Benefits

1. **Consistency**: Ensure all team members follow the same practices
2. **Version Control**: Track changes to processes and standards
3. **Sharing**: Easy distribution across projects and teams
4. **Integration**: Seamless reference in Claude Code conversations
5. **Customization**: Project-specific overrides when needed

## Best Practices

### Creating Processes

1. **Be Specific**: Include concrete steps and examples
2. **Use Checklists**: Make processes actionable
3. **Include Context**: Explain why each step matters
4. **Version Appropriately**: Use semantic versioning
5. **Tag Effectively**: Use consistent tags for discovery

### Creating Standards

1. **Show Examples**: Include good and bad examples
2. **Explain Rationale**: Document why standards exist
3. **Be Practical**: Focus on enforceable guidelines
4. **Allow Exceptions**: Document when to deviate
5. **Keep Updated**: Review and update regularly

### Organization Tips

1. **Naming Convention**: Use descriptive, hyphenated names
2. **Categorization**: Use tags for grouping related items
3. **Dependencies**: Document inter-dependencies
4. **Versioning**: Increment versions for significant changes
5. **Documentation**: Include comprehensive descriptions

## Troubleshooting

### Processes/Standards Not Syncing

1. Check directory exists: `ls ~/.claude/processes`
2. Verify file format: Must have valid YAML frontmatter
3. Check permissions: Ensure read access
4. Run with debug: `LOG_LEVEL=DEBUG claude-agents sync-processes`

### YAML Parsing Errors

The custom YAML parser supports Claude Code's format, but ensure:
- Proper indentation (2 spaces)
- Valid field names
- Quoted strings where needed
- No special characters in unquoted strings

### Configuration Issues

- Config files are in home directory by default
- Use `--project` flag for project-specific configs
- Check `.gitignore` includes config files
- Manually edit JSON files if needed

## Advanced Usage

### Custom Process Templates

Create a template for consistent process creation:

```bash
# Create template
cat > ~/.claude/templates/process-template.md << 'EOF'
---
name: template-name
type: process
version: 1.0.0
description: Template description
author: Your Name
tags: [template]
---

# Process Name

## Overview

## Prerequisites

## Steps

## Verification

## Troubleshooting
EOF
```

### Bulk Operations

```bash
# Sync everything at once
claude-agents sync --force-copy && \
claude-agents sync-processes --force-copy && \
claude-agents sync-standards --force-copy

# Or use Make
make sync-all
```

### Integration with CI/CD

```yaml
# .github/workflows/standards-check.yml
name: Standards Check
on: [pull_request]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install claude-agents
        run: npm install -g claude-agents
      - name: Sync standards
        run: claude-agents sync-standards
      - name: Validate standards compliance
        run: |
          # Custom validation script
          ./scripts/check-standards.sh
```

## Future Enhancements

Planned features for process and standards management:

1. **Templates Library**: Pre-built process and standards templates
2. **Validation Rules**: Automated compliance checking
3. **Metrics Tracking**: Process adoption and effectiveness metrics
4. **Team Sharing**: Easy sharing across organizations
5. **Claude Integration**: Direct process execution in Claude Code

## Related Documentation

- [README.md](../README.md) - Main documentation
- [CLAUDE.md](../CLAUDE.md) - Claude Code integration guide
- [SYNC_PROCESS.md](./SYNC_PROCESS.md) - Agent sync documentation