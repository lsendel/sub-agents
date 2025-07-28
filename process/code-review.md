---
name: code-review
type: process
version: 1.0.0
description: Standard code review process for ensuring quality and consistency
author: Claude Code Team
tags: [review, quality, best-practices]
related_commands: [/review, /check-code]
---

# Code Review Process

## Overview
This process defines the standard approach for conducting thorough code reviews to ensure quality, maintainability, and consistency across the codebase.

## Steps

### 1. Initial Assessment
- Check if the code compiles/runs without errors
- Verify all tests pass
- Review the PR/commit description for context

### 2. Code Quality Review
- **Readability**: Is the code easy to understand?
- **Naming**: Are variables, functions, and classes named descriptively?
- **Comments**: Are complex sections properly documented?
- **Structure**: Is the code well-organized and modular?

### 3. Functionality Review
- Does the code do what it's supposed to do?
- Are edge cases handled?
- Is error handling appropriate?
- Are there any potential security vulnerabilities?

### 4. Performance Considerations
- Are there any obvious performance bottlenecks?
- Is the algorithm choice appropriate for the use case?
- Are resources properly managed (memory, connections, etc.)?

### 5. Best Practices
- Does the code follow the project's style guide?
- Are design patterns used appropriately?
- Is there code duplication that could be refactored?
- Are dependencies properly managed?

### 6. Testing
- Are there adequate unit tests?
- Do tests cover edge cases?
- Are tests readable and maintainable?
- Is test coverage sufficient?

### 7. Documentation
- Is the code self-documenting where possible?
- Are public APIs properly documented?
- Is the README updated if needed?
- Are breaking changes documented?

## Code Review Checklist
- [ ] Code compiles/runs without errors
- [ ] All tests pass
- [ ] PR/commit description provides context
- [ ] Code is readable and well-structured
- [ ] Naming is descriptive and consistent
- [ ] Comments explain complex logic
- [ ] Functionality matches requirements
- [ ] Edge cases and errors are handled
- [ ] No obvious security vulnerabilities
- [ ] No performance bottlenecks
- [ ] Follows style guide and best practices
- [ ] No unnecessary code duplication
- [ ] Dependencies are managed properly
- [ ] Adequate and readable tests
- [ ] Test coverage is sufficient

## Code Review Etiquette
- Be respectful and constructive in feedback
- Focus on the code, not the coder
- Ask clarifying questions instead of making assumptions
- Suggest improvements, not just point out problems
- Acknowledge good practices and improvements

---

*For more details on best practices, see [Development Best Practices](../standards/best-practices.md).*
