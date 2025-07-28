# Development Best Practices

> Version: 1.0.0
> Last updated: 2025-03-02
> Scope: Global development standards

## Context

This file defines global best practices that are referenced by all product codebases and provide default development guidelines. Individual projects may extend or override these practices in their `./product/dev-best-practices.md` file.

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

### Choose Libraries Wisely
When adding third-party dependencies:
- Select the most popular and actively maintained option
- Check the library's GitHub repository for:
  - Recent commits (within last 6 months)
  - Active issue resolution
  - Number of stars/downloads
  - Clear documentation

## Code Organization

### File Structure
- Keep files focused on a single responsibility
- Group related functionality together
- Use consistent naming conventions

### Testing
- Write tests for new functionality
- Maintain existing test coverage
- Test edge cases and error conditions

## Code Review Etiquette
- Be respectful and constructive in feedback
- Focus on the code, not the coder
- Ask clarifying questions instead of making assumptions
- Suggest improvements, not just point out problems
- Acknowledge good practices and improvements

# Code Review Process Checklist
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

---

*For more details, see [Code Review Process](../process/code-review.md).*

## Documentation Standards
- All public functions/classes should have docstrings or comments
- Update documentation when code changes
- Use consistent formatting for README and inline docs
- Link to related documentation where relevant

## Security Best Practices
- Validate all user input
- Avoid exposing sensitive data in logs or errors
- Use parameterized queries to prevent SQL injection
- Keep dependencies up to date and monitor for vulnerabilities
- Review authentication and authorization logic regularly

## How to Propose Updates to Standards
- Open a pull request with your suggested changes
- Reference supporting materials or examples
- Request review from at least one other team member
- Document the rationale for your change in the PR description

## Cross-References
- See [Coding Standards](./coding-standards.md) for language-specific rules
- See [Code Style Guide](./code-style.md) for formatting
- See [API Design Standards](./api-design.md) for API-specific guidance

## Further Resources
- [Example Code Review Checklist](../process/code-review.md)
- [Sample README Template](https://github.com/sindresorhus/awesome-readme)
- [OWASP Top 10 Security Risks](https://owasp.org/www-project-top-ten/)

---

*Customize this file with your team's specific practices. These guidelines apply to all code written by humans and AI agents.*
