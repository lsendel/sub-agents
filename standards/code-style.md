# Code Style Guide

> Version: 1.0.0
> Last Updated: 2025-04-24

## Context

This file defines global code style rules that are referenced by all product codebases and provide default formatting guidelines. Individual projects may extend or override these rules in their `./product/code-style.md` file.

## General Formatting

### Indentation
- Use 2 spaces for indentation (never tabs)
- Maintain consistent indentation throughout files
- Align nested structures for readability

### Naming Conventions
- **Methods and Variables**: Use camelCase (e.g., `userProfile`, `calculateTotal`)
- **Classes and Interfaces**: Use PascalCase (e.g., `UserProfile`, `PaymentProcessor`)
- **Constants**: Use UPPER_SNAKE_CASE (e.g., `MAX_RETRY_COUNT`)

### String Formatting
- Use single quotes for strings: `'Hello World'`
- Use double quotes only when interpolation is needed
- Use template literals for multi-line strings or complex interpolation

## HTML/Template Formatting

### Structure Rules
- Use 2 spaces for indentation
- Place nested elements on new lines with proper indentation
- Content between tags should be on its own line when multi-line

### Attribute Formatting
- Place each HTML attribute on its own line
- Align attributes vertically
- Keep the closing `>` on the same line as the last attribute

### Example HTML Structure

```html
<div class="container">
  <header class="flex flex-col space-y-2
                 md:flex-row md:space-y-0 md:space-x-4">
    <h1 class="text-primary dark:text-primary-300">
      Page Title
    </h1>
    <nav class="flex flex-col space-y-2
                md:flex-row md:space-y-0 md:space-x-4">
      <a href="/"
         class="btn-ghost">
        Home
      </a>
      <a href="/about"
         class="btn-ghost">
        About
      </a>
    </nav>
  </header>
</div>
```

## Tailwind CSS preferences

### Multi-line CSS classes in markup

- We use a unique multi-line formatting style when writing Tailwind CSS classes in HTML markup and ERB tags, where the classes for each responsive size are written on their own dedicated line.
- The top-most line should be the smallest size (no responsive prefix). Each line below it should be the next responsive size up.
- Each line of CSS classes should be aligned vertically.
- focus and hover classes should be on their own additional dedicated lines.
- We implement one additional responsive breakpoint size called 'xs' which represents 400px.
- If there are any custom CSS classes being used, those should be included at the start of the first line.

**Example of multi-line Tailwind CSS classes:**

<div class="custom-cta bg-gray-50 dark:bg-gray-900 p-4 rounded cursor-pointer w-full
            hover:bg-gray-100 dark:hover:bg-gray-800
            xs:p-6
            sm:p-8 sm:font-medium
            md:p-10 md:text-lg
            lg:p-12 lg:text-xl lg:font-semibold lg:2-3/5
            xl:p-14 xl:text-2xl
            2xl:p-16 2xl:text-3xl 2xl:font-bold 2xl:w-3/4">
  I'm a call-to-action!
</div>

## Code Comments

### When to Comment
- Add brief comments above non-obvious business logic
- Document complex algorithms or calculations
- Explain the "why" behind implementation choices

### Comment Maintenance
- Never remove existing comments unless removing the associated code
- Update comments when modifying code to maintain accuracy
- Keep comments concise and relevant

### Comment Format
```java
/**
 * Calculate compound interest with monthly contributions
 * Uses the formula: A = P(1 + r/n)^(nt) + PMT × (((1 + r/n)^(nt) - 1) / (r/n))
 * @param principal Initial investment amount
 * @param rate Annual interest rate
 * @param time Investment period in years
 * @param monthlyPayment Regular monthly contribution
 * @return Total amount after compound interest
 */
public double calculateCompoundInterest(double principal, double rate, int time, double monthlyPayment) {
    // Implementation here
    return 0.0;
}
```

## Code Style Checklist
- [ ] Indentation is consistent (2 spaces, no tabs)
- [ ] Naming conventions match language and context
- [ ] String formatting follows project rules
- [ ] HTML/template formatting is clean and readable
- [ ] No trailing whitespace or unnecessary blank lines
- [ ] Code is auto-formatted with linter/prettier if available

## Example Naming Conventions
```java
// Methods and variables (camelCase in Java)
private UserProfile userProfile;
public double calculateTotal() { ... }

// Classes and interfaces (PascalCase)
public class UserProfile { ... }
public interface PaymentProcessor { ... }

// Constants (UPPER_SNAKE_CASE)
public static final int MAX_RETRY_COUNT = 5;
```

---

*For more on standards, see [Coding Standards](./coding-standards.md) and [Development Best Practices](./best-practices.md).*

---

*Customize this file with your team's specific style preferences. These formatting rules apply to all code written by humans and AI agents.*
