---
name: code-review
type: process
version: 1.0.0
description: LLM-optimized code review process with automated checks and pattern detection
author: Claude Code Team
tags: [review, quality, best-practices, llm-guide]
related_commands: [/review, /check-code, /analyze-pr]
---

# Code Review Process for LLMs

> Version: 1.0.0
> Last updated: 2025-07-29
> Purpose: Enable LLMs to conduct thorough, constructive code reviews
> Target: Language models reviewing pull requests or code changes

## Context for LLM Usage

This process helps LLMs review code systematically. When reviewing:
- Start with high-level architecture concerns
- Check for common anti-patterns and security issues
- Verify test coverage for new functionality
- Provide specific, actionable feedback
- Balance criticism with recognition of good practices

## Related Standards

Apply these standards during review:
- **[code-review-guide.md](../standards/code-review-guide.md)** - Comprehensive review patterns and anti-patterns
- **[coding-standards.md](../standards/coding-standards.md)** - Check code quality and conventions
- **[code-style.md](../standards/code-style.md)** - Verify formatting consistency
- **[testing-standards.md](../standards/testing-standards.md)** - Assess test coverage and quality
- **[best-practices.md](../standards/best-practices.md)** - Evaluate design patterns
- **[api-design.md](../standards/api-design.md)** - Review API endpoints and contracts

## Review Checklist

### 1. Initial Assessment
- [ ] Code compiles/runs without errors
- [ ] All tests pass
- [ ] PR/commit description provides context

### 2. Code Quality
- [ ] Readable and well-structured
- [ ] Descriptive naming
- [ ] Complex logic documented
- [ ] Well-organized and modular

### 3. Functionality
- [ ] Meets requirements
- [ ] Edge cases handled
- [ ] Proper error handling
- [ ] No security vulnerabilities

### 4. Performance
- [ ] No obvious bottlenecks
- [ ] Appropriate algorithms
- [ ] Resources managed properly

### 5. Best Practices
- [ ] Follows [code-style.md](../standards/code-style.md) formatting
- [ ] Design patterns from [best-practices.md](../standards/best-practices.md) used well
- [ ] No unnecessary duplication
- [ ] Dependencies managed properly

### 6. Testing
- [ ] Adequate unit tests per [testing-standards.md](../standards/testing-standards.md)
- [ ] Edge cases tested
- [ ] Tests readable and maintainable
- [ ] Coverage meets standards in [testing-standards.md](../standards/testing-standards.md)

### 7. Documentation
- [ ] Self-documenting code
- [ ] Public APIs documented
- [ ] README updated
- [ ] Breaking changes noted

## Review Etiquette
- Be respectful and constructive
- Focus on code, not coder
- Ask questions, don't assume
- Suggest improvements
- Acknowledge good practices
