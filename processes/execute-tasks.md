---
name: execute-tasks
type: process
version: 2.0.0
description: Guide for executing development tasks efficiently
author: Claude Code Team
tags: [execution, development, tasks]
---

# Task Execution Guide

## Process Steps

### 1. Task Selection

**Priority**: Blockers → Critical path → Familiar tasks → Quick wins
**Check**: specs/*/tasks.md for next task

### 2. Task Preparation

```bash
git pull origin main
git checkout -b feature/task-name
```

- [ ] Requirements clear?
- [ ] Dependencies available?
- [ ] Test data ready?
- [ ] Success criteria defined?

### 3. Development Workflow

#### A. Write Tests First (TDD)

```javascript
// Example: Start with a failing test
describe('Feature', () => {
  it('should do expected behavior', () => {
    // Arrange
    const input = setupTestData();
    
    // Act
    const result = featureFunction(input);
    
    // Assert
    expect(result).toEqual(expectedOutput);
  });
});
```

#### B. Implement Incrementally

1. **Simplest Working Version**: Get it working
2. **Refactor**: Improve the code
3. **Optimize**: Only if needed

#### C. Follow Project Standards

Check and follow:
- `./product/tech-stack.md` - Technology guidelines
- `./.eslintrc` or similar - Code style rules
- `./CONTRIBUTING.md` - Project conventions

### 4. Quality Checks

```bash
npm test
npm run lint
npm run type-check
npm audit
```

- [ ] Works as specified
- [ ] Tests passing
- [ ] Edge cases handled
- [ ] No performance issues
- [ ] No security risks
- [ ] Code documented

### 5. Code Submission

```bash
git add -p
git commit -m "feat: implement user authentication

- Add JWT token generation
- Create login/logout endpoints

Refs: #123"
```

**PR Template**:
- Description of changes
- Type: bug/feature/breaking
- Tests: unit/integration/manual
- Checklist: style/review/docs
- Related: #issue

### 6. Definition of Done

- [x] Code merged to main
- [x] Tests passing
- [x] Docs updated
- [x] No performance regression
- [x] Works in staging

## Common Scenarios

**Stuck?**: Rubber duck → Break down → Research → Ask team → Time box
**Bug?**: Reproduce → Document → Fix → Test → Note in PR
**Scope creep?**: Document → Discuss → Defer → Focus original

## Quick Commands

```bash
# Git
git status
git diff
git add -p
git commit -m "type: message"
git push origin branch-name
git rebase main

# Testing
npm test
npm test -- --watch
npm test -- path/to/file
npm run test:coverage

# Fixes
npm ci
rm -rf node_modules
git clean -fd
npm run db:reset
```

## Task Checklist
- [ ] Selected priority task
- [ ] No blockers
- [ ] Git pull & branch created
- [ ] Reviewed spec
- [ ] Tests written
- [ ] Committed with clear message
- [ ] PR opened
- [ ] Status updated
