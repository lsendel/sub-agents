# Tech Stack

> Version: 1.0.0
> Last Updated: 2025-08-31

## Context

This file defines global tech stack defaults that are referenced by all product codebases when initializing new projects. Individual projects may override these choices in their `./product/tech-stack.md` file.

## Core Technologies

### Application Framework
- **Framework:** Spring Boot
- **Version:** 3.0+
- **Language:** Java 17+

### Database
- **Primary:** PostgreSQL
- **Version:** 17+
- **ORM:** JPA/Hibernate

## Frontend Stack

### JavaScript Framework
- **Framework:** React
- **Version:** Latest stable
- **Build Tool:** Vite

### Import Strategy
- **Strategy:** Node.js modules
- **Package Manager:** npm
- **Node Version:** 22 LTS

### CSS Framework
- **Framework:** TailwindCSS
- **Version:** 4.0+
- **PostCSS:** Yes

### UI Components
- **Library:** Material-UI / Ant Design
- **Version:** Latest
- **Installation:** Via npm/yarn

## Assets & Media

### Fonts
- **Provider:** Google Fonts
- **Loading Strategy:** Self-hosted for performance

### Icons
- **Library:** Lucide
- **Implementation:** React components

## Infrastructure

### Application Hosting
- **Platform:** Digital Ocean
- **Service:** App Platform / Droplets
- **Region:** Primary region based on user base

### Database Hosting
- **Provider:** Digital Ocean
- **Service:** Managed PostgreSQL
- **Backups:** Daily automated

### Asset Storage
- **Provider:** Amazon S3
- **CDN:** CloudFront
- **Access:** Private with signed URLs

## Deployment

### CI/CD Pipeline
- **Platform:** GitHub Actions
- **Trigger:** Push to main/staging branches
- **Tests:** Run before deployment

### Environments
- **Production:** main branch
- **Staging:** staging branch
- **Review Apps:** PR-based (optional)

## Tech Stack Selection Checklist
- [ ] Application framework and language selected based on team expertise
- [ ] Database choice justified for scalability and reliability
- [ ] Frontend stack aligns with product requirements
- [ ] Build tools and package managers standardized
- [ ] UI component library chosen for consistency
- [ ] Asset and media strategy defined
- [ ] All tech choices documented in product/tech-stack.md

## Tech Stack Documentation Template
```markdown
# Tech Stack

## Application Framework
- **Framework:** [e.g., Spring Boot]
- **Version:** [e.g., 3.0+]
- **Language:** [e.g., Java 17+]

## Database
- **Primary:** [e.g., PostgreSQL]
- **Version:** [e.g., 17+]
- **ORM:** [e.g., JPA/Hibernate]

## Frontend Stack
- **Framework:** [e.g., React]
- **Version:** [Latest stable]
- **Build Tool:** [e.g., Vite]
- **Package Manager:** [e.g., npm]
- **Node Version:** [e.g., 22 LTS]
- **CSS Framework:** [e.g., TailwindCSS]
- **UI Components:** [e.g., Instrumental Components]

## Assets & Media
- **Fonts:** [e.g., Google Fonts, self-hosted]
- **Icons:** [e.g., FontAwesome, custom SVGs]

## Rationale
- [Why each technology was chosen]
- [Alternatives considered]
- [Migration/upgrade plan]
```

---

*For more on standards, see [Product Planning Guide](../process/plan-product.md) and [Development Best Practices](./best-practices.md).*

*Customize this file with your organization's preferred tech stack. These defaults are used when initializing new projects.*
