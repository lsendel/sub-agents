# Code Style Guide

## General Formatting

- **Indentation**: 2 spaces (never tabs)
- **Methods/Variables**: camelCase (`userProfile`, `calculateTotal`)
- **Classes/Interfaces**: PascalCase (`UserProfile`, `PaymentProcessor`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`)
- **Strings**: Single quotes `'Hello World'`, template literals for interpolation

## HTML/Template Formatting

- Each HTML attribute on its own line
- Align attributes vertically
- Closing `>` on same line as last attribute

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

## Tailwind CSS Multi-line Format

- Each responsive size on its own line (smallest to largest)
- Align classes vertically
- hover/focus states on separate lines
- Custom 'xs' breakpoint = 400px
- Custom classes at start of first line

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

- Comment non-obvious business logic
- Document complex algorithms
- Explain "why" not "what"
- Never remove existing comments
- Update comments when code changes
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

## Checklist
- [ ] 2 spaces indentation
- [ ] Correct naming conventions
- [ ] Proper string formatting
- [ ] Clean HTML/template formatting
- [ ] No trailing whitespace
- [ ] Auto-formatted with linter/prettier

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

