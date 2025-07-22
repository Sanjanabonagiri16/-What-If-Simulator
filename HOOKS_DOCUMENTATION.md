# Hooks Documentation

## Table of Contents

1. [Custom Hooks](#custom-hooks)
2. [Hook Usage Patterns](#hook-usage-patterns)
3. [Best Practices](#best-practices)

## Custom Hooks

### useIsMobile

A responsive design hook that detects mobile screen sizes using media queries.

**Location**: `src/hooks/use-mobile.tsx`

**Purpose**: Provides a boolean value indicating whether the current viewport is considered mobile-sized.

**Returns**: `boolean | undefined`
- `true`: Screen width is below 768px (mobile)
- `false`: Screen width is 768px or above (desktop/tablet)
- `undefined`: During initial render or server-side rendering

**Implementation**:
```tsx
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
```

**Usage Examples**:

1. **Conditional Rendering**:
```tsx
import { useIsMobile } from '@/hooks/use-mobile';

function ResponsiveComponent() {
  const isMobile = useIsMobile();
  
  return (
    <div>
      {isMobile ? (
        <MobileNavigation />
      ) : (
        <DesktopNavigation />
      )}
    </div>
  );
}
```

2. **Conditional Styling**:
```tsx
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

function ResponsiveCard() {
  const isMobile = useIsMobile();
  
  return (
    <div className={cn(
      'card',
      isMobile ? 'p-4 text-sm' : 'p-8 text-base'
    )}>
      Content adapts to screen size
    </div>
  );
}
```

3. **Dynamic Behavior**:
```tsx
import { useIsMobile } from '@/hooks/use-mobile';

function ResponsiveModal() {
  const isMobile = useIsMobile();
  
  const openModal = () => {
    if (isMobile) {
      // Open as full-screen sheet on mobile
      openSheet();
    } else {
      // Open as centered dialog on desktop
      openDialog();
    }
  };
  
  return <Button onClick={openModal}>Open Modal</Button>;
}
```

**Features**:
- **Performance**: Uses `window.matchMedia()` for efficient media query detection
- **Responsive**: Automatically updates when window is resized
- **SSR Safe**: Returns `undefined` during server-side rendering
- **Customizable**: Breakpoint can be modified by changing `MOBILE_BREAKPOINT`

---

### useToast

A comprehensive toast notification system with queue management and customizable options.

**Location**: `src/hooks/use-toast.ts`

**Purpose**: Manages toast notifications with support for different variants, actions, and automatic dismissal.

**Returns**: 
```tsx
{
  toast: (props: ToastProps) => { id: string; dismiss: () => void; update: (props: ToastProps) => void },
  dismiss: (toastId?: string) => void,
  toasts: ToasterToast[]
}
```

**Toast Properties**:
```tsx
interface ToastProps {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: 'default' | 'destructive';
  duration?: number;
}
```

**Usage Examples**:

1. **Basic Toast**:
```tsx
import { useToast } from '@/hooks/use-toast';

function BasicExample() {
  const { toast } = useToast();
  
  const showBasicToast = () => {
    toast({
      title: "Success!",
      description: "Your changes have been saved.",
    });
  };
  
  return <Button onClick={showBasicToast}>Save Changes</Button>;
}
```

2. **Error Toast**:
```tsx
import { useToast } from '@/hooks/use-toast';

function ErrorExample() {
  const { toast } = useToast();
  
  const showError = () => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
    });
  };
  
  return <Button onClick={showError}>Trigger Error</Button>;
}
```

3. **Toast with Action**:
```tsx
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

function ActionExample() {
  const { toast } = useToast();
  
  const showActionToast = () => {
    toast({
      title: "Scheduled: Catch up",
      description: "Friday, February 10, 2023 at 5:57 PM",
      action: (
        <ToastAction altText="Goto schedule to undo">
          Undo
        </ToastAction>
      ),
    });
  };
  
  return <Button onClick={showActionToast}>Schedule Meeting</Button>;
}
```

4. **Programmatic Control**:
```tsx
import { useToast } from '@/hooks/use-toast';

function ControlExample() {
  const { toast, dismiss } = useToast();
  
  const showPersistentToast = () => {
    const { id } = toast({
      title: "Processing...",
      description: "Please wait while we process your request.",
      duration: Infinity, // Won't auto-dismiss
    });
    
    // Simulate async operation
    setTimeout(() => {
      dismiss(id);
      toast({
        title: "Complete!",
        description: "Your request has been processed.",
      });
    }, 3000);
  };
  
  return <Button onClick={showPersistentToast}>Start Process</Button>;
}
```

5. **Update Existing Toast**:
```tsx
import { useToast } from '@/hooks/use-toast';

function UpdateExample() {
  const { toast } = useToast();
  
  const showUpdatingToast = () => {
    const { id, update } = toast({
      title: "Uploading...",
      description: "0% complete",
    });
    
    // Simulate progress updates
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      update({
        title: "Uploading...",
        description: `${progress}% complete`,
      });
      
      if (progress >= 100) {
        clearInterval(interval);
        update({
          title: "Upload complete!",
          description: "Your file has been uploaded successfully.",
        });
      }
    }, 500);
  };
  
  return <Button onClick={showUpdatingToast}>Upload File</Button>;
}
```

**Features**:
- **Queue Management**: Automatically manages multiple toasts
- **Auto Dismissal**: Configurable auto-dismiss timing
- **Variants**: Support for different toast types (default, destructive)
- **Actions**: Add custom action buttons to toasts
- **Programmatic Control**: Dismiss, update, or manage toasts programmatically
- **Accessibility**: Built with accessibility in mind

---

## Hook Usage Patterns

### Combining Hooks

Hooks can be combined to create more complex functionality:

```tsx
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

function ResponsiveToastExample() {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const showResponsiveToast = () => {
    toast({
      title: isMobile ? "Mobile Action" : "Desktop Action",
      description: isMobile 
        ? "This action was performed on mobile" 
        : "This action was performed on desktop",
      duration: isMobile ? 3000 : 5000, // Shorter duration on mobile
    });
  };
  
  return <Button onClick={showResponsiveToast}>Show Toast</Button>;
}
```

### Custom Hook Creation

You can create custom hooks that build upon the existing ones:

```tsx
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

// Custom hook for responsive notifications
function useResponsiveNotification() {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const notify = (message: string, type: 'success' | 'error' = 'success') => {
    toast({
      title: type === 'success' ? 'Success' : 'Error',
      description: message,
      variant: type === 'error' ? 'destructive' : 'default',
      duration: isMobile ? 3000 : 5000,
    });
  };
  
  return { notify, isMobile };
}

// Usage
function MyComponent() {
  const { notify } = useResponsiveNotification();
  
  const handleSave = () => {
    // Save logic here
    notify("Data saved successfully!");
  };
  
  return <Button onClick={handleSave}>Save</Button>;
}
```

---

## Best Practices

### 1. Hook Dependencies

Always include proper dependencies in useEffect hooks:

```tsx
// ❌ Bad - missing dependencies
useEffect(() => {
  if (someCondition) {
    doSomething(value);
  }
}, []); // Missing someCondition and value

// ✅ Good - all dependencies included
useEffect(() => {
  if (someCondition) {
    doSomething(value);
  }
}, [someCondition, value]);
```

### 2. Conditional Hook Usage

Hooks should always be called at the top level:

```tsx
// ❌ Bad - conditional hook usage
function MyComponent({ shouldUseToast }) {
  if (shouldUseToast) {
    const { toast } = useToast(); // This will cause errors
  }
}

// ✅ Good - hooks at top level
function MyComponent({ shouldUseToast }) {
  const { toast } = useToast();
  
  const handleAction = () => {
    if (shouldUseToast) {
      toast({ title: "Action completed" });
    }
  };
}
```

### 3. Performance Optimization

Use useMemo and useCallback when necessary:

```tsx
import { useIsMobile } from '@/hooks/use-mobile';
import { useMemo, useCallback } from 'react';

function OptimizedComponent({ data }) {
  const isMobile = useIsMobile();
  
  // Memoize expensive calculations
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      displayName: isMobile ? item.shortName : item.fullName
    }));
  }, [data, isMobile]);
  
  // Memoize event handlers
  const handleItemClick = useCallback((item) => {
    // Handle click logic
  }, []);
  
  return (
    <div>
      {processedData.map(item => (
        <div key={item.id} onClick={() => handleItemClick(item)}>
          {item.displayName}
        </div>
      ))}
    </div>
  );
}
```

### 4. Error Handling

Always handle potential errors in custom hooks:

```tsx
function useApiData(url: string) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
        toast({
          variant: "destructive",
          title: "Error loading data",
          description: err.message,
        });
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [url, toast]);
  
  return { data, error, loading };
}
```

### 5. Cleanup

Always clean up side effects:

```tsx
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    function updateSize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener('resize', updateSize);
    updateSize(); // Set initial size
    
    // Cleanup
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  
  return size;
}
```

This hooks documentation provides comprehensive coverage of the custom hooks available in the project, along with usage patterns and best practices for creating and using hooks effectively.

