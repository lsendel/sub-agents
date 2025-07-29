---
name: testing-standards
type: standard
version: 1.0.0
description: LLM-optimized testing standards with test generation patterns and coverage strategies
author: Claude
tags: [testing, quality, tdd, automation, performance, llm-guide]
related_commands: [/test-review, /coverage-check, /generate-tests]
---

# Testing Standards for LLMs

> Version: 1.0.0
> Last updated: 2025-07-29
> Purpose: Enable LLMs to write comprehensive test suites with proper coverage
> Target: Language models creating, reviewing, or improving tests

## Context for LLM Usage

This guide helps LLMs write effective tests at all levels. When testing:
- Analyze code to determine appropriate test types
- Generate tests that cover happy paths, edge cases, and error conditions
- Use mocking and stubbing appropriately
- Write clear test descriptions that serve as documentation
- Balance test coverage with maintainability

## Related Processes

This standard is applied in:
- **[feature-development.md](../processes/feature-development.md)** - Writing tests during development
- **[code-review.md](../processes/code-review.md)** - Reviewing test coverage
- **[post-deployment-automation.md](../processes/post-deployment-automation.md)** - Automated testing validation

## Context

This guide establishes comprehensive testing standards to ensure software quality, maintainability, and reliability. It covers all aspects of testing from unit tests to performance testing, providing concrete patterns and practices that LLMs can implement immediately.

## Testing Philosophy

### The Testing Trophy
We follow the Testing Trophy model, prioritizing integration tests over unit tests:

```
       /\            E2E Tests (5-10%)
      /  \           - Critical user journeys
     /    \          - Smoke tests
    /------\         Integration Tests (40-50%)
   /        \        - API integration
  /          \       - Component integration
 /____________\      Unit Tests (40-50%)
                     - Business logic
                     - Utilities
                     - Pure functions
```

### Core Principles

1. **Write Tests for Confidence, Not Coverage**
   - Focus on testing behavior, not implementation
   - Test what users do, not how code works
   - Prioritize tests that catch real bugs

2. **Test at the Right Level**
   - Unit tests for complex logic
   - Integration tests for component interactions
   - E2E tests for critical paths only

3. **Keep Tests Simple and Maintainable**
   - Tests should be obvious and readable
   - Avoid complex test utilities
   - Prefer duplication over abstraction in tests

## Test Types & Strategies

### Unit Tests
Test individual functions or classes in isolation.

```typescript
// Good: Testing pure business logic
describe('calculateDiscount', () => {
  it('applies percentage discount correctly', () => {
    expect(calculateDiscount(100, 10)).toBe(90);
  });
  
  it('handles zero discount', () => {
    expect(calculateDiscount(100, 0)).toBe(100);
  });
  
  it('caps discount at 100%', () => {
    expect(calculateDiscount(100, 150)).toBe(0);
  });
});
```

### Integration Tests
Test how multiple units work together.

```typescript
// Testing API endpoint with database
describe('POST /api/users', () => {
  beforeEach(async () => {
    await db.clear();
    await db.seed();
  });
  
  it('creates user with valid data', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'John Doe', email: 'john@example.com' });
    
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: expect.any(String),
      name: 'John Doe',
      email: 'john@example.com',
    });
    
    const user = await db.users.findById(response.body.id);
    expect(user).toBeTruthy();
  });
});
```

### End-to-End Tests
Test complete user workflows.

```typescript
// Playwright E2E test
test('user can complete purchase', async ({ page }) => {
  await page.goto('/products');
  await page.click('[data-testid="product-1"]');
  await page.click('[data-testid="add-to-cart"]');
  await page.click('[data-testid="checkout"]');
  
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="card"]', '4242424242424242');
  await page.click('[data-testid="submit-order"]');
  
  await expect(page.locator('h1')).toContainText('Order Confirmed');
});
```

### Component Tests
Test UI components in isolation (for frontend).

```typescript
describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
  
  it('calls onClick when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

## Coverage Requirements

### Coverage Targets

```yaml
coverage:
  global:
    statements: 80%
    branches: 75%
    functions: 80%
    lines: 80%
  
  critical_paths:  # Payment, auth, core business logic
    statements: 95%
    branches: 90%
    functions: 95%
    lines: 95%
  
  utilities:       # Helper functions, utilities
    statements: 100%
    branches: 100%
    functions: 100%
    lines: 100%
  
  ui_components:   # React/Vue/Angular components
    statements: 70%
    branches: 60%
    functions: 70%
    lines: 70%
```

### Coverage Configuration

```javascript
// jest.config.js
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.{js,ts}',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/test/**/*',
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 75,
      functions: 80,
      lines: 80,
    },
    './src/utils/': {
      statements: 100,
    },
    './src/services/payment/': {
      statements: 95,
      branches: 90,
    },
  },
};
```

### What NOT to Test
- Third-party libraries
- Framework code
- Simple getters/setters
- Configuration files
- Type definitions

## Test Naming Conventions

### Test File Naming
```
src/
├── components/
│   ├── Button.tsx
│   └── Button.test.tsx      // Unit/component tests
├── utils/
│   ├── format.ts
│   └── format.test.ts       // Unit tests
├── api/
│   ├── users.ts
│   └── users.integration.test.ts  // Integration tests
└── e2e/
    └── checkout.e2e.test.ts // E2E tests
```

### Test Description Format
```typescript
describe('UserService', () => {
  describe('createUser', () => {
    it('should create user with valid data', () => {});
    it('should throw error when email is invalid', () => {});
    it('should prevent duplicate emails', () => {});
  });
});
```

### Test Data Naming
```typescript
// Test data prefix: test*, mock*
const testUser = { id: '1', name: 'Test User' };
const mockApiResponse = { data: [], status: 200 };
```

## Mock & Fixture Patterns

### When to Mock
```typescript
// ✅ Mock external dependencies
jest.mock('axios');
jest.mock('../services/email');

// ✅ Mock time-dependent functions
jest.useFakeTimers();
jest.setSystemTime(new Date('2023-01-01'));

// ❌ Don't mock what you're testing
// ❌ Don't mock simple utilities
// ❌ Don't mock data transformations
```

### Mock Patterns

#### Service Mocks
```typescript
// __mocks__/emailService.ts
export const emailService = {
  sendEmail: jest.fn().mockResolvedValue({ success: true }),
  sendBulkEmail: jest.fn().mockResolvedValue({ sent: 10, failed: 0 }),
};

// In test file
import { emailService } from '../emailService';
jest.mock('../emailService');

test('sends welcome email on user creation', async () => {
  await createUser({ email: 'test@example.com' });
  
  expect(emailService.sendEmail).toHaveBeenCalledWith({
    to: 'test@example.com',
    template: 'welcome',
  });
});
```

#### API Mocks with MSW
```typescript
// mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/users/:id', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: req.params.id,
        name: 'John Doe',
        email: 'john@example.com',
      })
    );
  }),
  
  rest.post('/api/users', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        id: 'new-id',
        ...req.body,
      })
    );
  }),
];
```

### Fixture Management

#### Factory Pattern
```typescript
// test/factories/user.ts
import { faker } from '@faker-js/faker';

export const userFactory = {
  build: (overrides = {}) => ({
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    email: faker.internet.email(),
    createdAt: faker.date.past(),
    ...overrides,
  }),
  
  buildList: (count: number, overrides = {}) => {
    return Array.from({ length: count }, () => 
      userFactory.build(overrides)
    );
  },
  
  buildAdmin: (overrides = {}) => ({
    ...userFactory.build(overrides),
    role: 'admin',
    permissions: ['read', 'write', 'delete'],
  }),
};

// Usage in tests
const user = userFactory.build({ name: 'Specific Name' });
const users = userFactory.buildList(5);
const admin = userFactory.buildAdmin();
```

#### Fixture Files
```typescript
// test/fixtures/api-responses.ts
export const fixtures = {
  users: {
    success: {
      data: [
        { id: '1', name: 'Alice' },
        { id: '2', name: 'Bob' },
      ],
      meta: { total: 2, page: 1 },
    },
    empty: {
      data: [],
      meta: { total: 0, page: 1 },
    },
    error: {
      error: 'Internal Server Error',
      message: 'Database connection failed',
    },
  },
};
```

## Test Data Management

### Database Seeding Strategy

```typescript
// test/seeds/test-data.ts
export const seedDatabase = async (db: Database) => {
  // Clear existing data
  await db.clear();
  
  // Insert test data in correct order (respecting foreign keys)
  const users = await db.users.insertMany([
    { id: 'user-1', email: 'admin@test.com', role: 'admin' },
    { id: 'user-2', email: 'user@test.com', role: 'user' },
  ]);
  
  const products = await db.products.insertMany([
    { id: 'prod-1', name: 'Widget', price: 9.99 },
    { id: 'prod-2', name: 'Gadget', price: 19.99 },
  ]);
  
  return { users, products };
};

// In tests
beforeEach(async () => {
  testData = await seedDatabase(db);
});
```

### Test Data Isolation

```typescript
// Approach 1: Transaction rollback
describe('User API', () => {
  let transaction: Transaction;
  
  beforeEach(async () => {
    transaction = await db.startTransaction();
  });
  
  afterEach(async () => {
    await transaction.rollback();
  });
  
  test('creates user', async () => {
    // Test runs in transaction, automatically rolled back
  });
});

// Approach 2: Unique test data
describe('Order Service', () => {
  const testId = () => `test-${Date.now()}-${Math.random()}`;
  
  test('processes order', async () => {
    const order = {
      id: testId(),
      userId: testId(),
      // Unique IDs prevent conflicts
    };
  });
});
```

### Environment-Specific Data

```typescript
// test/config/environments.ts
export const testEnvironments = {
  unit: {
    database: ':memory:',
    fixtures: 'minimal',
  },
  integration: {
    database: 'test_db',
    fixtures: 'full',
    services: ['redis', 'elasticsearch'],
  },
  e2e: {
    database: 'e2e_db',
    fixtures: 'production-like',
    services: ['all'],
  },
};

// Dynamic fixture loading
const loadFixtures = async (environment: string) => {
  const config = testEnvironments[environment];
  if (config.fixtures === 'minimal') {
    return minimalFixtures;
  }
  return fullFixtures;
};
```

## Testing Domain-Driven Design Patterns

When using DDD, adapt testing strategies to match domain complexity:

### Testing Aggregates

```typescript
describe('Order Aggregate', () => {
  it('enforces business invariants', () => {
    const order = Order.create(customerId);
    
    // Test: Cannot add items to confirmed order
    order.confirm();
    expect(() => order.addItem(product, quantity))
      .toThrow('Cannot modify confirmed order');
    
    // Test: Total recalculated when items change
    const draftOrder = Order.create(customerId);
    draftOrder.addItem(product, new Quantity(2));
    expect(draftOrder.total).toEqual(new Money(20, 'USD'));
  });
  
  it('produces domain events', () => {
    const order = createOrderWithItems();
    
    const events = order.confirm();
    
    expect(events).toContainEqual(
      expect.objectContaining({
        type: 'OrderConfirmed',
        aggregateId: order.id.value,
      })
    );
  });
});
```

### Testing Value Objects

```typescript
describe('Email Value Object', () => {
  it('validates format on creation', () => {
    expect(() => new Email('invalid'))
      .toThrow('Invalid email format');
    
    expect(() => new Email('valid@example.com'))
      .not.toThrow();
  });
  
  it('provides value equality', () => {
    const email1 = new Email('test@example.com');
    const email2 = new Email('test@example.com');
    const email3 = new Email('other@example.com');
    
    expect(email1.equals(email2)).toBe(true);
    expect(email1.equals(email3)).toBe(false);
  });
});
```

### Testing Domain Services

```typescript
describe('PricingService', () => {
  let pricingService: PricingService;
  let mockDiscountRepo: jest.Mocked<DiscountRepository>;
  
  beforeEach(() => {
    mockDiscountRepo = createMockDiscountRepository();
    pricingService = new PricingService(mockDiscountRepo);
  });
  
  it('applies business rules for pricing', async () => {
    const order = createOrder({ subtotal: 100 });
    mockDiscountRepo.findApplicable.mockResolvedValue([
      new VolumeDiscount(10), // 10% off
    ]);
    
    const result = await pricingService.calculate(order);
    
    expect(result.finalAmount).toEqual(new Money(90, 'USD'));
  });
});
```

### Testing Use Cases / Application Services

```typescript
describe('PlaceOrderUseCase', () => {
  let useCase: PlaceOrderUseCase;
  let orderRepo: InMemoryOrderRepository;
  let eventStore: TestEventStore;
  
  beforeEach(() => {
    orderRepo = new InMemoryOrderRepository();
    eventStore = new TestEventStore();
    useCase = new PlaceOrderUseCase(orderRepo, eventStore);
  });
  
  it('orchestrates domain objects correctly', async () => {
    const command = new PlaceOrderCommand({
      customerId: 'customer-123',
      items: [{ productId: 'prod-1', quantity: 2 }],
    });
    
    const orderId = await useCase.execute(command);
    
    // Verify aggregate was saved
    const order = await orderRepo.findById(orderId);
    expect(order).toBeDefined();
    
    // Verify events were published
    expect(eventStore.events).toContainEqual(
      expect.objectContaining({ type: 'OrderPlaced' })
    );
  });
});
```

### Test Data Builders for Complex Aggregates

```typescript
class OrderBuilder {
  private customerId = CustomerId.generate();
  private items: OrderItem[] = [];
  private status = OrderStatus.DRAFT;
  
  withCustomer(customerId: CustomerId): this {
    this.customerId = customerId;
    return this;
  }
  
  withItem(productId: ProductId, quantity: number, price: number): this {
    this.items.push(new OrderItem(
      productId,
      new Quantity(quantity),
      new Money(price, 'USD')
    ));
    return this;
  }
  
  asConfirmed(): this {
    this.status = OrderStatus.CONFIRMED;
    return this;
  }
  
  build(): Order {
    const order = new Order(OrderId.generate(), this.customerId);
    this.items.forEach(item => order.addItem(item));
    if (this.status === OrderStatus.CONFIRMED) {
      order.confirm();
    }
    return order;
  }
}

// Usage in tests
const order = new OrderBuilder()
  .withCustomer(testCustomerId)
  .withItem(productId1, 2, 10.00)
  .withItem(productId2, 1, 25.00)
  .asConfirmed()
  .build();
```


## Performance Testing

### Load Testing with k6

```javascript
// load-tests/api-stress.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 100 },  // Ramp up
    { duration: '5m', target: 100 },  // Stay at 100 users
    { duration: '2m', target: 200 },  // Ramp to 200
    { duration: '5m', target: 200 },  // Stay at 200
    { duration: '2m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests under 500ms
    http_req_failed: ['rate<0.1'],    // Error rate under 10%
  },
};

export default function() {
  const response = http.get('https://api.example.com/users');
  
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  
  sleep(1);
}
```

### Performance Benchmarks

```typescript
// benchmarks/utils.bench.ts
import { bench, describe } from 'vitest';
import { formatCurrency, formatCurrencyRegex } from '../src/utils';

describe('Currency Formatting Performance', () => {
  bench('Intl.NumberFormat approach', () => {
    formatCurrency(1234.56, 'USD');
  });
  
  bench('Regex approach', () => {
    formatCurrencyRegex(1234.56, 'USD');
  });
});

// Run with: npm run bench
// Results:
// ✓ Intl.NumberFormat approach   1,234,567 ops/sec ±0.5%
// ✓ Regex approach               234,567 ops/sec ±1.2%
```

### Memory Leak Detection

```typescript
// test/memory/leak-detection.test.ts
describe('Memory Leak Detection', () => {
  test('EventEmitter does not leak listeners', () => {
    const emitter = new EventEmitter();
    const initialMemory = process.memoryUsage().heapUsed;
    
    // Simulate many subscriptions/unsubscriptions
    for (let i = 0; i < 10000; i++) {
      const handler = () => {};
      emitter.on('event', handler);
      emitter.off('event', handler);
    }
    
    global.gc(); // Force garbage collection
    const finalMemory = process.memoryUsage().heapUsed;
    
    // Memory should not grow significantly
    expect(finalMemory - initialMemory).toBeLessThan(1000000); // 1MB
  });
});
```

## CI/CD Integration

### Test Pipeline Configuration

```yaml
# .github/workflows/test.yml
name: Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:unit
      
      - name: Run integration tests
        run: npm run test:integration
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/test
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
      
      - name: Run E2E tests
        if: github.event_name == 'pull_request'
        run: npm run test:e2e
```

### Parallel Test Execution

```javascript
// jest.config.js
module.exports = {
  maxWorkers: '50%',  // Use 50% of available CPU cores
  testSequencer: './test/custom-sequencer.js',
};

// test/custom-sequencer.js
class CustomSequencer {
  sort(tests) {
    // Run longest tests first for better parallelization
    return tests.sort((a, b) => {
      const aTime = testTimes[a.path] || 0;
      const bTime = testTimes[b.path] || 0;
      return bTime - aTime;
    });
  }
}
```

### Flaky Test Management

```typescript
// test/utils/retry.ts
export const retryTest = async (
  testFn: () => Promise<void>,
  retries = 3
) => {
  for (let i = 0; i < retries; i++) {
    try {
      await testFn();
      return;
    } catch (error) {
      if (i === retries - 1) throw error;
      console.log(`Test failed, retry ${i + 1}/${retries}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
};

// Usage for known flaky tests
test('flaky integration test', async () => {
  await retryTest(async () => {
    const result = await apiCall();
    expect(result.status).toBe('success');
  });
});
```

## Best Practices

**Do**: Test behavior, descriptive names, isolated tests, test factories, edge cases, minimal setup
**Don't**: Test privates, random data, shared state, over-mock, ignore flaky tests, implementation coupling

### Common Anti-Patterns

```typescript
// ❌ Bad: Testing implementation
test('uses forEach to process items', () => {
  const spy = jest.spyOn(Array.prototype, 'forEach');
  processItems([1, 2, 3]);
  expect(spy).toHaveBeenCalled();
});

// ✅ Good: Testing behavior
test('processes all items', () => {
  const result = processItems([1, 2, 3]);
  expect(result).toEqual([2, 4, 6]);
});

// ❌ Bad: Shared test state
let user;
beforeAll(() => {
  user = createUser();
});

// ✅ Good: Isolated test state
beforeEach(() => {
  const user = createUser();
});

// ❌ Bad: Testing framework behavior
test('useState updates state', () => {
  const [state, setState] = useState(0);
  setState(1);
  expect(state).toBe(1); // This won't work!
});

// ✅ Good: Testing component behavior
test('counter increments when button clicked', () => {
  render(<Counter />);
  fireEvent.click(screen.getByText('Increment'));
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

## Tool Recommendations

### JavaScript/TypeScript Stack

```json
{
  "devDependencies": {
    // Test Runners
    "jest": "^29.0.0",          // Most popular, great ecosystem
    "vitest": "^0.34.0",        // Faster, Vite-native
    
    // Assertion Libraries
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.0.0",
    
    // Mocking
    "msw": "^1.3.0",            // API mocking
    "@faker-js/faker": "^8.0.0", // Test data generation
    
    // E2E Testing
    "playwright": "^1.38.0",     // Modern, reliable
    "cypress": "^13.0.0",        // Great DX, debugging
    
    // Performance
    "k6": "^0.46.0",            // Load testing
    
    // Coverage
    "c8": "^8.0.0",             // Native V8 coverage
  }
}
```

### Testing Commands

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:unit": "jest --testPathPattern=\\.test\\.",
    "test:integration": "jest --testPathPattern=\\.integration\\.test\\.",
    "test:e2e": "playwright test",
    "test:coverage": "jest --coverage",
    "test:performance": "k6 run load-tests/*.js",
    "test:bench": "vitest bench",
    "test:ci": "jest --ci --coverage --maxWorkers=2"
  }
}
```

## Migration Strategy

### Adopting Testing Standards

1. **Assessment Phase**
   - Analyze current test coverage
   - Identify critical paths lacking tests
   - Review existing test quality

2. **Foundation Phase**
   - Set up test infrastructure
   - Configure coverage tools
   - Create test data factories

3. **Implementation Phase**
   - Start with new features (TDD)
   - Add tests when fixing bugs
   - Gradually increase coverage

4. **Optimization Phase**
   - Refactor test utilities
   - Improve test performance
   - Implement CI/CD integration

## Measuring Success

### Key Metrics
- Code coverage percentage
- Test execution time
- Flaky test rate
- Defect escape rate
- Time to identify issues

### Quality Indicators
- Tests catch real bugs
- Developers trust the tests
- Tests run quickly
- Tests are easy to maintain
- New developers can understand tests

---

*This guide should be used in conjunction with the [Coding Standards](./coding-standards.md), [Best Practices](./best-practices.md), and [CI/CD documentation](../processes/ci-cd.md).*