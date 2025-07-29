# Cross-Reference Matrix

> Last updated: 2025-07-29
> Purpose: Document all cross-references between processes and standards

## Process → Standards References

### analyze-product.md
References:
- **coding-standards.md** - For identifying code patterns and conventions
- **testing-standards.md** - For analyzing test coverage and quality
- **documentation-standard.md** - For creating product documentation
- **tech-stack.md** - For documenting technology choices
- **domain-driven-design.md** - For understanding architecture patterns

### create-spec.md
References:
- **documentation-standard.md** - For specification format and structure
- **api-design.md** - When designing API endpoints
- **domain-driven-design.md** - For domain modeling and bounded contexts
- **ui-design-guide.md** - For UI/UX specifications
- **testing-standards.md** - For defining test scenarios

### feature-development.md
References:
- **coding-standards.md** - For writing consistent, quality code
- **code-style.md** - For proper code formatting
- **testing-standards.md** - For comprehensive test coverage
- **best-practices.md** - For development patterns and practices
- **documentation-standard.md** - For updating documentation
- **api-design.md** - When implementing API endpoints

### code-review.md
References:
- **code-review-guide.md** - Comprehensive review patterns and anti-patterns
- **coding-standards.md** - Check code quality and conventions
- **code-style.md** - Verify formatting consistency
- **testing-standards.md** - Assess test coverage and quality
- **best-practices.md** - Evaluate design patterns
- **api-design.md** - Review API endpoints and contracts

### post-deployment-automation.md
References:
- **testing-standards.md** - For automated test coverage requirements
- **ui-design-guide.md** - For UI/UX validation criteria
- **best-practices.md** - For performance benchmarks
- **api-design.md** - For API endpoint testing

## Standards → Process References (Bidirectional)

### code-review-guide.md
Used by:
- **code-review.md** - The process for conducting code reviews
- **feature-development.md** - During the review phase

### testing-standards.md
Applied in:
- **feature-development.md** - Writing tests during development
- **code-review.md** - Reviewing test coverage
- **post-deployment-automation.md** - Automated testing validation

### documentation-standard.md
Used by:
- **analyze-product.md** - Creating product documentation
- **create-spec.md** - Writing feature specifications
- **feature-development.md** - Updating documentation

## Usage Guidelines

1. **For LLMs**: When following a process, automatically reference the linked standards
2. **For Developers**: Use standards as authoritative sources during process execution
3. **For Reviewers**: Check compliance with all referenced standards
4. **For Automation**: Validate against standards programmatically

## Benefits of Cross-References

1. **Consistency**: Processes always use current standards
2. **Completeness**: No standards are overlooked during processes
3. **Maintainability**: Updates to standards automatically affect all processes
4. **Discoverability**: Easy to find related documentation
5. **Quality**: Enforces best practices throughout development lifecycle