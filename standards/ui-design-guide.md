---
name: ui-design-guide
type: standard
version: 1.0.0
description: Comprehensive UI design standards based on Twenty UI design system
author: Claude
tags: [ui, design, components, styling, frontend]
related_commands: [/ui-component, /style-review]
---

# UI Design Guide

> Version: 1.0.0
> Last updated: 2025-07-29
> Based on: Twenty UI Design System
> Scope: Global UI/UX standards for all projects

## Context

This guide establishes consistent UI design patterns and component usage across all projects. It is based on the Twenty UI library architecture and modern React component best practices. Individual projects may extend these guidelines in their `./project/ui-guidelines.md` file.

## Core Design Principles

### Component-First Architecture
- Build interfaces using composable, reusable components
- Maintain clear separation between presentational and container components
- Follow atomic design principles: atoms → molecules → organisms → templates → pages

### Consistency Over Creativity
- Use established patterns and components before creating new ones
- Maintain visual and behavioral consistency across the application
- Document any deviations from standard patterns

### Accessibility by Default
- All components must meet WCAG 2.1 AA standards
- Include proper ARIA labels and semantic HTML
- Support keyboard navigation for all interactive elements

## Component Organization

### Directory Structure
```
src/
├── accessibility/     # Accessibility utilities and helpers
├── assets/           # Icons, images, and static resources
├── components/       # Core UI components
├── display/          # Display-specific components
├── feedback/         # User feedback components
├── input/            # Form and input components
├── layout/           # Layout and container components
├── navigation/       # Navigation components
├── theme/            # Theme configuration and providers
└── utilities/        # Helper functions and utilities
```

### Component Categories

#### Core Components

**Pill Component**
- Purpose: Display status, counts, or small labels
- Variants: Default, success, warning, danger, info
- Sizes: Small (20px height), Medium (24px height)
- Usage: Status indicators, notification badges, small metadata

**Avatar Chip**
- Purpose: Combine user avatar with associated information
- Features: Image/initials display, status indicator, action buttons
- Sizes: Small (32px), Medium (40px), Large (48px)
- Usage: User mentions, assignee lists, contact cards

**Chip Component**
- Purpose: Interactive or display-only tags
- Features: Deletable, clickable, icon support
- States: Default, selected, disabled
- Usage: Filter tags, category labels, multi-select items

**Tag Component**
- Purpose: Non-interactive categorization labels
- Variants: Filled, outlined
- Colors: Inherit from theme colors
- Usage: Content categorization, metadata display

#### Display Components
- Data visualization elements
- Content presentation components
- Information hierarchy elements

#### Feedback Components
- Toast notifications
- Loading states
- Progress indicators
- Error messages
- Success confirmations

#### Input Components
- Form controls
- Text inputs
- Selects and dropdowns
- Checkboxes and radio buttons
- Date/time pickers

#### Layout Components
- Grid systems
- Flex containers
- Spacing utilities
- Card layouts
- Page templates

#### Navigation Components
- Headers and navigation bars
- Breadcrumbs
- Tabs
- Sidebars
- Pagination

## Styling Approach

### CSS-in-JS with Emotion
- Use Emotion for component styling
- Leverage theme tokens for consistency
- Create styled components for reusability

### Theme Structure
```typescript
theme/
├── constants/       # Design tokens and constants
├── provider/        # Theme context provider
├── types/          # TypeScript definitions
└── utils/          # Theme manipulation utilities
```

### Design Tokens

#### Color System

##### Semantic Color Structure
Based on Twenty UI's approach, organize colors into functional categories:

**Background Colors**
```typescript
backgrounds: {
  primary: 'gray.0',      // Main content backgrounds
  secondary: 'gray.10',   // Secondary surfaces
  tertiary: 'gray.15',    // Tertiary elements
  quaternary: 'gray.20',  // Borders and dividers
  danger: 'red.10',       // Error/danger states
}
```

**Transparent Variants**
```typescript
transparent: {
  primary: 'rgba(gray.0, 0.5)',    // 50% opacity overlays
  secondary: 'rgba(gray.10, 0.5)', // Secondary overlays
  strong: 'rgba(gray.100, 0.16)',  // Strong emphasis
  medium: 'rgba(gray.100, 0.08)',  // Medium emphasis
  light: 'rgba(gray.100, 0.04)',   // Light emphasis
  lighter: 'rgba(gray.100, 0.02)', // Minimal emphasis
}
```

**Overlay System**
```typescript
overlays: {
  primary: 'rgba(gray.80, 0.8)',   // Modal backgrounds
  secondary: 'rgba(gray.80, 0.4)', // Dropdown shadows
  tertiary: 'rgba(gray.80, 0.08)', // Subtle overlays
}
```

##### Color Usage Guidelines
- Use grayscale as the foundation for UI elements
- Apply color sparingly for emphasis and state changes
- Maintain WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Test color combinations with accessibility tools

#### Typography Scale

##### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
```

##### Type Scale
```typescript
fontSizes: {
  xs: '11px',     // Small labels, hints
  sm: '13px',     // Secondary text
  md: '14px',     // Body text (default)
  lg: '16px',     // Emphasized body
  xl: '18px',     // Section headers
  '2xl': '24px',  // Page headers
  '3xl': '32px',  // Hero titles
}

fontWeights: {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
}

lineHeights: {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
}
```

#### Spacing System

##### Base Unit: 4px
```typescript
spacing: {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
}
```

##### Usage Patterns
- **Micro**: 4px - Icon spacing, tight padding
- **Small**: 8px - Default padding, small gaps
- **Medium**: 16px - Section spacing, card padding
- **Large**: 24px - Component spacing
- **Extra**: 32px+ - Page sections, major breaks

#### Animation & Transitions

##### Timing Values
```typescript
transitions: {
  fast: '150ms',
  normal: '250ms',
  slow: '350ms',
}

easing: {
  ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
}
```

##### Animation Guidelines
- Use `fast` (150ms) for hover states and micro-interactions
- Use `normal` (250ms) for most UI transitions
- Use `slow` (350ms) for complex animations or large elements
- Always respect `prefers-reduced-motion` media query
- Avoid animating properties that trigger layout (width, height)
- Prefer transform and opacity for performance

## Component Best Practices

### Component Development

#### Component Template
```typescript
import { styled } from '@emotion/styled';
import { forwardRef } from 'react';

interface ComponentProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  'aria-label'?: string;
}

const StyledComponent = styled.div<ComponentProps>`
  /* Use theme tokens */
  padding: ${({ theme, size }) => theme.spacing[size]};
  background: ${({ theme, variant }) => theme.backgrounds[variant]};
  
  /* Handle states */
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.transparent.light};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Component = forwardRef<HTMLDivElement, ComponentProps>(
  ({ variant = 'primary', size = 'medium', ...props }, ref) => {
    return (
      <StyledComponent
        ref={ref}
        variant={variant}
        size={size}
        {...props}
      />
    );
  }
);

Component.displayName = 'Component';
```

### Naming Conventions

#### Component Naming
```typescript
// ✅ Good
UserProfileCard
NavigationMenu
SearchInput
LoadingSpinner

// ❌ Bad
UPC              // Too abbreviated
NavMenu          // Inconsistent abbreviation
Component1       // Not descriptive
MyButton         // Too generic
```

#### File Structure
```
Button/
├── Button.tsx           // Main component
├── Button.styles.ts     // Styled components
├── Button.types.ts      // TypeScript interfaces
├── Button.test.tsx      // Unit tests
├── Button.stories.tsx   // Storybook stories
└── index.ts            // Public exports
```

#### Props Naming
```typescript
interface ComponentProps {
  // Boolean props use "is" or "has" prefix
  isDisabled?: boolean;
  hasError?: boolean;
  
  // Event handlers use "on" prefix
  onClick?: () => void;
  onChange?: (value: string) => void;
  
  // Render props use "render" prefix
  renderHeader?: () => ReactNode;
  
  // Style variants use descriptive names
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}
```

### Props Design
- Keep prop interfaces simple and intuitive
- Use TypeScript for type safety
- Provide sensible defaults
- Document complex props

## Responsive Design

### Breakpoints
```typescript
const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1440px'
};

// Media query helpers
const media = {
  mobile: `@media (min-width: ${breakpoints.mobile})`,
  tablet: `@media (min-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`,
  wide: `@media (min-width: ${breakpoints.wide})`,
};
```

### Mobile-First Implementation
```typescript
const ResponsiveComponent = styled.div`
  /* Mobile styles (default) */
  padding: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  
  /* Tablet and up */
  ${media.tablet} {
    padding: ${({ theme }) => theme.spacing[4]};
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
  
  /* Desktop and up */
  ${media.desktop} {
    padding: ${({ theme }) => theme.spacing[6]};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;
```

### Responsive Patterns
- **Stack to Horizontal**: Mobile columns become desktop rows
- **Show/Hide**: Progressive disclosure of UI elements
- **Adapt**: Adjust component size and spacing
- **Reflow**: Reorganize layout for optimal viewing

## Form Design Guidelines

### Input States
```typescript
const inputStates = {
  default: {
    border: 'gray.20',
    background: 'transparent',
  },
  hover: {
    border: 'gray.30',
    background: 'transparent.lighter',
  },
  focus: {
    border: 'primary',
    background: 'transparent',
    outline: '2px solid primary.light',
  },
  disabled: {
    border: 'gray.10',
    background: 'gray.5',
    opacity: 0.6,
  },
  error: {
    border: 'danger',
    background: 'danger.light',
  },
  success: {
    border: 'success',
    background: 'success.light',
  },
};
```

### Input Component Pattern
```typescript
const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme, hasError }) => 
    hasError ? theme.colors.danger : theme.backgrounds.quaternary};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.gray[30]};
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.primary.light};
    outline-offset: 2px;
  }
  
  &:disabled {
    background: ${({ theme }) => theme.backgrounds.secondary};
    cursor: not-allowed;
  }
`;
```

### Validation Patterns
- **Real-time**: Password strength indicators
- **On Blur**: Email and username validation
- **On Submit**: Final validation check
- **Async**: Server-side validation with loading states

## Icon Usage

### Icon System
```typescript
const iconSizes = {
  xs: '12px',
  sm: '16px',
  md: '20px',  // Default
  lg: '24px',
  xl: '32px',
};

interface IconProps {
  size?: keyof typeof iconSizes;
  color?: string;
  'aria-label': string;  // Required for accessibility
}
```

### Icon Implementation
```typescript
const Icon = styled.svg<{ size: string }>`
  width: ${({ size }) => iconSizes[size] || iconSizes.md};
  height: ${({ size }) => iconSizes[size] || iconSizes.md};
  fill: currentColor;
  flex-shrink: 0;
`;

// Usage with text
const IconButton = () => (
  <button>
    <Icon size="sm" aria-label="Settings" />
    <span>Settings</span>
  </button>
);
```

### Icon Guidelines
- Always provide `aria-label` for standalone icons
- Use `currentColor` for fill to inherit text color
- Maintain 1:1 aspect ratio for all icons
- Include 4px spacing between icon and text
- Use icon fonts or SVG sprites for performance

## Performance Considerations

### Bundle Size Optimization
```typescript
// Lazy loading example
const HeavyComponent = lazy(() => 
  import(/* webpackChunkName: "heavy-component" */ './HeavyComponent')
);

// Tree-shakeable exports
export { Button } from './Button';
export { Input } from './Input';
// Not: export * from './components';
```

### Performance Targets
- Initial bundle: <50KB gzipped
- Component bundles: <5KB each
- First paint: <1.5s on 3G
- Time to interactive: <3s on 3G

### Rendering Optimization
```typescript
// Memoized component
export const ExpensiveList = memo(({ items, onItemClick }) => {
  const handleClick = useCallback((id) => {
    onItemClick(id);
  }, [onItemClick]);
  
  return (
    <VirtualList
      items={items}
      height={600}
      itemHeight={50}
      renderItem={({ item }) => (
        <ListItem key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </ListItem>
      )}
    />
  );
});
```

### Performance Best Practices
- Use CSS transforms instead of position changes
- Debounce search inputs (300ms)
- Throttle scroll handlers (16ms)
- Lazy load images with intersection observer
- Use `will-change` sparingly for animations
- Preload critical fonts and assets

## Testing Standards

### Component Testing Strategy

#### Unit Testing with Jest & React Testing Library
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { Button } from './Button';
import { theme } from '../theme';

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={theme}>{component}</ThemeProvider>
  );
};

describe('Button', () => {
  it('renders with correct text', () => {
    renderWithTheme(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('handles click events', () => {
    const handleClick = jest.fn();
    renderWithTheme(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('respects disabled state', () => {
    renderWithTheme(<Button disabled>Disabled</Button>);
    expect(screen.getByText('Disabled')).toBeDisabled();
  });
});
```

#### Accessibility Testing
```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('has no accessibility violations', async () => {
  const { container } = renderWithTheme(<Button>Accessible</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Storybook Documentation

#### Story Structure
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Base button component with multiple variants and sizes',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
      description: 'Visual style variant',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};
```

### Testing Requirements
- Minimum 80% code coverage
- Test all interactive states
- Include edge cases and error scenarios
- Verify keyboard navigation
- Test with screen readers (NVDA/JAWS)
- Visual regression tests for style changes

## Implementation Checklist

### Component Development Checklist
When creating new UI components:
- [ ] Follow established component patterns
- [ ] Use theme tokens for all styling
- [ ] Include TypeScript types and JSDoc comments
- [ ] Add accessibility attributes (ARIA labels, roles)
- [ ] Support keyboard navigation (tab order, focus states)
- [ ] Write unit tests with >80% coverage
- [ ] Create Storybook stories for all variants
- [ ] Document props and usage examples
- [ ] Test responsive behavior across breakpoints
- [ ] Review bundle size impact (<5KB gzipped)
- [ ] Test with screen readers
- [ ] Verify color contrast ratios
- [ ] Add error boundaries where needed
- [ ] Include loading and error states
- [ ] Support RTL layouts if applicable

### Code Review Checklist
- [ ] Component follows naming conventions
- [ ] Props interface is well-designed
- [ ] No hardcoded values (uses theme tokens)
- [ ] Proper memoization applied
- [ ] Event handlers are optimized
- [ ] No console logs or debugging code
- [ ] Storybook stories cover edge cases
- [ ] Tests are meaningful and complete

## Migration Guide

### Phase 1: Assessment (Week 1-2)
1. **Component Audit**
   ```typescript
   // Create component inventory
   const componentAudit = {
     component: 'Button',
     currentImplementation: 'CSS modules',
     themeCompliance: false,
     accessibilityScore: 'Partial',
     testsExist: true,
     storybook: false,
     priority: 'High',
   };
   ```

2. **Gap Analysis**
   - Missing theme integration
   - Accessibility violations
   - Inconsistent naming
   - Lack of documentation

### Phase 2: Foundation (Week 3-4)
1. **Setup Theme Provider**
   ```typescript
   // App.tsx
   import { ThemeProvider } from '@emotion/react';
   import { theme } from './theme';
   
   function App() {
     return (
       <ThemeProvider theme={theme}>
         {/* Your app */}
       </ThemeProvider>
     );
   }
   ```

2. **Create Base Components**
   - Start with Button, Input, Card
   - Establish patterns for others to follow

### Phase 3: Migration (Week 5-8)
1. **Component by Component**
   - High-traffic components first
   - Maintain backward compatibility
   - Add deprecation warnings

2. **Progressive Enhancement**
   ```typescript
   // Temporary wrapper for migration
   export const Button = (props) => {
     if (props.legacy) {
       console.warn('Legacy Button is deprecated');
       return <LegacyButton {...props} />;
     }
     return <NewButton {...props} />;
   };
   ```

### Phase 4: Cleanup (Week 9-10)
1. Remove deprecated components
2. Update all documentation
3. Final accessibility audit
4. Performance benchmarking

## Resources

### Tools
- [Storybook](https://storybook.js.org/) - Component development environment
- [Emotion](https://emotion.sh/) - CSS-in-JS styling
- [Jest](https://jestjs.io/) - Testing framework
- [React Testing Library](https://testing-library.com/react) - Component testing

### References
- [Twenty UI GitHub](https://github.com/twentyhq/twenty/tree/main/packages/twenty-ui)
- [React Documentation](https://react.dev/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)

## How to Contribute

To propose updates to these UI standards:
1. Create a proof of concept in Storybook
2. Document the use case and benefits
3. Submit PR with examples and rationale
4. Get review from at least two team members

## Common Patterns & Solutions

### Loading States
```typescript
const LoadingButton = ({ isLoading, children, ...props }) => (
  <Button disabled={isLoading} {...props}>
    {isLoading ? <Spinner size="small" /> : children}
  </Button>
);
```

### Error Handling
```typescript
const FormField = ({ error, children, ...props }) => (
  <FieldWrapper>
    {children}
    {error && (
      <ErrorMessage role="alert" aria-live="polite">
        {error}
      </ErrorMessage>
    )}
  </FieldWrapper>
);
```

### Compound Components
```typescript
const Card = ({ children }) => <StyledCard>{children}</StyledCard>;
Card.Header = ({ children }) => <CardHeader>{children}</CardHeader>;
Card.Body = ({ children }) => <CardBody>{children}</CardBody>;
Card.Footer = ({ children }) => <CardFooter>{children}</CardFooter>;

// Usage
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

### Polymorphic Components
```typescript
interface PolymorphicProps<T extends React.ElementType> {
  as?: T;
  children?: React.ReactNode;
}

type TextProps<T extends React.ElementType> = 
  PolymorphicProps<T> & 
  React.ComponentPropsWithoutRef<T>;

const Text = <T extends React.ElementType = 'span'>({
  as,
  ...props
}: TextProps<T>) => {
  const Component = as || 'span';
  return <Component {...props} />;
};
```

---

*This guide should be used in conjunction with the [Coding Standards](./coding-standards.md) and [Best Practices](./best-practices.md) documents.*