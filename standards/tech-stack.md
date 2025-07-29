# Tech Stack

## Core Technologies

- **Framework:** Spring Boot 3.5.4 (Java 21)
- **Database:** PostgreSQL 17+ with JPA/Hibernate

## Frontend Stack

- **Framework:** React 18.3.0 with Vite
- **Node:** 22 LTS with npm
- **CSS:** TailwindCSS 4.0+ with PostCSS
- **UI:** Material-UI / Ant Design (latest)

## Assets & Media

- **Fonts:** Google Fonts (self-hosted)
- **Icons:** Lucide React components

## Infrastructure

- **App Hosting:** Digital Ocean (App Platform/Droplets)
- **Database:** Digital Ocean Managed PostgreSQL (daily backups)
- **Assets:** S3 + CloudFront (signed URLs)

## Deployment

- **CI/CD:** GitHub Actions (push to main/staging)
- **Environments:** Production (main), Staging (staging), Review Apps (PRs)

## Checklist
- [ ] Framework matches team expertise
- [ ] Database scalable and reliable
- [ ] Frontend meets requirements
- [ ] Build tools standardized
- [ ] UI library selected
- [ ] Asset strategy defined
- [ ] Documented in product/tech-stack.md

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

