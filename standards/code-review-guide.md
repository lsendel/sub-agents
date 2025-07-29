---
name: code-review-guide
type: standard
version: 1.0.0
description: LLM-optimized guide for conducting thorough code reviews with pattern detection and analysis
author: Claude
tags: [code-review, quality, patterns, performance, llm-guide]
related_commands: [/review-code, /analyze-pr]
---

# Code Review Guide for LLMs

> Version: 1.0.0
> Last updated: 2025-07-29
> Purpose: Enable LLMs to conduct comprehensive, consistent code reviews
> Target: Language models performing automated code review tasks

## Context for LLM Usage

This guide is specifically designed for language models conducting code reviews. When reviewing code:
- You will receive code diffs in various formats (unified diff, side-by-side, or full files)
- You should analyze changes systematically using the patterns in this guide
- Your output should be structured, actionable, and prioritized by severity
- You must distinguish between linter-catchable issues and deeper logical problems

## Related Processes

This standard is used by:
- **[code-review.md](../processes/code-review.md)** - The process for conducting code reviews
- **[feature-development.md](../processes/feature-development.md)** - During the review phase

## Reading and Interpreting Diffs

### Understanding Diff Formats

#### Unified Diff Format
```diff
diff --git a/src/components/Button.tsx b/src/components/Button.tsx
index abc123..def456 100644
--- a/src/components/Button.tsx
+++ b/src/components/Button.tsx
@@ -10,7 +10,8 @@ export const Button = ({ onClick, children }) => {
-  const handleClick = () => {
-    onClick();
+  const handleClick = (e) => {
+    e.preventDefault();
+    onClick?.(e);
   };
```

**Key indicators:**
- Lines starting with `-` are removed
- Lines starting with `+` are added
- Lines with no prefix are unchanged (context)
- `@@` markers show line numbers and context

#### Analyzing Changes Systematically

1. **Identify the scope of changes:**
   - File types affected (source, test, config, docs)
   - Number of files changed
   - Size of changes (lines added/removed)

2. **Understand the intent:**
   - Look for patterns indicating feature addition, bug fix, or refactoring
   - Check commit messages and PR descriptions
   - Identify related changes across files

3. **Context analysis checklist:**
   ```
   - [ ] What problem is this change solving?
   - [ ] Are all related files updated consistently?
   - [ ] Do the changes align with the stated intent?
   - [ ] Are there unrelated changes mixed in?
   ```

### Diff Analysis Patterns

#### High-Risk Change Indicators
```typescript
// PATTERN: Removing null checks
- if (user && user.permissions) {
+ if (user.permissions) {

// RISK: Potential null pointer exception
// RECOMMENDATION: Ensure user is guaranteed non-null or use optional chaining
```

#### Breaking Change Detection
```typescript
// PATTERN: API signature changes
- function processData(data: string[]): void
+ function processData(data: string[], options?: ProcessOptions): void

// IMPACT: All callers need review
// MIGRATION: Ensure backward compatibility or update all call sites
```

## Anti-Pattern Detection Library

### Common Anti-Patterns to Detect

#### 1. Mutation of Props/Parameters
```typescript
// ANTI-PATTERN
function processUser(user: User) {
  user.lastModified = new Date(); // Mutating parameter
  return user;
}

// CORRECT PATTERN
function processUser(user: User): User {
  return {
    ...user,
    lastModified: new Date()
  };
}
```

#### 2. Inconsistent Error Handling
```typescript
// ANTI-PATTERN: Mixed error handling styles
async function fetchData() {
  try {
    const response = await api.get('/data');
    return response.data;
  } catch (error) {
    console.log(error); // Just logging
  }
}

// Another function
async function fetchUser() {
  const response = await api.get('/user'); // No error handling
  return response.data;
}

// CORRECT PATTERN: Consistent error handling
async function fetchData() {
  try {
    const response = await api.get('/data');
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
```

#### 3. God Objects/Functions
```typescript
// ANTI-PATTERN: Function doing too many things
function processOrder(order) {
  // Validate order
  if (!order.items || order.items.length === 0) {
    throw new Error('Invalid order');
  }
  
  // Calculate totals
  let subtotal = 0;
  let tax = 0;
  for (const item of order.items) {
    subtotal += item.price * item.quantity;
  }
  tax = subtotal * 0.08;
  
  // Send email
  emailService.send({
    to: order.customer.email,
    subject: 'Order Confirmation',
    body: `Your order total is ${subtotal + tax}`
  });
  
  // Update inventory
  for (const item of order.items) {
    inventory.decrease(item.id, item.quantity);
  }
  
  // Save to database
  database.orders.save(order);
  
  return order;
}

// CORRECT PATTERN: Single responsibility
function validateOrder(order) { /* ... */ }
function calculateOrderTotals(order) { /* ... */ }
function sendOrderConfirmation(order, totals) { /* ... */ }
function updateInventoryForOrder(order) { /* ... */ }
function saveOrder(order) { /* ... */ }
```

#### 4. Callback Hell / Promise Chain Hell
```typescript
// ANTI-PATTERN
getData(id, (err, data) => {
  if (err) handleError(err);
  else {
    processData(data, (err, processed) => {
      if (err) handleError(err);
      else {
        saveData(processed, (err, saved) => {
          if (err) handleError(err);
          else console.log('Done');
        });
      }
    });
  }
});

// CORRECT PATTERN: Async/await
try {
  const data = await getData(id);
  const processed = await processData(data);
  const saved = await saveData(processed);
  console.log('Done');
} catch (err) {
  handleError(err);
}
```

#### 5. Magic Numbers/Strings
```typescript
// ANTI-PATTERN
if (user.age >= 18) { // Magic number
  user.status = 'active'; // Magic string
}

// CORRECT PATTERN
const MIN_AGE = 18;
const UserStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive'
} as const;

if (user.age >= MIN_AGE) {
  user.status = UserStatus.ACTIVE;
}
```

### Framework-Specific Anti-Patterns

#### React Anti-Patterns
```typescript
// ANTI-PATTERN: Direct state mutation
this.state.items.push(newItem); // Never mutate state directly
this.setState({ items: this.state.items });

// ANTI-PATTERN: Using index as key in dynamic lists
items.map((item, index) => <Item key={index} />)

// ANTI-PATTERN: Excessive re-renders
function Component() {
  // This creates new object every render
  const style = { color: 'red', fontSize: 16 };
  return <div style={style} />;
}

// CORRECT PATTERNS
// Immutable state update
this.setState({ items: [...this.state.items, newItem] });

// Stable keys
items.map(item => <Item key={item.id} />)

// Memoized values
const style = useMemo(() => ({ color: 'red', fontSize: 16 }), []);
```

#### Node.js Anti-Patterns
```typescript
// ANTI-PATTERN: Blocking the event loop
const data = fs.readFileSync('large-file.txt'); // Blocks

// ANTI-PATTERN: Not handling promise rejections
someAsyncOperation(); // Unhandled rejection if fails

// CORRECT PATTERNS
const data = await fs.promises.readFile('large-file.txt');

someAsyncOperation().catch(error => {
  logger.error('Operation failed:', error);
});
```

## Performance Bottleneck Detection

### Common Performance Issues

#### 1. N+1 Query Problem
```typescript
// BOTTLENECK: N+1 database queries
async function getUsersWithPosts() {
  const users = await db.users.findAll();
  for (const user of users) {
    user.posts = await db.posts.findByUserId(user.id); // N queries
  }
  return users;
}

// OPTIMIZED: Single query with join
async function getUsersWithPosts() {
  return await db.users.findAll({
    include: [{ model: db.posts }]
  });
}
```

#### 2. Inefficient Array Operations
```typescript
// BOTTLENECK: O(n²) complexity
function findDuplicates(arr) {
  const duplicates = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j] && !duplicates.includes(arr[i])) {
        duplicates.push(arr[i]);
      }
    }
  }
  return duplicates;
}

// OPTIMIZED: O(n) complexity
function findDuplicates(arr) {
  const seen = new Set();
  const duplicates = new Set();
  for (const item of arr) {
    if (seen.has(item)) {
      duplicates.add(item);
    } else {
      seen.add(item);
    }
  }
  return Array.from(duplicates);
}
```

#### 3. Memory Leaks
```typescript
// MEMORY LEAK: Event listeners not cleaned up
class Component {
  constructor() {
    document.addEventListener('click', this.handleClick);
  }
  
  handleClick = () => {
    console.log('Clicked');
  }
  
  // Missing cleanup!
}

// CORRECT: Proper cleanup
class Component {
  constructor() {
    document.addEventListener('click', this.handleClick);
  }
  
  handleClick = () => {
    console.log('Clicked');
  }
  
  destroy() {
    document.removeEventListener('click', this.handleClick);
  }
}
```

#### 4. Unnecessary Re-computations
```typescript
// BOTTLENECK: Computing on every call
function getFilteredAndSortedData(data, filter) {
  return data
    .filter(item => item.status === filter)
    .sort((a, b) => b.timestamp - a.timestamp)
    .map(item => ({
      ...item,
      formattedDate: new Date(item.timestamp).toLocaleDateString()
    }));
}

// OPTIMIZED: Memoization
const getFilteredAndSortedData = memoize((data, filter) => {
  return data
    .filter(item => item.status === filter)
    .sort((a, b) => b.timestamp - a.timestamp)
    .map(item => ({
      ...item,
      formattedDate: new Date(item.timestamp).toLocaleDateString()
    }));
}, (data, filter) => `${data.length}-${filter}`);
```

### Performance Analysis Checklist

```markdown
## Performance Review Checklist

### Database/API Calls
- [ ] Check for N+1 query problems
- [ ] Verify proper indexing is used
- [ ] Look for unnecessary data fetching
- [ ] Ensure proper pagination for large datasets
- [ ] Check for proper caching strategies

### Algorithmic Complexity
- [ ] Identify nested loops (potential O(n²) or worse)
- [ ] Check for inefficient sorting/searching
- [ ] Look for repeated computations
- [ ] Verify appropriate data structures are used

### Memory Management
- [ ] Check for potential memory leaks
- [ ] Verify event listeners are cleaned up
- [ ] Look for unnecessary object retention
- [ ] Check for large object allocations in loops

### Frontend Performance
- [ ] Check for unnecessary re-renders
- [ ] Verify proper use of memoization
- [ ] Look for large bundle imports
- [ ] Check for render-blocking operations

### Async Operations
- [ ] Verify proper use of async/await
- [ ] Check for sequential operations that could be parallel
- [ ] Look for missing error boundaries
- [ ] Ensure proper timeout handling
```

## Edge Case Discovery

### Systematic Edge Case Analysis

#### 1. Boundary Conditions
```typescript
// REVIEW POINTS for function: processItems(items: Item[], limit: number)

// Edge cases to check:
// - Empty array: processItems([], 10)
// - Single item: processItems([item], 10)
// - Limit edge cases: processItems(items, 0)
// - Limit edge cases: processItems(items, -1)
// - Limit edge cases: processItems(items, Infinity)
// - More items than limit: processItems(manyItems, 2)
// - Undefined/null inputs: processItems(null, 10)
```

#### 2. Type Edge Cases
```typescript
// For string processing
function processText(text: string) {
  // Edge cases:
  // - Empty string: ""
  // - Whitespace only: "   "
  // - Special characters: "🔥👍"
  // - Very long strings: "a".repeat(10000)
  // - Unicode: "你好世界"
  // - Mixed RTL/LTR: "Hello עולם"
}

// For number processing
function calculate(value: number) {
  // Edge cases:
  // - Zero: 0
  // - Negative: -1
  // - Decimals: 0.1 + 0.2
  // - Very large: Number.MAX_SAFE_INTEGER
  // - Very small: Number.MIN_VALUE
  // - Special: NaN, Infinity, -Infinity
}
```

#### 3. State Transition Edge Cases
```typescript
// State machine edge cases
class Connection {
  state: 'disconnected' | 'connecting' | 'connected' | 'error';
  
  // Edge cases to verify:
  // - Can we connect when already connected?
  // - Can we disconnect while connecting?
  // - What happens on error during connection?
  // - Can we recover from error state?
  // - Are all transitions valid?
}
```

#### 4. Concurrency Edge Cases
```typescript
// Race condition example
let counter = 0;

async function increment() {
  const current = counter;
  await someAsyncOperation();
  counter = current + 1; // Race condition!
}

// Edge cases:
// - Multiple simultaneous calls
// - Rapid successive calls
// - Cancellation during operation
// - Timeout scenarios
```

### Edge Case Detection Patterns

```typescript
// PATTERN: Missing null/undefined checks
function processUser(user: User | null) {
  // ❌ Will crash if user is null
  console.log(user.name);
  
  // ✅ Safe access
  console.log(user?.name);
}

// PATTERN: Array index assumptions
function getFirstTwo(items: string[]) {
  // ❌ Assumes at least 2 items
  return [items[0], items[1]];
  
  // ✅ Safe access
  return [items[0], items[1]].filter(Boolean);
}

// PATTERN: Async error boundaries
async function fetchData() {
  // ❌ No timeout handling
  const data = await api.get('/data');
  
  // ✅ With timeout
  const data = await Promise.race([
    api.get('/data'),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), 5000)
    )
  ]);
}
```

## Linter Awareness and Integration

### Understanding Linter Capabilities

#### What Linters Can Catch
```typescript
// ESLint can detect:
// - Unused variables
const unused = 5; // ⚠️ 'unused' is assigned but never used

// - Missing semicolons (if configured)
const value = 10 // ⚠️ Missing semicolon

// - Const reassignment
const fixed = 5;
fixed = 10; // ❌ Cannot assign to const

// - Unreachable code
function example() {
  return true;
  console.log('Never runs'); // ⚠️ Unreachable code
}
```

#### What Linters Cannot Catch
```typescript
// Logical errors
function calculateDiscount(price, discount) {
  // Linter won't catch that discount should be divided by 100
  return price * discount; // Bug if discount is percentage
}

// Business logic violations
function processOrder(order) {
  // Linter can't know this business rule
  if (order.total > 1000) {
    // Should require manager approval
  }
}

// Performance issues
function inefficientSearch(items, target) {
  // Linter won't suggest using Set for O(1) lookup
  return items.filter(item => item === target).length > 0;
}
```

### Complementing Linter Analysis

Focus your review on issues linters miss:

1. **Logical Correctness**
   - Algorithm implementation
   - Business rule compliance
   - Edge case handling

2. **Architecture and Design**
   - SOLID principles
   - Design pattern usage
   - Module boundaries

3. **Performance Implications**
   - Algorithmic complexity
   - Resource usage
   - Caching strategies

4. **Security Concerns**
   - Input validation
   - SQL injection risks
   - XSS vulnerabilities

5. **Maintainability**
   - Code clarity
   - Documentation quality
   - Test coverage

## Structured Review Process

### Review Priority Matrix

```markdown
## Issue Severity Levels

### 🔴 Critical (Must Fix)
- Security vulnerabilities
- Data loss risks
- Breaking changes without migration
- Memory leaks
- Race conditions

### 🟡 Major (Should Fix)
- Performance bottlenecks
- Missing error handling
- Anti-patterns that affect maintainability
- Missing critical tests

### 🟢 Minor (Consider Fixing)
- Code style inconsistencies (not caught by linter)
- Missing optimizations
- Unclear naming
- Documentation gaps

### 💭 Suggestions (Optional)
- Alternative approaches
- Future improvement ideas
- Learning opportunities
```

### Review Response Template

```markdown
## Code Review Summary

**Overall Assessment**: [Approve with suggestions / Request changes / Needs major revision]

### 🔴 Critical Issues (X found)
1. **[File:Line]** - [Issue description]
   ```diff
   - problematic code
   + suggested fix
   ```
   **Impact**: [Why this is critical]
   **Fix**: [How to resolve]

### 🟡 Major Issues (X found)
[Similar format...]

### 🟢 Minor Issues (X found)
[Similar format...]

### 💭 Suggestions
- [Suggestion 1]
- [Suggestion 2]

### ✅ Good Practices Observed
- [Positive feedback 1]
- [Positive feedback 2]

### 📊 Metrics
- Files changed: X
- Lines added/removed: +X/-Y
- Test coverage delta: +X%
- Complexity changes: [Increased/Decreased/Stable]
```

## Pattern Recognition for Specific Domains

### API Endpoint Reviews
```typescript
// Check for:
// - Proper HTTP status codes
// - Consistent error responses
// - Input validation
// - Authentication/authorization
// - Rate limiting considerations
// - API versioning

// Example issues:
router.post('/users', async (req, res) => {
  // ❌ No input validation
  const user = await createUser(req.body);
  
  // ❌ Wrong status code for creation
  res.status(200).json(user);
  
  // ✅ Should be:
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  
  const user = await createUser(req.body);
  res.status(201).json(user);
});
```

### Database Query Reviews
```typescript
// Check for:
// - SQL injection vulnerabilities
// - Proper indexing usage
// - Transaction handling
// - Connection pooling
// - Query optimization

// Example issues:
// ❌ SQL injection risk
const query = `SELECT * FROM users WHERE name = '${userName}'`;

// ❌ Missing transaction
await db.query('UPDATE accounts SET balance = balance - 100 WHERE id = 1');
await db.query('UPDATE accounts SET balance = balance + 100 WHERE id = 2');

// ✅ Safe parameterized query with transaction
await db.transaction(async (trx) => {
  await trx.query(
    'UPDATE accounts SET balance = balance - $1 WHERE id = $2',
    [100, 1]
  );
  await trx.query(
    'UPDATE accounts SET balance = balance + $1 WHERE id = $2',
    [100, 2]
  );
});
```

### React Component Reviews
```typescript
// Check for:
// - Proper hook usage
// - Performance optimizations
// - Accessibility
// - Prop validation
// - Side effect management

// Example review points:
function UserList({ users, onUserClick }) {
  // ❌ Missing dependency
  useEffect(() => {
    fetchAdditionalData(users);
  }, []); // Should include 'users'
  
  // ❌ Creating new function every render
  return users.map(user => (
    <button onClick={() => onUserClick(user.id)}>
      {user.name}
    </button>
  ));
  
  // ✅ Optimized version
  const handleClick = useCallback((userId) => {
    onUserClick(userId);
  }, [onUserClick]);
  
  return users.map(user => (
    <button 
      key={user.id}
      onClick={() => handleClick(user.id)}
      aria-label={`Select ${user.name}`}
    >
      {user.name}
    </button>
  ));
}
```

## Automated Review Triggers

When reviewing code as an LLM, automatically check for:

1. **Security Patterns**
   - Regex for sensitive data patterns
   - Input validation presence
   - Authentication checks
   - Encryption usage

2. **Error Handling Patterns**
   - Try-catch blocks
   - Promise rejection handling
   - Error logging
   - User-friendly error messages

3. **Test Coverage**
   - New code has tests
   - Edge cases are tested
   - Mocks are properly used
   - Test descriptions are clear

4. **Documentation**
   - Complex functions have comments
   - API changes are documented
   - README updates for new features
   - Breaking changes are noted

## Review Efficiency Tips

### For LLMs Conducting Reviews

1. **Start with high-impact files**
   - Core business logic
   - Security-related changes
   - API interfaces
   - Database schemas

2. **Use pattern matching**
   - Search for known anti-patterns
   - Identify repeated code
   - Find inconsistent patterns

3. **Correlate related changes**
   - If API changes, check client updates
   - If schema changes, check migrations
   - If interface changes, check implementations

4. **Provide actionable feedback**
   - Include code examples
   - Suggest specific fixes
   - Link to documentation
   - Explain the "why"

---

*This guide should be continuously updated with new patterns and anti-patterns as they are discovered in code reviews.*