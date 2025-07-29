---
name: analyze-product
type: process
version: 2.0.0
description: Guide for analyzing existing codebases and creating product documentation
author: Claude Code Team
tags: [analysis, documentation, existing-projects]
---

# Product Analysis Guide

## Process Steps

### 1. Initial Codebase Analysis

```bash
# Project structure
tree -L 2 -I 'node_modules|vendor|.git'
find . -type f -name "*.js" -o -name "*.py" -o -name "*.java" | wc -l
ls -la *.json *.yml *.toml Makefile Dockerfile
```

**Check**: package.json, requirements.txt, pom.xml, go.mod, migrations, Docker/K8s configs
**Review**: completed features, test coverage, branches, TODOs

### 2. Gather Product Context

**Key Questions**:
1. What problem does this product solve?
2. Who are the target users?
3. What makes this solution unique?
4. What are the main features?
5. What's the business model?

**Check**: README.md, wikis, issues, commits, code comments

### 3. Create Product Documentation

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

## Analysis Commands

```bash
# Code quality
npm run lint && npm audit && npm test -- --coverage
pylint **/*.py && pytest --cov && safety check
mvn checkstyle:check && mvn test && mvn dependency:analyze

# Feature discovery
find . -name "*.jsx" -o -name "*.tsx" | grep -E "(Page|Screen|View)"
grep -r "router\." --include="*.js"
grep -r "@GetMapping\|@PostMapping" --include="*.java"
find . -path "*/migrations/*" -o -path "*/migrate/*"
```

**Architecture**: Entry points → Routes → Models → Business logic → Integrations

## Checklist

- [ ] Product purpose and target users documented
- [ ] Feature list (built vs planned)
- [ ] Tech stack inventory
- [ ] Architecture overview
- [ ] Setup guide
- [ ] Known issues and technical debt
- [ ] Roadmap and priorities

## Tools

- **Analysis**: cloc, dependency-check, SonarQube, GitStats
- **Visualization**: PlantUML, Madge, Pyreverse
- **Documentation**: JSDoc, Sphinx, Javadoc, Swagger

## Analysis Summary Template

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
