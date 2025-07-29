---
name: feature-development
type: process
version: 1.0.0
description: Standard process for developing new features from planning to deployment
author: Claude Code Team
tags: [development, features, workflow]
related_commands: [/plan-feature, /implement]
---

# Feature Development Process

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
- [ ] Code incrementally
- [ ] Follow standards
- [ ] Regular commits
- [ ] Write tests alongside code

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
