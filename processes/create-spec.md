---
name: create-spec
type: process
version: 2.0.0
description: Guide for creating feature specifications
author: Claude Code Team
tags: [specification, planning, features]
---

# Feature Specification Guide

## Overview

This guide helps you create clear, actionable specifications for new features. Good specs reduce ambiguity and accelerate development.

## Prerequisites

- Product documentation exists in `./product/`
- Clear understanding of the feature requirements
- Access to product roadmap and mission

## Process Steps

### 1. Verify Feature Alignment

Before creating a spec:
- Check `./product/roadmap.md` for feature priority
- Ensure alignment with `./product/mission.md`
- Review `./product/tech-stack.md` for technical constraints

### 2. Create Spec Directory

Create a dated directory for your specification:

```bash
# Format: YYYY-MM-DD-feature-name
mkdir ./specs/2024-01-15-user-authentication
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

## Feature Spec Checklist
- [ ] Feature aligns with product mission and roadmap
- [ ] Technical constraints and dependencies identified
- [ ] Acceptance criteria are clear and testable
- [ ] User flows and edge cases described
- [ ] API changes (if any) are specified
- [ ] Security and privacy considerations noted
- [ ] Spec reviewed by at least one other team member

## Feature Spec Template
```markdown
# Feature: [Feature Name]

> Created: [DATE]
> Status: Draft | In Review | Approved
> Owner: [Name]

## Overview
Brief summary of the feature and its purpose.

## Requirements
- [ ] List of requirements

## User Stories / Flows
- As a [user], I want to [do something] so that [goal].
- ...

## Acceptance Criteria
- [ ] Criteria 1
- [ ] Criteria 2

## Technical Notes
- Stack/architecture notes
- API changes
- Data model changes

## Security & Privacy
- Considerations and mitigations

## Open Questions
- [ ] ...
```

---

*For more on planning, see [Product Planning Guide](./plan-product.md).*

## Best Practices

### Writing Good Specs

1. **Be Specific**: Avoid ambiguous language
2. **Stay Focused**: One feature per spec
3. **Think Edge Cases**: Document error scenarios
4. **Consider Scale**: Plan for growth
5. **Include Examples**: Show, don't just tell

### Common Pitfalls

- Over-engineering the solution
- Skipping user research
- Ignoring existing patterns
- Missing non-functional requirements
- Forgetting about maintenance

### Review Process

1. **Self Review**: Check completeness
2. **Technical Review**: Architecture validation
3. **Product Review**: Business alignment
4. **Team Review**: Get buy-in

## Templates

### Quick Spec Template (for small features)

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

### Decision Record Template

```markdown
## Decision: [Title]
**Date**: [DATE]
**Status**: Proposed | Accepted | Rejected

**Context**: [Why this decision is needed]
**Decision**: [What we decided]
**Consequences**: [What happens as a result]
```

## Integration Tips

- Link specs to product roadmap items
- Reference specs in pull requests
- Update specs as implementation evolves
- Archive completed specs for reference
- Use specs in sprint planning