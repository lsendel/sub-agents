---
name: best-practices
type: standard
version: 1.0.0
description: LLM-optimized development principles with actionable patterns and anti-patterns
author: Claude
tags: [development, practices, code-quality, llm-guide]
related_commands: [/code-review, /refactor, /improve-code]
---

# Development Best Practices for LLMs

> Version: 1.0.0
> Last updated: 2025-07-29
> Purpose: Guide LLMs in writing high-quality, maintainable code
> Target: Language models implementing features or refactoring code

## Context for LLM Usage

This guide helps language models make consistent decisions when writing code. When implementing features:
- Apply these patterns automatically unless the user specifies otherwise
- Recognize and refactor anti-patterns when found in existing code
- Balance pragmatism with best practices based on project context
- Prioritize readability and maintainability over premature optimization

## Core Principles

### Keep It Simple
- Implement code in the fewest lines possible
- Avoid over-engineering solutions
- Choose straightforward approaches over clever ones

### Optimize for Readability
- Prioritize code clarity over micro-optimizations
- Write self-documenting code with clear variable names
- Add comments for "why" not "what"

### DRY (Don't Repeat Yourself)
- Extract repeated business logic to private methods
- Extract repeated UI markup to reusable components
- Create utility functions for common operations

## Dependencies
- Choose popular, actively maintained libraries
- Verify recent commits (< 6 months)
- Check for active issue resolution
- Prefer libraries with clear documentation

## Code Organization
- One responsibility per file
- Group related functionality
- Write tests for new features
- Test edge cases and errors

## Code Review
- Focus on code, not coder
- Suggest improvements
- Ask clarifying questions

## Code Review Checklist
- [ ] Code runs without errors
- [ ] Tests pass
- [ ] Clear naming
- [ ] Complex logic commented
- [ ] Edge cases handled
- [ ] No security issues
- [ ] No code duplication
- [ ] Adequate test coverage

## Documentation
- Document public APIs
- Update docs with code changes
- Use consistent formatting

## Security
- Validate all inputs
- No sensitive data in logs
- Use parameterized queries
- Keep dependencies updated
- Review auth regularly

## Related Standards
- [Coding Standards](./coding-standards.md) - Language rules
- [Code Style](./code-style.md) - Formatting
- [API Design](./api-design.md) - API patterns
- [Testing Standards](./testing-standards.md) - Test practices
