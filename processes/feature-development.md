---
name: feature-development
type: process
version: 1.0.0
description: LLM-optimized feature development workflow with decision points and automation
author: Claude Code Team
tags: [development, features, workflow, llm-guide]
related_commands: [/plan-feature, /implement, /develop-feature]
---

# Feature Development Process for LLMs

> Version: 1.0.0
> Last updated: 2025-07-29
> Purpose: Guide LLMs through complete feature development lifecycle
> Target: Language models implementing new features or enhancements

## Context for LLM Usage

This process helps LLMs develop features systematically. When developing:
- Break large features into incremental commits
- Test as you go rather than at the end
- Document decisions and trade-offs
- Consider performance and security at each step
- Communicate progress through meaningful commit messages

## Related Standards

This process follows these standards:
- **[coding-standards.md](../standards/coding-standards.md)** - For writing consistent, quality code
- **[code-style.md](../standards/code-style.md)** - For proper code formatting
- **[testing-standards.md](../standards/testing-standards.md)** - For comprehensive test coverage
- **[best-practices.md](../standards/best-practices.md)** - For development patterns and practices
- **[documentation-standard.md](../standards/documentation-standard.md)** - For updating documentation
- **[api-design.md](../standards/api-design.md)** - When implementing API endpoints

## 1. Planning
- [ ] Gather requirements and acceptance criteria
- [ ] Create technical design
- [ ] Break into tasks with estimates
- [ ] Identify dependencies

## 2. Setup
```bash
git checkout -b feature/name
# Install dependencies
# Configure services
```

## 3. Implementation
- [ ] Code incrementally following [coding-standards.md](../standards/coding-standards.md)
- [ ] Apply [code-style.md](../standards/code-style.md) formatting rules
- [ ] Follow patterns from [best-practices.md](../standards/best-practices.md)
- [ ] Regular commits with meaningful messages
- [ ] Write tests alongside code per [testing-standards.md](../standards/testing-standards.md)

## 4. Testing
- [ ] Unit tests with edge cases
- [ ] Integration tests
- [ ] Manual testing
- [ ] Verify acceptance criteria

## 5. Review & Documentation
- [ ] Create PR with description
- [ ] CI/CD passes
- [ ] Address feedback
- [ ] Update docs and changelog

## 6. Deployment

**Pre-deploy**:
- [ ] Review checklist
- [ ] Prepare rollback plan
- [ ] Notify stakeholders

**Deploy**:
- [ ] Staging first
- [ ] Verify staging
- [ ] Production deploy
- [ ] Monitor logs/metrics

## Best Practices
- Small, focused changes
- Deploy frequently
- Clear communication
- TDD when possible
- Feature flags for rollout
- Monitor and rollback ready

## Feature Checklist

**Before Starting**:
- [ ] Requirements clear
- [ ] Design reviewed
- [ ] Environment ready

**During Development**:
- [ ] Following standards
- [ ] Tests passing
- [ ] Regular commits

**Before Deploy**:
- [ ] All tests pass
- [ ] Code reviewed
- [ ] Docs updated
- [ ] Staging tested
- [ ] Rollback ready
