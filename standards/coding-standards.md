---
name: coding-standards
type: standard
version: 1.0.0
description: LLM-optimized coding standards with language detection and pattern matching
author: Claude Code Team
tags: [standards, best-practices, code-quality, llm-guide]
related_commands: [/format, /lint, /apply-standards]
---

# Coding Standards for LLMs

> Version: 1.0.0
> Last updated: 2025-07-29
> Purpose: Guide LLMs in applying consistent coding standards across languages
> Target: Language models writing or reviewing code

## Context for LLM Usage

This guide helps LLMs apply appropriate coding standards based on:
- Language detection from file extensions or syntax
- Existing patterns in the codebase
- Framework-specific conventions
- Team preferences documented in project configuration

## Core Principles
- **Readability**: Clarity over cleverness, self-documenting code
- **Consistency**: Follow existing patterns, naming, formatting
- **Simplicity**: Single responsibility, avoid premature optimization

## Naming Conventions

### Variables
- Descriptive names
- camelCase (JS/TS), snake_case (Python)
- No single letters except loops

```javascript
// Good
const userEmail = 'user@example.com';
const isLoggedIn = true;

// Bad
const e = 'user@example.com';
const flag = true;
```

### Functions
- Verb-noun pairs
- Boolean functions: is/has/can prefix

```javascript
// Good
function calculateTotalPrice(items) {}
function isValidEmail(email) {}
function hasPermission(user, action) {}

// Bad
function calc(items) {}
function email(email) {}
function permission(user, action) {}
```

### Classes
- PascalCase
- Nouns or noun phrases

```javascript
// Good
class UserAuthentication {}
class ShoppingCart {}
class EmailValidator {}

// Bad
class Auth {}
class Cart {}
class Validate {}
```

### Constants
- UPPER_SNAKE_CASE
- Module/class level
- Group related

```javascript
// Good
const MAX_RETRY_ATTEMPTS = 3;
const DEFAULT_TIMEOUT_MS = 5000;
const API_BASE_URL = 'https://api.example.com';
```

## Code Organization

- One class/component per file
- Functions under 20-30 lines
- Class order: static → constructor → public → protected → private

## Comments and Documentation

- Comment complex algorithms and non-obvious behavior
- Explain "why" not "what"
- Document public APIs with parameters, returns, exceptions
```javascript
// Good: Explains why
// Using exponential backoff to avoid overwhelming the server
// during high load periods
const delay = Math.pow(2, retryCount) * 1000;

// Bad: Explains what (obvious from code)
// Multiply retryCount by 2 and then by 1000
const delay = Math.pow(2, retryCount) * 1000;
```


```javascript
/**
 * Calculates the total price including tax and shipping
 * @param {Array<Item>} items - Array of items in the cart
 * @param {number} taxRate - Tax rate as a decimal (e.g., 0.08 for 8%)
 * @param {number} shippingCost - Flat shipping cost
 * @returns {number} Total price rounded to 2 decimal places
 * @throws {Error} If items array is empty
 */
function calculateTotalPrice(items, taxRate, shippingCost) {
  // Implementation
}
```

## Error Handling

- Catch specific exceptions
- Meaningful error messages
- Log errors appropriately
- Clean up in finally blocks

```javascript
// Good
try {
  const data = await fetchUserData(userId);
  return processUserData(data);
} catch (NetworkError) {
  logger.error(`Failed to fetch user ${userId}:`, error);
  throw new UserFetchError(`Unable to load user data`, { cause: error });
} finally {
  closeConnection();
}

// Bad
try {
  const data = await fetchUserData(userId);
  return processUserData(data);
} catch (e) {
  console.log('Error');
  throw e;
}
```

## Testing

```javascript
// Good
describe('UserValidator', () => {
  test('should return true for valid email format', () => {});
  test('should return false when email lacks @ symbol', () => {});
  test('should throw error when email is null', () => {});
});
```

- Describe behavior in test names
- Arrange → Act → Assert
- 80%+ coverage target
- Test edge cases and errors

## Security

- Validate all user input (whitelist approach)
- Encrypt sensitive data
- HTTPS only
- Principle of least privilege

## Performance

- Measure before optimizing
- Cache expensive operations
- Avoid N+1 queries
- Use indexes and pagination

## Version Control

### Commit Format
```
feat: Add user authentication endpoint

- Implement JWT-based authentication
- Add password hashing with bcrypt
- Include rate limiting for security

Closes #123
```

- Present tense, <50 chars first line
- Feature branches with descriptive names

## Checklist
- [ ] Readable and self-documenting
- [ ] Proper naming conventions
- [ ] Single responsibility
- [ ] Consistent formatting
- [ ] No premature optimization
- [ ] "Why" comments for complex logic
- [ ] No unused code

## Examples

```javascript
// Good
function getUserEmail(user) {
  return user.email;
}

// Bad
function g(u) {
  return u.e;
}
```

```python
# Good
def get_user_email(user):
    return user.email

# Bad
def g(u):
    return u.e
```