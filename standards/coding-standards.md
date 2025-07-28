---
name: coding-standards
type: standard
version: 1.0.0
description: General coding standards and best practices for consistent, maintainable code
author: Claude Code Team
tags: [standards, best-practices, code-quality]
related_commands: [/format, /lint]
---

# Coding Standards

## Overview
This document defines the coding standards and best practices to ensure consistency, readability, and maintainability across the codebase.

## General Principles

### 1. Readability First
- Code is read more often than it's written
- Favor clarity over cleverness
- Write self-documenting code

### 2. Consistency
- Follow existing patterns in the codebase
- Use consistent naming conventions
- Maintain consistent formatting

### 3. Simplicity
- Keep functions and classes focused (Single Responsibility)
- Avoid premature optimization
- Reduce complexity where possible

## Naming Conventions

### Variables
- Use descriptive names that explain purpose
- camelCase for JavaScript/TypeScript
- snake_case for Python
- Avoid single-letter variables except in loops

```javascript
// Good
const userEmail = 'user@example.com';
const isLoggedIn = true;

// Bad
const e = 'user@example.com';
const flag = true;
```

### Functions
- Use verb-noun pairs for function names
- Be specific about what the function does
- Boolean functions should start with is/has/can

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
- Use PascalCase for class names
- Nouns or noun phrases
- Be specific and descriptive

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
- Use UPPER_SNAKE_CASE
- Define at module/class level
- Group related constants

```javascript
// Good
const MAX_RETRY_ATTEMPTS = 3;
const DEFAULT_TIMEOUT_MS = 5000;
const API_BASE_URL = 'https://api.example.com';
```

## Code Organization

### File Structure
- One class/component per file (when reasonable)
- Group related functionality
- Clear folder structure
- Meaningful file names

### Function Length
- Keep functions under 20-30 lines
- Extract complex logic into helper functions
- Each function should do one thing well

### Class Structure
1. Static properties/methods
2. Constructor
3. Public methods
4. Protected methods
5. Private methods

## Comments and Documentation

### When to Comment
- Complex algorithms or business logic
- Non-obvious code behavior
- Important decisions or trade-offs
- TODO items with context

### How to Comment
```javascript
// Good: Explains why
// Using exponential backoff to avoid overwhelming the server
// during high load periods
const delay = Math.pow(2, retryCount) * 1000;

// Bad: Explains what (obvious from code)
// Multiply retryCount by 2 and then by 1000
const delay = Math.pow(2, retryCount) * 1000;
```

### Documentation Comments
- Document all public APIs
- Include parameters, return values, and exceptions
- Provide usage examples when helpful

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

### Best Practices
- Catch specific exceptions when possible
- Provide meaningful error messages
- Log errors appropriately
- Clean up resources in finally blocks

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

## Testing Standards

### Test Naming
- Describe what is being tested
- Include expected behavior
- Use consistent format

```javascript
// Good
describe('UserValidator', () => {
  test('should return true for valid email format', () => {});
  test('should return false when email lacks @ symbol', () => {});
  test('should throw error when email is null', () => {});
});
```

### Test Structure
- Arrange: Set up test data
- Act: Execute the function
- Assert: Verify the result

### Test Coverage
- Aim for 80%+ coverage
- Test edge cases
- Test error conditions
- Don't test implementation details

## Security Standards

### Input Validation
- Always validate user input
- Use whitelisting over blacklisting
- Sanitize data before storage

### Authentication
- Use secure session management
- Implement proper password policies
- Enable multi-factor authentication when possible

### Data Protection
- Encrypt sensitive data
- Use HTTPS for all communications
- Follow principle of least privilege

## Performance Guidelines

### General Rules
- Measure before optimizing
- Focus on algorithmic improvements
- Cache expensive operations
- Lazy load when appropriate

### Database
- Use indexes appropriately
- Avoid N+1 queries
- Paginate large result sets
- Use connection pooling

## Version Control

### Commit Messages
- Use present tense ("Add feature" not "Added feature")
- Keep first line under 50 characters
- Provide context in body if needed
- Reference issue numbers

```
feat: Add user authentication endpoint

- Implement JWT-based authentication
- Add password hashing with bcrypt
- Include rate limiting for security

Closes #123
```

### Branching
- Use feature branches
- Keep branches up to date
- Delete branches after merging
- Use descriptive branch names

## Coding Standards Checklist
- [ ] Code is readable and self-documenting
- [ ] Naming conventions match language and context
- [ ] Functions/classes have a single responsibility
- [ ] Consistent formatting and indentation
- [ ] No unnecessary complexity or premature optimization
- [ ] Follows project and language-specific style guides
- [ ] Comments explain "why" for complex logic
- [ ] No unused variables, functions, or imports

## Language-Specific Examples

### JavaScript/TypeScript
```js
// Good
function getUserEmail(user) {
  return user.email;
}

// Bad
function g(u) {
  return u.e;
}
```

### Python
```python
# Good
def get_user_email(user):
    return user.email

# Bad
def g(u):
    return u.e
```

---

*For more on style and best practices, see [Code Style Guide](./code-style.md) and [Development Best Practices](./best-practices.md).*

## Code Review Checklist

- [ ] Follows naming conventions
- [ ] Functions are focused and concise
- [ ] Error handling is appropriate
- [ ] Tests are included and passing
- [ ] Security considerations addressed
- [ ] Performance impact considered
- [ ] Documentation updated