---
name: execute-tasks
type: process
version: 2.0.0
description: Guide for executing development tasks efficiently
author: Claude Code Team
tags: [execution, development, tasks]
---

# Task Execution Guide

## Overview

This guide helps you execute development tasks systematically, ensuring quality and maintaining project momentum.

## Prerequisites

- Specification document exists in `./specs/`
- Development environment is configured
- Git repository is initialized
- Understanding of the feature requirements

## Process Steps

### 1. Task Selection

**Default Approach**: Work on the next incomplete task from the spec

**Questions to Answer**:
- What task should I work on? (check spec's tasks.md)
- Are there any blockers?
- Do I have all necessary information?

**Priority Order**:
1. Blockers for other team members
2. Critical path tasks
3. Tasks you're already familiar with
4. Quick wins (< 2 hours)

### 2. Task Preparation

Before starting development:

```bash
# 1. Ensure you're on the latest code
git pull origin main

# 2. Create a feature branch
git checkout -b feature/task-name

# 3. Review related documentation
cat ./specs/*/tasks.md | grep -A5 "task-name"
```

**Review Checklist**:
- [ ] Spec requirements clear?
- [ ] Dependencies available?
- [ ] Test data prepared?
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

### 4. Quality Assurance

#### Self-Review Checklist

- [ ] **Functionality**: Does it work as specified?
- [ ] **Tests**: Are all tests passing?
- [ ] **Edge Cases**: Handled errors and boundaries?
- [ ] **Performance**: No obvious bottlenecks?
- [ ] **Security**: No exposed sensitive data?
- [ ] **Documentation**: Code comments where needed?

#### Running Checks

```bash
# Run tests
npm test

# Check code style
npm run lint

# Type checking (if applicable)
npm run type-check

# Security audit
npm audit
```

### 5. Code Submission

#### Commit Guidelines

```bash
# Stage changes
git add -p  # Review each change

# Commit with descriptive message
git commit -m "feat: implement user authentication

- Add JWT token generation
- Create login/logout endpoints
- Add session management
- Include rate limiting

Refs: #123"
```

#### Pull Request Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console.logs or debug code

## Related Issues
Closes #123
```

### 6. Task Completion

#### Definition of Done

A task is complete when:
1. ✅ Code is merged to main branch
2. ✅ All tests are passing
3. ✅ Documentation is updated
4. ✅ No degradation in performance
5. ✅ Feature works in staging environment

#### Update Task Status

```markdown
# In tasks.md, update status
- [x] Implement user authentication API ✓ 2024-01-15
```

## Best Practices

### Time Management

1. **Time Box Tasks**: Set limits (2-4 hours)
2. **Take Breaks**: Pomodoro technique works
3. **Ask for Help**: After 30 minutes stuck
4. **Document Blockers**: For team visibility

### Code Quality

1. **Keep It Simple**: Prefer clarity over cleverness
2. **Single Responsibility**: Functions do one thing
3. **Meaningful Names**: Self-documenting code
4. **Consistent Style**: Match existing patterns
5. **Remove Dead Code**: Don't comment out, delete

### Communication

- **Daily Updates**: What you did, doing, blocked on
- **Early Warnings**: Flag issues immediately
- **Clear Documentation**: Help future you
- **Share Learning**: Document solutions

## Common Scenarios

### Stuck on a Task?

1. **Rubber Duck Debug**: Explain problem out loud
2. **Break It Down**: Smaller sub-tasks
3. **Research**: Check docs, Stack Overflow
4. **Ask Team**: Share specific error/issue
5. **Time Box**: Move on, come back later

### Found a Bug?

1. **Reproduce**: Ensure it's consistent
2. **Document**: Steps to reproduce
3. **Fix**: In separate commit if possible
4. **Test**: Add test to prevent regression
5. **Note**: In PR description

### Scope Creep?

1. **Document**: Note additional requirements
2. **Discuss**: With product owner
3. **Defer**: Create new task if needed
4. **Focus**: Complete original scope first

## Tools & Resources

### Development Tools
- **IDE**: VS Code with project extensions
- **Debugging**: Browser DevTools, debugger
- **Testing**: Jest, Cypress, Postman
- **Version Control**: Git with conventional commits

### Productivity Tools
- **Task Tracking**: GitHub Issues, Jira
- **Time Tracking**: Toggl, Clockify
- **Focus**: Forest app, Pomodoro timer
- **Notes**: Obsidian, Notion

## Quick Reference

### Git Commands
```bash
git status                    # Check changes
git diff                      # See modifications
git add -p                    # Stage selectively
git commit -m "type: message" # Commit with type
git push origin branch-name   # Push to remote
git rebase main              # Update branch
```

### Testing Commands
```bash
npm test                     # Run all tests
npm test -- --watch         # Watch mode
npm test -- path/to/file    # Specific file
npm run test:coverage       # Coverage report
```

### Common Fixes
```bash
npm ci                       # Clean install
rm -rf node_modules         # Fresh dependencies
git clean -fd               # Remove untracked files
npm run db:reset           # Reset database
```

## Task Execution Checklist
- [ ] Selected next task based on priority
- [ ] Confirmed no blockers or missing info
- [ ] Synced to latest code (git pull)
- [ ] Created/checked out feature branch
- [ ] Reviewed related spec and acceptance criteria
- [ ] Wrote or updated tests for the task
- [ ] Committed changes with clear message
- [ ] Pushed branch and opened PR (if ready)
- [ ] Updated task status in tasks.md or tracker

## Daily Task Log Template
```markdown
# Daily Task Log

## Date: [YYYY-MM-DD]

### Tasks Worked On
- [ ] [Task 1]: [Status/Notes]
- [ ] [Task 2]: [Status/Notes]

### Blockers
- [ ] [Describe any blockers or dependencies]

### Next Steps
- [ ] [Planned tasks for tomorrow]
```

---

*For more on feature development, see [Feature Development Process](./feature-development.md).*
