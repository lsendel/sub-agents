---
name: api-design
type: standard
version: 1.0.0
description: LLM-optimized RESTful API design patterns with OpenAPI specifications and best practices
author: Claude
tags: [api, rest, design, standards, openapi, llm-guide]
related_commands: [/design-api, /api-review, /generate-openapi]
---

# API Design Standards for LLMs

> Version: 1.0.0
> Last updated: 2025-07-29
> Purpose: Enable LLMs to design and review REST APIs consistently
> Target: Language models creating or reviewing API specifications

## Context for LLM Usage

This guide is specifically designed for language models designing REST APIs. When creating APIs:
- You will receive requirements in various formats (user stories, technical specs, existing code)
- You should generate OpenAPI specifications following these patterns
- Your output should include examples, error cases, and integration documentation
- You must consider security, performance, and maintainability from the start

## Reading API Requirements

When analyzing API requirements:
1. **Identify Resources**: Extract nouns that represent entities
2. **Map Operations**: Determine CRUD operations needed
3. **Define Relationships**: Understand resource hierarchies
4. **Extract Constraints**: Note rate limits, auth requirements, validation rules

## Core Principles
- Use consistent naming conventions (lowercase, hyphens for word separation)
- Keep endpoints focused and RESTful (one resource per endpoint)
- Standardize response formats (consistent envelope structure)
- Version breaking changes (use /v1, /v2 prefixes)
- Design for pagination from the start
- Include filtering and sorting capabilities
- Plan for future expansion with extensible schemas

## URL Structure

### General Format
```
https://api.example.com/v1/resources/{id}/sub-resources
```

### Rules
- Use lowercase letters
- Separate words with hyphens
- Use plural nouns for collections
- Avoid verbs in URLs (use HTTP methods)

### Examples
```
GET    /api/v1/users              # List users
POST   /api/v1/users              # Create user
GET    /api/v1/users/123          # Get specific user
PUT    /api/v1/users/123          # Update user
DELETE /api/v1/users/123          # Delete user
GET    /api/v1/users/123/orders   # Get user's orders
```

## HTTP Methods
- **GET**: Retrieve resources (safe, idempotent)
- **POST**: Create new resources
- **PUT**: Update entire resource (idempotent)
- **PATCH**: Partial update (idempotent)
- **DELETE**: Remove resources (idempotent)

## Request Standards

### Headers
```http
Content-Type: application/json
Accept: application/json
Authorization: Bearer {token}
X-Request-ID: {unique-id}
```

### Request Body
```json
{
  "data": {
    "type": "user",
    "attributes": {
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
}
```

## Response Standards

### Success Response
```json
{
  "data": {
    "id": "123",
    "type": "user",
    "attributes": {
      "email": "user@example.com",
      "name": "John Doe",
      "createdAt": "2024-01-15T10:30:00Z"
    },
    "links": {
      "self": "/api/v1/users/123"
    }
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

### Collection Response
```json
{
  "data": [
    {
      "id": "123",
      "type": "user",
      "attributes": { ... }
    }
  ],
  "meta": {
    "total": 150,
    "page": 1,
    "perPage": 20
  },
  "links": {
    "self": "/api/v1/users?page=1",
    "next": "/api/v1/users?page=2",
    "last": "/api/v1/users?page=8"
  }
}
```

## Status Codes

### Success Codes
- **200 OK**: Successful GET, PUT, PATCH
- **201 Created**: Successful POST
- **204 No Content**: Successful DELETE
- **202 Accepted**: Request accepted for async processing

### Client Error Codes
- **400 Bad Request**: Invalid request format
- **401 Unauthorized**: Missing or invalid authentication
- **403 Forbidden**: Authenticated but not authorized
- **404 Not Found**: Resource doesn't exist
- **409 Conflict**: Request conflicts with current state
- **422 Unprocessable Entity**: Validation errors

### Server Error Codes
- **500 Internal Server Error**: Generic server error
- **502 Bad Gateway**: Invalid response from upstream
- **503 Service Unavailable**: Service temporarily down
- **504 Gateway Timeout**: Upstream timeout

## Error Handling

### Error Response Format
```json
{
  "errors": [
    {
      "id": "unique-error-id",
      "status": "422",
      "code": "VALIDATION_ERROR",
      "title": "Validation Failed",
      "detail": "Email format is invalid",
      "source": {
        "pointer": "/data/attributes/email"
      },
      "meta": {
        "timestamp": "2024-01-15T10:30:00Z"
      }
    }
  ]
}
```

### Error Codes
- Use consistent, descriptive error codes
- Include both HTTP status and application-specific codes
- Provide actionable error messages

## Pagination

### Query Parameters
```
GET /api/v1/users?page=2&per_page=20
GET /api/v1/users?offset=20&limit=20
GET /api/v1/users?cursor=eyJpZCI6MTIzfQ
```

### Pagination Headers
```http
X-Total-Count: 150
X-Page: 2
X-Per-Page: 20
Link: <...?page=3>; rel="next", <...?page=1>; rel="prev"
```

## Filtering and Sorting

### Filtering
```
GET /api/v1/users?filter[status]=active
GET /api/v1/users?filter[created_at][gte]=2024-01-01
GET /api/v1/users?q=john
```

### Sorting
```
GET /api/v1/users?sort=created_at
GET /api/v1/users?sort=-created_at,name
```

## Versioning

### URL Versioning (Recommended)
```
https://api.example.com/v1/users
https://api.example.com/v2/users
```

### Header Versioning
```http
Accept: application/vnd.api+json;version=1
API-Version: 1
```

### Version Deprecation
- Announce deprecation well in advance
- Include deprecation warnings in responses
- Provide migration guides
- Support old versions for reasonable time

## Authentication

### Bearer Token
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### API Key
```http
X-API-Key: your-api-key-here
```

### OAuth 2.0
- Use for third-party integrations
- Implement proper scopes
- Regular token rotation

## Rate Limiting

### Headers
```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

### Rate Limit Response
```json
{
  "errors": [{
    "status": "429",
    "code": "RATE_LIMIT_EXCEEDED",
    "title": "Too Many Requests",
    "detail": "Rate limit exceeded. Try again in 60 seconds."
  }]
}
```

## Caching

### Cache Headers
```http
Cache-Control: public, max-age=3600
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"
Last-Modified: Wed, 21 Oct 2023 07:28:00 GMT
```

### Conditional Requests
```http
If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"
If-Modified-Since: Wed, 21 Oct 2023 07:28:00 GMT
```

## Best Practices
- Always use HTTPS
- Don't break existing endpoints
- Implement pagination for collections
- Validate all inputs
- Use parameterized queries
- Implement rate limiting
- Cache appropriately

## Implementation Checklist
- [ ] Consistent URL structure
- [ ] Proper HTTP method usage
- [ ] Standardized responses
- [ ] Error format consistency
- [ ] Pagination for collections
- [ ] Authentication implemented
- [ ] Rate limiting configured
- [ ] API versioning strategy
