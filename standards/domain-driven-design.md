---
name: domain-driven-design
type: standard
version: 1.0.0
description: Domain-Driven Design patterns and practices for complex business logic
author: Claude
tags: [architecture, ddd, domain, patterns, design]
related_commands: [/ddd-review, /bounded-context]
---

# Domain-Driven Design Standards

> Version: 1.0.0
> Last updated: 2025-07-29
> Scope: Architectural patterns for complex domain modeling

## Context

This guide establishes Domain-Driven Design (DDD) patterns for modeling complex business domains. DDD helps align software design with business needs by creating a shared language between developers and domain experts, organizing code around business concepts, and managing complexity through strategic design.

## When to Use DDD

### Use DDD When:
- Core business logic is complex
- Business rules change frequently
- Multiple teams work on the same system
- Domain experts are available for collaboration
- Long-term maintainability is crucial

### Don't Use DDD When:
- Building simple CRUD applications
- Business logic is minimal
- Team is small (< 5 developers)
- Time to market is critical
- Domain is well-understood and stable

## Strategic Design

### Bounded Contexts

A Bounded Context defines a boundary within which a domain model is valid and consistent.

```typescript
// Example: E-commerce system with multiple bounded contexts
bounded-contexts/
├── catalog/              // Product catalog context
│   ├── domain/
│   ├── application/
│   └── infrastructure/
├── ordering/            // Order management context
│   ├── domain/
│   ├── application/
│   └── infrastructure/
├── shipping/           // Shipping context
│   ├── domain/
│   ├── application/
│   └── infrastructure/
└── shared-kernel/      // Shared concepts
    └── types/
```

### Context Mapping

Define relationships between bounded contexts:

```typescript
// Context map example
export const contextMap = {
  catalog: {
    type: 'core-domain',
    relationships: {
      ordering: 'customer-supplier',  // Catalog supplies product data
      shipping: 'published-language', // Via events
    },
  },
  ordering: {
    type: 'core-domain',
    relationships: {
      catalog: 'conformist',     // Conforms to catalog's model
      shipping: 'partnership',   // Collaborate on delivery
      payment: 'anti-corruption-layer', // External service
    },
  },
};
```

### Ubiquitous Language

Create a shared vocabulary between developers and domain experts:

```typescript
// Bad: Technical terms
class DBRecord {
  status: number; // 0=pending, 1=confirmed, 2=shipped
  qty: number;
  prod_id: string;
}

// Good: Domain language
class Order {
  status: OrderStatus;
  quantity: Quantity;
  productId: ProductId;
}

enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
}
```

## Tactical Design

### Entities

Objects with unique identity that persist over time:

```typescript
// Entity base class
abstract class Entity<T> {
  protected readonly _id: T;
  
  constructor(id: T) {
    this._id = id;
  }
  
  equals(other: Entity<T>): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    return this._id === other._id;
  }
}

// Domain entity
export class Customer extends Entity<CustomerId> {
  private _email: Email;
  private _name: PersonName;
  private _status: CustomerStatus;
  
  constructor(
    id: CustomerId,
    email: Email,
    name: PersonName,
  ) {
    super(id);
    this._email = email;
    this._name = name;
    this._status = CustomerStatus.ACTIVE;
  }
  
  changeEmail(newEmail: Email): void {
    if (this._status !== CustomerStatus.ACTIVE) {
      throw new Error('Cannot change email for inactive customer');
    }
    this._email = newEmail;
  }
  
  get email(): Email {
    return this._email;
  }
}
```

### Value Objects

Immutable objects defined by their attributes:

```typescript
// Value object for email
export class Email {
  private readonly value: string;
  
  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new Error('Invalid email format');
    }
    this.value = value;
  }
  
  private isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  toString(): string {
    return this.value;
  }
  
  equals(other: Email): boolean {
    if (!other) return false;
    return this.value === other.value;
  }
}

// Value object for money
export class Money {
  constructor(
    private readonly amount: number,
    private readonly currency: Currency,
  ) {
    if (amount < 0) {
      throw new Error('Amount cannot be negative');
    }
  }
  
  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('Cannot add different currencies');
    }
    return new Money(
      this.amount + other.amount,
      this.currency
    );
  }
  
  multiply(factor: number): Money {
    return new Money(
      this.amount * factor,
      this.currency
    );
  }
}
```

### Aggregates

Clusters of entities and value objects with defined boundaries:

```typescript
// Aggregate root
export class Order extends Entity<OrderId> {
  private _customerId: CustomerId;
  private _items: OrderItem[];
  private _status: OrderStatus;
  private _totalAmount: Money;
  
  constructor(
    id: OrderId,
    customerId: CustomerId,
  ) {
    super(id);
    this._customerId = customerId;
    this._items = [];
    this._status = OrderStatus.DRAFT;
    this._totalAmount = Money.zero('USD');
  }
  
  // All modifications go through aggregate root
  addItem(
    productId: ProductId,
    quantity: Quantity,
    unitPrice: Money,
  ): void {
    if (this._status !== OrderStatus.DRAFT) {
      throw new Error('Cannot modify confirmed order');
    }
    
    const item = new OrderItem(
      productId,
      quantity,
      unitPrice,
    );
    
    this._items.push(item);
    this.recalculateTotal();
  }
  
  removeItem(productId: ProductId): void {
    if (this._status !== OrderStatus.DRAFT) {
      throw new Error('Cannot modify confirmed order');
    }
    
    this._items = this._items.filter(
      item => !item.productId.equals(productId)
    );
    this.recalculateTotal();
  }
  
  confirm(): DomainEvent[] {
    if (this._items.length === 0) {
      throw new Error('Cannot confirm empty order');
    }
    
    this._status = OrderStatus.CONFIRMED;
    
    return [
      new OrderConfirmedEvent(
        this._id,
        this._customerId,
        this._totalAmount,
        new Date(),
      ),
    ];
  }
  
  private recalculateTotal(): void {
    this._totalAmount = this._items.reduce(
      (total, item) => total.add(item.totalPrice),
      Money.zero('USD')
    );
  }
}

// Aggregate member (not accessible outside aggregate)
class OrderItem {
  constructor(
    public readonly productId: ProductId,
    public readonly quantity: Quantity,
    public readonly unitPrice: Money,
  ) {}
  
  get totalPrice(): Money {
    return this.unitPrice.multiply(this.quantity.value);
  }
}
```

### Domain Services

Operations that don't belong to entities or value objects:

```typescript
// Domain service for complex business logic
export class PricingService {
  constructor(
    private readonly discountRepository: DiscountRepository,
    private readonly taxCalculator: TaxCalculator,
  ) {}
  
  async calculateOrderTotal(
    order: Order,
    customerId: CustomerId,
  ): Promise<OrderPricing> {
    const subtotal = order.calculateSubtotal();
    const discounts = await this.discountRepository
      .findApplicableDiscounts(customerId, order);
    
    const discountAmount = this.applyDiscounts(
      subtotal,
      discounts
    );
    
    const taxAmount = await this.taxCalculator
      .calculateTax(subtotal.subtract(discountAmount));
    
    return new OrderPricing(
      subtotal,
      discountAmount,
      taxAmount,
      subtotal.subtract(discountAmount).add(taxAmount),
    );
  }
  
  private applyDiscounts(
    amount: Money,
    discounts: Discount[],
  ): Money {
    // Complex discount calculation logic
    return discounts.reduce(
      (total, discount) => total.add(discount.calculate(amount)),
      Money.zero(amount.currency)
    );
  }
}
```

### Domain Events

Capture important business occurrences:

```typescript
// Base domain event
export abstract class DomainEvent {
  public readonly occurredOn: Date;
  
  constructor() {
    this.occurredOn = new Date();
  }
  
  abstract get aggregateId(): string;
  abstract get eventType(): string;
  abstract get eventVersion(): number;
}

// Specific domain event
export class OrderConfirmedEvent extends DomainEvent {
  constructor(
    public readonly orderId: OrderId,
    public readonly customerId: CustomerId,
    public readonly totalAmount: Money,
    occurredOn: Date,
  ) {
    super();
    this.occurredOn = occurredOn;
  }
  
  get aggregateId(): string {
    return this.orderId.toString();
  }
  
  get eventType(): string {
    return 'OrderConfirmed';
  }
  
  get eventVersion(): number {
    return 1;
  }
}

// Event handler
export class OrderConfirmedHandler {
  constructor(
    private readonly emailService: EmailService,
    private readonly inventoryService: InventoryService,
  ) {}
  
  async handle(event: OrderConfirmedEvent): Promise<void> {
    // Send confirmation email
    await this.emailService.sendOrderConfirmation(
      event.customerId,
      event.orderId,
    );
    
    // Reserve inventory
    await this.inventoryService.reserveItems(
      event.orderId,
    );
  }
}
```

### Repositories

Abstract persistence concerns:

```typescript
// Repository interface (in domain layer)
export interface OrderRepository {
  findById(id: OrderId): Promise<Order | null>;
  save(order: Order): Promise<void>;
  findByCustomer(customerId: CustomerId): Promise<Order[]>;
}

// Implementation (in infrastructure layer)
export class PostgresOrderRepository implements OrderRepository {
  constructor(private readonly db: Database) {}
  
  async findById(id: OrderId): Promise<Order | null> {
    const data = await this.db.query(
      'SELECT * FROM orders WHERE id = $1',
      [id.value]
    );
    
    if (!data) return null;
    
    // Map from database to domain model
    return OrderMapper.toDomain(data);
  }
  
  async save(order: Order): Promise<void> {
    const data = OrderMapper.toPersistence(order);
    
    await this.db.query(
      `INSERT INTO orders (id, customer_id, status, data) 
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (id) DO UPDATE SET
         status = $3,
         data = $4`,
      [data.id, data.customerId, data.status, data.data]
    );
    
    // Publish domain events
    const events = order.getUncommittedEvents();
    for (const event of events) {
      await this.eventBus.publish(event);
    }
  }
}
```

## Application Services

Orchestrate use cases using domain objects:

```typescript
// Application service (use case)
export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
    private readonly pricingService: PricingService,
    private readonly eventBus: EventBus,
  ) {}
  
  async execute(command: CreateOrderCommand): Promise<OrderId> {
    // Validate products exist
    const products = await Promise.all(
      command.items.map(item =>
        this.productRepository.findById(item.productId)
      )
    );
    
    if (products.some(p => p === null)) {
      throw new Error('Invalid product in order');
    }
    
    // Create order aggregate
    const orderId = OrderId.generate();
    const order = new Order(orderId, command.customerId);
    
    // Add items to order
    for (const item of command.items) {
      const product = products.find(
        p => p!.id.equals(item.productId)
      )!;
      
      order.addItem(
        item.productId,
        new Quantity(item.quantity),
        product.price,
      );
    }
    
    // Calculate pricing
    const pricing = await this.pricingService
      .calculateOrderTotal(order, command.customerId);
    
    order.applyPricing(pricing);
    
    // Save and publish events
    await this.orderRepository.save(order);
    
    return orderId;
  }
}
```

## Folder Structure

### Recommended DDD Project Structure

```
src/
├── contexts/                    # Bounded contexts
│   ├── catalog/
│   │   ├── domain/             # Domain layer
│   │   │   ├── models/         # Entities, VOs, Aggregates
│   │   │   ├── events/         # Domain events
│   │   │   ├── services/       # Domain services
│   │   │   └── repositories/   # Repository interfaces
│   │   ├── application/        # Application layer
│   │   │   ├── commands/       # Command handlers
│   │   │   ├── queries/        # Query handlers
│   │   │   └── services/       # Application services
│   │   ├── infrastructure/     # Infrastructure layer
│   │   │   ├── persistence/    # Repository implementations
│   │   │   ├── messaging/      # Event bus, queues
│   │   │   └── external/       # External service adapters
│   │   └── presentation/       # Presentation layer
│   │       ├── http/           # REST controllers
│   │       ├── graphql/        # GraphQL resolvers
│   │       └── cli/            # CLI commands
│   └── ordering/
│       └── ... (same structure)
├── shared-kernel/              # Shared domain concepts
│   ├── domain/
│   └── types/
└── common/                     # Technical utilities
    ├── errors/
    ├── logging/
    └── validation/
```

## Testing Domain Logic

### Unit Testing Aggregates

```typescript
describe('Order Aggregate', () => {
  describe('addItem', () => {
    it('should add item to draft order', () => {
      const order = new Order(
        OrderId.generate(),
        CustomerId.fromString('customer-1')
      );
      
      const productId = ProductId.fromString('product-1');
      const quantity = new Quantity(2);
      const price = new Money(10, 'USD');
      
      order.addItem(productId, quantity, price);
      
      expect(order.items).toHaveLength(1);
      expect(order.totalAmount).toEqual(new Money(20, 'USD'));
    });
    
    it('should throw error when adding to confirmed order', () => {
      const order = createConfirmedOrder();
      
      expect(() => {
        order.addItem(/* ... */);
      }).toThrow('Cannot modify confirmed order');
    });
  });
  
  describe('confirm', () => {
    it('should emit OrderConfirmedEvent', () => {
      const order = createOrderWithItems();
      
      const events = order.confirm();
      
      expect(events).toHaveLength(1);
      expect(events[0]).toBeInstanceOf(OrderConfirmedEvent);
      expect(events[0].orderId).toEqual(order.id);
    });
  });
});
```

### Testing Domain Services

```typescript
describe('PricingService', () => {
  let pricingService: PricingService;
  let discountRepository: MockDiscountRepository;
  let taxCalculator: MockTaxCalculator;
  
  beforeEach(() => {
    discountRepository = new MockDiscountRepository();
    taxCalculator = new MockTaxCalculator();
    pricingService = new PricingService(
      discountRepository,
      taxCalculator
    );
  });
  
  it('should apply customer discounts', async () => {
    const order = createOrder({ subtotal: 100 });
    const customerId = CustomerId.fromString('vip-customer');
    
    discountRepository.setDiscounts([
      new PercentageDiscount(10), // 10% off
    ]);
    
    const pricing = await pricingService
      .calculateOrderTotal(order, customerId);
    
    expect(pricing.discountAmount).toEqual(new Money(10, 'USD'));
    expect(pricing.total).toEqual(new Money(90, 'USD'));
  });
});
```

### Integration Testing Use Cases

```typescript
describe('CreateOrderUseCase Integration', () => {
  let useCase: CreateOrderUseCase;
  let orderRepository: OrderRepository;
  let eventBus: EventBus;
  
  beforeEach(async () => {
    const container = await setupTestContainer();
    useCase = container.get(CreateOrderUseCase);
    orderRepository = container.get(OrderRepository);
    eventBus = container.get(EventBus);
  });
  
  it('should create order and publish events', async () => {
    const command = new CreateOrderCommand({
      customerId: 'customer-1',
      items: [
        { productId: 'product-1', quantity: 2 },
      ],
    });
    
    const orderId = await useCase.execute(command);
    
    // Verify order was saved
    const order = await orderRepository.findById(orderId);
    expect(order).toBeDefined();
    expect(order!.customerId).toEqual(command.customerId);
    
    // Verify events were published
    expect(eventBus.publishedEvents).toContainEqual(
      expect.objectContaining({
        eventType: 'OrderCreated',
        orderId: orderId.toString(),
      })
    );
  });
});
```

## Anti-Corruption Layer

Protect your domain from external systems:

```typescript
// External payment service interface
interface StripePaymentGateway {
  chargeCard(
    cardToken: string,
    amountCents: number,
    currency: string,
  ): Promise<{ id: string; status: string }>;
}

// Anti-corruption layer
export class PaymentAdapter implements PaymentService {
  constructor(
    private readonly stripeGateway: StripePaymentGateway,
  ) {}
  
  async processPayment(
    payment: Payment,
  ): Promise<PaymentResult> {
    try {
      // Transform domain model to external format
      const result = await this.stripeGateway.chargeCard(
        payment.cardToken.value,
        payment.amount.toMinorUnits(), // Convert to cents
        payment.amount.currency,
      );
      
      // Transform external response to domain model
      return PaymentResult.success(
        new PaymentId(result.id),
        payment.amount,
      );
    } catch (error) {
      // Transform external errors to domain errors
      return PaymentResult.failure(
        this.mapStripeError(error)
      );
    }
  }
  
  private mapStripeError(error: any): PaymentError {
    // Map external errors to domain-specific errors
    if (error.type === 'card_error') {
      return new InvalidCardError(error.message);
    }
    return new PaymentProcessingError('Payment failed');
  }
}
```

## CQRS Pattern

Separate read and write models when beneficial:

```typescript
// Command side (write model)
export class CreateProductCommand {
  constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly categoryId: string,
  ) {}
}

export class CreateProductHandler {
  constructor(
    private readonly repository: ProductRepository,
  ) {}
  
  async handle(command: CreateProductCommand): Promise<void> {
    const product = Product.create(
      new ProductName(command.name),
      new Money(command.price, 'USD'),
      new CategoryId(command.categoryId),
    );
    
    await this.repository.save(product);
  }
}

// Query side (read model)
export interface ProductListItemDTO {
  id: string;
  name: string;
  price: number;
  categoryName: string;
  inStock: boolean;
}

export class GetProductListQuery {
  constructor(
    public readonly categoryId?: string,
    public readonly page: number = 1,
    public readonly limit: number = 20,
  ) {}
}

export class GetProductListHandler {
  constructor(
    private readonly readDb: ReadDatabase,
  ) {}
  
  async handle(
    query: GetProductListQuery,
  ): Promise<ProductListItemDTO[]> {
    // Optimized read query with joins
    const sql = `
      SELECT 
        p.id,
        p.name,
        p.price,
        c.name as category_name,
        i.quantity > 0 as in_stock
      FROM product_read_model p
      JOIN categories c ON p.category_id = c.id
      LEFT JOIN inventory i ON p.id = i.product_id
      WHERE ($1::uuid IS NULL OR p.category_id = $1)
      ORDER BY p.name
      LIMIT $2 OFFSET $3
    `;
    
    return this.readDb.query(sql, [
      query.categoryId,
      query.limit,
      (query.page - 1) * query.limit,
    ]);
  }
}
```

## Common DDD Patterns

### Specification Pattern

```typescript
export abstract class Specification<T> {
  abstract isSatisfiedBy(candidate: T): boolean;
  
  and(other: Specification<T>): Specification<T> {
    return new AndSpecification(this, other);
  }
  
  or(other: Specification<T>): Specification<T> {
    return new OrSpecification(this, other);
  }
  
  not(): Specification<T> {
    return new NotSpecification(this);
  }
}

// Concrete specifications
export class PremiumCustomerSpecification 
  extends Specification<Customer> {
  isSatisfiedBy(customer: Customer): boolean {
    return customer.tier === CustomerTier.PREMIUM;
  }
}

export class ActiveCustomerSpecification 
  extends Specification<Customer> {
  isSatisfiedBy(customer: Customer): boolean {
    return customer.status === CustomerStatus.ACTIVE;
  }
}

// Usage
const eligibleForDiscount = new PremiumCustomerSpecification()
  .and(new ActiveCustomerSpecification());

if (eligibleForDiscount.isSatisfiedBy(customer)) {
  // Apply discount
}
```

### Factory Pattern

```typescript
export class OrderFactory {
  constructor(
    private readonly pricingService: PricingService,
    private readonly inventoryService: InventoryService,
  ) {}
  
  async createFromCart(
    cart: ShoppingCart,
    customerId: CustomerId,
  ): Promise<Order> {
    // Complex creation logic
    const order = new Order(
      OrderId.generate(),
      customerId,
    );
    
    for (const cartItem of cart.items) {
      const availability = await this.inventoryService
        .checkAvailability(cartItem.productId);
      
      if (!availability.isAvailable) {
        throw new ProductNotAvailableError(cartItem.productId);
      }
      
      const pricing = await this.pricingService
        .getProductPricing(cartItem.productId, customerId);
      
      order.addItem(
        cartItem.productId,
        cartItem.quantity,
        pricing.finalPrice,
      );
    }
    
    return order;
  }
}
```

## Best Practices

### Do's
- ✅ Start with the domain model, not the database
- ✅ Use ubiquitous language consistently
- ✅ Keep aggregates small and focused
- ✅ Model business invariants in the domain
- ✅ Use domain events for cross-aggregate communication
- ✅ Protect aggregates with repositories
- ✅ Test domain logic independently
- ✅ Collaborate closely with domain experts

### Don'ts
- ❌ Don't expose domain internals
- ❌ Don't let infrastructure concerns leak into domain
- ❌ Don't create anemic domain models
- ❌ Don't ignore bounded context boundaries
- ❌ Don't over-engineer simple domains
- ❌ Don't skip the discovery phase
- ❌ Don't use DDD for every project

### Common Anti-Patterns

```typescript
// ❌ Anemic Domain Model
class Order {
  public id: string;
  public items: OrderItem[];
  public status: string;
  public total: number;
}

class OrderService {
  addItem(order: Order, item: OrderItem) {
    order.items.push(item);
    order.total = this.calculateTotal(order);
  }
}

// ✅ Rich Domain Model
class Order {
  private _items: OrderItem[];
  private _total: Money;
  
  addItem(product: Product, quantity: Quantity): void {
    // Business logic encapsulated
    if (this.isConfirmed()) {
      throw new Error('Cannot modify confirmed order');
    }
    
    const item = new OrderItem(product, quantity);
    this._items.push(item);
    this.recalculateTotal();
  }
}
```

## Integration with Other Standards

### With Testing Standards
- Test domain logic with unit tests
- Test use cases with integration tests
- Use test data builders for complex aggregates

### With API Design
- Use DTOs to transform domain models for APIs
- Keep API contracts stable while domain evolves
- Map API operations to use cases

### With Code Organization
- Follow hexagonal architecture principles
- Keep domain layer independent
- Use dependency injection for flexibility

## Migration to DDD

### Gradual Adoption Strategy

1. **Identify Core Domain**
   - Find the most complex/valuable business area
   - Start with a single bounded context

2. **Extract Domain Model**
   - Move business logic from services to entities
   - Create value objects for concepts
   - Define aggregate boundaries

3. **Establish Boundaries**
   - Create anti-corruption layers
   - Define context mapping
   - Implement domain events

4. **Iterate and Refine**
   - Continuously refine the model
   - Add new bounded contexts
   - Improve ubiquitous language

