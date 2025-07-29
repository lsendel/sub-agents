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

## Semantic HTML Best Practices

### HTML5 Semantic Elements
Use semantic HTML elements to provide meaning and structure to your content:

#### Document Structure
```html
<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/products">Products</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <header>
      <h1>Article Title</h1>
      <time datetime="2025-07-29">July 29, 2025</time>
    </header>
    <section>
      <h2>Section Heading</h2>
      <p>Content goes here...</p>
    </section>
  </article>
  
  <aside aria-label="Related content">
    <h2>Related Articles</h2>
    <ul><!-- Related links --></ul>
  </aside>
</main>

<footer>
  <p>&copy; 2025 Company Name</p>
</footer>
```

#### Form Semantics
```html
<form>
  <fieldset>
    <legend>Personal Information</legend>
    
    <div>
      <label for="name">
        Full Name
        <span aria-label="required">*</span>
      </label>
      <input 
        type="text" 
        id="name" 
        name="name" 
        required
        aria-describedby="name-error"
      />
      <span id="name-error" role="alert" aria-live="polite"></span>
    </div>
    
    <div>
      <label for="email">Email Address</label>
      <input 
        type="email" 
        id="email" 
        name="email"
        aria-describedby="email-hint"
      />
      <small id="email-hint">We'll never share your email</small>
    </div>
  </fieldset>
  
  <button type="submit">Submit</button>
</form>
```

#### Interactive Elements
```html
<!-- Dialog/Modal -->
<dialog aria-labelledby="dialog-title" aria-describedby="dialog-desc">
  <h2 id="dialog-title">Confirm Action</h2>
  <p id="dialog-desc">Are you sure you want to proceed?</p>
  <button onclick="closeDialog()">Cancel</button>
  <button onclick="confirmAction()">Confirm</button>
</dialog>

<!-- Details/Summary for collapsible content -->
<details>
  <summary>Show more options</summary>
  <div>
    <!-- Additional content -->
  </div>
</details>

<!-- Progress indicator -->
<progress value="32" max="100" aria-label="File upload progress">32%</progress>
```

### Semantic HTML Guidelines
1. **Use the right element for the job**
   - `<button>` for actions, `<a>` for navigation
   - `<nav>` for navigation sections
   - `<main>` for primary content (only one per page)
   - `<article>` for self-contained content
   - `<section>` for thematic groupings

2. **Heading hierarchy**
   - Only one `<h1>` per page
   - Don't skip heading levels
   - Use headings to create document outline

3. **Lists for grouped items**
   ```html
   <!-- Navigation -->
   <nav>
     <ul>
       <li><a href="/home">Home</a></li>
       <li><a href="/about">About</a></li>
     </ul>
   </nav>
   
   <!-- Definition lists for term-description pairs -->
   <dl>
     <dt>React</dt>
     <dd>A JavaScript library for building user interfaces</dd>
     <dt>Vue</dt>
     <dd>The progressive JavaScript framework</dd>
   </dl>
   ```

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

### TailwindCSS with Optimized Components
- Primary styling approach using TailwindCSS utility classes
- Component-specific styles with CSS-in-JS (Emotion) for complex interactions
- Leverage Tailwind's JIT compiler for optimal bundle size
- Use Tailwind's design system for consistency

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Extend with brand colors
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.15s ease-in',
        'slide-up': 'slideUp 0.25s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
```

### Tailwind Optimization Strategies

#### 1. Component Classes Pattern
```typescript
// Use component classes for repeated patterns
const Button = ({ variant, size, children }) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]}`}>
      {children}
    </button>
  );
};
```

#### 2. Utility Extraction with @apply
```css
/* Only for truly reusable patterns */
@layer components {
  .btn-primary {
    @apply bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg 
           hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
           transition-colors duration-150;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md p-6 
           hover:shadow-lg transition-shadow duration-200;
  }
}
```

#### 3. Dynamic Classes with clsx
```typescript
import clsx from 'clsx';

const Alert = ({ type, dismissible, children }) => {
  return (
    <div 
      className={clsx(
        'p-4 rounded-md',
        {
          'bg-blue-50 text-blue-800': type === 'info',
          'bg-red-50 text-red-800': type === 'error',
          'bg-green-50 text-green-800': type === 'success',
          'pr-12': dismissible,
        }
      )}
    >
      {children}
    </div>
  );
};
```

#### 4. Performance Optimization Tips
- **PurgeCSS Integration**: Tailwind automatically removes unused styles
- **JIT Mode**: Generates styles on-demand for smaller CSS files
- **Avoid Dynamic Classes**: Don't construct class names dynamically
```typescript
// ❌ Bad - Won't be included in production
const color = 'blue';
<div className={`text-${color}-500`} />

// ✅ Good - Static classes
const colors = {
  blue: 'text-blue-500',
  red: 'text-red-500',
};
<div className={colors.blue} />
```

### CSS-in-JS with Emotion (For Complex Cases)
- Use Emotion for dynamic styles that can't be achieved with Tailwind
- Complex animations and transitions
- Runtime style calculations
- Third-party library integration

### Theme Structure
```typescript
theme/
├── constants/       # Design tokens and constants
├── provider/        # Theme context provider
├── types/          # TypeScript definitions
├── utils/          # Theme manipulation utilities
└── tailwind/       # Tailwind theme extensions
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

## ARIA Tags and Accessibility Patterns

### Core ARIA Concepts

#### ARIA Roles
Define what an element is or does:
```html
<!-- Landmark roles -->
<div role="banner">Site header</div>
<nav role="navigation" aria-label="Primary">
<div role="main">Main content</div>
<aside role="complementary">Sidebar</aside>
<footer role="contentinfo">Footer</footer>

<!-- Widget roles -->
<div role="button" tabindex="0" onclick="handleClick()">Custom Button</div>
<div role="tab" aria-selected="true" aria-controls="panel1">Tab 1</div>
<div role="tabpanel" id="panel1" aria-labelledby="tab1">Tab content</div>

<!-- Document structure roles -->
<div role="article">Article content</div>
<div role="heading" aria-level="2">Custom heading</div>
<div role="list">
  <div role="listitem">Item 1</div>
  <div role="listitem">Item 2</div>
</div>
```

#### ARIA Properties
Describe element properties:
```html
<!-- Labels and descriptions -->
<button aria-label="Close dialog">×</button>
<input aria-labelledby="label1 label2" />
<div aria-describedby="help-text">Complex widget</div>

<!-- States -->
<button aria-pressed="true">Toggle</button>
<div aria-expanded="false">Collapsible section</div>
<input aria-invalid="true" aria-errormessage="error1" />
<div aria-hidden="true">Decorative element</div>
<button aria-disabled="true">Disabled action</button>

<!-- Relationships -->
<div aria-owns="submenu1">Menu with detached submenu</div>
<input aria-controls="results" />
<div aria-flowto="next-section">Content flows to...</div>
```

#### Live Regions
Announce dynamic content changes:
```html
<!-- Polite announcements (waits for pause) -->
<div role="status" aria-live="polite">
  Form saved successfully
</div>

<!-- Assertive announcements (interrupts) -->
<div role="alert" aria-live="assertive">
  Error: Invalid input
</div>

<!-- Atomic updates -->
<div aria-live="polite" aria-atomic="true">
  <span>Items in cart: </span>
  <span>5</span>
</div>
```

### Common Accessibility Patterns

#### Accessible Modal/Dialog
```typescript
const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null);
  const previousFocus = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      // Store current focus
      previousFocus.current = document.activeElement;
      // Focus first focusable element
      modalRef.current?.focus();
      
      // Trap focus
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'Tab') {
          // Implement focus trap logic
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    } else {
      // Restore focus
      previousFocus.current?.focus();
    }
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
      tabIndex={-1}
    >
      <h2 id="modal-title">{title}</h2>
      <button 
        onClick={onClose}
        aria-label="Close dialog"
      >
        ×
      </button>
      {children}
    </div>
  );
};
```

#### Accessible Dropdown/Combobox
```typescript
const Dropdown = ({ options, value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  
  return (
    <div>
      <label id="dropdown-label">{label}</label>
      <div
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby="dropdown-label"
        aria-controls="dropdown-list"
      >
        <input
          type="text"
          value={value}
          aria-autocomplete="list"
          aria-activedescendant={activeIndex >= 0 ? `option-${activeIndex}` : undefined}
          onKeyDown={(e) => {
            // Handle arrow keys, enter, escape
          }}
        />
        {isOpen && (
          <ul
            id="dropdown-list"
            role="listbox"
            aria-labelledby="dropdown-label"
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                id={`option-${index}`}
                role="option"
                aria-selected={option.value === value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
```

#### Accessible Tabs
```typescript
const Tabs = ({ tabs, defaultTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <div>
      <div role="tablist" aria-label="Main tabs">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={activeTab === index ? 0 : -1}
            onClick={() => setActiveTab(index)}
            onKeyDown={(e) => {
              // Handle arrow keys for navigation
              if (e.key === 'ArrowRight') {
                setActiveTab((prev) => (prev + 1) % tabs.length);
              } else if (e.key === 'ArrowLeft') {
                setActiveTab((prev) => (prev - 1 + tabs.length) % tabs.length);
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTab !== index}
          tabIndex={0}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};
```

#### Accessible Form with Validation
```typescript
const AccessibleForm = () => {
  const [errors, setErrors] = useState({});
  
  return (
    <form aria-label="Contact form" noValidate>
      <div>
        <label htmlFor="name">
          Name
          <span aria-label="required" className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          required
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : "name-hint"}
        />
        <span id="name-hint" className="text-sm text-gray-600">
          Enter your full name
        </span>
        {errors.name && (
          <span id="name-error" role="alert" className="text-red-600">
            {errors.name}
          </span>
        )}
      </div>
      
      <fieldset>
        <legend>Notification Preferences</legend>
        <div role="group" aria-describedby="notification-desc">
          <p id="notification-desc" className="text-sm">
            Choose how you'd like to receive updates
          </p>
          <label>
            <input type="checkbox" name="email" />
            Email notifications
          </label>
          <label>
            <input type="checkbox" name="sms" />
            SMS notifications
          </label>
        </div>
      </fieldset>
      
      <button type="submit" aria-describedby="submit-hint">
        Submit Form
      </button>
      <span id="submit-hint" className="sr-only">
        Submit the contact form to send your message
      </span>
    </form>
  );
};
```

### Screen Reader Utilities
```css
/* Visually hidden but accessible to screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Show on focus (for skip links) */
.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  padding: 0.5rem 1rem;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

### Keyboard Navigation Best Practices
1. **Focus Management**
   - Visible focus indicators (2px minimum)
   - Logical tab order
   - Focus trap in modals
   - Skip links for navigation

2. **Keyboard Shortcuts**
   ```typescript
   const KeyboardShortcuts = {
     'Escape': 'Close modal or cancel action',
     'Enter': 'Activate button or submit form',
     'Space': 'Toggle checkbox or activate button',
     'Arrow Keys': 'Navigate between options',
     'Tab': 'Move to next focusable element',
     'Shift+Tab': 'Move to previous focusable element',
   };
   ```

3. **Custom Keyboard Handlers**
   ```typescript
   const handleKeyboard = (e) => {
     switch(e.key) {
       case 'Enter':
       case ' ':
         e.preventDefault();
         handleActivate();
         break;
       case 'ArrowDown':
         e.preventDefault();
         focusNext();
         break;
       case 'ArrowUp':
         e.preventDefault();
         focusPrevious();
         break;
     }
   };
   ```

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

## Interactive JavaScript with React

### React Hooks and State Management

#### Essential Hooks Patterns
```typescript
// useState for local component state
const [count, setCount] = useState(0);
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState(false);

// useEffect for side effects
useEffect(() => {
  // Component mount
  fetchData();
  
  // Cleanup on unmount
  return () => {
    cancelSubscriptions();
  };
}, []); // Empty deps = run once

// useEffect with dependencies
useEffect(() => {
  if (userId) {
    fetchUser(userId);
  }
}, [userId]); // Re-run when userId changes

// useCallback for memoized functions
const handleClick = useCallback((id: string) => {
  setSelectedId(id);
  onSelect?.(id);
}, [onSelect]);

// useMemo for expensive computations
const sortedItems = useMemo(() => 
  items.sort((a, b) => a.name.localeCompare(b.name)),
  [items]
);
```

#### Custom Hooks for Reusable Logic
```typescript
// useDebounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}

// useLocalStorage hook
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error saving to localStorage:`, error);
    }
  };
  
  return [storedValue, setValue] as const;
}

// useAsync hook for async operations
function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate = true
) {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  
  const execute = useCallback(() => {
    setStatus('pending');
    setValue(null);
    setError(null);
    
    return asyncFunction()
      .then((response) => {
        setValue(response);
        setStatus('success');
      })
      .catch((error) => {
        setError(error);
        setStatus('error');
      });
  }, [asyncFunction]);
  
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);
  
  return { execute, status, value, error };
}
```

#### State Management Patterns

##### Context API for Global State
```typescript
// Theme Context
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

##### useReducer for Complex State
```typescript
type State = {
  items: Item[];
  loading: boolean;
  error: string | null;
  filter: string;
};

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Item[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'SET_FILTER'; payload: string }
  | { type: 'ADD_ITEM'; payload: Item }
  | { type: 'REMOVE_ITEM'; payload: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, items: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { 
        ...state, 
        items: state.items.filter(item => item.id !== action.payload) 
      };
    default:
      return state;
  }
};

const ItemList = () => {
  const [state, dispatch] = useReducer(reducer, {
    items: [],
    loading: false,
    error: null,
    filter: ''
  });
  
  const filteredItems = useMemo(() => 
    state.items.filter(item => 
      item.name.toLowerCase().includes(state.filter.toLowerCase())
    ),
    [state.items, state.filter]
  );
  
  return (
    <div>
      <input
        type="text"
        value={state.filter}
        onChange={(e) => dispatch({ type: 'SET_FILTER', payload: e.target.value })}
        placeholder="Filter items..."
      />
      {/* Render filtered items */}
    </div>
  );
};
```

### Interactive Component Patterns

#### Form Handling with Validation
```typescript
interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [touched, setTouched] = useState<Set<keyof FormData>>(new Set());
  
  const validate = useCallback((data: FormData): Partial<FormData> => {
    const newErrors: Partial<FormData> = {};
    
    if (!data.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!data.password) {
      newErrors.password = 'Password is required';
    } else if (data.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    return newErrors;
  }, []);
  
  useEffect(() => {
    if (touched.size > 0) {
      setErrors(validate(formData));
    }
  }, [formData, touched, validate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => new Set(prev).add(name as keyof FormData));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      // Submit form
      console.log('Form submitted:', formData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={clsx(
            'border rounded px-3 py-2',
            errors.email && touched.has('email') && 'border-red-500'
          )}
        />
        {errors.email && touched.has('email') && (
          <span id="email-error" className="text-red-500 text-sm">
            {errors.email}
          </span>
        )}
      </div>
      {/* Similar for password field */}
      <button type="submit">Login</button>
    </form>
  );
};
```

#### Infinite Scroll with Intersection Observer
```typescript
const InfiniteList = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const newItems = await fetchItems(page);
      setItems(prev => [...prev, ...newItems]);
      setPage(prev => prev + 1);
      setHasMore(newItems.length > 0);
    } catch (error) {
      console.error('Failed to load items:', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );
    
    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loadMore]);
  
  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
      {hasMore && (
        <div ref={loadMoreRef} className="h-10 flex items-center justify-center">
          {loading ? <Spinner /> : 'Load more'}
        </div>
      )}
    </div>
  );
};
```

#### Drag and Drop with React
```typescript
interface DraggableItem {
  id: string;
  content: string;
}

const DragDropList = () => {
  const [items, setItems] = useState<DraggableItem[]>([
    { id: '1', content: 'Item 1' },
    { id: '2', content: 'Item 2' },
    { id: '3', content: 'Item 3' },
  ]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  
  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  
  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === targetId) return;
    
    const draggedIndex = items.findIndex(item => item.id === draggedItem);
    const targetIndex = items.findIndex(item => item.id === targetId);
    
    const newItems = [...items];
    const [removed] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, removed);
    
    setItems(newItems);
    setDraggedItem(null);
  };
  
  return (
    <ul>
      {items.map(item => (
        <li
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, item.id)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, item.id)}
          className={clsx(
            'p-4 border rounded cursor-move',
            draggedItem === item.id && 'opacity-50'
          )}
        >
          {item.content}
        </li>
      ))}
    </ul>
  );
};
```

### Performance Optimization with React

#### React.memo for Component Memoization
```typescript
interface ExpensiveComponentProps {
  data: ComplexData;
  onAction: (id: string) => void;
}

const ExpensiveComponent = React.memo<ExpensiveComponentProps>(
  ({ data, onAction }) => {
    // Complex rendering logic
    return <div>{/* Render content */}</div>;
  },
  (prevProps, nextProps) => {
    // Custom comparison function
    return (
      prevProps.data.id === nextProps.data.id &&
      prevProps.data.version === nextProps.data.version
    );
  }
);
```

#### Virtualization for Large Lists
```typescript
import { FixedSizeList } from 'react-window';

const VirtualizedList = ({ items }: { items: Item[] }) => {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style} className="flex items-center px-4">
      {items[index].name}
    </div>
  );
  
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
};
```

#### Code Splitting with React.lazy
```typescript
// Lazy load heavy components
const Dashboard = lazy(() => import('./Dashboard'));
const Analytics = lazy(() => import('./Analytics'));

const App = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Suspense>
  );
};
```

### State Management Best Practices

1. **Keep state as local as possible**
   - Only lift state when needed by multiple components
   - Use component state for UI-specific state
   - Use global state for app-wide concerns

2. **Normalize complex state**
   ```typescript
   // Instead of nested arrays
   const badState = {
     posts: [
       { id: 1, title: 'Post', comments: [...] }
     ]
   };
   
   // Use normalized structure
   const goodState = {
     posts: { 1: { id: 1, title: 'Post' } },
     comments: { 1: { id: 1, postId: 1, text: 'Comment' } },
     postComments: { 1: [1] }
   };
   ```

3. **Use the right tool for the job**
   - useState: Simple local state
   - useReducer: Complex local state with multiple sub-values
   - Context API: Cross-component state without prop drilling
   - External libraries (Redux, Zustand): Complex global state

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