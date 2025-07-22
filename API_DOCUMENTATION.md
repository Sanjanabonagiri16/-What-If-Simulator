# API Documentation

## Table of Contents

1. [Overview](#overview)
2. [Core Components](#core-components)
3. [Custom Hooks](#custom-hooks)
4. [UI Components](#ui-components)
5. [Utilities](#utilities)
6. [Pages](#pages)
7. [Types and Interfaces](#types-and-interfaces)
8. [Usage Examples](#usage-examples)

## Overview

This is a React TypeScript application built with Vite that features a "What If Simulator" - an interactive tool for running various life scenario calculations. The app uses modern React patterns, shadcn/ui components, and Tailwind CSS for styling.

### Technology Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Library**: shadcn/ui (Radix UI + Tailwind CSS)
- **State Management**: React hooks + TanStack Query
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS + CSS Custom Properties

---

## Core Components

### WhatIfSimulator

The main application component that provides an interactive simulator for various life scenarios.

**Location**: `src/components/WhatIfSimulator.tsx`

**Props**: None (self-contained component)

**Features**:
- 40+ different life scenarios across 9 categories
- Interactive calculations with real-time results
- Export functionality (CSV/JSON)
- Scenario comparison
- Responsive design with cyberpunk aesthetic

**Usage**:
```tsx
import WhatIfSimulator from '@/components/WhatIfSimulator';

function App() {
  return <WhatIfSimulator />;
}
```

**Available Scenario Categories**:
- **Finance**: Bitcoin investment, Tesla stock, coffee savings, etc.
- **Health**: Sleep optimization, walking benefits, gym routines, etc.
- **Productivity**: Deep work, time blocking, automation, etc.
- **Career**: Side hustles, skill development, networking, etc.
- **Education**: Online courses, certifications, language learning, etc.
- **Lifestyle**: Meal prep, minimalism, family time, etc.
- **Relationships**: Social connections, volunteering, etc.
- **Environment**: Tree planting, sustainable transport, etc.
- **Technology**: Blogging, YouTube creation, etc.

**Key Methods**:
- `calculateResults()`: Runs calculations for the selected scenario
- `handleExport()`: Exports results in CSV or JSON format
- `saveScenario()`: Saves scenario to favorites
- `compareScenarios()`: Enables scenario comparison mode

---

## Custom Hooks

### useIsMobile

A responsive design hook that detects mobile screen sizes.

**Location**: `src/hooks/use-mobile.tsx`

**Returns**: `boolean` - True if screen width is below 768px

**Usage**:
```tsx
import { useIsMobile } from '@/hooks/use-mobile';

function ResponsiveComponent() {
  const isMobile = useIsMobile();
  
  return (
    <div className={isMobile ? 'mobile-layout' : 'desktop-layout'}>
      Content
    </div>
  );
}
```

**Implementation Details**:
- Uses `window.matchMedia()` for efficient media query detection
- Updates on window resize events
- Returns `undefined` during server-side rendering
- Breakpoint: 768px (mobile < 768px)

### useToast

A comprehensive toast notification system with queue management.

**Location**: `src/hooks/use-toast.ts`

**Returns**: 
```tsx
{
  toast: (props: ToastProps) => void,
  dismiss: (toastId?: string) => void,
  toasts: ToasterToast[]
}
```

**Usage**:
```tsx
import { useToast } from '@/hooks/use-toast';

function MyComponent() {
  const { toast } = useToast();
  
  const showSuccess = () => {
    toast({
      title: "Success!",
      description: "Operation completed successfully.",
      variant: "default"
    });
  };
  
  const showError = () => {
    toast({
      title: "Error",
      description: "Something went wrong.",
      variant: "destructive"
    });
  };
  
  return (
    <div>
      <button onClick={showSuccess}>Show Success</button>
      <button onClick={showError}>Show Error</button>
    </div>
  );
}
```

**Toast Properties**:
- `title`: Toast headline
- `description`: Detailed message
- `variant`: 'default' | 'destructive'
- `action`: Custom action button
- `duration`: Auto-dismiss time (default: 1000000ms)


---

## UI Components

### Button

A versatile button component with multiple variants and sizes.

**Location**: `src/components/ui/button.tsx`

**Props**:
```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}
```

**Usage**:
```tsx
import { Button } from '@/components/ui/button';

function Examples() {
  return (
    <div className="space-x-2">
      <Button>Default Button</Button>
      <Button variant="outline">Outline Button</Button>
      <Button variant="destructive" size="lg">Large Destructive</Button>
      <Button variant="ghost" size="sm">Small Ghost</Button>
      <Button variant="link">Link Button</Button>
    </div>
  );
}
```

**Variants**:
- `default`: Primary button with solid background
- `destructive`: Red button for dangerous actions
- `outline`: Bordered button with transparent background
- `secondary`: Muted button for secondary actions
- `ghost`: Minimal button with hover effects
- `link`: Text button with underline on hover

**Sizes**:
- `default`: Standard height (40px)
- `sm`: Small height (36px)
- `lg`: Large height (44px)
- `icon`: Square button for icons (40x40px)

### Card

A flexible card container component with multiple sub-components.

**Location**: `src/components/ui/card.tsx`

**Components**:
- `Card`: Main container
- `CardHeader`: Header section
- `CardTitle`: Title element
- `CardDescription`: Description text
- `CardContent`: Main content area
- `CardFooter`: Footer section

**Usage**:
```tsx
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';

function ProfileCard() {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>Manage your account settings</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here</p>
      </CardContent>
      <CardFooter>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}
```

### Additional UI Components

The application includes a comprehensive set of shadcn/ui components:

**Form Components**:
- `Input`: Text input field
- `Textarea`: Multi-line text input
- `Select`: Dropdown selection
- `Checkbox`: Boolean input
- `RadioGroup`: Single choice selection
- `Switch`: Toggle input
- `Slider`: Range input
- `Label`: Form labels

**Layout Components**:
- `Separator`: Visual divider
- `AspectRatio`: Aspect ratio container
- `ScrollArea`: Custom scrollbar
- `Resizable`: Resizable panels
- `Tabs`: Tab navigation

**Feedback Components**:
- `Alert`: Information alerts
- `Progress`: Progress indicators
- `Skeleton`: Loading placeholders
- `Toast`: Notifications
- `Tooltip`: Hover information

**Navigation Components**:
- `NavigationMenu`: Main navigation
- `Menubar`: Menu bar
- `DropdownMenu`: Dropdown menus
- `ContextMenu`: Right-click menus
- `Breadcrumb`: Navigation breadcrumbs
- `Pagination`: Page navigation

**Overlay Components**:
- `Dialog`: Modal dialogs
- `AlertDialog`: Confirmation dialogs
- `Sheet`: Side panels
- `Drawer`: Mobile-friendly drawers
- `Popover`: Floating content
- `HoverCard`: Hover previews

---

## Utilities

### cn (Class Name Utility)

A utility function for conditionally joining class names with Tailwind CSS optimization.

**Location**: `src/lib/utils.ts`

**Signature**:
```tsx
function cn(...inputs: ClassValue[]): string
```

**Usage**:
```tsx
import { cn } from '@/lib/utils';

function ConditionalStyling({ isActive, size }) {
  return (
    <div className={cn(
      'base-class',
      isActive && 'active-class',
      size === 'large' && 'large-class',
      'conditional-class'
    )}>
      Content
    </div>
  );
}
```

**Features**:
- Merges Tailwind classes intelligently
- Removes duplicate classes
- Handles conditional classes
- Optimizes bundle size

---

## Pages

### Index

The main landing page that renders the WhatIfSimulator component.

**Location**: `src/pages/Index.tsx`

**Usage**:
```tsx
// Automatically rendered at route "/"
// No direct usage needed - handled by React Router
```

### NotFound

A 404 error page with navigation back to home.

**Location**: `src/pages/NotFound.tsx`

**Features**:
- Displays 404 error message
- Provides navigation back to home
- Logs attempted routes for debugging

**Usage**:
```tsx
// Automatically rendered for unmatched routes
// No direct usage needed - handled by React Router
```


---

## Types and Interfaces

### SimulationResult

Represents the output of a scenario calculation.

```tsx
interface SimulationResult {
  [key: string]: string | number;
}
```

### Scenario

Defines the structure of a simulation scenario.

```tsx
interface Scenario {
  title: string;
  description: string;
  icon: string;
  category: string;
  inputLabel: string;
  inputType: 'number' | 'select';
  inputProps?: any;
  calculate: (input: number | string) => SimulationResult;
}
```

### ToastProps

Configuration for toast notifications.

```tsx
interface ToastProps {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: 'default' | 'destructive';
}
```

---

## Usage Examples

### Basic Application Setup

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
```

### Creating a Custom Scenario

```tsx
const customScenario: Scenario = {
  title: 'CUSTOM_CALCULATION',
  description: 'Calculate custom metrics',
  icon: '⚡',
  category: 'custom',
  inputLabel: 'INPUT_VALUE',
  inputType: 'number',
  inputProps: { min: 0, placeholder: '100' },
  calculate: (input: number) => {
    const result = input * 2;
    return {
      input: input.toString(),
      result: result.toString(),
      doubled: `${result}`,
      recommendation: 'Custom calculation completed'
    };
  }
};
```

### Using Toast Notifications

```tsx
import { useToast } from '@/hooks/use-toast';

function NotificationExample() {
  const { toast } = useToast();

  const showNotification = () => {
    toast({
      title: "Calculation Complete",
      description: "Your simulation results are ready.",
      action: (
        <Button variant="outline" onClick={() => console.log('Action clicked')}>
          View Results
        </Button>
      )
    });
  };

  return <Button onClick={showNotification}>Run Simulation</Button>;
}
```

### Responsive Design Pattern

```tsx
import { useIsMobile } from '@/hooks/use-mobile';

function ResponsiveLayout() {
  const isMobile = useIsMobile();

  return (
    <div className={cn(
      'container mx-auto',
      isMobile ? 'px-4 py-2' : 'px-8 py-4'
    )}>
      {isMobile ? (
        <MobileLayout />
      ) : (
        <DesktopLayout />
      )}
    </div>
  );
}
```

### Form Integration

```tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function SimulationForm() {
  const [value, setValue] = useState('');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Simulation Input</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="input-value">Enter Value</Label>
          <Input
            id="input-value"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter simulation value"
          />
        </div>
        <Button className="w-full">
          Run Simulation
        </Button>
      </CardContent>
    </Card>
  );
}
```


---

## Development Guidelines

### Component Creation

1. Use TypeScript interfaces for props
2. Implement proper error boundaries
3. Add loading states for async operations
4. Include accessibility attributes
5. Follow naming conventions (PascalCase for components)

### Styling Guidelines

1. Use Tailwind CSS classes primarily
2. Leverage the `cn()` utility for conditional styling
3. Maintain consistent spacing using Tailwind spacing scale
4. Use CSS custom properties for theme colors
5. Ensure responsive design across all breakpoints

### State Management

1. Use React hooks for local state
2. Implement TanStack Query for server state
3. Keep state as close to usage as possible
4. Use context sparingly for truly global state

### Performance Optimization

1. Implement React.memo for expensive components
2. Use useCallback for event handlers
3. Lazy load routes and heavy components
4. Optimize bundle size with tree shaking

---

## API Integration

The application is currently client-side focused but can be extended with API integration:

### Adding API Calls

```tsx
import { useQuery } from '@tanstack/react-query';

function useScenarioData(scenarioId: string) {
  return useQuery({
    queryKey: ['scenario', scenarioId],
    queryFn: async () => {
      const response = await fetch(`/api/scenarios/${scenarioId}`);
      return response.json();
    }
  });
}
```

### Error Handling

```tsx
function ComponentWithErrorHandling() {
  const { data, error, isLoading } = useScenarioData('bitcoin');

  if (isLoading) return <Skeleton className="h-32 w-full" />;
  if (error) return <Alert variant="destructive">Error loading data</Alert>;

  return <div>{/* Render data */}</div>;
}
```

This documentation provides comprehensive coverage of all public APIs, components, and utilities in the codebase. Each section includes practical examples and usage patterns to help developers understand and implement the features effectively.

