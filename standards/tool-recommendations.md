---
name: tool-recommendations
type: standard
version: 1.0.0
description: Modern JavaScript/TypeScript development tool recommendations and configurations
author: Claude
tags: [tools, javascript, typescript, testing, development, devops]
related_commands: [/setup-tools, /tool-audit]
---

# Tool Recommendations

## Testing Stack

### Test Runners

#### Vitest (Recommended for New Projects)
```json
{
  "devDependencies": {
    "vitest": "^1.2.0",
    "@vitest/ui": "^1.2.0",
    "@vitest/coverage-v8": "^1.2.0"
  }
}
```

**Vitest Benefits:** ESM support, Vite-powered, Jest-compatible, TypeScript ready
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'test/'],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
```

#### Jest (For Existing Projects)
```json
{
  "devDependencies": {
    "jest": "^29.7.0",
    "@types/jest": "^29.5.0",
    "ts-jest": "^29.1.0",
    "@testing-library/jest-dom": "^6.2.0"
  }
}
```

### Testing Libraries

#### Component Testing
```json
{
  "devDependencies": {
    "@testing-library/react": "^14.1.0",
    "@testing-library/user-event": "^14.5.0",
    "@testing-library/react-hooks": "^8.0.0",
    "react-test-renderer": "^18.2.0"
  }
}
```

#### E2E Testing
```json
{
  "devDependencies": {
    "@playwright/test": "^1.41.0",
    "@playwright/experimental-ct-react": "^1.41.0"
  }
}
```

**Playwright Configuration:**
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
```

#### API Testing & Mocking
```json
{
  "devDependencies": {
    "msw": "^2.1.0",
    "supertest": "^6.3.0",
    "@mswjs/data": "^0.16.0",
    "nock": "^13.4.0"
  }
}
```

## Development Environment

### Package Managers

#### pnpm (Recommended)
```bash
npm install -g pnpm@latest
```
**Benefits:** Disk efficient, fast, strict deps, monorepo support

**Workspace Configuration:**
```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
  - 'docs'
```

#### Package Manager Enforcement
```json
// package.json
{
  "engines": {
    "node": ">=20.0.0",
    "pnpm": ">=8.0.0"
  },
  "packageManager": "pnpm@8.14.0"
}
```

### TypeScript Configuration

```json
{
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/node": "^20.11.0",
    "tsx": "^4.7.0",
    "ts-node": "^10.9.0"
  }
}
```

**Recommended tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "incremental": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "allowJs": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "build"]
}
```

### Code Editors

#### VS Code Extensions
```json
// .vscode/extensions.json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "prisma.prisma",
    "ms-vscode.vscode-typescript-next",
    "lokalise.i18n-ally",
    "vitest.explorer",
    "github.copilot",
    "eamodio.gitlens",
    "usernamehw.errorlens",
    "streetsidesoftware.code-spell-checker"
  ]
}
```

## Build Tools

### Bundlers

#### Vite (Frontend)
```json
{
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "vite-plugin-pwa": "^0.17.0",
    "vite-tsconfig-paths": "^4.3.0"
  }
}
```

**Vite Configuration:**
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt'],
      manifest: {
        name: 'App Name',
        short_name: 'App',
        theme_color: '#ffffff',
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['lodash', 'date-fns'],
        },
      },
    },
  },
});
```

#### esbuild (Backend/Libraries)
```json
{
  "devDependencies": {
    "esbuild": "^0.19.0",
    "esbuild-register": "^3.5.0"
  }
}
```

#### Turbopack (Next.js)
```json
{
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build"
  }
}
```

### Transpilation & Polyfills

```json
{
  "devDependencies": {
    "@babel/core": "^7.23.0",
    "@babel/preset-env": "^7.23.0",
    "@babel/preset-react": "^7.23.0",
    "@babel/preset-typescript": "^7.23.0",
    "core-js": "^3.35.0"
  }
}
```

## Code Quality

### Linting

#### ESLint + Prettier
```json
{
  "devDependencies": {
    "eslint": "^8.56.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-react": "^7.33.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "@typescript-eslint/parser": "^6.19.0",
    "@typescript-eslint/eslint-plugin": "^6.19.0",
    "eslint-plugin-import": "^2.29.0",
    "eslint-plugin-jsx-a11y": "^6.8.0",
    "eslint-plugin-testing-library": "^6.2.0",
    "prettier": "^3.2.0"
  }
}
```

**ESLint Configuration:**
```javascript
// .eslintrc.js
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  plugins: ['testing-library'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      { checksVoidReturn: false },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
      },
    ],
  },
  overrides: [
    {
      files: ['**/__tests__/**/*', '**/*.test.*'],
      extends: ['plugin:testing-library/react'],
    },
  ],
};
```

#### Biome (Alternative All-in-One)
```json
{
  "devDependencies": {
    "@biomejs/biome": "^1.5.0"
  }
}
```

**Biome Configuration:**
```json
// biome.json
{
  "formatter": {
    "enabled": true,
    "formatWithErrors": false,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 80
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "suspicious": {
        "noExplicitAny": "error"
      }
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "trailingComma": "es5"
    }
  }
}
```

### Git Hooks

```json
{
  "devDependencies": {
    "husky": "^8.0.0",
    "lint-staged": "^15.2.0",
    "commitizen": "^4.3.0",
    "cz-conventional-changelog": "^3.3.0",
    "@commitlint/cli": "^18.4.0",
    "@commitlint/config-conventional": "^18.4.0"
  }
}
```

**Configuration:**
```json
// package.json
{
  "scripts": {
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,yml}": [
      "prettier --write"
    ]
  },
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
}
```

## Documentation

### API Documentation

```json
{
  "devDependencies": {
    "typedoc": "^0.25.0",
    "typedoc-plugin-markdown": "^3.17.0",
    "@microsoft/api-extractor": "^7.39.0",
    "@microsoft/api-documenter": "^7.23.0"
  }
}
```

### Component Documentation

```json
{
  "devDependencies": {
    "@storybook/react": "^7.6.0",
    "@storybook/react-vite": "^7.6.0",
    "@storybook/addon-essentials": "^7.6.0",
    "@storybook/addon-interactions": "^7.6.0",
    "@storybook/addon-a11y": "^7.6.0",
    "@storybook/test": "^7.6.0"
  }
}
```

## Performance & Monitoring

### Bundle Analysis

```json
{
  "devDependencies": {
    "@next/bundle-analyzer": "^14.1.0",
    "webpack-bundle-analyzer": "^4.10.0",
    "vite-plugin-visualizer": "^0.9.0",
    "source-map-explorer": "^2.5.0"
  }
}
```

### Performance Testing

```json
{
  "devDependencies": {
    "lighthouse": "^11.4.0",
    "web-vitals": "^3.5.0",
    "@k6-io/xk6": "^0.9.0"
  }
}
```

### Runtime Monitoring

```json
{
  "dependencies": {
    "@sentry/react": "^7.93.0",
    "@sentry/tracing": "^7.93.0",
    "@opentelemetry/api": "^1.7.0",
    "@opentelemetry/sdk-node": "^0.46.0"
  }
}
```

## Utilities

### Data Manipulation

```json
{
  "dependencies": {
    "zod": "^3.22.0",
    "date-fns": "^3.2.0",
    "lodash-es": "^4.17.0",
    "@faker-js/faker": "^8.3.0"
  }
}
```

### State Management

```json
{
  "dependencies": {
    "zustand": "^4.4.0",
    "@tanstack/react-query": "^5.17.0",
    "valtio": "^1.12.0",
    "jotai": "^2.6.0"
  }
}
```

### Styling

```json
{
  "dependencies": {
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0",
    "tailwindcss": "^3.4.0",
    "clsx": "^2.1.0",
    "cva": "^0.0.0"
  }
}
```

## Monorepo Management

### Turborepo
```json
{
  "devDependencies": {
    "turbo": "^1.11.0"
  }
}
```

**turbo.json:**
```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": [],
      "cache": false
    },
    "lint": {
      "outputs": []
    },
    "dev": {
      "cache": false
    }
  }
}
```

### Nx (Alternative)
```json
{
  "devDependencies": {
    "nx": "^17.2.0",
    "@nx/workspace": "^17.2.0",
    "@nx/react": "^17.2.0",
    "@nx/jest": "^17.2.0"
  }
}
```

## CI/CD Tools

### GitHub Actions Dependencies
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Type check
        run: pnpm type-check
      
      - name: Lint
        run: pnpm lint
      
      - name: Test
        run: pnpm test:ci
      
      - name: Build
        run: pnpm build
```

### Release Management

```json
{
  "devDependencies": {
    "@changesets/cli": "^2.27.0",
    "semantic-release": "^22.0.0",
    "@semantic-release/changelog": "^6.0.0",
    "@semantic-release/git": "^10.0.0"
  }
}
```

## Security Tools

```json
{
  "devDependencies": {
    "npm-audit-resolver": "^3.0.0",
    "snyk": "^1.1269.0",
    "lockfile-lint": "^4.12.0"
  }
}
```

## Migration Strategies

### Jest → Vitest
```bash
pnpm add -D vitest @vitest/ui
# Most tests work unchanged
```

### Webpack → Vite
```bash
pnpm add -D vite @vitejs/plugin-react
# Create vite.config.ts
```

### npm/yarn → pnpm
```bash
npm install -g pnpm
pnpm import
pnpm install
```

## Selection Criteria

1. **Performance** - Build speed, runtime
2. **DX** - Setup, debugging
3. **Community** - Maintenance, ecosystem
4. **Compatibility** - Existing stack
5. **Learning Curve** - Team skills
6. **Future-Proof** - Industry trends

## Quick Start Templates

### Full Stack TypeScript
```bash
# Create new project with recommended tools
pnpm create vite my-app --template react-ts
cd my-app
pnpm add -D vitest @testing-library/react @testing-library/jest-dom
pnpm add -D eslint prettier husky lint-staged
pnpm add -D @types/node

# Initialize configs
pnpm exec eslint --init
echo {} > .prettierrc
pnpm exec husky install
```

### Library Development
```bash
# TypeScript library starter
pnpm init
pnpm add -D typescript tsup vitest
pnpm add -D @changesets/cli
pnpm add -D typedoc

# Build configuration
echo 'export default { entry: ["src/index.ts"], format: ["esm", "cjs"], dts: true }' > tsup.config.ts
```

