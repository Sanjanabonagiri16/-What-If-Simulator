# Component Documentation

## Table of Contents

1. [Form Components](#form-components)
2. [Layout Components](#layout-components)
3. [Navigation Components](#navigation-components)
4. [Feedback Components](#feedback-components)
5. [Overlay Components](#overlay-components)
6. [Data Display Components](#data-display-components)

## Form Components

### Input

A styled input field component with various types and states.

**Location**: `src/components/ui/input.tsx`

**Props**:
```tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
```

**Usage**:
```tsx
import { Input } from '@/components/ui/input';

<Input 
  type="email" 
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

### Textarea

A multi-line text input component.

**Location**: `src/components/ui/textarea.tsx`

**Usage**:
```tsx
import { Textarea } from '@/components/ui/textarea';

<Textarea 
  placeholder="Enter your message"
  rows={4}
/>
```

### Label

A form label component that works with form controls.

**Location**: `src/components/ui/label.tsx`

**Usage**:
```tsx
import { Label } from '@/components/ui/label';

<Label htmlFor="email">Email Address</Label>
<Input id="email" type="email" />
```

### Checkbox

A checkbox input component with custom styling.

**Location**: `src/components/ui/checkbox.tsx`

**Usage**:
```tsx
import { Checkbox } from '@/components/ui/checkbox';

<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>
```

### RadioGroup

A group of radio button options.

**Location**: `src/components/ui/radio-group.tsx`

**Usage**:
```tsx
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

<RadioGroup defaultValue="option1">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="option1" />
    <Label htmlFor="option1">Option 1</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option2" id="option2" />
    <Label htmlFor="option2">Option 2</Label>
  </div>
</RadioGroup>
```

### Select

A dropdown selection component.

**Location**: `src/components/ui/select.tsx`

**Usage**:
```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

<Select>
  <SelectTrigger className="w-48">
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>
```

### Switch

A toggle switch component.

**Location**: `src/components/ui/switch.tsx`

**Usage**:
```tsx
import { Switch } from '@/components/ui/switch';

<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>
```

### Slider

A range input slider component.

**Location**: `src/components/ui/slider.tsx`

**Usage**:
```tsx
import { Slider } from '@/components/ui/slider';

<Slider
  defaultValue={[50]}
  max={100}
  min={0}
  step={1}
  className="w-60"
/>
```

## Layout Components

### Separator

A visual divider component.

**Location**: `src/components/ui/separator.tsx`

**Usage**:
```tsx
import { Separator } from '@/components/ui/separator';

<div>
  <p>Content above</p>
  <Separator className="my-4" />
  <p>Content below</p>
</div>
```

### AspectRatio

A container that maintains a specific aspect ratio.

**Location**: `src/components/ui/aspect-ratio.tsx`

**Usage**:
```tsx
import { AspectRatio } from '@/components/ui/aspect-ratio';

<AspectRatio ratio={16 / 9} className="bg-muted">
  <img src="image.jpg" alt="Image" className="object-cover w-full h-full" />
</AspectRatio>
```

### ScrollArea

A custom scrollable area with styled scrollbars.

**Location**: `src/components/ui/scroll-area.tsx`

**Usage**:
```tsx
import { ScrollArea } from '@/components/ui/scroll-area';

<ScrollArea className="h-72 w-48 rounded-md border p-4">
  <div className="space-y-2">
    {items.map((item) => (
      <div key={item.id}>{item.name}</div>
    ))}
  </div>
</ScrollArea>
```

### Resizable

Resizable panel components.

**Location**: `src/components/ui/resizable.tsx`

**Usage**:
```tsx
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

<ResizablePanelGroup direction="horizontal" className="min-h-[200px]">
  <ResizablePanel defaultSize={50}>
    <div className="p-6">Left Panel</div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={50}>
    <div className="p-6">Right Panel</div>
  </ResizablePanel>
</ResizablePanelGroup>
```

### Tabs

A tabbed interface component.

**Location**: `src/components/ui/tabs.tsx`

**Usage**:
```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

<Tabs defaultValue="account" className="w-96">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings content</TabsContent>
  <TabsContent value="password">Password settings content</TabsContent>
</Tabs>
```

## Navigation Components

### NavigationMenu

A main navigation menu component.

**Location**: `src/components/ui/navigation-menu.tsx`

**Usage**:
```tsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/docs">Documentation</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

### Breadcrumb

A navigation breadcrumb component.

**Location**: `src/components/ui/breadcrumb.tsx`

**Usage**:
```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Components</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### Pagination

A pagination component for navigating through pages.

**Location**: `src/components/ui/pagination.tsx`

**Usage**:
```tsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

## Feedback Components

### Alert

An alert component for displaying important information.

**Location**: `src/components/ui/alert.tsx`

**Usage**:
```tsx
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

<Alert>
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please log in again.
  </AlertDescription>
</Alert>
```

### Progress

A progress indicator component.

**Location**: `src/components/ui/progress.tsx`

**Usage**:
```tsx
import { Progress } from '@/components/ui/progress';

<Progress value={33} className="w-60" />
```

### Skeleton

Loading placeholder components.

**Location**: `src/components/ui/skeleton.tsx`

**Usage**:
```tsx
import { Skeleton } from '@/components/ui/skeleton';

<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>
```

### Toast

Toast notification components.

**Location**: `src/components/ui/toast.tsx`

**Usage**:
```tsx
import { useToast } from '@/hooks/use-toast';

function Component() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
        });
      }}
    >
      Add to calendar
    </Button>
  );
}
```

### Tooltip

A tooltip component for hover information.

**Location**: `src/components/ui/tooltip.tsx`

**Usage**:
```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## Overlay Components

### Dialog

A modal dialog component.

**Location**: `src/components/ui/dialog.tsx`

**Usage**:
```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Edit Profile</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      {/* Form content */}
    </div>
    <DialogFooter>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### AlertDialog

A confirmation dialog component.

**Location**: `src/components/ui/alert-dialog.tsx`

**Usage**:
```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Show Dialog</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### Sheet

A slide-out panel component.

**Location**: `src/components/ui/sheet.tsx`

**Usage**:
```tsx
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
```

### Popover

A floating content component.

**Location**: `src/components/ui/popover.tsx`

**Usage**:
```tsx
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Dimensions</h4>
        <p className="text-sm text-muted-foreground">
          Set the dimensions for the layer.
        </p>
      </div>
    </div>
  </PopoverContent>
</Popover>
```

## Data Display Components

### Table

A table component for displaying data.

**Location**: `src/components/ui/table.tsx`

**Usage**:
```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Badge

A badge component for labels and status indicators.

**Location**: `src/components/ui/badge.tsx`

**Usage**:
```tsx
import { Badge } from '@/components/ui/badge';

<Badge>Badge</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
```

### Avatar

An avatar component for user profile images.

**Location**: `src/components/ui/avatar.tsx`

**Usage**:
```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
```

This comprehensive component documentation covers all the UI components available in the shadcn/ui library used in this project. Each component includes usage examples and demonstrates the proper way to implement them in your application.

