# Development Guide

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Development Workflow](#development-workflow)
4. [Code Style Guidelines](#code-style-guidelines)
5. [Testing](#testing)
6. [Build and Deployment](#build-and-deployment)
7. [Troubleshooting](#troubleshooting)

## Getting Started

### Prerequisites

- **Node.js**: Version 18 or higher
- **npm**: Version 9 or higher (comes with Node.js)
- **Git**: For version control

### Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd <project-directory>
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start development server**:
```bash
npm run dev
```

4. **Open your browser**:
Navigate to `http://localhost:5173` to view the application.

### Available Scripts

- `npm run dev`: Start development server with hot reload
- `npm run build`: Build production-ready application
- `npm run build:dev`: Build in development mode
- `npm run preview`: Preview production build locally
- `npm run lint`: Run ESLint for code quality checks

---

## Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   └── WhatIfSimulator.tsx  # Main application component
├── hooks/               # Custom React hooks
│   ├── use-mobile.tsx   # Mobile detection hook
│   └── use-toast.ts     # Toast notification hook
├── lib/                 # Utility libraries
│   └── utils.ts         # Common utility functions
├── pages/               # Page components
│   ├── Index.tsx        # Home page
│   └── NotFound.tsx     # 404 page
├── App.tsx              # Main App component
├── main.tsx             # Application entry point
└── index.css            # Global styles

public/                  # Static assets
├── index.html           # HTML template
└── ...

Configuration files:
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite build configuration
├── tailwind.config.ts   # Tailwind CSS configuration
├── components.json      # shadcn/ui configuration
└── eslint.config.js     # ESLint configuration
```

---

## Development Workflow

### 1. Feature Development

When developing new features, follow these steps:

1. **Create a new branch**:
```bash
git checkout -b feature/your-feature-name
```

2. **Develop the feature**:
   - Write clean, readable code
   - Follow the established patterns
   - Add proper TypeScript types
   - Include error handling

3. **Test your changes**:
```bash
npm run dev
# Test in browser
npm run build
# Test production build
```

4. **Commit your changes**:
```bash
git add .
git commit -m "feat: add your feature description"
```

### 2. Adding New Components

When creating new components:

1. **Create component file**:
```tsx
// src/components/MyComponent.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface MyComponentProps {
  className?: string;
  children: React.ReactNode;
  // Add other props with proper types
}

const MyComponent = ({ className, children, ...props }: MyComponentProps) => {
  return (
    <div className={cn('base-styles', className)} {...props}>
      {children}
    </div>
  );
};

export default MyComponent;
```

2. **Export from index** (if creating a component library):
```tsx
// src/components/index.ts
export { default as MyComponent } from './MyComponent';
```

3. **Use the component**:
```tsx
import MyComponent from '@/components/MyComponent';

function ParentComponent() {
  return (
    <MyComponent className="custom-styles">
      Content here
    </MyComponent>
  );
}
```

### 3. Adding New Hooks

When creating custom hooks:

1. **Create hook file**:
```tsx
// src/hooks/useMyHook.ts
import { useState, useEffect } from 'react';

export function useMyHook(initialValue?: any) {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Hook logic here
  }, []);
  
  return { state, setState };
}
```

2. **Export from hooks directory**:
```tsx
// src/hooks/index.ts
export { useMyHook } from './useMyHook';
```

3. **Use the hook**:
```tsx
import { useMyHook } from '@/hooks/useMyHook';

function ComponentUsingHook() {
  const { state, setState } = useMyHook('initial');
  
  return <div>{/* Component JSX */}</div>;
}
```

---

## Code Style Guidelines

### 1. TypeScript

- **Always use TypeScript**: Define interfaces for all props and complex objects
- **Use proper types**: Avoid `any` type when possible
- **Interface naming**: Use descriptive names with proper prefixes

```tsx
// ✅ Good
interface UserProfileProps {
  user: User;
  onEdit: (userId: string) => void;
  isEditable?: boolean;
}

// ❌ Bad
interface Props {
  user: any;
  onEdit: Function;
  isEditable: boolean;
}
```

### 2. Component Structure

- **Functional components**: Use function components with hooks
- **Props destructuring**: Destructure props in function parameters
- **Default props**: Use default parameters instead of defaultProps

```tsx
// ✅ Good
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
}

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  children,
  ...props 
}: ButtonProps) => {
  return (
    <button 
      className={cn(getButtonClasses(variant, size), disabled && 'opacity-50')}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
```

### 3. Styling

- **Tailwind CSS**: Use Tailwind classes for styling
- **Class utility**: Use `cn()` utility for conditional classes
- **Responsive design**: Include responsive breakpoints

```tsx
// ✅ Good
<div className={cn(
  'flex items-center justify-between',
  'p-4 md:p-6',
  'bg-white dark:bg-gray-800',
  'border rounded-lg shadow-sm',
  isActive && 'border-blue-500',
  className
)}>
  Content
</div>
```

### 4. State Management

- **Local state**: Use useState for component-local state
- **Complex state**: Use useReducer for complex state logic
- **Global state**: Use React Context or external libraries sparingly

```tsx
// ✅ Good - Local state
const [isOpen, setIsOpen] = useState(false);

// ✅ Good - Complex state
const [state, dispatch] = useReducer(reducer, initialState);

// ✅ Good - Derived state
const isValid = useMemo(() => {
  return email.includes('@') && password.length >= 8;
}, [email, password]);
```

### 5. Event Handlers

- **Naming convention**: Use `handle` prefix for event handlers
- **useCallback**: Use for handlers passed to child components
- **Proper typing**: Type event parameters correctly

```tsx
// ✅ Good
const handleSubmit = useCallback((event: React.FormEvent) => {
  event.preventDefault();
  // Handle submission
}, []);

const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
  setValue(event.target.value);
}, []);
```

---

## Testing

### Setting Up Tests

While the current project doesn't include tests, here's how you would add them:

1. **Install testing dependencies**:
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest jsdom
```

2. **Configure Vitest** in `vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
```

3. **Create test setup file**:
```typescript
// src/test/setup.ts
import '@testing-library/jest-dom'
```

### Writing Tests

1. **Component tests**:
```tsx
// src/components/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  
  it('applies correct variant classes', () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-destructive');
  });
});
```

2. **Hook tests**:
```tsx
// src/hooks/__tests__/useIsMobile.test.tsx
import { renderHook } from '@testing-library/react';
import { useIsMobile } from '../use-mobile';

describe('useIsMobile', () => {
  it('returns false for desktop width', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });
});
```

---

## Build and Deployment

### Development Build

```bash
npm run build:dev
```

This creates a development build with:
- Source maps for debugging
- Unminified code
- Development-specific optimizations

### Production Build

```bash
npm run build
```

This creates a production build with:
- Minified and optimized code
- Tree-shaking for smaller bundle size
- Production optimizations

### Preview Build

```bash
npm run preview
```

Preview the production build locally before deployment.

### Deployment Options

1. **Static Hosting** (Vercel, Netlify, GitHub Pages):
   - Build the project: `npm run build`
   - Deploy the `dist` folder

2. **Docker Deployment**:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

## Troubleshooting

### Common Issues

1. **Module not found errors**:
   - Check import paths are correct
   - Ensure files exist in specified locations
   - Verify TypeScript path mapping in `tsconfig.json`

2. **Styling issues**:
   - Check Tailwind CSS classes are correct
   - Verify `cn()` utility is imported
   - Ensure CSS is being loaded properly

3. **Build failures**:
   - Check TypeScript errors: `npx tsc --noEmit`
   - Verify all dependencies are installed
   - Check for syntax errors in configuration files

4. **Hot reload not working**:
   - Restart development server
   - Check file watching permissions
   - Verify Vite configuration

### Performance Tips

1. **Bundle analysis**:
```bash
npm run build -- --analyze
```

2. **Code splitting**:
```tsx
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

3. **Optimize images**:
   - Use appropriate image formats (WebP, AVIF)
   - Implement lazy loading
   - Use responsive images

### Debugging

1. **React Developer Tools**: Install browser extension for component inspection
2. **TypeScript errors**: Use IDE with TypeScript support
3. **Console logging**: Use structured logging for debugging
4. **Network tab**: Monitor API calls and resource loading

---

This development guide provides comprehensive information for setting up, developing, and maintaining the What If Simulator application. Follow these guidelines to ensure consistent, high-quality code and smooth development workflow.

