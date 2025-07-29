---
name: plan-product
type: process
version: 2.0.0
description: Guide for planning and documenting new products
author: Claude Code Team
tags: [planning, documentation, product-management]
---

# Product Planning Guide

## Process Steps

### 1. Gather Information

**Required**:
- Product vision (1-2 sentences)
- 3+ key features
- Target users and needs
- Tech stack choice

**Key Questions**:
1. What problem does this solve?
2. Top 3-5 features?
3. Target users and pain points?
4. Technology choices?
5. Project initialized?

### 2. Create Documentation Structure

Create a `product/` directory in your project root with these files:

```
product/
├── mission.md      # Product vision and purpose
├── tech-stack.md   # Technical architecture
├── roadmap.md      # Development phases
└── decisions.md    # Important decisions log
```

### 3. Document Product Mission

Create `product/mission.md` with this structure:

```markdown
# Product Mission

> Last Updated: [DATE]
> Version: 1.0.0

## Elevator Pitch

[Product] is a [type] that helps [users] [solve problem] by [unique value].

## Target Users

### Primary Users
- **[User Type]**: [Description of needs and context]
- **[User Type]**: [Description of needs and context]

### User Personas

**[Persona Name]** - [Role]
- **Context**: [Their situation]
- **Pain Points**: [What frustrates them]
- **Goals**: [What they want to achieve]

## Problem Statement

### [Problem Title]
[Clear description of the problem and its impact]

**Our Solution**: [How we solve it differently]

## Key Features

1. **[Feature Name]**: [Description and value]
2. **[Feature Name]**: [Description and value]
3. **[Feature Name]**: [Description and value]

## Success Metrics

- [Metric 1]: [Target and measurement method]
- [Metric 2]: [Target and measurement method]
```

### 4. Define Technical Architecture

Create `product/tech-stack.md`:

```markdown
# Technical Architecture

> Last Updated: [DATE]
> Version: 1.0.0

## Technology Stack

### Frontend
- **Framework**: [e.g., React, Vue, Angular]
- **Styling**: [e.g., Tailwind, CSS Modules]
- **State Management**: [e.g., Redux, Context API]

### Backend
- **Language**: [e.g., Java, Node.js, Python]
- **Framework**: [e.g., Spring Boot, Express, Django]
- **Database**: [e.g., PostgreSQL, MongoDB]

### Infrastructure
- **Hosting**: [e.g., AWS, Vercel, Heroku]
- **CI/CD**: [e.g., GitHub Actions, CircleCI]
- **Monitoring**: [e.g., Sentry, DataDog]

## Architecture Decisions

### [Decision Area]
- **Choice**: [What was chosen]
- **Rationale**: [Why this choice]
- **Trade-offs**: [What we gave up]

## Development Setup

1. [Step-by-step setup instructions]
2. [Environment variables needed]
3. [How to run locally]
```

### 5. Create Development Roadmap

Create `product/roadmap.md`:

```markdown
# Development Roadmap

> Last Updated: [DATE]
> Version: 1.0.0

## Phases Overview

### Phase 1: MVP (Weeks 1-4)
**Goal**: Basic working version with core features

- [ ] [Feature/Task 1]
- [ ] [Feature/Task 2]
- [ ] [Feature/Task 3]

### Phase 2: Enhancement (Weeks 5-8)
**Goal**: Improve user experience and add key features

- [ ] [Feature/Task 1]
- [ ] [Feature/Task 2]

### Phase 3: Scale (Weeks 9-12)
**Goal**: Prepare for growth

- [ ] [Feature/Task 1]
- [ ] [Feature/Task 2]

## Current Status

- **Phase**: [Current phase]
- **Progress**: [X of Y tasks complete]
- **Blockers**: [Any current blockers]
- **Next Steps**: [Immediate priorities]
```

### 6. Track Decisions

Create `product/decisions.md`:

```markdown
# Decision Log

> Last Updated: [DATE]
> Version: 1.0.0

## Decision Template

### [Date] - [Decision Title]
- **Context**: [Why this decision was needed]
- **Decision**: [What was decided]
- **Rationale**: [Key reasons]
- **Consequences**: [Expected impact]
- **Alternatives Considered**: [Other options evaluated]

---

## Decisions

### 2024-01-15 - Choose React for Frontend
- **Context**: Need to select frontend framework
- **Decision**: Use React with TypeScript
- **Rationale**: Team expertise, ecosystem, type safety
- **Consequences**: Faster development, better maintainability
- **Alternatives Considered**: Vue.js, Angular, Svelte
```

## Planning Checklist
- [ ] Vision defined
- [ ] Features identified
- [ ] Users documented
- [ ] Tech stack chosen
- [ ] product/ created
- [ ] Roadmap established
- [ ] Peer reviewed

## Best Practices
- Keep it simple and specific
- Update as decisions change
- Document the "why"
- Version control docs with code
- Start with problem, not solution
- Review quarterly