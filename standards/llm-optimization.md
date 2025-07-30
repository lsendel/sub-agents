---
name: llm-optimization
type: standard
version: 1.0.0
description: Guidelines for optimizing content, agents, and documentation for LLM parsing and understanding
author: Claude
tags: [llm, ai, agents, optimization, documentation]
related_commands: [/optimize, /validate]
---

# LLM Optimization Standard

This standard defines best practices for creating content that is optimally readable and actionable by Large Language Models (LLMs), particularly for Claude Code agents and similar AI systems.

## Agent Description Optimization

### 1. Action-Oriented Keywords
**Use specific verbs that trigger appropriate agent selection:**

```yaml
# Good - Specific actions
description: Writes unit tests, creates test suites, mocks dependencies, generates fixtures, implements assertions

# Bad - Vague descriptions  
description: Helps with testing and quality assurance
```

### 2. Technology Mentions
**Include specific technologies, frameworks, and tools:**

```yaml
# Good - Specific technologies
description: Builds React components, manages Redux state, implements TypeScript interfaces, optimizes webpack bundles

# Bad - Generic terms
description: Works with frontend technologies
```

### 3. Problem-Solution Mapping
**Connect problems to solutions:**

```yaml
# Good - Clear problem-solution pairs
description: Fixes memory leaks, optimizes database queries, reduces API latency, improves render performance

# Bad - Only outcomes
description: Makes applications faster
```

## Agent Prompt Structure

### 1. Clear Section Headers
Use markdown headers to organize content:

```markdown
## Core Expertise
[List specific skills]

## Technologies
[List frameworks and tools]

## Common Tasks
[List typical use cases]

## Best Practices
[Define standards]
```

### 2. Example-Driven Documentation
Provide concrete examples with clear before/after patterns:

```markdown
### Before: Inefficient Code
```language
// Show problematic code
```

### After: Optimized Code  
```language
// Show improved version
```

### Why This Works
- Explanation of improvements
- Performance impact
- When to apply
```

### 3. Structured Output Templates
Define clear output formats:

```markdown
## Output Format
```
🔍 ANALYSIS COMPLETE
━━━━━━━━━━━━━━━━━━
✅ Issues Found: X
🔧 Fixes Applied: Y
⚡ Performance Gain: Z%

Details:
1. [Specific issue and fix]
2. [Specific issue and fix]
```
```

## Cross-Reference Patterns

### 1. Agent References
Link related agents using consistent format:

```yaml
## Related Resources
- Agent: `security-scanner` - Security vulnerability detection
- Agent: `code-reviewer` - Code quality analysis
- Agent: `test-writer` - Test generation
```

### 2. Standard References
Link to relevant standards:

```yaml
## Related Resources  
- Standard: `best-practices` - General coding guidelines
- Standard: `testing-standards` - Test implementation rules
- Process: `code-review` - Review workflow
```

### 3. Contextual Hints
Provide context for when to use other agents:

```markdown
## When to Use Other Agents
- If you need security analysis, use `security-scanner`
- For test creation after implementation, use `unit-test-writer`
- For deployment after development, use `devops-engineer`
```

## Metadata Best Practices

### 1. Frontmatter Structure
Consistent YAML frontmatter:

```yaml
---
name: agent-name
description: Action verb phrases, specific technologies, problem domains
tools: Read, Write, Edit, MultiEdit, Grep, Glob, Bash
version: 1.0.0
author: Creator name
tags: [relevant, searchable, terms]
---
```

### 2. Description Formula
Follow this pattern for descriptions:

```
[Action verbs], [specific tasks], [technologies used], [problems solved]. Use for [primary use cases], [secondary use cases].
```

Example:
```yaml
description: Refactors code structure, extracts methods, applies design patterns, modernizes syntax, improves readability. Use for code cleanup, technical debt reduction, maintainability improvements.
```

## Content Optimization Rules

### 1. Keyword Density
- Include 5-10 action verbs in descriptions
- Mention 3-5 specific technologies
- List 3-5 common problems/solutions

### 2. Semantic Clarity
- Use industry-standard terminology
- Avoid ambiguous terms
- Include common synonyms

### 3. Hierarchical Information
Structure information from general to specific:

```markdown
## Overview
High-level purpose and capabilities

### Core Features
Main functionalities

#### Specific Examples
Detailed implementations
```

## LLM-Friendly Patterns

### 1. Bullet Point Lists
Use for scannable information:

```markdown
### Key Capabilities
- **Performance**: Optimize queries, reduce latency
- **Security**: Scan vulnerabilities, fix exposures  
- **Quality**: Improve readability, reduce complexity
```

### 2. Code Block Annotations
Label code blocks clearly:

```markdown
```python
# File: user_service.py
# Purpose: User authentication service
# Dependencies: FastAPI, SQLAlchemy

async def authenticate_user(credentials: UserCredentials) -> User:
    # Implementation details
```
```

### 3. Decision Trees
Help LLMs make routing decisions:

```markdown
## When to Use This Agent
- ✅ Writing new Python code
- ✅ Implementing Django views
- ✅ Creating async functions
- ❌ Frontend JavaScript (use `javascript-specialist`)
- ❌ Database design (use `database-architect`)
```

## Validation Checklist

Before finalizing any agent or documentation:

- [ ] Description includes 5+ action verbs
- [ ] Specific technologies are mentioned
- [ ] Clear use cases are provided
- [ ] Examples demonstrate capabilities
- [ ] Cross-references to related agents exist
- [ ] Output format is defined
- [ ] Common tasks are listed
- [ ] Best practices are included

## Anti-Patterns to Avoid

### 1. Vague Descriptions
❌ "Helps with development tasks"
✅ "Writes REST APIs, implements authentication, creates database models"

### 2. Missing Context
❌ "Optimizes code"
✅ "Optimizes code by reducing complexity, improving algorithms, implementing caching"

### 3. No Examples
❌ Abstract explanations only
✅ Concrete before/after code examples

### 4. Unclear Scope
❌ "Does everything related to testing"
✅ "Creates unit tests, mocks dependencies, writes assertions"

## Continuous Improvement

### Regular Review
- Analyze agent usage patterns
- Update descriptions based on common queries
- Add new examples from real usage
- Refine keyword lists

### Feedback Integration
- Monitor which agents are selected incorrectly
- Adjust descriptions to improve routing
- Add disambiguation hints
- Update cross-references

Remember: The goal is to make content that helps LLMs understand exactly what each agent does and when to use it. Clear, specific, and example-driven content leads to better agent selection and task execution.