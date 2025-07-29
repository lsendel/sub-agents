---
name: documentation-standard
type: standard
version: 1.0.0
description: Comprehensive documentation standards for applications, microservices, modules, and components
author: Claude
tags: [documentation, standards, readme, docusaurus, automation]
related_commands: [/update-docs, /check-docs, /generate-docs]
---

# Documentation Standard

> Version: 1.0.0
> Last updated: 2025-01-29
> Purpose: Ensure consistent, comprehensive documentation across all levels of the codebase
> Automation: Integrated with CI/CD for continuous documentation maintenance

## Overview

This standard defines documentation requirements and structures for:
- Applications (full stack apps)
- Microservices (independent services)
- Modules (npm packages, libraries)
- Components (UI components, utilities)
- Submodules (internal modules)

## Related Processes

This standard is used by:
- **[analyze-product.md](../processes/analyze-product.md)** - Creating product documentation
- **[create-spec.md](../processes/create-spec.md)** - Writing feature specifications
- **[feature-development.md](../processes/feature-development.md)** - Updating documentation

## Documentation Hierarchy

```
project-root/
├── README.md                    # Project overview
├── docs/                        # Docusaurus documentation
│   ├── intro.md                # Getting started
│   ├── architecture/           # System design
│   ├── api/                    # API documentation
│   ├── guides/                 # How-to guides
│   └── reference/              # Technical reference
├── applications/
│   └── app-name/
│       ├── README.md           # App-specific docs
│       └── docs/               # Detailed app docs
├── microservices/
│   └── service-name/
│       ├── README.md           # Service overview
│       ├── API.md              # API specification
│       └── docs/               # Service docs
├── packages/
│   └── package-name/
│       ├── README.md           # Package docs
│       └── docs/               # Usage guides
└── components/
    └── component-name/
        ├── README.md           # Component docs
        └── component.stories.mdx # Storybook docs
```

## Documentation Templates

### 1. Application Documentation Template

```markdown
# [Application Name]

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-95%25-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

## Overview
Brief description of what this application does and its purpose in the system.

## Table of Contents
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Architecture
```mermaid
graph TD
    A[Frontend] --> B[API Gateway]
    B --> C[Auth Service]
    B --> D[Business Logic]
    D --> E[Database]
```

### Tech Stack
- **Frontend**: React 18, TypeScript, TailwindCSS
- **Backend**: Node.js, Express, PostgreSQL
- **Infrastructure**: Docker, Kubernetes, AWS

### Key Features
- Feature 1: Description
- Feature 2: Description
- Feature 3: Description

## Prerequisites
- Node.js >= 18.0.0
- PostgreSQL >= 14
- Docker (for containerized development)
- AWS CLI (for deployment)

## Installation

### Quick Start
```bash
# Clone the repository
git clone https://github.com/org/app-name.git
cd app-name

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

### Docker Setup
```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f
```

## Configuration

### Environment Variables
| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NODE_ENV` | Environment (development/production) | development | Yes |
| `DATABASE_URL` | PostgreSQL connection string | - | Yes |
| `JWT_SECRET` | Secret for JWT tokens | - | Yes |
| `API_KEY` | External API key | - | No |

### Configuration Files
- `config/default.json` - Default configuration
- `config/production.json` - Production overrides
- `config/custom-environment-variables.json` - Environment mapping

## Development

### Project Structure
```
src/
├── api/          # API routes and controllers
├── services/     # Business logic
├── models/       # Data models
├── utils/        # Utility functions
├── middleware/   # Express middleware
├── config/       # Configuration
└── tests/        # Test files
```

### Development Workflow
1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and test locally
3. Run linters: `npm run lint`
4. Run tests: `npm test`
5. Commit with conventional commits: `git commit -m "feat: add new feature"`
6. Push and create PR

### Code Style
- ESLint configuration: `.eslintrc.js`
- Prettier configuration: `.prettierrc`
- Run formatter: `npm run format`

## Testing

### Test Structure
```
tests/
├── unit/         # Unit tests
├── integration/  # Integration tests
├── e2e/         # End-to-end tests
└── fixtures/    # Test data
```

### Running Tests
```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run with coverage
npm run test:coverage

# Run e2e tests
npm run test:e2e
```

### Testing Strategy
- Unit tests: Jest
- Integration tests: Supertest
- E2E tests: Cypress
- Minimum coverage: 80%

## Deployment

### Environments
- **Development**: https://dev.app-name.com
- **Staging**: https://staging.app-name.com
- **Production**: https://app-name.com

### Deployment Process
```bash
# Build for production
npm run build

# Deploy to staging
npm run deploy:staging

# Deploy to production (requires approval)
npm run deploy:production
```

### CI/CD Pipeline
- GitHub Actions workflow: `.github/workflows/deploy.yml`
- Automated tests on PR
- Deployment on merge to main

## API Documentation

### Base URL
- Production: `https://api.app-name.com/v1`
- Staging: `https://staging-api.app-name.com/v1`

### Authentication
All API requests require authentication:
```http
Authorization: Bearer <token>
```

### Endpoints
See full API documentation at: https://docs.app-name.com/api

### Example Request
```bash
curl -X GET https://api.app-name.com/v1/users \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

## Monitoring

### Health Check
- Endpoint: `GET /health`
- Metrics: `GET /metrics`

### Logging
- Application logs: CloudWatch
- Error tracking: Sentry
- APM: DataDog

## Troubleshooting

### Common Issues

#### Database Connection Error
```
Error: ECONNREFUSED 127.0.0.1:5432
```
**Solution**: Ensure PostgreSQL is running and DATABASE_URL is correct.

#### Port Already in Use
```
Error: listen EADDRINUSE :::3000
```
**Solution**: Kill the process using the port or change PORT in .env

### Debug Mode
```bash
# Run with debug logging
DEBUG=app:* npm run dev
```

## Contributing
See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## License
[MIT License](./LICENSE)

## Support
- Documentation: https://docs.app-name.com
- Issues: https://github.com/org/app-name/issues
- Slack: #app-name-support

---
Last updated: 2025-01-29 | Version: 1.0.0
```

### 2. Microservice Documentation Template

```markdown
# [Service Name] Microservice

![Service Status](https://img.shields.io/badge/status-active-brightgreen)
![API Version](https://img.shields.io/badge/api-v2.0-blue)
![SLA](https://img.shields.io/badge/SLA-99.9%25-brightgreen)

## Overview
Purpose and responsibility of this microservice in the system architecture.

## Table of Contents
- [Architecture](#architecture)
- [API Specification](#api-specification)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Monitoring](#monitoring)
- [SLA](#sla)

## Architecture

### Service Context
```mermaid
graph LR
    A[API Gateway] --> B[This Service]
    B --> C[Database]
    B --> D[Cache]
    B --> E[Message Queue]
    B --> F[Other Service]
```

### Design Patterns
- Pattern: Explanation of why it's used
- CQRS: Separate read/write operations
- Circuit Breaker: Fault tolerance for external calls

### Data Flow
1. Request received from API Gateway
2. Authentication/Authorization check
3. Business logic processing
4. Data persistence/retrieval
5. Response formatting

## API Specification

### OpenAPI/Swagger
Full specification available at: `/swagger` endpoint

### Base Information
- **Base URL**: `https://api.example.com/service-name/v2`
- **Protocol**: HTTPS only
- **Format**: JSON (application/json)
- **Authentication**: OAuth 2.0 / JWT

### Endpoints

#### GET /resources
Retrieve list of resources with pagination

**Query Parameters:**
- `page` (integer): Page number, default: 1
- `limit` (integer): Items per page, default: 20, max: 100
- `sort` (string): Sort field, default: "created_at"
- `order` (string): Sort order (asc/desc), default: "desc"

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Resource Name",
      "created_at": "2025-01-29T10:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

#### POST /resources
Create a new resource

**Request Body:**
```json
{
  "name": "Resource Name",
  "description": "Resource Description",
  "metadata": {}
}
```

**Response:** 201 Created
```json
{
  "id": "uuid",
  "name": "Resource Name",
  "created_at": "2025-01-29T10:00:00Z"
}
```

### Error Responses
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "name",
        "message": "Name is required"
      }
    ]
  }
}
```

### Rate Limiting
- 1000 requests per hour per API key
- Headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

## Dependencies

### External Services
| Service | Purpose | SLA | Fallback |
|---------|---------|-----|----------|
| Auth Service | Token validation | 99.9% | Cache validated tokens |
| Database | Data persistence | 99.95% | Read replicas |
| Redis | Caching | 99.9% | Direct DB access |
| SQS | Message queue | 99.9% | In-memory queue |

### Libraries
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "pg": "^8.11.0",
    "redis": "^4.6.0",
    "winston": "^3.11.0"
  }
}
```

## Configuration

### Environment Variables
```bash
# Service Configuration
SERVICE_NAME=service-name
SERVICE_PORT=3001
NODE_ENV=production

# Database
DATABASE_URL=postgresql://user:pass@host:5432/db
DATABASE_POOL_SIZE=20

# Redis
REDIS_URL=redis://host:6379
REDIS_TTL=3600

# External Services
AUTH_SERVICE_URL=https://auth.example.com
AUTH_SERVICE_TIMEOUT=5000

# Monitoring
SENTRY_DSN=https://key@sentry.io/project
DATADOG_API_KEY=your-key
```

### Feature Flags
```json
{
  "features": {
    "new_algorithm": {
      "enabled": false,
      "rollout_percentage": 0
    },
    "enhanced_caching": {
      "enabled": true,
      "ttl_seconds": 300
    }
  }
}
```

## Development

### Local Setup
```bash
# Install dependencies
npm install

# Run database migrations
npm run migrate

# Seed development data
npm run seed

# Start development server
npm run dev
```

### Docker Development
```bash
# Build image
docker build -t service-name .

# Run with dependencies
docker-compose up
```

### Project Structure
```
src/
├── api/            # API routes
├── services/       # Business logic
├── repositories/   # Data access
├── models/         # Data models
├── middleware/     # Express middleware
├── utils/          # Utilities
├── config/         # Configuration
└── tests/          # Tests
```

## Testing

### Test Pyramid
- Unit Tests: 70% (repositories, services, utils)
- Integration Tests: 20% (API endpoints)
- Contract Tests: 10% (external services)

### Running Tests
```bash
# All tests
npm test

# Unit tests only
npm run test:unit

# Integration tests
npm run test:integration

# Contract tests
npm run test:contract

# Coverage report
npm run test:coverage
```

### Test Data
- Fixtures: `tests/fixtures/`
- Factories: `tests/factories/`
- Mocks: `tests/mocks/`

## Deployment

### Build Process
```bash
# Build Docker image
docker build -t service-name:$VERSION .

# Push to registry
docker push registry.example.com/service-name:$VERSION
```

### Kubernetes Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: service-name
spec:
  replicas: 3
  selector:
    matchLabels:
      app: service-name
  template:
    metadata:
      labels:
        app: service-name
    spec:
      containers:
      - name: service-name
        image: registry.example.com/service-name:1.0.0
        ports:
        - containerPort: 3001
        env:
        - name: NODE_ENV
          value: "production"
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

### Rollback Procedure
```bash
# List deployments
kubectl get deployments

# Rollback to previous version
kubectl rollout undo deployment/service-name

# Rollback to specific version
kubectl rollout undo deployment/service-name --to-revision=2
```

## Monitoring

### Health Checks
- Liveness: `GET /health/live`
- Readiness: `GET /health/ready`

### Metrics
- Endpoint: `GET /metrics`
- Format: Prometheus
- Key metrics:
  - Request rate
  - Error rate
  - Response time (p50, p95, p99)
  - Active connections

### Alerts
| Alert | Condition | Action |
|-------|-----------|--------|
| High Error Rate | 5xx > 1% for 5 min | Page on-call |
| High Latency | p95 > 1s for 10 min | Investigate |
| Low Availability | Uptime < 99.9% | Incident response |

### Dashboards
- Service Overview: https://grafana.example.com/d/service-name
- Business Metrics: https://grafana.example.com/d/service-name-business

## SLA

### Availability
- Target: 99.9% uptime
- Measurement: Successful health checks
- Exclusions: Planned maintenance

### Performance
- p50 response time: < 100ms
- p95 response time: < 500ms
- p99 response time: < 1000ms

### Support
- Critical issues: 15 min response
- High priority: 1 hour response
- Normal priority: 1 business day

## Troubleshooting

### Common Issues

#### Connection Pool Exhausted
**Symptoms**: Timeouts, connection errors
**Solution**: Increase `DATABASE_POOL_SIZE` or optimize queries

#### Memory Leak
**Symptoms**: Increasing memory usage, OOM kills
**Solution**: Check for circular references, upgrade dependencies

### Debug Tools
```bash
# Enable debug logging
DEBUG=service:* npm start

# Memory profiling
node --inspect src/server.js

# Performance profiling
node --prof src/server.js
```

## Migration Guide

### From v1 to v2
1. Update client libraries
2. Update authentication method
3. Migrate from `/api/v1/*` to `/v2/*`
4. Update response parsing for new format

## Contact
- Team: #team-service-name
- On-call: PagerDuty - Service Name Team
- Email: service-name-team@example.com

---
Last updated: 2025-01-29 | Version: 2.0.0 | Owners: Team Name
```

### 3. Module/Package Documentation Template

```markdown
# [Package Name]

![npm version](https://img.shields.io/npm/v/package-name.svg)
![downloads](https://img.shields.io/npm/dm/package-name.svg)
![license](https://img.shields.io/npm/l/package-name.svg)
![build status](https://img.shields.io/github/workflow/status/org/package-name/CI)

> Brief description of what this package does

## Features

- ✅ Feature 1 with brief description
- ✅ Feature 2 with brief description
- ✅ Feature 3 with brief description
- ✅ TypeScript support
- ✅ Zero dependencies
- ✅ Tree-shakeable

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Configuration](#configuration)
- [TypeScript](#typescript)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
npm install package-name
# or
yarn add package-name
# or
pnpm add package-name
```

## Quick Start

```javascript
import { mainFunction } from 'package-name';

// Basic usage
const result = mainFunction('input');
console.log(result);

// With options
const customResult = mainFunction('input', {
  option1: true,
  option2: 'value'
});
```

## API Reference

### mainFunction(input, options?)

Main function description.

#### Parameters

- `input` (string | number): Description of input parameter
- `options` (object, optional): Configuration options
  - `option1` (boolean): Description of option1. Default: `false`
  - `option2` (string): Description of option2. Default: `'default'`
  - `callback` (function): Optional callback function

#### Returns

`Promise<Result>`: Description of return value

#### Example

```javascript
const result = await mainFunction('test', {
  option1: true,
  option2: 'custom'
});
```

### helperFunction(param)

Helper function description.

#### Parameters

- `param` (any): Description

#### Returns

`any`: Description

### Class: MainClass

Main class description.

#### Constructor

```javascript
const instance = new MainClass(config);
```

##### Parameters

- `config` (object): Configuration object
  - `property1` (string): Description
  - `property2` (number): Description

#### Methods

##### method1(arg)

Method description.

###### Parameters

- `arg` (type): Description

###### Returns

`ReturnType`: Description

###### Example

```javascript
const result = instance.method1('argument');
```

## Examples

### Basic Example

```javascript
import { mainFunction } from 'package-name';

async function example() {
  try {
    const result = await mainFunction('input');
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### Advanced Example

```javascript
import { MainClass, helperFunction } from 'package-name';

const instance = new MainClass({
  property1: 'value',
  property2: 42
});

// Using with async/await
async function advancedExample() {
  const processed = helperFunction(rawData);
  const result = await instance.method1(processed);
  
  return result;
}

// Using with promises
function promiseExample() {
  return instance.method2()
    .then(result => {
      console.log('Result:', result);
      return result;
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}
```

### Real-world Use Cases

#### Use Case 1: Data Processing

```javascript
import { processData } from 'package-name';

const rawData = [/* ... */];

const processed = processData(rawData, {
  filter: item => item.active,
  transform: item => ({
    ...item,
    timestamp: new Date()
  }),
  batch: 100
});
```

#### Use Case 2: Integration Example

```javascript
import express from 'express';
import { middleware } from 'package-name';

const app = express();

// Use as middleware
app.use(middleware({
  option1: true,
  option2: 'value'
}));

// Use in route
app.get('/api/data', async (req, res) => {
  const result = await mainFunction(req.query.input);
  res.json(result);
});
```

## Configuration

### Global Configuration

```javascript
import { configure } from 'package-name';

configure({
  globalOption1: 'value',
  globalOption2: true,
  debug: process.env.NODE_ENV === 'development'
});
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PACKAGE_NAME_API_KEY` | API key for external service | - |
| `PACKAGE_NAME_TIMEOUT` | Request timeout in ms | 5000 |
| `PACKAGE_NAME_DEBUG` | Enable debug logging | false |

## TypeScript

This package includes TypeScript definitions.

```typescript
import { mainFunction, MainFunctionOptions, Result } from 'package-name';

const options: MainFunctionOptions = {
  option1: true,
  option2: 'value'
};

const result: Result = await mainFunction('input', options);
```

### Type Definitions

```typescript
interface MainFunctionOptions {
  option1?: boolean;
  option2?: string;
  callback?: (error: Error | null, result?: Result) => void;
}

interface Result {
  success: boolean;
  data: any;
  metadata: {
    timestamp: Date;
    version: string;
  };
}

type ProcessFunction = (input: string, options?: MainFunctionOptions) => Promise<Result>;
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch
```

### Writing Tests

```javascript
import { mainFunction } from 'package-name';

describe('mainFunction', () => {
  it('should process input correctly', async () => {
    const result = await mainFunction('test');
    expect(result).toEqual({
      success: true,
      data: 'processed test'
    });
  });

  it('should handle errors', async () => {
    await expect(mainFunction(null)).rejects.toThrow('Invalid input');
  });
});
```

## Benchmarks

```bash
# Run benchmarks
npm run benchmark
```

Results on MacBook Pro M1:
- mainFunction: 1,234,567 ops/sec
- helperFunction: 2,345,678 ops/sec

## Migration Guide

### From v1.x to v2.0

1. Update import statements:
   ```javascript
   // Before
   const packageName = require('package-name');
   
   // After
   import { mainFunction } from 'package-name';
   ```

2. Update API calls:
   ```javascript
   // Before
   packageName.process('input', callback);
   
   // After
   const result = await mainFunction('input');
   ```

## Troubleshooting

### Common Issues

#### Issue: "Module not found"
**Solution**: Ensure you're using Node.js >= 14 and have installed the package correctly.

#### Issue: "Invalid options"
**Solution**: Check that your options object matches the expected schema.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

## License

MIT © [Your Name]

## Related

- [related-package-1](https://github.com/org/related-package-1) - Description
- [related-package-2](https://github.com/org/related-package-2) - Description

---

Made with ❤️ by [Your Name](https://github.com/username)
```

### 4. Database Documentation Template

```markdown
# [Database Name] Database Documentation

> Database system for [application/service name]
> Engine: PostgreSQL 15.x / MySQL 8.x / MongoDB 6.x

## Overview

Brief description of the database purpose, data it stores, and its role in the system.

## Database Information

| Property | Value |
|----------|-------|
| Engine | PostgreSQL 15.3 |
| Host | db.example.com |
| Port | 5432 |
| Database Name | app_production |
| Connection Pool | 20-100 connections |
| Backup Schedule | Daily at 2 AM UTC |
| Retention Policy | 30 days |

## Schema Design

### Entity Relationship Diagram

```mermaid
erDiagram
    users ||--o{ orders : places
    users ||--o{ addresses : has
    orders ||--|{ order_items : contains
    order_items }o--|| products : includes
    products }o--|| categories : belongs_to
    
    users {
        uuid id PK
        string email UK
        string password_hash
        string first_name
        string last_name
        timestamp created_at
        timestamp updated_at
        boolean is_active
        jsonb metadata
    }
    
    orders {
        uuid id PK
        uuid user_id FK
        string status
        decimal total_amount
        timestamp ordered_at
        timestamp shipped_at
        jsonb shipping_address
    }
    
    products {
        uuid id PK
        string sku UK
        string name
        text description
        decimal price
        integer stock_quantity
        uuid category_id FK
        boolean is_active
    }
```

### Tables

#### users
Primary table for user accounts.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | Unique identifier |
| email | VARCHAR(255) | UNIQUE, NOT NULL | User email address |
| password_hash | VARCHAR(255) | NOT NULL | Bcrypt hashed password |
| first_name | VARCHAR(100) | NOT NULL | User's first name |
| last_name | VARCHAR(100) | NOT NULL | User's last name |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Account creation time |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update time |
| is_active | BOOLEAN | NOT NULL, DEFAULT true | Account status |
| metadata | JSONB | DEFAULT '{}' | Additional user data |

**Indexes:**
- `idx_users_email` ON email (unique)
- `idx_users_created_at` ON created_at
- `idx_users_is_active` ON is_active WHERE is_active = true

**Triggers:**
- `update_updated_at` - Updates updated_at on row modification

#### orders
Stores customer orders.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Order identifier |
| user_id | UUID | FOREIGN KEY (users.id) | Customer reference |
| status | VARCHAR(50) | NOT NULL, CHECK | Order status |
| total_amount | DECIMAL(10,2) | NOT NULL, CHECK > 0 | Order total |
| ordered_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | Order placement time |
| shipped_at | TIMESTAMP | | Shipping time |
| shipping_address | JSONB | NOT NULL | Denormalized address |

**Indexes:**
- `idx_orders_user_id` ON user_id
- `idx_orders_status` ON status
- `idx_orders_ordered_at` ON ordered_at DESC

**Constraints:**
- `chk_order_status` CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled'))
- `chk_positive_amount` CHECK (total_amount > 0)

### Views

#### v_user_order_summary
Aggregated view of user order statistics.

```sql
CREATE VIEW v_user_order_summary AS
SELECT 
    u.id,
    u.email,
    COUNT(o.id) as total_orders,
    SUM(o.total_amount) as lifetime_value,
    MAX(o.ordered_at) as last_order_date,
    AVG(o.total_amount) as avg_order_value
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.email;
```

#### v_inventory_status
Real-time inventory status view.

```sql
CREATE VIEW v_inventory_status AS
SELECT 
    p.id,
    p.sku,
    p.name,
    p.stock_quantity,
    COALESCE(SUM(oi.quantity), 0) as pending_orders,
    p.stock_quantity - COALESCE(SUM(oi.quantity), 0) as available_stock
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.id AND o.status IN ('pending', 'processing')
GROUP BY p.id;
```

### Stored Procedures & Functions

#### fn_calculate_order_total
Calculates order total with tax and shipping.

```sql
CREATE OR REPLACE FUNCTION fn_calculate_order_total(
    p_order_id UUID
) RETURNS DECIMAL(10,2) AS $$
DECLARE
    v_subtotal DECIMAL(10,2);
    v_tax_rate DECIMAL(4,3) := 0.08;
    v_shipping DECIMAL(10,2);
BEGIN
    -- Calculate subtotal
    SELECT SUM(oi.quantity * p.price)
    INTO v_subtotal
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    WHERE oi.order_id = p_order_id;
    
    -- Calculate shipping (simplified)
    v_shipping := CASE 
        WHEN v_subtotal >= 100 THEN 0
        ELSE 10
    END;
    
    RETURN v_subtotal + (v_subtotal * v_tax_rate) + v_shipping;
END;
$$ LANGUAGE plpgsql;
```

#### sp_cleanup_inactive_users
Cleanup procedure for inactive users.

```sql
CREATE OR REPLACE PROCEDURE sp_cleanup_inactive_users(
    p_days_inactive INTEGER DEFAULT 365
) AS $$
BEGIN
    -- Archive users to audit table
    INSERT INTO users_archive
    SELECT *, NOW() as archived_at
    FROM users
    WHERE is_active = false 
    AND updated_at < NOW() - INTERVAL '1 day' * p_days_inactive;
    
    -- Delete from main table
    DELETE FROM users
    WHERE is_active = false 
    AND updated_at < NOW() - INTERVAL '1 day' * p_days_inactive;
    
    RAISE NOTICE 'Archived % inactive users', ROW_COUNT;
END;
$$ LANGUAGE plpgsql;
```

### Triggers

#### trg_update_updated_at
Auto-update timestamp trigger.

```sql
CREATE OR REPLACE FUNCTION fn_update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION fn_update_updated_at();
```

#### trg_validate_order_items
Validate order items before insert.

```sql
CREATE OR REPLACE FUNCTION fn_validate_order_items()
RETURNS TRIGGER AS $$
BEGIN
    -- Check product availability
    IF NOT EXISTS (
        SELECT 1 FROM products 
        WHERE id = NEW.product_id 
        AND is_active = true
        AND stock_quantity >= NEW.quantity
    ) THEN
        RAISE EXCEPTION 'Product % is not available or insufficient stock', NEW.product_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

## Migration Strategy

### Version Control
All database changes are managed through versioned migration files.

```
migrations/
├── V001__initial_schema.sql
├── V002__add_user_metadata.sql
├── V003__create_order_views.sql
├── V004__add_inventory_tracking.sql
└── V005__performance_indexes.sql
```

### Migration Process
```bash
# Run migrations
flyway migrate

# Validate migrations
flyway validate

# Rollback last migration
flyway undo

# Get migration info
flyway info
```

### Rollback Procedures
Each migration should have a corresponding rollback script:

```sql
-- Migration V003
CREATE VIEW v_user_order_summary AS ...;

-- Rollback V003
DROP VIEW IF EXISTS v_user_order_summary;
```

## Performance Optimization

### Indexing Strategy

#### Query Pattern Analysis
```sql
-- Most common queries and their indexes
-- 1. User lookup by email
SELECT * FROM users WHERE email = ?;
-- Index: idx_users_email

-- 2. Recent orders by user
SELECT * FROM orders WHERE user_id = ? ORDER BY ordered_at DESC;
-- Index: idx_orders_user_id_ordered_at

-- 3. Orders by status
SELECT * FROM orders WHERE status = 'pending';
-- Index: idx_orders_status
```

#### Index Maintenance
```sql
-- Analyze index usage
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan;

-- Find missing indexes
SELECT 
    schemaname,
    tablename,
    attname,
    n_distinct,
    most_common_vals
FROM pg_stats
WHERE n_distinct > 100
AND schemaname = 'public';
```

### Query Optimization

#### Slow Query Log Analysis
```sql
-- Enable slow query logging
ALTER SYSTEM SET log_min_duration_statement = 1000; -- Log queries > 1s

-- Analyze slow queries
SELECT 
    query,
    calls,
    total_time,
    mean_time,
    stddev_time,
    rows
FROM pg_stat_statements
WHERE mean_time > 1000
ORDER BY mean_time DESC
LIMIT 20;
```

#### Query Plans
```sql
-- Example: Analyzing order search query
EXPLAIN (ANALYZE, BUFFERS) 
SELECT o.*, u.email, u.first_name, u.last_name
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE o.status = 'pending'
AND o.ordered_at >= NOW() - INTERVAL '7 days'
ORDER BY o.ordered_at DESC
LIMIT 100;
```

### Partitioning Strategy

#### Time-based Partitioning for Orders
```sql
-- Create partitioned table
CREATE TABLE orders_partitioned (
    LIKE orders INCLUDING ALL
) PARTITION BY RANGE (ordered_at);

-- Create monthly partitions
CREATE TABLE orders_2024_01 PARTITION OF orders_partitioned
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

CREATE TABLE orders_2024_02 PARTITION OF orders_partitioned
    FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');

-- Automated partition creation
CREATE OR REPLACE FUNCTION create_monthly_partition()
RETURNS void AS $$
DECLARE
    start_date date;
    end_date date;
    partition_name text;
BEGIN
    start_date := date_trunc('month', CURRENT_DATE);
    end_date := start_date + interval '1 month';
    partition_name := 'orders_' || to_char(start_date, 'YYYY_MM');
    
    EXECUTE format('CREATE TABLE IF NOT EXISTS %I PARTITION OF orders_partitioned FOR VALUES FROM (%L) TO (%L)',
        partition_name, start_date, end_date);
END;
$$ LANGUAGE plpgsql;
```

## Security

### Access Control

#### Role-Based Access
```sql
-- Application roles
CREATE ROLE app_read;
CREATE ROLE app_write;
CREATE ROLE app_admin;

-- Read-only permissions
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_read;
GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO app_read;

-- Write permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_write;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO app_write;

-- Admin permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO app_admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO app_admin;
GRANT CREATE ON SCHEMA public TO app_admin;

-- Application users
CREATE USER app_api WITH PASSWORD 'secure_password';
GRANT app_write TO app_api;

CREATE USER app_analytics WITH PASSWORD 'secure_password';
GRANT app_read TO app_analytics;
```

#### Row-Level Security
```sql
-- Enable RLS on sensitive tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy for users to see only their own data
CREATE POLICY users_isolation ON users
    FOR ALL
    TO app_api
    USING (id = current_setting('app.current_user_id')::uuid);

-- Policy for admins to see all data
CREATE POLICY admin_all_access ON users
    FOR ALL
    TO app_admin
    USING (true);
```

### Data Encryption

#### At-Rest Encryption
```sql
-- Enable transparent data encryption (TDE)
-- PostgreSQL: Use filesystem encryption or pgcrypto

-- Encrypt sensitive columns
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Example: Encrypting PII
ALTER TABLE users 
ADD COLUMN ssn_encrypted bytea;

UPDATE users 
SET ssn_encrypted = pgp_sym_encrypt(ssn, 'encryption_key')
WHERE ssn IS NOT NULL;

-- Decrypt when needed
SELECT 
    id,
    pgp_sym_decrypt(ssn_encrypted, 'encryption_key') as ssn
FROM users
WHERE id = ?;
```

#### In-Transit Encryption
```yaml
# PostgreSQL SSL configuration
ssl = on
ssl_cert_file = 'server.crt'
ssl_key_file = 'server.key'
ssl_ca_file = 'root.crt'
ssl_ciphers = 'HIGH:MEDIUM:+3DES:!aNULL'
ssl_prefer_server_ciphers = on
```

### Audit Trail

#### Audit Table Structure
```sql
CREATE TABLE audit_log (
    id BIGSERIAL PRIMARY KEY,
    table_name VARCHAR(100) NOT NULL,
    operation VARCHAR(10) NOT NULL,
    user_id UUID,
    changed_at TIMESTAMP NOT NULL DEFAULT NOW(),
    old_values JSONB,
    new_values JSONB,
    query TEXT,
    ip_address INET
);

CREATE INDEX idx_audit_log_table_name ON audit_log(table_name);
CREATE INDEX idx_audit_log_user_id ON audit_log(user_id);
CREATE INDEX idx_audit_log_changed_at ON audit_log(changed_at);
```

#### Generic Audit Trigger
```sql
CREATE OR REPLACE FUNCTION fn_audit_trigger()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_log (
        table_name,
        operation,
        user_id,
        old_values,
        new_values,
        query,
        ip_address
    ) VALUES (
        TG_TABLE_NAME,
        TG_OP,
        current_setting('app.current_user_id', true)::uuid,
        CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN to_jsonb(OLD) END,
        CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN to_jsonb(NEW) END,
        current_query(),
        inet_client_addr()
    );
    
    RETURN CASE
        WHEN TG_OP = 'DELETE' THEN OLD
        ELSE NEW
    END;
END;
$$ LANGUAGE plpgsql;

-- Apply to sensitive tables
CREATE TRIGGER trg_audit_users
AFTER INSERT OR UPDATE OR DELETE ON users
FOR EACH ROW EXECUTE FUNCTION fn_audit_trigger();
```

## Backup & Recovery

### Backup Strategy

#### Automated Backups
```bash
#!/bin/bash
# backup.sh - Daily backup script

DB_NAME="app_production"
BACKUP_DIR="/backups/postgres"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/$DB_NAME_$TIMESTAMP.sql.gz"

# Full backup with compression
pg_dump -h localhost -U postgres -d $DB_NAME | gzip > $BACKUP_FILE

# Verify backup
if [ $? -eq 0 ]; then
    echo "Backup successful: $BACKUP_FILE"
    # Upload to S3
    aws s3 cp $BACKUP_FILE s3://backups-bucket/postgres/
else
    echo "Backup failed"
    exit 1
fi

# Cleanup old backups (keep 30 days)
find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete
```

#### Point-in-Time Recovery (PITR)
```bash
# PostgreSQL configuration for PITR
archive_mode = on
archive_command = 'test ! -f /archive/%f && cp %p /archive/%f'
wal_level = replica
max_wal_senders = 3
```

### Recovery Procedures

#### Full Database Restore
```bash
# Restore from backup
gunzip < backup_file.sql.gz | psql -U postgres -d $DB_NAME

# Restore to specific point in time
pg_basebackup -h localhost -D /var/lib/postgresql/data_restore -U replicator -v -P

# Recovery configuration
restore_command = 'cp /archive/%f %p'
recovery_target_time = '2024-01-15 14:30:00'
```

#### Table-Level Recovery
```sql
-- Restore single table from backup
-- 1. Create temporary database
CREATE DATABASE temp_restore;

-- 2. Restore backup to temp database
-- gunzip < backup.sql.gz | psql -d temp_restore

-- 3. Copy table to production
INSERT INTO production.users
SELECT * FROM temp_restore.users
WHERE id NOT IN (SELECT id FROM production.users);

-- 4. Cleanup
DROP DATABASE temp_restore;
```

## Monitoring & Maintenance

### Health Checks

#### Database Health Queries
```sql
-- Connection statistics
SELECT 
    datname,
    numbackends,
    xact_commit,
    xact_rollback,
    blks_read,
    blks_hit,
    tup_returned,
    tup_fetched,
    tup_inserted,
    tup_updated,
    tup_deleted
FROM pg_stat_database
WHERE datname = current_database();

-- Table bloat check
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size,
    pg_size_pretty(pg_relation_size(schemaname||'.'||tablename)) as table_size,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename) - pg_relation_size(schemaname||'.'||tablename)) as index_size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Long-running queries
SELECT 
    pid,
    now() - pg_stat_activity.query_start AS duration,
    query,
    state
FROM pg_stat_activity
WHERE (now() - pg_stat_activity.query_start) > interval '5 minutes'
AND state != 'idle';
```

#### Automated Health Check Script
```python
# db_health_check.py
import psycopg2
import json
from datetime import datetime

def check_database_health(conn_string):
    health_report = {
        "timestamp": datetime.now().isoformat(),
        "status": "healthy",
        "checks": {}
    }
    
    try:
        conn = psycopg2.connect(conn_string)
        cur = conn.cursor()
        
        # Check connection count
        cur.execute("""
            SELECT count(*) 
            FROM pg_stat_activity 
            WHERE state = 'active'
        """)
        active_connections = cur.fetchone()[0]
        health_report["checks"]["active_connections"] = {
            "value": active_connections,
            "status": "ok" if active_connections < 80 else "warning"
        }
        
        # Check replication lag
        cur.execute("""
            SELECT 
                client_addr,
                state,
                sent_lsn - replay_lsn AS lag_bytes
            FROM pg_stat_replication
        """)
        replication = cur.fetchall()
        health_report["checks"]["replication"] = {
            "replicas": len(replication),
            "max_lag": max([r[2] for r in replication]) if replication else 0
        }
        
        # Check table bloat
        cur.execute("""
            SELECT 
                COUNT(*) 
            FROM pg_stat_user_tables 
            WHERE n_dead_tup > n_live_tup * 0.2
        """)
        bloated_tables = cur.fetchone()[0]
        health_report["checks"]["bloated_tables"] = {
            "count": bloated_tables,
            "status": "ok" if bloated_tables == 0 else "warning"
        }
        
    except Exception as e:
        health_report["status"] = "unhealthy"
        health_report["error"] = str(e)
    
    return health_report
```

### Maintenance Tasks

#### Regular Maintenance Schedule
```sql
-- Daily tasks
VACUUM ANALYZE;  -- Update statistics and clean up

-- Weekly tasks
REINDEX INDEX CONCURRENTLY idx_orders_user_id;  -- Rebuild bloated indexes

-- Monthly tasks
VACUUM FULL large_table;  -- Full vacuum for very large tables

-- Quarterly tasks
CLUSTER orders USING idx_orders_ordered_at;  -- Physically reorder table
```

#### Automated Maintenance Script
```bash
#!/bin/bash
# maintenance.sh

# Daily vacuum
psql -U postgres -d app_production -c "VACUUM ANALYZE;"

# Update table statistics
psql -U postgres -d app_production -c "ANALYZE;"

# Check for bloated indexes
psql -U postgres -d app_production -c "
SELECT 
    schemaname,
    tablename,
    indexname,
    pg_size_pretty(pg_relation_size(indexrelid)) AS index_size
FROM pg_stat_user_indexes
JOIN pg_index ON pg_stat_user_indexes.indexrelid = pg_index.indexrelid
WHERE pg_relation_size(indexrelid) > 100000000  -- 100MB
ORDER BY pg_relation_size(indexrelid) DESC;"

# Archive old audit logs
psql -U postgres -d app_production -c "
INSERT INTO audit_log_archive 
SELECT * FROM audit_log 
WHERE changed_at < NOW() - INTERVAL '90 days';

DELETE FROM audit_log 
WHERE changed_at < NOW() - INTERVAL '90 days';"
```

## Troubleshooting

### Common Issues

#### Connection Pool Exhaustion
**Symptoms:** "FATAL: remaining connection slots are reserved"
```sql
-- Check current connections
SELECT 
    pid,
    usename,
    application_name,
    client_addr,
    state,
    query_start,
    state_change
FROM pg_stat_activity
ORDER BY query_start;

-- Terminate idle connections
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE state = 'idle'
AND state_change < NOW() - INTERVAL '10 minutes';
```

#### Lock Contention
**Symptoms:** Queries hanging, deadlocks
```sql
-- View current locks
SELECT 
    locktype,
    database,
    relation::regclass,
    mode,
    granted,
    pid
FROM pg_locks
WHERE NOT granted;

-- Find blocking queries
SELECT 
    blocked_locks.pid AS blocked_pid,
    blocked_activity.usename AS blocked_user,
    blocking_locks.pid AS blocking_pid,
    blocking_activity.usename AS blocking_user,
    blocked_activity.query AS blocked_statement,
    blocking_activity.query AS blocking_statement
FROM pg_catalog.pg_locks blocked_locks
JOIN pg_catalog.pg_stat_activity blocked_activity ON blocked_activity.pid = blocked_locks.pid
JOIN pg_catalog.pg_locks blocking_locks ON blocking_locks.locktype = blocked_locks.locktype
    AND blocking_locks.database IS NOT DISTINCT FROM blocked_locks.database
    AND blocking_locks.relation IS NOT DISTINCT FROM blocked_locks.relation
    AND blocking_locks.page IS NOT DISTINCT FROM blocked_locks.page
    AND blocking_locks.tuple IS NOT DISTINCT FROM blocked_locks.tuple
    AND blocking_locks.virtualxid IS NOT DISTINCT FROM blocked_locks.virtualxid
    AND blocking_locks.transactionid IS NOT DISTINCT FROM blocked_locks.transactionid
    AND blocking_locks.classid IS NOT DISTINCT FROM blocked_locks.classid
    AND blocking_locks.objid IS NOT DISTINCT FROM blocked_locks.objid
    AND blocking_locks.objsubid IS NOT DISTINCT FROM blocked_locks.objsubid
    AND blocking_locks.pid != blocked_locks.pid
JOIN pg_catalog.pg_stat_activity blocking_activity ON blocking_activity.pid = blocking_locks.pid
WHERE NOT blocked_locks.granted;
```

#### Performance Degradation
**Symptoms:** Slow queries, high CPU usage
```sql
-- Reset statistics
SELECT pg_stat_reset();

-- Wait for some activity, then analyze
SELECT 
    schemaname,
    tablename,
    n_tup_ins,
    n_tup_upd,
    n_tup_del,
    n_live_tup,
    n_dead_tup,
    last_vacuum,
    last_autovacuum
FROM pg_stat_user_tables
WHERE n_dead_tup > 1000
ORDER BY n_dead_tup DESC;

-- Force analyze on specific table
ANALYZE verbose users;
```

## Development Guidelines

### Naming Conventions

#### Tables
- Use plural, lowercase, snake_case: `users`, `order_items`
- Junction tables: `users_roles`, `products_categories`

#### Columns
- Primary keys: `id` (UUID preferred)
- Foreign keys: `<table>_id` (e.g., `user_id`, `product_id`)
- Timestamps: `created_at`, `updated_at`, `deleted_at`
- Booleans: `is_<state>` or `has_<feature>` (e.g., `is_active`, `has_premium`)

#### Indexes
- Primary key: `pk_<table>`
- Foreign key: `fk_<table>_<column>`
- Other indexes: `idx_<table>_<column(s)>`
- Unique constraint: `uq_<table>_<column(s)>`

#### Constraints
- Check: `chk_<table>_<description>`
- Not null: Defined inline with column

### SQL Style Guide

```sql
-- Good example
SELECT 
    u.id,
    u.email,
    u.first_name,
    COUNT(o.id) AS order_count,
    SUM(o.total_amount) AS total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= '2024-01-01'
    AND u.is_active = true
GROUP BY u.id, u.email, u.first_name
HAVING COUNT(o.id) > 0
ORDER BY total_spent DESC
LIMIT 100;

-- Use CTEs for complex queries
WITH active_users AS (
    SELECT id, email
    FROM users
    WHERE is_active = true
        AND created_at >= NOW() - INTERVAL '30 days'
),
user_orders AS (
    SELECT 
        user_id,
        COUNT(*) as order_count,
        SUM(total_amount) as total_spent
    FROM orders
    WHERE status != 'cancelled'
    GROUP BY user_id
)
SELECT 
    au.email,
    COALESCE(uo.order_count, 0) as orders,
    COALESCE(uo.total_spent, 0) as revenue
FROM active_users au
LEFT JOIN user_orders uo ON au.id = uo.user_id
ORDER BY revenue DESC;
```

### Change Management

#### Migration Best Practices
```sql
-- Always use transactions for DDL changes
BEGIN;

-- Add column with default (safe)
ALTER TABLE users 
ADD COLUMN preference JSONB DEFAULT '{}';

-- Add NOT NULL constraint (requires backfill)
UPDATE users SET preference = '{}' WHERE preference IS NULL;
ALTER TABLE users 
ALTER COLUMN preference SET NOT NULL;

-- Create index concurrently (non-blocking)
CREATE INDEX CONCURRENTLY idx_users_preference 
ON users USING gin(preference);

COMMIT;

-- For large tables, batch updates
DO $$
DECLARE
    batch_size INTEGER := 1000;
    offset_val INTEGER := 0;
BEGIN
    LOOP
        UPDATE users 
        SET preference = '{}'
        WHERE id IN (
            SELECT id FROM users 
            WHERE preference IS NULL 
            LIMIT batch_size 
            OFFSET offset_val
        );
        
        EXIT WHEN NOT FOUND;
        offset_val := offset_val + batch_size;
        
        -- Prevent lock buildup
        PERFORM pg_sleep(0.1);
    END LOOP;
END $$;
```

## Integration

### Connection Pooling

#### PgBouncer Configuration
```ini
[databases]
app_production = host=localhost port=5432 dbname=app_production

[pgbouncer]
listen_port = 6432
listen_addr = *
auth_type = md5
auth_file = /etc/pgbouncer/userlist.txt
pool_mode = transaction
max_client_conn = 1000
default_pool_size = 25
reserve_pool_size = 5
reserve_pool_timeout = 3
server_lifetime = 3600
server_idle_timeout = 600
```

#### Application Configuration
```yaml
# Node.js with pg-pool
database:
  host: localhost
  port: 6432  # PgBouncer port
  database: app_production
  user: app_user
  password: ${DB_PASSWORD}
  max: 20  # Connection pool size
  idleTimeoutMillis: 30000
  connectionTimeoutMillis: 2000
```

### ORM Configuration

#### TypeORM Example
```typescript
// ormconfig.ts
export default {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,  // Never in production
  logging: process.env.NODE_ENV === 'development',
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscribers'
  },
  extra: {
    max: 20,  // Connection pool
    ssl: process.env.NODE_ENV === 'production' ? {
      rejectUnauthorized: false
    } : false
  }
};
```

## References

### Documentation Links
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [MongoDB Documentation](https://docs.mongodb.com/)

### Monitoring Tools
- [pgAdmin](https://www.pgadmin.org/)
- [DataDog Database Monitoring](https://www.datadoghq.com/database-monitoring/)
- [Prometheus PostgreSQL Exporter](https://github.com/prometheus-community/postgres_exporter)

### Performance Resources
- [PostgreSQL Performance Tuning](https://wiki.postgresql.org/wiki/Performance_Optimization)
- [Use The Index, Luke](https://use-the-index-luke.com/)
- [PostgreSQL Query Planner](https://www.postgresql.org/docs/current/using-explain.html)

---
Last updated: 2025-01-29 | Maintained by: Database Team
```

### 5. API Documentation Template

```markdown
# [API Name] API Documentation

> RESTful API / GraphQL API / gRPC Service
> Version: 2.0.0
> Base URL: https://api.example.com/v2

## Overview

Brief description of the API, its purpose, and main features.

## Table of Contents
- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [Rate Limiting](#rate-limiting)
- [Endpoints](#endpoints)
- [Data Models](#data-models)
- [Error Handling](#error-handling)
- [Webhooks](#webhooks)
- [GraphQL Schema](#graphql-schema)
- [WebSocket Events](#websocket-events)
- [SDKs & Libraries](#sdks--libraries)
- [Changelog](#changelog)

## Getting Started

### Quick Start
```bash
# Get your API key from https://dashboard.example.com
export API_KEY="your_api_key_here"

# Make your first request
curl -H "Authorization: Bearer $API_KEY" \
     https://api.example.com/v2/users
```

### Base URLs
- Production: `https://api.example.com/v2`
- Staging: `https://staging-api.example.com/v2`
- Development: `http://localhost:3000/v2`

### API Versioning
This API uses URL versioning. Always include the version in your requests:
- Current version: `/v2`
- Previous version: `/v1` (deprecated, sunset date: 2024-12-31)

## Authentication

### API Key Authentication
Include your API key in the Authorization header:
```http
Authorization: Bearer YOUR_API_KEY
```

### OAuth 2.0
For user-specific actions, use OAuth 2.0:

#### Authorization Flow
```http
GET https://api.example.com/oauth/authorize?
    client_id=YOUR_CLIENT_ID&
    redirect_uri=YOUR_REDIRECT_URI&
    response_type=code&
    scope=read:users write:users&
    state=RANDOM_STRING
```

#### Token Exchange
```http
POST https://api.example.com/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
code=AUTHORIZATION_CODE&
client_id=YOUR_CLIENT_ID&
client_secret=YOUR_CLIENT_SECRET&
redirect_uri=YOUR_REDIRECT_URI
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "scope": "read:users write:users"
}
```

### JWT Claims
Decoded JWT tokens contain:
```json
{
  "sub": "user_id",
  "iat": 1516239022,
  "exp": 1516242622,
  "scope": ["read:users", "write:users"],
  "client_id": "your_client_id"
}
```

## Rate Limiting

### Limits
| Plan | Requests/Hour | Burst | Concurrent |
|------|---------------|-------|------------|
| Free | 1,000 | 100/min | 10 |
| Pro | 10,000 | 500/min | 50 |
| Enterprise | 100,000 | 2000/min | 200 |

### Headers
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
X-RateLimit-Retry-After: 3600
```

### Rate Limit Response
```http
HTTP/1.1 429 Too Many Requests
Content-Type: application/json

{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "API rate limit exceeded",
    "retry_after": 3600
  }
}
```

## Endpoints

### OpenAPI Specification
Full OpenAPI 3.0 specification available at: https://api.example.com/v2/openapi.json

### Users Resource

#### List Users
```http
GET /users
```

Query Parameters:
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | integer | 1 | Page number |
| per_page | integer | 20 | Items per page (max: 100) |
| sort | string | created_at | Sort field |
| order | string | desc | Sort order (asc/desc) |
| filter[status] | string | - | Filter by status |
| filter[created_after] | date | - | Filter by creation date |
| include | string | - | Include related resources |

Example Request:
```bash
curl -X GET "https://api.example.com/v2/users?page=2&per_page=50&include=profile,settings" \
     -H "Authorization: Bearer YOUR_API_KEY"
```

Example Response:
```json
{
  "data": [
    {
      "id": "usr_1234567890",
      "type": "user",
      "attributes": {
        "email": "user@example.com",
        "name": "John Doe",
        "status": "active",
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-01-20T14:22:00Z"
      },
      "relationships": {
        "profile": {
          "data": {
            "id": "prf_0987654321",
            "type": "profile"
          }
        }
      }
    }
  ],
  "included": [
    {
      "id": "prf_0987654321",
      "type": "profile",
      "attributes": {
        "bio": "Software developer",
        "avatar_url": "https://cdn.example.com/avatars/user.jpg"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 2,
      "per_page": 50,
      "total": 1234,
      "pages": 25
    }
  },
  "links": {
    "self": "https://api.example.com/v2/users?page=2",
    "first": "https://api.example.com/v2/users?page=1",
    "prev": "https://api.example.com/v2/users?page=1",
    "next": "https://api.example.com/v2/users?page=3",
    "last": "https://api.example.com/v2/users?page=25"
  }
}
```

#### Get User
```http
GET /users/{user_id}
```

Path Parameters:
- `user_id` (required): User identifier

Example Request:
```bash
curl -X GET "https://api.example.com/v2/users/usr_1234567890" \
     -H "Authorization: Bearer YOUR_API_KEY"
```

#### Create User
```http
POST /users
```

Request Body:
```json
{
  "data": {
    "type": "user",
    "attributes": {
      "email": "newuser@example.com",
      "name": "Jane Smith",
      "password": "SecurePassword123!",
      "profile": {
        "bio": "Product manager",
        "timezone": "America/New_York"
      }
    }
  }
}
```

Response: `201 Created`
```json
{
  "data": {
    "id": "usr_2345678901",
    "type": "user",
    "attributes": {
      "email": "newuser@example.com",
      "name": "Jane Smith",
      "status": "pending",
      "created_at": "2024-01-21T09:15:00Z"
    },
    "links": {
      "self": "https://api.example.com/v2/users/usr_2345678901"
    }
  }
}
```

#### Update User
```http
PATCH /users/{user_id}
```

Request Body (JSON Patch):
```json
[
  {
    "op": "replace",
    "path": "/name",
    "value": "Jane Doe"
  },
  {
    "op": "add",
    "path": "/metadata/preferences",
    "value": {
      "theme": "dark",
      "notifications": true
    }
  }
]
```

#### Delete User
```http
DELETE /users/{user_id}
```

Response: `204 No Content`

### Batch Operations

#### Batch Create
```http
POST /batch/users
```

Request:
```json
{
  "data": [
    {
      "type": "user",
      "attributes": {
        "email": "user1@example.com",
        "name": "User One"
      }
    },
    {
      "type": "user",
      "attributes": {
        "email": "user2@example.com",
        "name": "User Two"
      }
    }
  ]
}
```

Response:
```json
{
  "data": [
    {
      "id": "usr_3456789012",
      "status": "created"
    },
    {
      "id": null,
      "status": "error",
      "error": {
        "code": "DUPLICATE_EMAIL",
        "message": "Email already exists"
      }
    }
  ]
}
```

### Async Operations

#### Long-Running Tasks
```http
POST /tasks/export-users
```

Request:
```json
{
  "format": "csv",
  "filters": {
    "created_after": "2024-01-01"
  },
  "callback_url": "https://webhook.site/unique-id"
}
```

Response: `202 Accepted`
```json
{
  "task_id": "tsk_4567890123",
  "status": "pending",
  "links": {
    "self": "https://api.example.com/v2/tasks/tsk_4567890123"
  }
}
```

#### Check Task Status
```http
GET /tasks/{task_id}
```

Response:
```json
{
  "id": "tsk_4567890123",
  "status": "completed",
  "progress": 100,
  "result": {
    "file_url": "https://cdn.example.com/exports/users_20240121.csv",
    "expires_at": "2024-01-22T09:15:00Z"
  }
}
```

## Data Models

### JSON Schema Definitions

#### User Model
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["email", "name"],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^usr_[a-zA-Z0-9]{10}$",
      "readOnly": true
    },
    "email": {
      "type": "string",
      "format": "email",
      "maxLength": 255
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100
    },
    "status": {
      "type": "string",
      "enum": ["active", "inactive", "pending", "suspended"],
      "default": "pending"
    },
    "metadata": {
      "type": "object",
      "additionalProperties": true
    },
    "created_at": {
      "type": "string",
      "format": "date-time",
      "readOnly": true
    },
    "updated_at": {
      "type": "string",
      "format": "date-time",
      "readOnly": true
    }
  }
}
```

### Enumerations

#### Status Values
- `active`: User can access the system
- `inactive`: User voluntarily deactivated account
- `pending`: Awaiting email verification
- `suspended`: Account suspended by admin

## Error Handling

### Error Response Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request contains invalid parameters",
    "details": [
      {
        "field": "email",
        "code": "INVALID_FORMAT",
        "message": "Email format is invalid"
      },
      {
        "field": "age",
        "code": "OUT_OF_RANGE",
        "message": "Age must be between 13 and 120"
      }
    ],
    "request_id": "req_5678901234",
    "documentation_url": "https://docs.example.com/errors/VALIDATION_ERROR"
  }
}
```

### Common Error Codes

| HTTP Status | Error Code | Description |
|-------------|------------|-------------|
| 400 | INVALID_REQUEST | Request format is invalid |
| 400 | VALIDATION_ERROR | Request parameters failed validation |
| 401 | UNAUTHORIZED | Missing or invalid authentication |
| 403 | FORBIDDEN | Valid auth but insufficient permissions |
| 404 | NOT_FOUND | Resource does not exist |
| 409 | CONFLICT | Resource conflict (e.g., duplicate) |
| 422 | UNPROCESSABLE_ENTITY | Semantic errors in request |
| 429 | RATE_LIMIT_EXCEEDED | Too many requests |
| 500 | INTERNAL_ERROR | Server error |
| 503 | SERVICE_UNAVAILABLE | Temporary unavailability |

### Error Recovery

#### Retry Strategy
```javascript
async function apiCall(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      
      if (response.status === 429) {
        const retryAfter = response.headers.get('X-RateLimit-Retry-After');
        await sleep(retryAfter * 1000);
        continue;
      }
      
      if (response.status >= 500) {
        await sleep(Math.pow(2, i) * 1000); // Exponential backoff
        continue;
      }
      
      return response;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await sleep(Math.pow(2, i) * 1000);
    }
  }
}
```

## Webhooks

### Webhook Configuration
```http
POST /webhooks
```

Request:
```json
{
  "url": "https://example.com/webhooks/api",
  "events": ["user.created", "user.updated", "order.completed"],
  "secret": "whsec_1234567890abcdef",
  "active": true
}
```

### Webhook Payload
```json
{
  "id": "evt_6789012345",
  "type": "user.created",
  "created_at": "2024-01-21T10:30:00Z",
  "data": {
    "id": "usr_1234567890",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Webhook Security
Verify webhook signatures:
```javascript
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}
```

### Webhook Events

| Event | Description | Payload |
|-------|-------------|---------|
| user.created | New user registered | User object |
| user.updated | User profile updated | User object with changes |
| user.deleted | User account deleted | User ID |
| order.created | New order placed | Order object |
| order.completed | Order fulfilled | Order object |
| payment.succeeded | Payment processed | Payment object |
| payment.failed | Payment failed | Payment object with error |

## GraphQL Schema

### Schema Definition
```graphql
type Query {
  user(id: ID!): User
  users(
    first: Int
    after: String
    filter: UserFilter
    orderBy: UserOrderBy
  ): UserConnection!
  
  me: User
}

type Mutation {
  createUser(input: CreateUserInput!): CreateUserPayload!
  updateUser(id: ID!, input: UpdateUserInput!): UpdateUserPayload!
  deleteUser(id: ID!): DeleteUserPayload!
}

type Subscription {
  userUpdated(id: ID!): User!
  orderStatusChanged(userId: ID!): Order!
}

type User {
  id: ID!
  email: String!
  name: String!
  status: UserStatus!
  profile: Profile
  orders(first: Int, after: String): OrderConnection!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Profile {
  id: ID!
  bio: String
  avatarUrl: String
  preferences: JSON
}

enum UserStatus {
  ACTIVE
  INACTIVE
  PENDING
  SUSPENDED
}

input CreateUserInput {
  email: String!
  name: String!
  password: String!
  profile: ProfileInput
}

input ProfileInput {
  bio: String
  avatarUrl: String
}

type CreateUserPayload {
  user: User
  errors: [Error!]
}

type Error {
  field: String
  message: String!
}
```

### GraphQL Examples

#### Query Example
```graphql
query GetUserWithOrders($userId: ID!, $orderLimit: Int = 10) {
  user(id: $userId) {
    id
    email
    name
    orders(first: $orderLimit) {
      edges {
        node {
          id
          totalAmount
          status
          createdAt
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
```

#### Mutation Example
```graphql
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    user {
      id
      email
      name
    }
    errors {
      field
      message
    }
  }
}
```

#### Subscription Example
```graphql
subscription OnUserUpdated($userId: ID!) {
  userUpdated(id: $userId) {
    id
    name
    status
    updatedAt
  }
}
```

## WebSocket Events

### Connection
```javascript
const ws = new WebSocket('wss://api.example.com/v2/ws');

ws.onopen = () => {
  // Authenticate
  ws.send(JSON.stringify({
    type: 'auth',
    token: 'YOUR_API_KEY'
  }));
};
```

### Event Types

#### Subscribe to Events
```json
{
  "type": "subscribe",
  "channels": ["users.usr_1234567890", "orders"]
}
```

#### Real-time Updates
```json
{
  "type": "update",
  "channel": "users.usr_1234567890",
  "data": {
    "id": "usr_1234567890",
    "changes": {
      "status": "active"
    }
  }
}
```

### WebSocket Error Handling
```javascript
ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

ws.onclose = (event) => {
  if (event.code === 1006) {
    // Abnormal closure, implement reconnection
    setTimeout(reconnect, 5000);
  }
};
```

## SDKs & Libraries

### Official SDKs

#### JavaScript/TypeScript
```bash
npm install @example/api-client
```

```typescript
import { ApiClient } from '@example/api-client';

const client = new ApiClient({
  apiKey: process.env.API_KEY,
  version: 'v2',
  timeout: 5000
});

// Async/await
const users = await client.users.list({ 
  page: 1, 
  perPage: 20 
});

// Promises
client.users.create({
  email: 'user@example.com',
  name: 'John Doe'
}).then(user => {
  console.log('User created:', user.id);
}).catch(error => {
  console.error('Error:', error.message);
});
```

#### Python
```bash
pip install example-api
```

```python
from example_api import Client
from example_api.exceptions import RateLimitError

client = Client(api_key="YOUR_API_KEY")

try:
    # List users
    users = client.users.list(page=1, per_page=20)
    
    # Create user
    user = client.users.create(
        email="user@example.com",
        name="John Doe"
    )
    
    # Async support
    async with client.async_session() as session:
        users = await session.users.list()
        
except RateLimitError as e:
    print(f"Rate limit exceeded. Retry after {e.retry_after} seconds")
```

#### Go
```bash
go get github.com/example/api-go
```

```go
package main

import (
    "context"
    "github.com/example/api-go"
)

func main() {
    client := api.NewClient("YOUR_API_KEY")
    
    // List users
    users, err := client.Users.List(context.Background(), &api.ListOptions{
        Page: 1,
        PerPage: 20,
    })
    
    if err != nil {
        log.Fatal(err)
    }
    
    // Create user
    user, err := client.Users.Create(context.Background(), &api.UserCreateRequest{
        Email: "user@example.com",
        Name: "John Doe",
    })
}
```

### Community Libraries
- Ruby: [example-ruby](https://github.com/community/example-ruby)
- PHP: [example-php](https://github.com/community/example-php)
- Java: [example-java](https://github.com/community/example-java)
- .NET: [example-dotnet](https://github.com/community/example-dotnet)

## Testing

### Test Environment
Base URL: `https://sandbox.api.example.com/v2`

Test API Keys:
- Read-only: `test_readonly_key`
- Read-write: `test_readwrite_key`

### Test Data
Pre-populated test resources:
- Users: `usr_test_1` through `usr_test_100`
- Orders: `ord_test_1` through `ord_test_50`

### Integration Testing

#### Postman Collection
Download our Postman collection: [API v2 Collection](https://www.getpostman.com/collections/example)

#### cURL Examples
```bash
# Test authentication
curl -I -H "Authorization: Bearer test_readonly_key" \
     https://sandbox.api.example.com/v2/users

# Test error handling
curl -X POST https://sandbox.api.example.com/v2/users \
     -H "Authorization: Bearer test_readonly_key" \
     -H "Content-Type: application/json" \
     -d '{"invalid": "data"}'
```

### Load Testing
```yaml
# k6 load test script
import http from 'k6/http';
import { check } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 100 },
    { duration: '1m', target: 100 },
    { duration: '30s', target: 0 },
  ],
};

export default function() {
  let response = http.get('https://sandbox.api.example.com/v2/users', {
    headers: {
      'Authorization': 'Bearer test_readonly_key',
    },
  });
  
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
}
```

## Changelog

### Version 2.0.0 (2024-01-15)
#### Breaking Changes
- Removed deprecated `/users/profile` endpoint (use `/users/{id}?include=profile`)
- Changed pagination parameter from `limit` to `per_page`
- Renamed `user_type` field to `status`

#### New Features
- Added GraphQL endpoint at `/graphql`
- WebSocket support for real-time updates
- Batch operations for all resources
- Field filtering with `fields` parameter

#### Improvements
- 50% faster response times
- Improved error messages with field-level details
- Added ETag support for caching

### Version 1.5.0 (2023-10-01)
- Added webhook support
- Introduced API key scopes
- Added async task endpoints

## Migration Guide

### From v1 to v2

#### Authentication Changes
```javascript
// v1
headers: {
  'X-API-Key': 'your_key'
}

// v2
headers: {
  'Authorization': 'Bearer your_key'
}
```

#### Pagination Changes
```javascript
// v1
const response = await fetch('/users?page=1&limit=20');

// v2
const response = await fetch('/users?page=1&per_page=20');
```

#### Response Format Changes
```javascript
// v1 response
{
  "users": [...],
  "total": 100,
  "page": 1
}

// v2 response
{
  "data": [...],
  "meta": {
    "pagination": {
      "total": 100,
      "page": 1,
      "per_page": 20
    }
  }
}
```

## Support

### Resources
- API Status: https://status.example.com
- Support Portal: https://support.example.com
- Developer Forum: https://forum.example.com

### Contact
- Email: api-support@example.com
- Slack: [Join our community](https://slack.example.com)
- GitHub Issues: https://github.com/example/api/issues

### SLA
- Uptime: 99.9% for Pro and Enterprise plans
- Response time: < 200ms p95
- Support response: 24 hours for Pro, 1 hour for Enterprise

---
Last updated: 2024-01-21 | API Version: 2.0.0
```

### 6. Test Documentation Template

```markdown
# Testing Documentation

> Comprehensive testing strategy and documentation for [Project Name]
> Coverage Target: 80% | Current: 85.3%

## Overview

This document outlines the testing strategy, standards, and procedures for ensuring code quality and reliability.

## Table of Contents
- [Testing Strategy](#testing-strategy)
- [Test Structure](#test-structure)
- [Unit Testing](#unit-testing)
- [Integration Testing](#integration-testing)
- [End-to-End Testing](#end-to-end-testing)
- [Performance Testing](#performance-testing)
- [Security Testing](#security-testing)
- [Test Data Management](#test-data-management)
- [CI/CD Integration](#cicd-integration)
- [Coverage Reports](#coverage-reports)

## Testing Strategy

### Testing Pyramid
```
         /\
        /E2E\      (5%)  - Critical user journeys
       /------\
      /  API   \   (15%) - Service integration
     /----------\
    / Integration\ (20%) - Component integration  
   /--------------\
  /   Unit Tests   \ (60%) - Individual functions
 /------------------\
```

### Test Categories

| Category | Purpose | Tools | Execution Time |
|----------|---------|-------|----------------|
| Unit | Test individual functions | Jest, Mocha | < 5 min |
| Integration | Test component interaction | Jest, Supertest | < 10 min |
| API | Test API contracts | Postman, Pact | < 15 min |
| E2E | Test user workflows | Cypress, Playwright | < 30 min |
| Performance | Test load capacity | k6, JMeter | < 60 min |
| Security | Test vulnerabilities | OWASP ZAP | < 45 min |

## Test Structure

### Directory Organization
```
tests/
├── unit/                 # Unit tests
│   ├── services/        # Business logic tests
│   ├── utils/           # Utility function tests
│   └── models/          # Data model tests
├── integration/         # Integration tests
│   ├── api/            # API endpoint tests
│   ├── database/       # Database integration
│   └── external/       # External service tests
├── e2e/                # End-to-end tests
│   ├── workflows/      # User journey tests
│   └── smoke/          # Critical path tests
├── performance/        # Performance tests
│   ├── load/          # Load testing scripts
│   └── stress/        # Stress testing scripts
├── fixtures/          # Test data
├── mocks/            # Mock implementations
└── helpers/          # Test utilities
```

## Unit Testing

### Standards and Best Practices

#### Test File Naming
```
- Source: src/services/UserService.ts
- Test:   tests/unit/services/UserService.test.ts
```

#### Test Structure (AAA Pattern)
```typescript
describe('UserService', () => {
  describe('createUser', () => {
    it('should create a user with valid data', async () => {
      // Arrange
      const userData = {
        email: 'test@example.com',
        name: 'Test User'
      };
      const mockRepository = {
        save: jest.fn().mockResolvedValue({ id: '123', ...userData })
      };
      const service = new UserService(mockRepository);
      
      // Act
      const result = await service.createUser(userData);
      
      // Assert
      expect(result).toHaveProperty('id');
      expect(result.email).toBe(userData.email);
      expect(mockRepository.save).toHaveBeenCalledWith(userData);
    });
    
    it('should throw error for duplicate email', async () => {
      // Arrange
      const userData = { email: 'existing@example.com', name: 'Test' };
      const mockRepository = {
        findByEmail: jest.fn().mockResolvedValue({ id: '123' }),
        save: jest.fn()
      };
      const service = new UserService(mockRepository);
      
      // Act & Assert
      await expect(service.createUser(userData))
        .rejects.toThrow('Email already exists');
      expect(mockRepository.save).not.toHaveBeenCalled();
    });
  });
});
```

### Test Categories

#### Pure Functions
```typescript
// utils/calculator.test.ts
describe('Calculator', () => {
  describe('add', () => {
    it.each([
      [1, 2, 3],
      [0, 0, 0],
      [-1, 1, 0],
      [0.1, 0.2, 0.3]
    ])('add(%i, %i) = %i', (a, b, expected) => {
      expect(add(a, b)).toBeCloseTo(expected);
    });
  });
});
```

#### Async Functions
```typescript
// services/ApiService.test.ts
describe('ApiService', () => {
  describe('fetchData', () => {
    it('should handle successful response', async () => {
      const mockFetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ data: 'test' })
      });
      global.fetch = mockFetch;
      
      const result = await fetchData('/api/test');
      
      expect(result).toEqual({ data: 'test' });
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/test',
        expect.any(Object)
      );
    });
    
    it('should handle network errors', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
      
      await expect(fetchData('/api/test'))
        .rejects.toThrow('Network error');
    });
  });
});
```

#### Component Testing (React)
```typescript
// components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('calls onClick handler', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('is disabled when loading', () => {
    render(<Button loading>Click</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Mocking Strategies

#### Mock External Dependencies
```typescript
// mocks/database.ts
export const mockDatabase = {
  query: jest.fn(),
  transaction: jest.fn((callback) => callback()),
  close: jest.fn()
};

// In test file
jest.mock('../database', () => ({
  getConnection: () => mockDatabase
}));
```

#### Mock Time-based Functions
```typescript
describe('TokenService', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-01'));
  });
  
  afterEach(() => {
    jest.useRealTimers();
  });
  
  it('should expire token after 1 hour', () => {
    const token = TokenService.create();
    
    jest.advanceTimersByTime(3600000); // 1 hour
    
    expect(TokenService.isExpired(token)).toBe(true);
  });
});
```

## Integration Testing

### API Integration Tests

```typescript
// tests/integration/api/users.test.ts
import request from 'supertest';
import { app } from '../../../src/app';
import { database } from '../../../src/database';

describe('Users API', () => {
  beforeAll(async () => {
    await database.migrate();
  });
  
  afterAll(async () => {
    await database.close();
  });
  
  beforeEach(async () => {
    await database.truncate(['users']);
  });
  
  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const userData = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'SecurePass123!'
      };
      
      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);
      
      expect(response.body).toMatchObject({
        id: expect.any(String),
        email: userData.email,
        name: userData.name
      });
      
      // Verify in database
      const user = await database.query(
        'SELECT * FROM users WHERE email = ?',
        [userData.email]
      );
      expect(user).toHaveLength(1);
    });
    
    it('should validate email format', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          email: 'invalid-email',
          name: 'Test User',
          password: 'SecurePass123!'
        })
        .expect(400);
      
      expect(response.body.error).toMatchObject({
        code: 'VALIDATION_ERROR',
        details: expect.arrayContaining([
          expect.objectContaining({
            field: 'email',
            message: expect.stringContaining('valid email')
          })
        ])
      });
    });
  });
  
  describe('GET /api/users/:id', () => {
    it('should return user by id', async () => {
      // Seed user
      const user = await database.query(
        'INSERT INTO users (email, name) VALUES (?, ?) RETURNING *',
        ['test@example.com', 'Test User']
      );
      
      const response = await request(app)
        .get(`/api/users/${user[0].id}`)
        .set('Authorization', 'Bearer test-token')
        .expect(200);
      
      expect(response.body).toMatchObject({
        id: user[0].id,
        email: 'test@example.com',
        name: 'Test User'
      });
    });
    
    it('should return 404 for non-existent user', async () => {
      await request(app)
        .get('/api/users/non-existent-id')
        .set('Authorization', 'Bearer test-token')
        .expect(404);
    });
  });
});
```

### Database Integration Tests

```typescript
// tests/integration/database/UserRepository.test.ts
import { UserRepository } from '../../../src/repositories/UserRepository';
import { database } from '../../../src/database';

describe('UserRepository', () => {
  let repository: UserRepository;
  
  beforeAll(async () => {
    await database.connect();
    repository = new UserRepository(database);
  });
  
  afterAll(async () => {
    await database.close();
  });
  
  beforeEach(async () => {
    await database.query('DELETE FROM users');
  });
  
  describe('create', () => {
    it('should create user with transaction', async () => {
      const userData = {
        email: 'test@example.com',
        name: 'Test User'
      };
      
      const user = await repository.create(userData);
      
      expect(user).toMatchObject({
        id: expect.any(String),
        ...userData,
        created_at: expect.any(Date)
      });
      
      // Verify transaction rolled back on error
      try {
        await repository.create({
          email: 'test@example.com', // Duplicate
          name: 'Another User'
        });
      } catch (error) {
        // Transaction should have rolled back
        const count = await database.query(
          'SELECT COUNT(*) as count FROM users'
        );
        expect(count[0].count).toBe(1);
      }
    });
  });
  
  describe('findByEmail', () => {
    it('should use index for email lookup', async () => {
      // Create user
      await repository.create({
        email: 'test@example.com',
        name: 'Test User'
      });
      
      // Explain query to verify index usage
      const explain = await database.query(
        'EXPLAIN SELECT * FROM users WHERE email = ?',
        ['test@example.com']
      );
      
      expect(explain[0].key).toBe('idx_users_email');
    });
  });
});
```

### External Service Integration

```typescript
// tests/integration/external/PaymentService.test.ts
import { PaymentService } from '../../../src/services/PaymentService';
import nock from 'nock';

describe('PaymentService Integration', () => {
  let service: PaymentService;
  
  beforeAll(() => {
    service = new PaymentService({
      apiKey: process.env.PAYMENT_TEST_KEY,
      baseUrl: 'https://api.payment.test'
    });
  });
  
  afterEach(() => {
    nock.cleanAll();
  });
  
  describe('processPayment', () => {
    it('should handle successful payment', async () => {
      const mockResponse = {
        id: 'pay_123',
        status: 'succeeded',
        amount: 1000
      };
      
      nock('https://api.payment.test')
        .post('/v1/charges')
        .reply(200, mockResponse);
      
      const result = await service.processPayment({
        amount: 1000,
        currency: 'usd',
        source: 'tok_visa'
      });
      
      expect(result).toMatchObject(mockResponse);
    });
    
    it('should handle payment failure', async () => {
      nock('https://api.payment.test')
        .post('/v1/charges')
        .reply(402, {
          error: {
            type: 'card_error',
            message: 'Card declined'
          }
        });
      
      await expect(
        service.processPayment({
          amount: 1000,
          currency: 'usd',
          source: 'tok_declined'
        })
      ).rejects.toThrow('Card declined');
    });
  });
});
```

## End-to-End Testing

### Test Scenarios

```typescript
// tests/e2e/workflows/user-registration.spec.ts
import { test, expect } from '@playwright/test';

test.describe('User Registration Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });
  
  test('should complete registration successfully', async ({ page }) => {
    // Navigate to registration
    await page.click('text=Sign Up');
    
    // Fill registration form
    await page.fill('input[name="email"]', 'newuser@example.com');
    await page.fill('input[name="name"]', 'New User');
    await page.fill('input[name="password"]', 'SecurePass123!');
    await page.fill('input[name="confirmPassword"]', 'SecurePass123!');
    
    // Accept terms
    await page.check('input[name="acceptTerms"]');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Verify email sent
    await expect(page.locator('text=Check your email')).toBeVisible();
    
    // Simulate email click (in test environment)
    const confirmUrl = await page.evaluate(() => {
      return window.testHelpers?.getLastEmailLink();
    });
    await page.goto(confirmUrl);
    
    // Verify account activated
    await expect(page.locator('text=Account activated')).toBeVisible();
    
    // Login with new account
    await page.fill('input[name="email"]', 'newuser@example.com');
    await page.fill('input[name="password"]', 'SecurePass123!');
    await page.click('button[type="submit"]');
    
    // Verify logged in
    await expect(page.locator('text=Welcome, New User')).toBeVisible();
  });
  
  test('should show validation errors', async ({ page }) => {
    await page.click('text=Sign Up');
    
    // Submit empty form
    await page.click('button[type="submit"]');
    
    // Check validation messages
    await expect(page.locator('text=Email is required')).toBeVisible();
    await expect(page.locator('text=Name is required')).toBeVisible();
    await expect(page.locator('text=Password is required')).toBeVisible();
    
    // Test weak password
    await page.fill('input[name="password"]', '123');
    await page.click('button[type="submit"]');
    
    await expect(
      page.locator('text=Password must be at least 8 characters')
    ).toBeVisible();
  });
});
```

### Visual Regression Testing

```typescript
// tests/e2e/visual/homepage.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Visual Regression', () => {
  test('homepage should match snapshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Hide dynamic content
    await page.evaluate(() => {
      document.querySelectorAll('[data-testid="timestamp"]')
        .forEach(el => el.textContent = '2024-01-01');
    });
    
    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });
  
  test('dark mode should match snapshot', async ({ page }) => {
    await page.goto('/');
    await page.click('[data-testid="theme-toggle"]');
    await page.waitForTimeout(500); // Wait for transition
    
    await expect(page).toHaveScreenshot('homepage-dark.png', {
      fullPage: true
    });
  });
});
```

### Mobile Testing

```typescript
// tests/e2e/mobile/responsive.spec.ts
import { test, expect, devices } from '@playwright/test';

test.use(devices['iPhone 12']);

test.describe('Mobile Experience', () => {
  test('navigation menu should be accessible', async ({ page }) => {
    await page.goto('/');
    
    // Desktop menu should be hidden
    await expect(page.locator('.desktop-nav')).toBeHidden();
    
    // Open mobile menu
    await page.click('[data-testid="mobile-menu-toggle"]');
    
    // Verify menu items
    await expect(page.locator('.mobile-nav')).toBeVisible();
    await expect(page.locator('text=Home')).toBeVisible();
    await expect(page.locator('text=Products')).toBeVisible();
    await expect(page.locator('text=About')).toBeVisible();
  });
  
  test('forms should be touch-friendly', async ({ page }) => {
    await page.goto('/contact');
    
    // Check touch target sizes
    const submitButton = page.locator('button[type="submit"]');
    const box = await submitButton.boundingBox();
    
    expect(box?.height).toBeGreaterThanOrEqual(44); // iOS guideline
    expect(box?.width).toBeGreaterThanOrEqual(44);
  });
});
```

## Performance Testing

### Load Testing

```javascript
// tests/performance/load/api-load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '2m', target: 100 },  // Ramp up
    { duration: '5m', target: 100 },  // Stay at 100 users
    { duration: '2m', target: 200 },  // Ramp up
    { duration: '5m', target: 200 },  // Stay at 200 users
    { duration: '2m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests under 500ms
    errors: ['rate<0.1'],             // Error rate under 10%
  },
};

export default function() {
  const BASE_URL = 'https://api.example.com';
  
  // Simulate user behavior
  const responses = http.batch([
    ['GET', `${BASE_URL}/api/products`, null, { tags: { name: 'Products' } }],
    ['GET', `${BASE_URL}/api/users/me`, null, { 
      headers: { 'Authorization': 'Bearer test-token' },
      tags: { name: 'UserProfile' }
    }],
  ]);
  
  responses.forEach(response => {
    check(response, {
      'status is 200': (r) => r.status === 200,
      'response time < 500ms': (r) => r.timings.duration < 500,
    }) || errorRate.add(1);
  });
  
  sleep(1); // Think time
}
```

### Stress Testing

```javascript
// tests/performance/stress/database-stress.js
import sql from 'k6/sql';
import { check } from 'k6';

const db = sql.open('postgres', 'postgresql://user:pass@localhost/testdb');

export const options = {
  scenarios: {
    stress: {
      executor: 'ramping-arrival-rate',
      startRate: 100,
      timeUnit: '1s',
      preAllocatedVUs: 100,
      maxVUs: 1000,
      stages: [
        { duration: '2m', target: 1000 },  // Ramp up to 1000 rps
        { duration: '5m', target: 1000 },  // Stay at 1000 rps
        { duration: '2m', target: 2000 },  // Push to 2000 rps
        { duration: '5m', target: 2000 },  // Stay at 2000 rps
        { duration: '2m', target: 0 },     // Ramp down
      ],
    },
  },
  thresholds: {
    'db_query_duration': ['p(95)<100'], // 95% of queries under 100ms
    'db_errors': ['count<100'],         // Less than 100 errors total
  },
};

export default function() {
  // Simulate concurrent database queries
  const userId = Math.floor(Math.random() * 10000);
  
  const result = db.query(`
    SELECT u.*, COUNT(o.id) as order_count
    FROM users u
    LEFT JOIN orders o ON u.id = o.user_id
    WHERE u.id = $1
    GROUP BY u.id
  `, userId);
  
  check(result, {
    'query successful': (r) => r.error === null,
    'user found': (r) => r.rows.length > 0,
  });
}
```

### Performance Benchmarks

```typescript
// tests/performance/benchmarks/algorithm-benchmark.ts
import { Suite } from 'benchmark';

const suite = new Suite();

// Test data
const testArray = Array.from({ length: 10000 }, () => 
  Math.floor(Math.random() * 1000)
);

suite
  .add('Array.sort()', () => {
    [...testArray].sort((a, b) => a - b);
  })
  .add('Quick Sort', () => {
    quickSort([...testArray]);
  })
  .add('Merge Sort', () => {
    mergeSort([...testArray]);
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });
```

## Security Testing

### OWASP Top 10 Tests

```typescript
// tests/security/owasp/injection.test.ts
describe('SQL Injection Prevention', () => {
  it('should prevent SQL injection in search', async () => {
    const maliciousInput = "'; DROP TABLE users; --";
    
    const response = await request(app)
      .get('/api/search')
      .query({ q: maliciousInput })
      .expect(200);
    
    // Should return empty results, not error
    expect(response.body.results).toEqual([]);
    
    // Verify table still exists
    const tableExists = await database.query(
      "SELECT EXISTS (SELECT FROM pg_tables WHERE tablename = 'users')"
    );
    expect(tableExists[0].exists).toBe(true);
  });
});

describe('XSS Prevention', () => {
  it('should sanitize user input in comments', async () => {
    const xssPayload = '<script>alert("XSS")</script>';
    
    const response = await request(app)
      .post('/api/comments')
      .send({
        content: xssPayload
      })
      .expect(201);
    
    // Verify script tags are escaped
    expect(response.body.content).not.toContain('<script>');
    expect(response.body.content).toContain('&lt;script&gt;');
  });
});
```

### Authentication Tests

```typescript
// tests/security/auth/authentication.test.ts
describe('Authentication Security', () => {
  describe('Password Requirements', () => {
    it('should enforce strong password policy', async () => {
      const weakPasswords = [
        '12345678',           // No uppercase, special chars
        'Password',           // No numbers, special chars
        'Pass123',            // Too short
        'password123!',       // No uppercase
        'PASSWORD123!',       // No lowercase
      ];
      
      for (const password of weakPasswords) {
        const response = await request(app)
          .post('/api/auth/register')
          .send({
            email: 'test@example.com',
            password
          })
          .expect(400);
        
        expect(response.body.error.code).toBe('WEAK_PASSWORD');
      }
    });
  });
  
  describe('Brute Force Protection', () => {
    it('should block after failed attempts', async () => {
      const email = 'test@example.com';
      
      // Make 5 failed attempts
      for (let i = 0; i < 5; i++) {
        await request(app)
          .post('/api/auth/login')
          .send({
            email,
            password: 'wrongpassword'
          })
          .expect(401);
      }
      
      // 6th attempt should be blocked
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email,
          password: 'correctpassword'
        })
        .expect(429);
      
      expect(response.body.error.code).toBe('TOO_MANY_ATTEMPTS');
      expect(response.headers['retry-after']).toBeDefined();
    });
  });
});
```

### Penetration Testing

```bash
#!/bin/bash
# security-scan.sh

echo "Running OWASP ZAP security scan..."

# Start ZAP in daemon mode
docker run -d \
  --name zap \
  -p 8080:8080 \
  owasp/zap2docker-stable \
  zap.sh -daemon -host 0.0.0.0 -port 8080

# Wait for ZAP to start
sleep 30

# Run baseline scan
docker exec zap \
  zap-baseline.py \
  -t https://staging.example.com \
  -r security-report.html \
  -J security-report.json

# Run API scan with OpenAPI spec
docker exec zap \
  zap-api-scan.py \
  -t https://staging.example.com/openapi.json \
  -f openapi \
  -r api-security-report.html

# Clean up
docker stop zap
docker rm zap

# Check for high-risk issues
HIGH_RISK=$(jq '.site[].alerts[] | select(.risk == "High")' security-report.json | wc -l)
if [ $HIGH_RISK -gt 0 ]; then
  echo "❌ Found $HIGH_RISK high-risk security issues"
  exit 1
else
  echo "✅ No high-risk security issues found"
fi
```

## Test Data Management

### Test Data Factory

```typescript
// tests/factories/userFactory.ts
import { faker } from '@faker-js/faker';

export const userFactory = {
  build: (overrides = {}) => ({
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: 'TestPass123!',
    phoneNumber: faker.phone.number(),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: 'US'
    },
    ...overrides
  }),
  
  buildMany: (count: number, overrides = {}) => {
    return Array.from({ length: count }, () => 
      userFactory.build(overrides)
    );
  },
  
  create: async (overrides = {}) => {
    const user = userFactory.build(overrides);
    return await database.query(
      'INSERT INTO users (email, name, password) VALUES (?, ?, ?) RETURNING *',
      [user.email, user.name, user.password]
    );
  }
};
```

### Database Seeding

```typescript
// tests/seeds/testData.ts
export async function seedTestData() {
  // Clear existing data
  await database.query('TRUNCATE TABLE users, orders, products CASCADE');
  
  // Seed users
  const users = await Promise.all(
    userFactory.buildMany(100).map(userData =>
      database.query(
        'INSERT INTO users (email, name) VALUES (?, ?) RETURNING *',
        [userData.email, userData.name]
      )
    )
  );
  
  // Seed products
  const products = await Promise.all(
    productFactory.buildMany(50).map(productData =>
      database.query(
        'INSERT INTO products (name, price, stock) VALUES (?, ?, ?) RETURNING *',
        [productData.name, productData.price, productData.stock]
      )
    )
  );
  
  // Seed orders with relationships
  for (const user of users) {
    const orderCount = faker.number.int({ min: 0, max: 5 });
    for (let i = 0; i < orderCount; i++) {
      const order = await orderFactory.create({
        user_id: user[0].id,
        status: faker.helpers.arrayElement(['pending', 'completed', 'cancelled'])
      });
      
      // Add order items
      const itemCount = faker.number.int({ min: 1, max: 5 });
      const selectedProducts = faker.helpers.arrayElements(products, itemCount);
      
      for (const product of selectedProducts) {
        await database.query(
          'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
          [order[0].id, product[0].id, faker.number.int({ min: 1, max: 3 }), product[0].price]
        );
      }
    }
  }
}
```

### Test Environment Management

```typescript
// tests/helpers/testEnvironment.ts
export class TestEnvironment {
  private static instance: TestEnvironment;
  private testDatabase: string;
  
  static async setup() {
    if (!this.instance) {
      this.instance = new TestEnvironment();
      await this.instance.initialize();
    }
    return this.instance;
  }
  
  private async initialize() {
    // Create test database
    this.testDatabase = `test_${process.pid}_${Date.now()}`;
    await this.createTestDatabase();
    
    // Run migrations
    await this.runMigrations();
    
    // Set environment variables
    process.env.DATABASE_URL = this.getDatabaseUrl();
    process.env.NODE_ENV = 'test';
  }
  
  private async createTestDatabase() {
    const adminDb = await getAdminConnection();
    await adminDb.query(`CREATE DATABASE ${this.testDatabase}`);
    await adminDb.close();
  }
  
  private async runMigrations() {
    const db = await getConnection(this.getDatabaseUrl());
    await migrate(db, {
      migrationsFolder: './migrations'
    });
    await db.close();
  }
  
  async cleanup() {
    const adminDb = await getAdminConnection();
    await adminDb.query(`DROP DATABASE IF EXISTS ${this.testDatabase}`);
    await adminDb.close();
  }
  
  private getDatabaseUrl() {
    return `postgresql://test:test@localhost/${this.testDatabase}`;
  }
}

// Jest setup
beforeAll(async () => {
  await TestEnvironment.setup();
});

afterAll(async () => {
  const env = await TestEnvironment.setup();
  await env.cleanup();
});
```

## CI/CD Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:unit -- --coverage --maxWorkers=2
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
          flags: unit

  integration-tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: test
          POSTGRES_DB: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432
      
      redis:
        image: redis:7
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379:6379
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18.x
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run migrations
        env:
          DATABASE_URL: postgresql://postgres:test@localhost/test
        run: npm run db:migrate
      
      - name: Run integration tests
        env:
          DATABASE_URL: postgresql://postgres:test@localhost/test
          REDIS_URL: redis://localhost:6379
        run: npm run test:integration
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info
          flags: integration

  e2e-tests:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18.x
          cache: 'npm'
      
      - name: Install dependencies
        run: |
          npm ci
          npx playwright install --with-deps
      
      - name: Build application
        run: npm run build
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30

  performance-tests:
    runs-on: ubuntu-latest
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Run k6 performance tests
        uses: k6io/action@v0.1
        with:
          filename: tests/performance/load/api-load-test.js
          flags: --out cloud
        env:
          K6_CLOUD_TOKEN: ${{ secrets.K6_CLOUD_TOKEN }}
      
      - name: Comment results on PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v6
        with:
          script: |
            const results = require('./k6-results.json');
            const comment = `## Performance Test Results
            - Avg Response Time: ${results.metrics.http_req_duration.avg}ms
            - 95th Percentile: ${results.metrics.http_req_duration.p95}ms
            - Error Rate: ${results.metrics.errors.rate}%`;
            
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });
```

### Test Parallelization

```json
// jest.config.js
module.exports = {
  projects: [
    {
      displayName: 'unit',
      testMatch: ['<rootDir>/tests/unit/**/*.test.ts'],
      setupFilesAfterEnv: ['<rootDir>/tests/setup/unit.ts'],
    },
    {
      displayName: 'integration',
      testMatch: ['<rootDir>/tests/integration/**/*.test.ts'],
      setupFilesAfterEnv: ['<rootDir>/tests/setup/integration.ts'],
      maxWorkers: 2, // Limit DB connections
    },
  ],
  
  // Shared configuration
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/**/*.stories.tsx'
  ],
};
```

## Coverage Reports

### Coverage Configuration

```json
// .nycrc.json
{
  "all": true,
  "include": [
    "src/**/*.ts"
  ],
  "exclude": [
    "src/**/*.test.ts",
    "src/**/*.d.ts",
    "src/types/**"
  ],
  "reporter": [
    "text",
    "lcov",
    "html",
    "json-summary"
  ],
  "report-dir": "./coverage",
  "temp-dir": "./coverage/.nyc_output",
  "check-coverage": true,
  "branches": 80,
  "lines": 80,
  "functions": 80,
  "statements": 80,
  "watermarks": {
    "lines": [80, 95],
    "functions": [80, 95],
    "branches": [80, 95],
    "statements": [80, 95]
  }
}
```

### Coverage Badge Generation

```typescript
// scripts/generate-coverage-badge.ts
import { readFileSync, writeFileSync } from 'fs';

const coverageSummary = JSON.parse(
  readFileSync('./coverage/coverage-summary.json', 'utf-8')
);

const total = coverageSummary.total;
const coverage = Math.round(
  (total.lines.pct + total.statements.pct + total.functions.pct + total.branches.pct) / 4
);

const color = coverage >= 90 ? 'brightgreen' : 
              coverage >= 80 ? 'green' : 
              coverage >= 70 ? 'yellow' : 
              coverage >= 60 ? 'orange' : 'red';

const badge = `![Coverage](https://img.shields.io/badge/coverage-${coverage}%25-${color})`;

// Update README
const readme = readFileSync('./README.md', 'utf-8');
const updatedReadme = readme.replace(
  /!\[Coverage\]\(https:\/\/img\.shields\.io\/badge\/coverage-\d+%25-\w+\)/,
  badge
);
writeFileSync('./README.md', updatedReadme);
```

### Coverage Report Dashboard

```html
<!-- coverage-dashboard.html -->
<!DOCTYPE html>
<html>
<head>
  <title>Test Coverage Dashboard</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <h1>Test Coverage Dashboard</h1>
  
  <div class="metrics">
    <div class="metric">
      <h3>Overall Coverage</h3>
      <div class="percentage">85.3%</div>
    </div>
    <div class="metric">
      <h3>Lines</h3>
      <div class="percentage">87.2%</div>
    </div>
    <div class="metric">
      <h3>Branches</h3>
      <div class="percentage">82.5%</div>
    </div>
    <div class="metric">
      <h3>Functions</h3>
      <div class="percentage">88.1%</div>
    </div>
  </div>
  
  <canvas id="coverageTrend"></canvas>
  
  <table>
    <thead>
      <tr>
        <th>File</th>
        <th>Lines</th>
        <th>Branches</th>
        <th>Functions</th>
        <th>Uncovered Lines</th>
      </tr>
    </thead>
    <tbody id="fileList"></tbody>
  </table>
  
  <script>
    // Load and display coverage data
    fetch('./coverage/coverage-summary.json')
      .then(res => res.json())
      .then(data => {
        displayCoverage(data);
        displayTrend();
      });
  </script>
</body>
</html>
```

## Testing Best Practices

### Test Writing Guidelines

1. **Test Naming**
   - Use descriptive names that explain what is being tested
   - Follow the pattern: `should [expected behavior] when [condition]`

2. **Test Independence**
   - Each test should be able to run in isolation
   - Clean up after tests (database, files, etc.)
   - Don't rely on test execution order

3. **Test Data**
   - Use factories for consistent test data
   - Avoid hardcoded values
   - Use meaningful test data that represents real scenarios

4. **Assertions**
   - One logical assertion per test
   - Use specific matchers (`.toBeNull()` vs `.toBe(null)`)
   - Include helpful error messages

5. **Mocking**
   - Mock external dependencies
   - Don't mock what you're testing
   - Keep mocks simple and focused

### Common Testing Patterns

```typescript
// Testing async operations
it('should handle async operations', async () => {
  const promise = someAsyncOperation();
  await expect(promise).resolves.toBe('success');
});

// Testing errors
it('should throw specific error', () => {
  expect(() => dangerousOperation()).toThrow(SpecificError);
  expect(() => dangerousOperation()).toThrow('Specific message');
});

// Testing events
it('should emit events', async () => {
  const emitter = new EventEmitter();
  const handler = jest.fn();
  
  emitter.on('data', handler);
  emitter.emit('data', { id: 1 });
  
  expect(handler).toHaveBeenCalledWith({ id: 1 });
});

// Testing with time
it('should timeout after delay', () => {
  jest.useFakeTimers();
  
  const callback = jest.fn();
  setTimeout(callback, 1000);
  
  jest.advanceTimersByTime(999);
  expect(callback).not.toHaveBeenCalled();
  
  jest.advanceTimersByTime(1);
  expect(callback).toHaveBeenCalled();
});
```

---
Last updated: 2024-01-21 | Test Coverage: 85.3%
```

### 7. Component Documentation Template

```markdown
# [Component Name]

> Brief description of the component and its purpose

## Overview

This component provides [functionality] for [use case]. It follows [design pattern] and integrates with [related components].

## Installation

```bash
npm install @org/component-library
```

## Usage

### Basic Usage

```jsx
import { ComponentName } from '@org/component-library';

function App() {
  return (
    <ComponentName
      prop1="value"
      prop2={true}
      onAction={(result) => console.log(result)}
    />
  );
}
```

### Advanced Usage

```jsx
import { ComponentName, ComponentProvider } from '@org/component-library';

function App() {
  return (
    <ComponentProvider config={customConfig}>
      <ComponentName
        prop1="value"
        prop2={true}
        customProp={customValue}
        renderCustom={(props) => <CustomElement {...props} />}
      >
        <ComponentName.SubComponent />
      </ComponentName>
    </ComponentProvider>
  );
}
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `prop1` | string | - | Yes | Main property description |
| `prop2` | boolean | `false` | No | Toggle feature X |
| `prop3` | number | `10` | No | Numeric configuration |
| `children` | ReactNode | - | No | Child elements |
| `className` | string | - | No | Additional CSS classes |
| `style` | CSSProperties | - | No | Inline styles |
| `onAction` | `(result: Result) => void` | - | No | Action callback |
| `renderCustom` | `(props: Props) => ReactNode` | - | No | Custom render function |

## Styling

### CSS Classes

```css
.component-name {
  /* Root element */
}

.component-name--variant {
  /* Variant modifier */
}

.component-name__element {
  /* Child element */
}

.component-name--state {
  /* State modifier */
}
```

### Theming

```jsx
import { ThemeProvider } from '@org/component-library';

const theme = {
  components: {
    ComponentName: {
      colors: {
        primary: '#007bff',
        secondary: '#6c757d'
      },
      spacing: {
        padding: '16px',
        margin: '8px'
      }
    }
  }
};

<ThemeProvider theme={theme}>
  <ComponentName />
</ThemeProvider>
```

### Tailwind Integration

```jsx
<ComponentName
  className="rounded-lg shadow-md"
  classNames={{
    root: 'p-4',
    header: 'text-lg font-bold',
    content: 'mt-2 text-gray-600'
  }}
/>
```

## Variants

### Size Variants

```jsx
<ComponentName size="small" />
<ComponentName size="medium" /> {/* default */}
<ComponentName size="large" />
```

### Style Variants

```jsx
<ComponentName variant="primary" />
<ComponentName variant="secondary" />
<ComponentName variant="outline" />
<ComponentName variant="ghost" />
```

### State Variants

```jsx
<ComponentName state="default" />
<ComponentName state="loading" />
<ComponentName state="error" />
<ComponentName state="success" />
```

## Accessibility

This component follows WCAG 2.1 AA guidelines:

- ✅ Keyboard navigation support
- ✅ ARIA labels and roles
- ✅ Focus management
- ✅ Screen reader announcements
- ✅ Color contrast compliance

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Move focus to next element |
| `Shift + Tab` | Move focus to previous element |
| `Enter` / `Space` | Activate component |
| `Escape` | Close/cancel action |
| `Arrow Keys` | Navigate options |

### ARIA Attributes

```jsx
<ComponentName
  aria-label="Custom label"
  aria-describedby="description-id"
  aria-expanded={isExpanded}
  role="button"
/>
```

## Examples

### Example 1: Form Integration

```jsx
function FormExample() {
  const [value, setValue] = useState('');
  
  return (
    <form>
      <ComponentName
        value={value}
        onChange={setValue}
        validation={{
          required: true,
          pattern: /^[A-Za-z]+$/
        }}
        error={errors.field}
      />
    </form>
  );
}
```

### Example 2: With Data Fetching

```jsx
function DataExample() {
  const { data, loading, error } = useFetch('/api/data');
  
  if (loading) return <ComponentName state="loading" />;
  if (error) return <ComponentName state="error" message={error.message} />;
  
  return (
    <ComponentName
      data={data}
      onRefresh={() => refetch()}
    />
  );
}
```

### Example 3: Composition

```jsx
function CompositionExample() {
  return (
    <ComponentName>
      <ComponentName.Header>
        <h2>Title</h2>
        <ComponentName.Actions>
          <button>Action 1</button>
          <button>Action 2</button>
        </ComponentName.Actions>
      </ComponentName.Header>
      
      <ComponentName.Body>
        <p>Content goes here</p>
      </ComponentName.Body>
      
      <ComponentName.Footer>
        <span>Footer content</span>
      </ComponentName.Footer>
    </ComponentName>
  );
}
```

## Testing

### Unit Tests

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from '@org/component-library';

describe('ComponentName', () => {
  it('renders with required props', () => {
    render(<ComponentName prop1="test" />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });
  
  it('handles user interaction', () => {
    const handleAction = jest.fn();
    render(<ComponentName prop1="test" onAction={handleAction} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleAction).toHaveBeenCalledWith(expect.any(Object));
  });
  
  it('applies custom className', () => {
    const { container } = render(
      <ComponentName prop1="test" className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
```

### Integration Tests

```jsx
import { render, waitFor } from '@testing-library/react';
import { ComponentName } from '@org/component-library';
import { mockServer } from './mocks/server';

describe('ComponentName Integration', () => {
  it('integrates with API', async () => {
    mockServer.use(
      rest.get('/api/data', (req, res, ctx) => {
        return res(ctx.json({ items: ['item1', 'item2'] }));
      })
    );
    
    render(<ComponentName apiEndpoint="/api/data" />);
    
    await waitFor(() => {
      expect(screen.getByText('item1')).toBeInTheDocument();
    });
  });
});
```

## Performance

### Optimization Tips

1. **Memoization**: Component is wrapped in `React.memo` by default
2. **Lazy Loading**: Use dynamic imports for heavy components
3. **Virtualization**: Built-in support for large lists
4. **Code Splitting**: Sub-components can be imported separately

```jsx
// Import only what you need
import { ComponentName } from '@org/component-library/ComponentName';

// Lazy load heavy features
const HeavyFeature = lazy(() => import('@org/component-library/HeavyFeature'));
```

### Bundle Size

| Export | Size (minified) | Size (gzipped) |
|--------|-----------------|----------------|
| ComponentName | 12.5 KB | 4.2 KB |
| ComponentName.SubComponent | 3.2 KB | 1.1 KB |
| Full bundle | 45.7 KB | 15.3 KB |

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- iOS Safari (last 2 versions)
- Chrome for Android (last 2 versions)

## Migration Guide

### From v2.x to v3.0

```jsx
// Before (v2.x)
<ComponentName type="primary" size="md" />

// After (v3.0)
<ComponentName variant="primary" size="medium" />
```

## API Reference

### ComponentName

Main component.

### ComponentName.SubComponent

Sub-component for specific functionality.

### Hooks

#### useComponentName

```jsx
const { state, actions } = useComponentName(options);
```

### Utils

#### validateComponentProps

```jsx
import { validateComponentProps } from '@org/component-library/utils';

const errors = validateComponentProps(props);
```

## FAQ

**Q: How do I customize the component's appearance?**
A: Use the `className`, `style`, or `classNames` props, or override CSS variables.

**Q: Can I use this with TypeScript?**
A: Yes, full TypeScript support is included.

**Q: How do I handle errors?**
A: Pass an `onError` callback or use the `error` prop for controlled error state.

## Contributing

See our [Component Contribution Guide](../../CONTRIBUTING.md#components).

## License

MIT

---

Part of [@org/component-library](https://github.com/org/component-library)
```

### 4. Component Documentation Template

```markdown
# [Component Name]

> Brief description of the component and its purpose

## Overview

This component provides [functionality] for [use case]. It follows [design pattern] and integrates with [related components].

## Installation

```bash
npm install @org/component-library
```

## Usage

### Basic Usage

```jsx
import { ComponentName } from '@org/component-library';

function App() {
  return (
    <ComponentName
      prop1="value"
      prop2={true}
      onAction={(result) => console.log(result)}
    />
  );
}
```

### Advanced Usage

```jsx
import { ComponentName, ComponentProvider } from '@org/component-library';

function App() {
  return (
    <ComponentProvider config={customConfig}>
      <ComponentName
        prop1="value"
        prop2={true}
        customProp={customValue}
        renderCustom={(props) => <CustomElement {...props} />}
      >
        <ComponentName.SubComponent />
      </ComponentName>
    </ComponentProvider>
  );
}
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `prop1` | string | - | Yes | Main property description |
| `prop2` | boolean | `false` | No | Toggle feature X |
| `prop3` | number | `10` | No | Numeric configuration |
| `children` | ReactNode | - | No | Child elements |
| `className` | string | - | No | Additional CSS classes |
| `style` | CSSProperties | - | No | Inline styles |
| `onAction` | `(result: Result) => void` | - | No | Action callback |
| `renderCustom` | `(props: Props) => ReactNode` | - | No | Custom render function |

## Styling

### CSS Classes

```css
.component-name {
  /* Root element */
}

.component-name--variant {
  /* Variant modifier */
}

.component-name__element {
  /* Child element */
}

.component-name--state {
  /* State modifier */
}
```

### Theming

```jsx
import { ThemeProvider } from '@org/component-library';

const theme = {
  components: {
    ComponentName: {
      colors: {
        primary: '#007bff',
        secondary: '#6c757d'
      },
      spacing: {
        padding: '16px',
        margin: '8px'
      }
    }
  }
};

<ThemeProvider theme={theme}>
  <ComponentName />
</ThemeProvider>
```

### Tailwind Integration

```jsx
<ComponentName
  className="rounded-lg shadow-md"
  classNames={{
    root: 'p-4',
    header: 'text-lg font-bold',
    content: 'mt-2 text-gray-600'
  }}
/>
```

## Variants

### Size Variants

```jsx
<ComponentName size="small" />
<ComponentName size="medium" /> {/* default */}
<ComponentName size="large" />
```

### Style Variants

```jsx
<ComponentName variant="primary" />
<ComponentName variant="secondary" />
<ComponentName variant="outline" />
<ComponentName variant="ghost" />
```

### State Variants

```jsx
<ComponentName state="default" />
<ComponentName state="loading" />
<ComponentName state="error" />
<ComponentName state="success" />
```

## Accessibility

This component follows WCAG 2.1 AA guidelines:

- ✅ Keyboard navigation support
- ✅ ARIA labels and roles
- ✅ Focus management
- ✅ Screen reader announcements
- ✅ Color contrast compliance

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Move focus to next element |
| `Shift + Tab` | Move focus to previous element |
| `Enter` / `Space` | Activate component |
| `Escape` | Close/cancel action |
| `Arrow Keys` | Navigate options |

### ARIA Attributes

```jsx
<ComponentName
  aria-label="Custom label"
  aria-describedby="description-id"
  aria-expanded={isExpanded}
  role="button"
/>
```

## Examples

### Example 1: Form Integration

```jsx
function FormExample() {
  const [value, setValue] = useState('');
  
  return (
    <form>
      <ComponentName
        value={value}
        onChange={setValue}
        validation={{
          required: true,
          pattern: /^[A-Za-z]+$/
        }}
        error={errors.field}
      />
    </form>
  );
}
```

### Example 2: With Data Fetching

```jsx
function DataExample() {
  const { data, loading, error } = useFetch('/api/data');
  
  if (loading) return <ComponentName state="loading" />;
  if (error) return <ComponentName state="error" message={error.message} />;
  
  return (
    <ComponentName
      data={data}
      onRefresh={() => refetch()}
    />
  );
}
```

### Example 3: Composition

```jsx
function CompositionExample() {
  return (
    <ComponentName>
      <ComponentName.Header>
        <h2>Title</h2>
        <ComponentName.Actions>
          <button>Action 1</button>
          <button>Action 2</button>
        </ComponentName.Actions>
      </ComponentName.Header>
      
      <ComponentName.Body>
        <p>Content goes here</p>
      </ComponentName.Body>
      
      <ComponentName.Footer>
        <span>Footer content</span>
      </ComponentName.Footer>
    </ComponentName>
  );
}
```

## Testing

### Unit Tests

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from '@org/component-library';

describe('ComponentName', () => {
  it('renders with required props', () => {
    render(<ComponentName prop1="test" />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });
  
  it('handles user interaction', () => {
    const handleAction = jest.fn();
    render(<ComponentName prop1="test" onAction={handleAction} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleAction).toHaveBeenCalledWith(expect.any(Object));
  });
  
  it('applies custom className', () => {
    const { container } = render(
      <ComponentName prop1="test" className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
```

### Integration Tests

```jsx
import { render, waitFor } from '@testing-library/react';
import { ComponentName } from '@org/component-library';
import { mockServer } from './mocks/server';

describe('ComponentName Integration', () => {
  it('integrates with API', async () => {
    mockServer.use(
      rest.get('/api/data', (req, res, ctx) => {
        return res(ctx.json({ items: ['item1', 'item2'] }));
      })
    );
    
    render(<ComponentName apiEndpoint="/api/data" />);
    
    await waitFor(() => {
      expect(screen.getByText('item1')).toBeInTheDocument();
    });
  });
});
```

## Performance

### Optimization Tips

1. **Memoization**: Component is wrapped in `React.memo` by default
2. **Lazy Loading**: Use dynamic imports for heavy components
3. **Virtualization**: Built-in support for large lists
4. **Code Splitting**: Sub-components can be imported separately

```jsx
// Import only what you need
import { ComponentName } from '@org/component-library/ComponentName';

// Lazy load heavy features
const HeavyFeature = lazy(() => import('@org/component-library/HeavyFeature'));
```

### Bundle Size

| Export | Size (minified) | Size (gzipped) |
|--------|-----------------|----------------|
| ComponentName | 12.5 KB | 4.2 KB |
| ComponentName.SubComponent | 3.2 KB | 1.1 KB |
| Full bundle | 45.7 KB | 15.3 KB |

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- iOS Safari (last 2 versions)
- Chrome for Android (last 2 versions)

## Migration Guide

### From v2.x to v3.0

```jsx
// Before (v2.x)
<ComponentName type="primary" size="md" />

// After (v3.0)
<ComponentName variant="primary" size="medium" />
```

## API Reference

### ComponentName

Main component.

### ComponentName.SubComponent

Sub-component for specific functionality.

### Hooks

#### useComponentName

```jsx
const { state, actions } = useComponentName(options);
```

### Utils

#### validateComponentProps

```jsx
import { validateComponentProps } from '@org/component-library/utils';

const errors = validateComponentProps(props);
```

## FAQ

**Q: How do I customize the component's appearance?**
A: Use the `className`, `style`, or `classNames` props, or override CSS variables.

**Q: Can I use this with TypeScript?**
A: Yes, full TypeScript support is included.

**Q: How do I handle errors?**
A: Pass an `onError` callback or use the `error` prop for controlled error state.

## Contributing

See our [Component Contribution Guide](../../CONTRIBUTING.md#components).

## License

MIT

---

Part of [@org/component-library](https://github.com/org/component-library)
```

## Documentation Automation Process

### 1. Documentation Discovery Service

```typescript
// services/documentation-discovery.ts
import { glob } from 'glob';
import { readFile, writeFile, stat } from 'fs/promises';
import { parse } from 'path';
import matter from 'gray-matter';
import { simpleGit } from 'simple-git';

interface DocumentationStatus {
  path: string;
  type: 'application' | 'microservice' | 'module' | 'component';
  hasReadme: boolean;
  readmeUpdated: boolean;
  hasDocsFolder: boolean;
  docusaurusLinked: boolean;
  lastModified: Date;
  issues: string[];
  suggestions: string[];
}

export class DocumentationDiscoveryService {
  private git = simpleGit();
  
  async scanProject(rootPath: string): Promise<DocumentationStatus[]> {
    const results: DocumentationStatus[] = [];
    
    // Define patterns for different types
    const patterns = {
      applications: 'applications/*/package.json',
      microservices: 'microservices/*/package.json',
      modules: 'packages/*/package.json',
      components: 'components/*/index.{ts,tsx,js,jsx}'
    };
    
    for (const [type, pattern] of Object.entries(patterns)) {
      const files = await glob(pattern, { cwd: rootPath });
      
      for (const file of files) {
        const dir = parse(file).dir;
        const status = await this.analyzeDirectory(dir, type as any);
        results.push(status);
      }
    }
    
    return results;
  }
  
  private async analyzeDirectory(
    dirPath: string, 
    type: DocumentationStatus['type']
  ): Promise<DocumentationStatus> {
    const status: DocumentationStatus = {
      path: dirPath,
      type,
      hasReadme: false,
      readmeUpdated: false,
      hasDocsFolder: false,
      docusaurusLinked: false,
      lastModified: new Date(),
      issues: [],
      suggestions: []
    };
    
    // Check for README.md
    try {
      const readmeStat = await stat(`${dirPath}/README.md`);
      status.hasReadme = true;
      
      // Check if README is up to date
      const lastCommit = await this.getLastModificationDate(dirPath);
      const readmeAge = Date.now() - readmeStat.mtime.getTime();
      const codeAge = Date.now() - lastCommit.getTime();
      
      if (codeAge < readmeAge - 7 * 24 * 60 * 60 * 1000) { // 7 days grace period
        status.issues.push('README.md is outdated compared to recent code changes');
      }
      
      // Analyze README content
      await this.analyzeReadmeContent(dirPath, status);
    } catch {
      status.issues.push('Missing README.md file');
    }
    
    // Check for docs folder
    try {
      await stat(`${dirPath}/docs`);
      status.hasDocsFolder = true;
    } catch {
      if (type === 'application' || type === 'microservice') {
        status.suggestions.push('Consider adding a docs/ folder for detailed documentation');
      }
    }
    
    // Check Docusaurus integration
    status.docusaurusLinked = await this.checkDocusaurusIntegration(dirPath);
    
    return status;
  }
  
  private async getLastModificationDate(dirPath: string): Promise<Date> {
    const log = await this.git.log({
      file: dirPath,
      maxCount: 1,
      '--': null,
      '--exclude': '*.md'
    });
    
    return new Date(log.latest?.date || Date.now());
  }
  
  private async analyzeReadmeContent(
    dirPath: string, 
    status: DocumentationStatus
  ): Promise<void> {
    const content = await readFile(`${dirPath}/README.md`, 'utf-8');
    const { data, content: markdown } = matter(content);
    
    // Check required sections based on type
    const requiredSections = this.getRequiredSections(status.type);
    
    for (const section of requiredSections) {
      const regex = new RegExp(`^##?\\s+${section}`, 'im');
      if (!regex.test(markdown)) {
        status.issues.push(`Missing required section: ${section}`);
      }
    }
    
    // Check for outdated information
    const packageJson = await this.readPackageJson(dirPath);
    if (packageJson) {
      // Check version
      const versionRegex = /version[:\s]+(\d+\.\d+\.\d+)/i;
      const match = markdown.match(versionRegex);
      if (match && match[1] !== packageJson.version) {
        status.issues.push(`Version mismatch: README shows ${match[1]}, package.json shows ${packageJson.version}`);
      }
      
      // Check dependencies
      if (packageJson.dependencies) {
        const majorDeps = Object.keys(packageJson.dependencies).slice(0, 5);
        for (const dep of majorDeps) {
          if (!markdown.includes(dep)) {
            status.suggestions.push(`Consider documenting key dependency: ${dep}`);
          }
        }
      }
    }
  }
  
  private getRequiredSections(type: DocumentationStatus['type']): string[] {
    const baseSection = ['Overview', 'Installation', 'Usage'];
    
    const typeSpecific = {
      application: [...baseSection, 'Architecture', 'Development', 'Deployment'],
      microservice: [...baseSection, 'API', 'Configuration', 'Monitoring'],
      module: [...baseSection, 'API Reference', 'Examples', 'TypeScript'],
      component: [...baseSection, 'Props', 'Examples', 'Styling']
    };
    
    return typeSpecific[type] || baseSection;
  }
  
  private async readPackageJson(dirPath: string): Promise<any> {
    try {
      const content = await readFile(`${dirPath}/package.json`, 'utf-8');
      return JSON.parse(content);
    } catch {
      return null;
    }
  }
  
  private async checkDocusaurusIntegration(dirPath: string): Promise<boolean> {
    // Check if this directory is referenced in docusaurus config
    try {
      const docusaurusConfig = await readFile('docs/docusaurus.config.js', 'utf-8');
      const relativePath = dirPath.replace(process.cwd(), '');
      return docusaurusConfig.includes(relativePath);
    } catch {
      return false;
    }
  }
}
```

### 2. README Update Service

```typescript
// services/readme-updater.ts
import { readFile, writeFile } from 'fs/promises';
import { diffLines } from 'diff';
import matter from 'gray-matter';

interface UpdateSuggestion {
  section: string;
  current: string;
  suggested: string;
  reason: string;
}

export class ReadmeUpdaterService {
  async generateUpdateSuggestions(
    dirPath: string,
    type: string
  ): Promise<UpdateSuggestion[]> {
    const suggestions: UpdateSuggestion[] = [];
    
    // Read current README
    const currentContent = await readFile(`${dirPath}/README.md`, 'utf-8');
    const { data, content } = matter(currentContent);
    
    // Read package.json
    const packageJson = await this.readPackageJson(dirPath);
    
    // Check version
    if (packageJson?.version) {
      const versionSection = this.extractSection(content, 'Version');
      if (!versionSection || !versionSection.includes(packageJson.version)) {
        suggestions.push({
          section: 'Header',
          current: versionSection || '',
          suggested: `![Version](https://img.shields.io/badge/version-${packageJson.version}-blue)`,
          reason: 'Version badge is missing or outdated'
        });
      }
    }
    
    // Check dependencies
    if (packageJson?.dependencies) {
      const installSection = this.extractSection(content, 'Installation');
      const deps = Object.keys(packageJson.dependencies);
      const missingDeps = deps.filter(dep => !installSection?.includes(dep));
      
      if (missingDeps.length > 0) {
        suggestions.push({
          section: 'Dependencies',
          current: '',
          suggested: this.generateDependencySection(packageJson.dependencies),
          reason: 'Key dependencies are not documented'
        });
      }
    }
    
    // Check scripts
    if (packageJson?.scripts) {
      const scriptsSection = this.extractSection(content, 'Scripts|Development|Usage');
      const commonScripts = ['start', 'build', 'test', 'dev'];
      const documentedScripts = commonScripts.filter(script => 
        packageJson.scripts[script] && !scriptsSection?.includes(script)
      );
      
      if (documentedScripts.length > 0) {
        suggestions.push({
          section: 'Available Scripts',
          current: scriptsSection || '',
          suggested: this.generateScriptsSection(packageJson.scripts),
          reason: 'Common scripts are not documented'
        });
      }
    }
    
    // Check for new files
    const newFiles = await this.detectNewFiles(dirPath);
    if (newFiles.length > 0) {
      suggestions.push({
        section: 'Project Structure',
        current: this.extractSection(content, 'Structure|Organization') || '',
        suggested: await this.generateStructureSection(dirPath),
        reason: 'New files/folders added to project'
      });
    }
    
    return suggestions;
  }
  
  async applyUpdates(
    dirPath: string,
    suggestions: UpdateSuggestion[]
  ): Promise<void> {
    let content = await readFile(`${dirPath}/README.md`, 'utf-8');
    
    for (const suggestion of suggestions) {
      content = this.applySuggestion(content, suggestion);
    }
    
    // Add update timestamp
    const { data, content: markdown } = matter(content);
    data.lastUpdated = new Date().toISOString();
    
    const updatedContent = matter.stringify(markdown, data);
    await writeFile(`${dirPath}/README.md`, updatedContent);
  }
  
  private extractSection(content: string, sectionName: string): string | null {
    const regex = new RegExp(
      `^##?\\s+(${sectionName})\\s*$([\\s\\S]*?)^##?\\s+`,
      'im'
    );
    const match = content.match(regex);
    return match ? match[2].trim() : null;
  }
  
  private generateDependencySection(dependencies: Record<string, string>): string {
    const deps = Object.entries(dependencies)
      .map(([name, version]) => `- **${name}**: ${version}`)
      .join('\n');
    
    return `### Key Dependencies\n\n${deps}`;
  }
  
  private generateScriptsSection(scripts: Record<string, string>): string {
    const scriptDocs = Object.entries(scripts)
      .filter(([name]) => !name.startsWith('pre') && !name.startsWith('post'))
      .map(([name, command]) => `- \`npm run ${name}\`: ${this.describeScript(command)}`)
      .join('\n');
    
    return `### Available Scripts\n\n${scriptDocs}`;
  }
  
  private describeScript(command: string): string {
    // Simple heuristic to describe common commands
    if (command.includes('jest') || command.includes('test')) return 'Run tests';
    if (command.includes('build')) return 'Build for production';
    if (command.includes('dev') || command.includes('nodemon')) return 'Start development server';
    if (command.includes('lint')) return 'Run linter';
    if (command.includes('format')) return 'Format code';
    return command;
  }
  
  private async generateStructureSection(dirPath: string): Promise<string> {
    // Generate tree structure
    const tree = await this.generateDirectoryTree(dirPath);
    return `### Project Structure\n\n\`\`\`\n${tree}\n\`\`\``;
  }
  
  private async detectNewFiles(dirPath: string): Promise<string[]> {
    // Implementation to detect files added since last README update
    // This would compare git history with README last modified date
    return [];
  }
  
  private applySuggestion(content: string, suggestion: UpdateSuggestion): string {
    // Implementation to intelligently apply suggestions to content
    // This would find the appropriate location and update/insert content
    return content;
  }
  
  private async readPackageJson(dirPath: string): Promise<any> {
    try {
      const content = await readFile(`${dirPath}/package.json`, 'utf-8');
      return JSON.parse(content);
    } catch {
      return null;
    }
  }
  
  private async generateDirectoryTree(dirPath: string, prefix = ''): Promise<string> {
    // Implementation to generate directory tree
    return '';
  }
}
```

### 3. Docusaurus Integration Service

```typescript
// services/docusaurus-integration.ts
import { readFile, writeFile, mkdir, copyFile } from 'fs/promises';
import { join, relative, basename } from 'path';
import matter from 'gray-matter';

interface DocusaurusPage {
  id: string;
  title: string;
  path: string;
  category: string;
  order: number;
}

export class DocusaurusIntegrationService {
  private docsPath = 'docs';
  
  async syncDocumentation(
    discoveries: DocumentationStatus[]
  ): Promise<void> {
    // Group by type
    const grouped = this.groupByType(discoveries);
    
    // Create/update category files
    for (const [type, items] of Object.entries(grouped)) {
      await this.createCategoryFile(type, items);
    }
    
    // Sync individual documentation
    for (const discovery of discoveries) {
      await this.syncItemDocumentation(discovery);
    }
    
    // Update sidebars
    await this.updateSidebars(discoveries);
    
    // Update landing pages
    await this.updateLandingPages(grouped);
  }
  
  private groupByType(
    discoveries: DocumentationStatus[]
  ): Record<string, DocumentationStatus[]> {
    return discoveries.reduce((acc, item) => {
      acc[item.type] = acc[item.type] || [];
      acc[item.type].push(item);
      return acc;
    }, {} as Record<string, DocumentationStatus[]>);
  }
  
  private async createCategoryFile(
    type: string,
    items: DocumentationStatus[]
  ): Promise<void> {
    const categoryPath = join(this.docsPath, type);
    await mkdir(categoryPath, { recursive: true });
    
    const categoryJson = {
      label: this.formatTypeName(type),
      position: this.getTypePosition(type),
      link: {
        type: 'generated-index',
        title: `${this.formatTypeName(type)} Documentation`,
        description: `Documentation for all ${type} in the project`,
        keywords: [type]
      }
    };
    
    await writeFile(
      join(categoryPath, '_category_.json'),
      JSON.stringify(categoryJson, null, 2)
    );
  }
  
  private async syncItemDocumentation(
    discovery: DocumentationStatus
  ): Promise<void> {
    const itemName = basename(discovery.path);
    const targetDir = join(this.docsPath, discovery.type, itemName);
    await mkdir(targetDir, { recursive: true });
    
    // Copy README as index
    if (discovery.hasReadme) {
      const readmePath = join(discovery.path, 'README.md');
      const targetPath = join(targetDir, 'index.md');
      
      // Transform README for Docusaurus
      const content = await readFile(readmePath, 'utf-8');
      const transformed = await this.transformForDocusaurus(content, discovery);
      await writeFile(targetPath, transformed);
    }
    
    // Copy additional docs
    if (discovery.hasDocsFolder) {
      await this.copyDocsFolder(
        join(discovery.path, 'docs'),
        targetDir
      );
    }
    
    // Generate API documentation if applicable
    if (discovery.type === 'module' || discovery.type === 'microservice') {
      await this.generateApiDocs(discovery, targetDir);
    }
  }
  
  private async transformForDocusaurus(
    content: string,
    discovery: DocumentationStatus
  ): Promise<string> {
    const { data, content: markdown } = matter(content);
    
    // Add Docusaurus frontmatter
    const docusaurusFrontmatter = {
      id: basename(discovery.path),
      title: data.title || this.extractTitle(markdown) || basename(discovery.path),
      sidebar_label: data.sidebar_label || basename(discovery.path),
      sidebar_position: data.sidebar_position || 50,
      tags: data.tags || [discovery.type],
      ...data
    };
    
    // Transform relative links
    let transformedContent = markdown;
    
    // Fix relative links to other docs
    transformedContent = transformedContent.replace(
      /\[([^\]]+)\]\(\.\.\/([^)]+)\)/g,
      '[$1](../$2)'
    );
    
    // Fix image paths
    transformedContent = transformedContent.replace(
      /!\[([^\]]*)\]\((?!http)([^)]+)\)/g,
      (match, alt, path) => {
        const assetPath = join('/img', discovery.type, basename(discovery.path), path);
        return `![${alt}](${assetPath})`;
      }
    );
    
    // Add navigation helpers
    const navigation = this.generateNavigationSection(discovery);
    transformedContent = `${transformedContent}\n\n${navigation}`;
    
    return matter.stringify(transformedContent, docusaurusFrontmatter);
  }
  
  private extractTitle(markdown: string): string | null {
    const match = markdown.match(/^#\s+(.+)$/m);
    return match ? match[1] : null;
  }
  
  private generateNavigationSection(discovery: DocumentationStatus): string {
    return `
---

## Related Documentation

- [All ${this.formatTypeName(discovery.type)}](../)
- [Architecture Overview](/docs/architecture)
- [API Reference](/docs/api)
`;
  }
  
  private async generateApiDocs(
    discovery: DocumentationStatus,
    targetDir: string
  ): Promise<void> {
    // For microservices, extract OpenAPI/Swagger
    if (discovery.type === 'microservice') {
      const swaggerPath = join(discovery.path, 'swagger.json');
      try {
        const swagger = await readFile(swaggerPath, 'utf-8');
        const apiDoc = this.generateApiDocFromSwagger(JSON.parse(swagger));
        await writeFile(join(targetDir, 'api.md'), apiDoc);
      } catch {
        // No swagger file
      }
    }
    
    // For modules, extract TypeScript definitions
    if (discovery.type === 'module') {
      const indexPath = join(discovery.path, 'dist', 'index.d.ts');
      try {
        const types = await readFile(indexPath, 'utf-8');
        const apiDoc = this.generateApiDocFromTypes(types);
        await writeFile(join(targetDir, 'api-reference.md'), apiDoc);
      } catch {
        // No type definitions
      }
    }
  }
  
  private generateApiDocFromSwagger(swagger: any): string {
    let doc = `---
title: API Reference
---

# API Reference

`;
    
    // Extract and format API documentation from Swagger
    if (swagger.paths) {
      for (const [path, methods] of Object.entries(swagger.paths)) {
        for (const [method, spec] of Object.entries(methods as any)) {
          doc += `## ${method.toUpperCase()} ${path}\n\n`;
          doc += `${spec.summary || ''}\n\n`;
          
          if (spec.parameters) {
            doc += `### Parameters\n\n`;
            doc += '| Name | In | Type | Required | Description |\n';
            doc += '|------|-----|------|----------|-------------|\n';
            for (const param of spec.parameters) {
              doc += `| ${param.name} | ${param.in} | ${param.type} | ${param.required} | ${param.description || ''} |\n`;
            }
            doc += '\n';
          }
          
          if (spec.responses) {
            doc += `### Responses\n\n`;
            for (const [code, response] of Object.entries(spec.responses)) {
              doc += `#### ${code}\n\n${response.description}\n\n`;
            }
          }
        }
      }
    }
    
    return doc;
  }
  
  private generateApiDocFromTypes(types: string): string {
    // Parse TypeScript definitions and generate documentation
    // This is a simplified version - in practice, you'd use a proper TS parser
    return `---
title: API Reference
---

# API Reference

## Type Definitions

\`\`\`typescript
${types}
\`\`\`
`;
  }
  
  private async updateSidebars(discoveries: DocumentationStatus[]): Promise<void> {
    const sidebarPath = join(this.docsPath, 'sidebars.js');
    
    const sidebar = {
      docs: [
        {
          type: 'category',
          label: 'Getting Started',
          items: ['intro', 'installation', 'quick-start']
        },
        {
          type: 'category',
          label: 'Architecture',
          items: ['architecture/overview', 'architecture/design-patterns']
        },
        ...this.generateSidebarCategories(discoveries)
      ]
    };
    
    const sidebarContent = `module.exports = ${JSON.stringify(sidebar, null, 2)};`;
    await writeFile(sidebarPath, sidebarContent);
  }
  
  private generateSidebarCategories(
    discoveries: DocumentationStatus[]
  ): any[] {
    const grouped = this.groupByType(discoveries);
    
    return Object.entries(grouped).map(([type, items]) => ({
      type: 'category',
      label: this.formatTypeName(type),
      items: items.map(item => ({
        type: 'doc',
        id: `${type}/${basename(item.path)}/index`
      }))
    }));
  }
  
  private async updateLandingPages(
    grouped: Record<string, DocumentationStatus[]>
  ): Promise<void> {
    for (const [type, items] of Object.entries(grouped)) {
      const landingPath = join(this.docsPath, type, 'index.md');
      const content = this.generateLandingPage(type, items);
      await writeFile(landingPath, content);
    }
  }
  
  private generateLandingPage(
    type: string,
    items: DocumentationStatus[]
  ): string {
    return `---
title: ${this.formatTypeName(type)}
hide_title: true
---

# ${this.formatTypeName(type)}

## Overview

This section contains documentation for all ${type} in the project.

## Available ${this.formatTypeName(type)}

${items.map(item => {
  const name = basename(item.path);
  const issues = item.issues.length > 0 ? ` ⚠️ (${item.issues.length} issues)` : '';
  return `- [${name}](./${name})${issues}`;
}).join('\n')}

## Quick Links

- [Architecture Overview](/docs/architecture)
- [Development Guide](/docs/guides/development)
- [API Reference](/docs/api)

## Status

Total ${type}: ${items.length}
Documentation coverage: ${Math.round(items.filter(i => i.hasReadme).length / items.length * 100)}%
`;
  }
  
  private formatTypeName(type: string): string {
    const formatted = type.charAt(0).toUpperCase() + type.slice(1);
    return formatted.replace(/s$/, '') + 's';
  }
  
  private getTypePosition(type: string): number {
    const positions = {
      'applications': 3,
      'microservices': 4,
      'modules': 5,
      'components': 6
    };
    return positions[type] || 99;
  }
  
  private async copyDocsFolder(source: string, target: string): Promise<void> {
    // Implementation to recursively copy docs folder
  }
}
```

### 4. CI/CD Integration

```yaml
# .github/workflows/documentation-check.yml
name: Documentation Check

on:
  pull_request:
    types: [opened, synchronize]
  push:
    branches: [main]
  schedule:
    - cron: '0 0 * * 1' # Weekly on Monday

jobs:
  check-documentation:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0 # Full history for git analysis
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run documentation scanner
        id: scan
        run: |
          npm run docs:scan > scan-results.json
          echo "::set-output name=has-issues::$(jq '.issues | length > 0' scan-results.json)"
      
      - name: Generate documentation report
        if: github.event_name == 'pull_request'
        run: |
          npm run docs:report --output=pr-comment.md
      
      - name: Comment on PR
        if: github.event_name == 'pull_request' && steps.scan.outputs.has-issues == 'true'
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const comment = fs.readFileSync('pr-comment.md', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });
      
      - name: Update documentation
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        run: |
          npm run docs:update
          npm run docs:sync-docusaurus
      
      - name: Commit documentation updates
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add -A
          git diff --staged --quiet || git commit -m "docs: auto-update documentation [skip ci]"
          git push
      
      - name: Deploy to Docusaurus
        if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        run: |
          cd docs
          npm run build
          npm run deploy
        env:
          GIT_USER: ${{ github.actor }}
          DEPLOYMENT_BRANCH: gh-pages
```

### 5. Documentation CLI Tool

```typescript
// cli/docs-cli.ts
#!/usr/bin/env node

import { Command } from 'commander';
import { DocumentationDiscoveryService } from '../services/documentation-discovery';
import { ReadmeUpdaterService } from '../services/readme-updater';
import { DocusaurusIntegrationService } from '../services/docusaurus-integration';
import chalk from 'chalk';
import ora from 'ora';

const program = new Command();

program
  .name('docs-cli')
  .description('Documentation management CLI')
  .version('1.0.0');

program
  .command('scan')
  .description('Scan project for documentation issues')
  .option('-p, --path <path>', 'Project root path', process.cwd())
  .option('-o, --output <file>', 'Output results to file')
  .action(async (options) => {
    const spinner = ora('Scanning project documentation...').start();
    
    try {
      const discovery = new DocumentationDiscoveryService();
      const results = await discovery.scanProject(options.path);
      
      spinner.succeed('Scan complete!');
      
      // Display results
      console.log(chalk.bold('\n📚 Documentation Status Report\n'));
      
      let totalIssues = 0;
      for (const item of results) {
        const status = item.hasReadme ? '✅' : '❌';
        const issues = item.issues.length;
        totalIssues += issues;
        
        console.log(`${status} ${chalk.cyan(item.path)}`);
        if (issues > 0) {
          console.log(chalk.red(`   Issues: ${issues}`));
          item.issues.forEach(issue => {
            console.log(chalk.gray(`   - ${issue}`));
          });
        }
        if (item.suggestions.length > 0) {
          console.log(chalk.yellow(`   Suggestions:`));
          item.suggestions.forEach(suggestion => {
            console.log(chalk.gray(`   - ${suggestion}`));
          });
        }
      }
      
      console.log(chalk.bold(`\nTotal issues found: ${totalIssues}`));
      
      if (options.output) {
        await writeFile(options.output, JSON.stringify(results, null, 2));
        console.log(chalk.green(`\nResults saved to ${options.output}`));
      }
    } catch (error) {
      spinner.fail('Scan failed');
      console.error(error);
      process.exit(1);
    }
  });

program
  .command('update')
  .description('Update README files with suggestions')
  .option('-p, --path <path>', 'Project root path', process.cwd())
  .option('-i, --interactive', 'Interactive mode')
  .option('--dry-run', 'Show what would be updated without making changes')
  .action(async (options) => {
    const spinner = ora('Analyzing documentation...').start();
    
    try {
      const discovery = new DocumentationDiscoveryService();
      const updater = new ReadmeUpdaterService();
      
      const results = await discovery.scanProject(options.path);
      spinner.succeed('Analysis complete!');
      
      for (const item of results) {
        if (item.issues.length > 0) {
          console.log(chalk.bold(`\n📝 ${item.path}`));
          
          const suggestions = await updater.generateUpdateSuggestions(
            item.path,
            item.type
          );
          
          if (suggestions.length === 0) {
            console.log(chalk.gray('No automatic updates available'));
            continue;
          }
          
          if (options.interactive) {
            // Show suggestions and ask for confirmation
            for (const suggestion of suggestions) {
              console.log(chalk.yellow(`\nSuggested update for ${suggestion.section}:`));
              console.log(chalk.gray(`Reason: ${suggestion.reason}`));
              console.log(chalk.green('Suggested content:'));
              console.log(suggestion.suggested);
              
              const { confirm } = await inquirer.prompt([{
                type: 'confirm',
                name: 'confirm',
                message: 'Apply this update?',
                default: true
              }]);
              
              if (!confirm) {
                suggestions.splice(suggestions.indexOf(suggestion), 1);
              }
            }
          }
          
          if (!options.dryRun && suggestions.length > 0) {
            await updater.applyUpdates(item.path, suggestions);
            console.log(chalk.green(`✅ Updated ${suggestions.length} sections`));
          } else if (options.dryRun) {
            console.log(chalk.yellow(`Would update ${suggestions.length} sections`));
          }
        }
      }
    } catch (error) {
      spinner.fail('Update failed');
      console.error(error);
      process.exit(1);
    }
  });

program
  .command('sync-docusaurus')
  .description('Sync documentation to Docusaurus')
  .option('-p, --path <path>', 'Project root path', process.cwd())
  .option('--clean', 'Clean existing Docusaurus docs first')
  .action(async (options) => {
    const spinner = ora('Syncing to Docusaurus...').start();
    
    try {
      const discovery = new DocumentationDiscoveryService();
      const docusaurus = new DocusaurusIntegrationService();
      
      const results = await discovery.scanProject(options.path);
      
      if (options.clean) {
        // Clean existing docs
        spinner.text = 'Cleaning existing documentation...';
        await docusaurus.cleanDocs();
      }
      
      spinner.text = 'Syncing documentation...';
      await docusaurus.syncDocumentation(results);
      
      spinner.succeed('Documentation synced successfully!');
      
      console.log(chalk.green('\n✅ Documentation is now available in Docusaurus'));
      console.log(chalk.gray('Run `npm run docs:start` to preview'));
    } catch (error) {
      spinner.fail('Sync failed');
      console.error(error);
      process.exit(1);
    }
  });

program
  .command('watch')
  .description('Watch for changes and auto-update documentation')
  .option('-p, --path <path>', 'Project root path', process.cwd())
  .action(async (options) => {
    console.log(chalk.bold('👀 Watching for documentation changes...\n'));
    
    const watcher = chokidar.watch(['**/*.md', '**/package.json'], {
      ignored: ['node_modules', 'dist', '.git'],
      cwd: options.path
    });
    
    const discovery = new DocumentationDiscoveryService();
    const updater = new ReadmeUpdaterService();
    
    watcher.on('change', async (path) => {
      console.log(chalk.yellow(`File changed: ${path}`));
      
      // Re-scan affected directory
      const dirPath = dirname(path);
      const status = await discovery.analyzeDirectory(dirPath, 'module');
      
      if (status.issues.length > 0) {
        console.log(chalk.red(`Issues detected in ${dirPath}`));
        status.issues.forEach(issue => {
          console.log(chalk.gray(`  - ${issue}`));
        });
      }
    });
  });

program.parse();
```

## Configuration

### 1. Docusaurus Configuration

```javascript
// docusaurus.config.js
module.exports = {
  title: 'Project Documentation',
  tagline: 'Comprehensive documentation for all components',
  url: 'https://docs.example.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'your-org',
  projectName: 'your-project',

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/your-org/your-project/tree/main/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Documentation',
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/docs/applications',
          label: 'Applications',
          position: 'left',
        },
        {
          to: '/docs/microservices',
          label: 'Services',
          position: 'left',
        },
        {
          to: '/docs/api',
          label: 'API',
          position: 'left',
        },
        {
          href: 'https://github.com/your-org/your-project',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'Architecture',
              to: '/docs/architecture',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/your-project',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/your-project',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Your Organization.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
    algolia: {
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_SEARCH_API_KEY',
      indexName: 'your_index_name',
    },
  },

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'api',
        path: 'api',
        routeBasePath: 'api',
        sidebarPath: require.resolve('./sidebarsAPI.js'),
      },
    ],
    '@docusaurus/plugin-ideal-image',
    [
      '@docusaurus/plugin-pwa',
      {
        debug: true,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/logo.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: '#2e8555',
          },
        ],
      },
    ],
  ],
};
```

### 2. Package.json Scripts

```json
{
  "scripts": {
    "docs:scan": "docs-cli scan",
    "docs:update": "docs-cli update",
    "docs:sync": "docs-cli sync-docusaurus",
    "docs:watch": "docs-cli watch",
    "docs:start": "cd docs && npm start",
    "docs:build": "cd docs && npm run build",
    "docs:deploy": "cd docs && npm run deploy",
    "docs:check": "docs-cli scan --output=docs-report.json",
    "predocs:build": "npm run docs:sync",
    "prepublishOnly": "npm run docs:update"
  }
}
```

## Usage Examples

### 1. Initial Setup

```bash
# Install documentation tools
npm install -D @company/docs-cli docusaurus @docusaurus/preset-classic

# Initialize Docusaurus
npx docusaurus init

# Run initial scan
npm run docs:scan

# Update all READMEs
npm run docs:update

# Sync to Docusaurus
npm run docs:sync

# Start documentation server
npm run docs:start
```

### 2. CI/CD Integration

```yaml
# In your CI pipeline
- name: Check documentation
  run: |
    npm run docs:check
    if [ -s docs-report.json ]; then
      echo "Documentation issues found"
      cat docs-report.json
      exit 1
    fi
```

### 3. Pre-commit Hook

```bash
#!/bin/sh
# .husky/pre-commit

# Check if documentation needs updating
files=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|js|json)$')

if [ -n "$files" ]; then
  npm run docs:check
  if [ $? -ne 0 ]; then
    echo "Documentation needs updating. Run 'npm run docs:update'"
    exit 1
  fi
fi
```

This comprehensive documentation standard and automation process ensures:

1. **Consistent Documentation** - Templates for each type of component
2. **Automated Discovery** - Finds undocumented or outdated files
3. **Smart Updates** - AI-assisted README updates based on code changes
4. **Docusaurus Integration** - Automatic sync to documentation website
5. **CI/CD Integration** - Enforcement through automated checks
6. **Real-time Monitoring** - Watch mode for continuous updates

The system automatically maintains high-quality documentation across your entire codebase.