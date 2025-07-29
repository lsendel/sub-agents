---
name: create-spec
type: process
version: 2.0.0
description: LLM-optimized template for creating detailed feature specifications with examples
author: Claude Code Team
tags: [specification, planning, features, llm-guide]
related_commands: [/create-spec, /plan-feature]
---

# Feature Specification Guide for LLMs

> Version: 2.0.0
> Last updated: 2025-07-29
> Purpose: Enable LLMs to create comprehensive, actionable feature specifications
> Target: Language models planning new features or enhancements

## Context for LLM Usage

This guide helps LLMs create specifications that bridge business requirements and technical implementation. When creating specs:
- Extract both explicit and implicit requirements
- Define clear acceptance criteria
- Include edge cases and error scenarios
- Provide mockups or examples where helpful
- Consider performance and security implications

## Related Standards

Reference these standards when creating specifications:
- **[documentation-standard.md](../standards/documentation-standard.md)** - For specification format and structure
- **[api-design.md](../standards/api-design.md)** - When designing API endpoints
- **[domain-driven-design.md](../standards/domain-driven-design.md)** - For domain modeling and bounded contexts
- **[ui-design-guide.md](../standards/ui-design-guide.md)** - For UI/UX specifications
- **[testing-standards.md](../standards/testing-standards.md)** - For defining test scenarios

## Process Steps

### 1. Verify Alignment
- Check `./product/roadmap.md` for priority
- Ensure alignment with `./product/mission.md`
- Review `./product/tech-stack.md` for constraints

### 2. Create Spec Directory
```bash
mkdir ./specs/YYYY-MM-DD-feature-name
```

### 3. Write Feature Specification

Create `./specs/YYYY-MM-DD-feature-name/spec.md`:

```markdown
# Feature: [Feature Name]

> Created: [DATE]
> Status: Draft | In Review | Approved
> Owner: [Name]

## Summary

[One paragraph describing what this feature does and why it's needed]

## Goals

- [Primary goal]
- [Secondary goal]
- [Success metric]

## User Stories

### As a [user type]
I want to [action]
So that [benefit]

**Acceptance Criteria:**
- [ ] [Specific testable criterion]
- [ ] [Another criterion]

## Technical Design

### Architecture
[High-level design approach]

### Components
- **[Component Name]**: [Responsibility]
- **[Component Name]**: [Responsibility]

### API Endpoints (if applicable)
```
POST /api/[resource]
GET  /api/[resource]/{id}
```

### Database Changes (if applicable)
```sql
-- New tables or modifications
```

## Implementation Plan

### Phase 1: [Name] (X days)
- [ ] [Task 1]
- [ ] [Task 2]

### Phase 2: [Name] (Y days)
- [ ] [Task 1]
- [ ] [Task 2]

## Dependencies

- [External service or library]
- [Other feature that must be complete]

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| [Risk description] | High/Med/Low | [How to handle] |

## Open Questions

- [ ] [Question needing resolution]
- [ ] [Design decision to be made]
```

### 4. Create Technical Specification

For complex features, add `./specs/YYYY-MM-DD-feature-name/technical.md`:

```markdown
# Technical Specification: [Feature Name]

## Architecture Details

### System Design
[Detailed architecture description]

### Data Flow
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Security Considerations
- [Authentication approach]
- [Authorization rules]
- [Data protection]

### Performance Requirements
- Response time: < X ms
- Throughput: Y requests/second
- Storage: Z GB

### Testing Strategy
- Unit tests for [components]
- Integration tests for [workflows]
- Performance tests for [scenarios]
```

### 5. Create Task Breakdown

Create `./specs/YYYY-MM-DD-feature-name/tasks.md`:

```markdown
# Tasks: [Feature Name]

## Development Tasks

### Backend Tasks
- [ ] Create database migrations
- [ ] Implement API endpoints
- [ ] Add authentication middleware
- [ ] Write unit tests

### Frontend Tasks
- [ ] Design UI components
- [ ] Implement state management
- [ ] Connect to API
- [ ] Add form validation

### Infrastructure Tasks
- [ ] Update CI/CD pipeline
- [ ] Configure monitoring
- [ ] Set up feature flags

## Timeline

| Task | Assignee | Estimate | Status |
|------|----------|----------|--------|
| [Task name] | [Person] | 2 days | Not Started |

## Definition of Done

- [ ] Code reviewed and approved
- [ ] Tests passing (>80% coverage)
- [ ] Documentation updated
- [ ] Deployed to staging
- [ ] Product owner approval
```

## Spec Checklist
- [ ] Aligns with mission and roadmap
- [ ] Technical constraints identified
- [ ] Clear acceptance criteria
- [ ] User flows documented
- [ ] API changes specified
- [ ] Security considerations noted
- [ ] Peer reviewed

## Quick Spec Template

```markdown
# Quick Spec: [Feature]

**What**: [One sentence description]
**Why**: [Business value]
**How**: [Technical approach]
**When**: [Timeline]
**Who**: [Owner]

## Tasks
- [ ] [Task 1]
- [ ] [Task 2]
```

## Decision Record Template

```markdown
## Decision: [Title]
**Date**: [DATE]
**Status**: Proposed | Accepted | Rejected

**Context**: [Why this decision is needed]
**Decision**: [What we decided]
**Consequences**: [What happens as a result]
```