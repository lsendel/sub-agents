---
name: analyze-product
type: process
version: 2.0.0
description: Guide for analyzing existing codebases and creating product documentation
author: Claude Code Team
tags: [analysis, documentation, existing-projects]
---

# Product Analysis Guide

## Overview

This guide helps you analyze an existing codebase and create comprehensive product documentation. It's designed for projects that already have code but lack proper documentation.

## Prerequisites

- Access to the existing codebase
- Understanding of the project's purpose
- Ability to run the project locally (preferred)

## Process Steps

### 1. Initial Codebase Analysis

Start by understanding what you're working with:

#### Project Structure Analysis
```bash
# Get high-level view
tree -L 2 -I 'node_modules|vendor|.git'

# Check language distribution
find . -type f -name "*.js" -o -name "*.py" -o -name "*.java" | wc -l

# Review key configuration files
ls -la *.json *.yml *.toml Makefile Dockerfile
```

#### Technology Stack Detection
- **Package Managers**: package.json, requirements.txt, pom.xml, go.mod
- **Frameworks**: Look for framework-specific files
- **Database**: Check for migrations, schema files
- **Infrastructure**: Docker, Kubernetes, CI/CD configs

#### Implementation Progress
- Review completed features vs planned
- Check test coverage
- Identify work in progress (branches, TODOs)

### 2. Gather Product Context

Interview stakeholders or review existing materials:

**Key Questions**:
1. What problem does this product solve?
2. Who are the target users?
3. What makes this solution unique?
4. What are the main features?
5. What's the business model?

**Sources to Check**:
- README.md files
- Wiki or documentation
- Issue tracker
- Commit messages
- Comments in code

### 3. Create Product Documentation

Based on your analysis, create the same structure as new products:

```
product/
├── mission.md      # Product vision (from analysis)
├── tech-stack.md   # Detected technologies
├── roadmap.md      # Completed + planned features
└── decisions.md    # Architectural decisions found
```

#### Mission Documentation Template

```markdown
# Product Mission

> Last Updated: [DATE]
> Version: 1.0.0
> Status: Existing Product Analysis

## Executive Summary

Based on analysis of the codebase, [Product] is a [type] that [purpose].

## Detected Features

### Implemented
- [Feature 1]: [Status and description]
- [Feature 2]: [Status and description]

### In Progress
- [Feature]: [Branch/PR reference]

### Planned (from TODOs/Issues)
- [Feature]: [Reference]

## Technology Analysis

### Current Stack
- **Frontend**: [Detected framework and version]
- **Backend**: [Detected language and framework]
- **Database**: [Type and version]
- **Infrastructure**: [Hosting/deployment method]

### Code Patterns Observed
- Architecture: [MVC, microservices, etc.]
- Testing: [Framework and coverage]
- Code Style: [Standards observed]

## User Base (Inferred)

Based on features and UI/UX:
- **Primary Users**: [Best guess from analysis]
- **Use Cases**: [Observed from features]
```

### 4. Document Technical Findings

Create detailed technical documentation:

#### Tech Stack Template

```markdown
# Technical Architecture

> Last Updated: [DATE]
> Version: 1.0.0
> Source: Codebase Analysis

## Detected Technologies

### Core Stack
[List all detected technologies with versions]

### Dependencies
[Major libraries and their purposes]

### Development Setup
[Inferred from config files]

### Architecture Patterns
- **Pattern**: [What you observed]
- **Implementation**: [How it's done]
- **Rationale**: [Why, if apparent]

## Recommendations

### Technical Debt
- [Issue 1]: [Impact and suggested fix]
- [Issue 2]: [Impact and suggested fix]

### Modernization Opportunities
- [Suggestion 1]: [Benefit]
- [Suggestion 2]: [Benefit]
```

### 5. Create Development Roadmap

Based on code analysis and issues:

```markdown
# Development Roadmap

> Last Updated: [DATE]
> Version: 1.0.0
> Source: Codebase and Issue Analysis

## Current State

### Completed Features
- ✅ [Feature]: [Version/Date if known]
- ✅ [Feature]: [Version/Date if known]

### In Development
- 🚧 [Feature]: [Branch/Developer]
- 🚧 [Feature]: [Status]

### Backlog (from issues/TODOs)
- 📋 [Feature]: [Priority/Issue #]
- 📋 [Feature]: [Priority/Issue #]

## Recommended Phases

### Phase 1: Stabilization
- Fix critical bugs
- Add missing tests
- Update documentation

### Phase 2: Enhancement
- [Based on issue priorities]

### Phase 3: Scaling
- [Performance improvements]
- [Architecture updates]
```

## Analysis Techniques

### Code Quality Assessment

```bash
# JavaScript/TypeScript
npm run lint
npm audit
npm test -- --coverage

# Python
pylint **/*.py
pytest --cov
safety check

# Java
mvn checkstyle:check
mvn test
mvn dependency:analyze
```

### Architecture Discovery

1. **Entry Points**: Find main() or index files
2. **Route Definitions**: API endpoints, URL patterns
3. **Data Models**: Database schemas, ORM models
4. **Business Logic**: Service/domain layers
5. **External Integrations**: API clients, webhooks

### Feature Inventory

```bash
# Find UI components (React example)
find . -name "*.jsx" -o -name "*.tsx" | grep -E "(Page|Screen|View)"

# Find API endpoints
grep -r "router\." --include="*.js"
grep -r "@GetMapping\|@PostMapping" --include="*.java"

# Find database migrations
find . -path "*/migrations/*" -o -path "*/migrate/*"
```

## Documentation Checklist

After analysis, ensure you've documented:

- [ ] **Product Purpose**: Clear problem statement
- [ ] **Target Users**: Who uses this and why
- [ ] **Feature List**: What's built vs planned
- [ ] **Tech Stack**: Complete technology inventory
- [ ] **Architecture**: How components fit together
- [ ] **Setup Guide**: How to run locally
- [ ] **Known Issues**: Bugs and technical debt
- [ ] **Roadmap**: Next steps and priorities

## Best Practices

### During Analysis

1. **Take Notes**: Document findings as you go
2. **Run the Code**: Nothing beats seeing it work
3. **Read Tests**: They document expected behavior
4. **Check History**: Git log reveals evolution
5. **Ask Questions**: When in doubt, ask the team

### Common Pitfalls

- Assuming without verifying
- Missing undocumented features
- Overlooking technical debt
- Ignoring deployment complexity
- Misunderstanding the user base

### Deliverables

1. **Product Documentation**: The four standard files
2. **Setup Guide**: How to run the project
3. **Architecture Diagram**: Visual representation
4. **Recommendations**: Improvements and fixes
5. **Questions List**: Things needing clarification

## Tools for Analysis

### Code Analysis
- **cloc**: Count lines of code by language
- **dependency-check**: Security vulnerabilities
- **SonarQube**: Code quality metrics
- **GitStats**: Repository statistics

### Visualization
- **PlantUML**: Generate diagrams from code
- **Madge**: JavaScript dependency graphs
- **Pyreverse**: Python UML diagrams
- **Maven Dependency Plugin**: Java dependencies

### Documentation
- **JSDoc/TypeDoc**: Generate from comments
- **Sphinx**: Python documentation
- **Javadoc**: Java documentation
- **Swagger/OpenAPI**: API documentation

## Integration Tips

After creating documentation:

1. Share with team for validation
2. Set up regular updates
3. Link to existing wikis/docs
4. Create onboarding guide
5. Plan documentation maintenance

## Checklist

- [ ] Access codebase and run locally
- [ ] Review project structure and key files
- [ ] Identify tech stack and dependencies
- [ ] Assess implementation progress and test coverage
- [ ] Interview stakeholders (if possible)
- [ ] Map user flows and main use cases
- [ ] Identify risks and technical debt
- [ ] Document findings in a summary report

## Stakeholder Interviews (Optional)
- List key stakeholders and schedule short interviews
- Gather insights on pain points, goals, and future plans

## User Flows & Use Cases
- Diagram main user flows (tools: draw.io, Miro, etc.)
- List primary use cases and edge cases

## Risk & Technical Debt Identification
- Note areas with high complexity or lack of tests
- List known issues, TODOs, and blockers

## Documentation Template

```markdown
# Product Analysis Summary

## Project Overview
- Purpose:
- Main Features:
- Tech Stack:

## Key Findings
- Strengths:
- Weaknesses:
- Risks:
- Recommendations:

## Next Steps
- [ ] ...
```
