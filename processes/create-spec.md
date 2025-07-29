---
name: create-spec
type: process
version: 2.0.0
description: Guide for creating feature specifications
author: Claude Code Team
tags: [specification, planning, features]
---

# Feature Specification Guide

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