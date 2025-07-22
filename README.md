# What If Simulator - Interactive Life Scenario Calculator

A comprehensive React TypeScript application that provides interactive simulations for various life scenarios, helping users visualize the long-term impact of their decisions across finance, health, productivity, career, and lifestyle choices.

## 🌟 Features

- **40+ Interactive Scenarios** across 9 different categories
- **Real-time Calculations** with dynamic results
- **Responsive Design** with cyberpunk aesthetic
- **Export Functionality** (CSV/JSON formats)
- **Scenario Comparison** tools
- **Mobile-first Design** with adaptive UI
- **Toast Notifications** for user feedback
- **Modern Tech Stack** with TypeScript and Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd what-if-simulator

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to view the application.

## 📱 Application Overview

### Core Functionality

The What If Simulator allows users to explore various life scenarios and see their potential outcomes:

- **Financial Scenarios**: Bitcoin investments, Tesla stock, coffee savings, compound interest
- **Health & Wellness**: Sleep optimization, walking benefits, gym routines, nutrition tracking
- **Productivity**: Deep work sessions, time blocking, automation benefits
- **Career Development**: Side hustles, skill building, networking, remote work
- **Education**: Online courses, certifications, language learning
- **Lifestyle**: Meal prep, minimalism, family time, social connections
- **Environmental**: Tree planting, sustainable transportation
- **Technology**: Content creation, blogging, YouTube

### User Interface

- **Category Filtering**: Easy navigation through scenario categories
- **Interactive Inputs**: Dynamic input fields with validation
- **Real-time Results**: Instant calculation updates
- **Visual Feedback**: Cyberpunk-themed UI with animations
- **Export Options**: Save results for future reference
- **Comparison Tools**: Side-by-side scenario analysis

## 📚 Documentation

This project includes comprehensive documentation for developers:

### API Documentation
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)**: Complete API reference for all components, hooks, and utilities
- **[COMPONENT_DOCUMENTATION.md](./COMPONENT_DOCUMENTATION.md)**: Detailed guide to all UI components with usage examples
- **[HOOKS_DOCUMENTATION.md](./HOOKS_DOCUMENTATION.md)**: Custom hooks documentation with best practices
- **[DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)**: Setup, workflow, and coding standards

### Key Components

- **WhatIfSimulator**: Main application component with scenario management
- **UI Components**: 40+ shadcn/ui components for consistent design
- **Custom Hooks**: `useIsMobile`, `useToast` for enhanced functionality
- **Utility Functions**: `cn()` for class name management

## 🛠 Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: shadcn/ui (Radix UI primitives + Tailwind CSS)
- **State Management**: React hooks + TanStack Query
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS with custom design system
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Notifications**: Sonner toast library

## 🏗 Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   └── WhatIfSimulator.tsx # Main application component
├── hooks/
│   ├── use-mobile.tsx      # Responsive design hook
│   └── use-toast.ts        # Toast notification system
├── lib/
│   └── utils.ts            # Utility functions
├── pages/
│   ├── Index.tsx           # Home page
│   └── NotFound.tsx        # 404 page
├── App.tsx                 # Root application component
└── main.tsx                # Application entry point
```

## 🎨 Design System

### Color Palette
- **Cyber Cyan**: Primary accent color
- **Cyber Magenta**: Secondary accent
- **Cyber Yellow**: Warning/highlight color
- **Cyber Green**: Success states
- **Cyber Red**: Error/destructive actions
- **Cyber Orange**: Info/neutral states

### Typography
- **Headings**: Bold, uppercase styling for cyberpunk aesthetic
- **Body Text**: Clean, readable font with proper contrast
- **Code**: Monospace font for technical elements

### Components
- **Cards**: Glassmorphism effect with subtle borders
- **Buttons**: Multiple variants with hover animations
- **Inputs**: Consistent styling with focus states
- **Modals**: Overlay components with backdrop blur

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run build:dev    # Development build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Quality

- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code quality and consistency enforcement
- **Prettier**: Automated code formatting (via editor integration)
- **Tailwind CSS**: Utility-first styling approach

### Component Development

```tsx
// Example component structure
import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentProps {
  className?: string;
  children: React.ReactNode;
}

const Component = ({ className, children }: ComponentProps) => {
  return (
    <div className={cn('base-styles', className)}>
      {children}
    </div>
  );
};

export default Component;
```

## 📊 Scenario Categories

### Finance (8 scenarios)
- Bitcoin Investment Calculator
- Tesla Stock Analysis
- Coffee Savings Impact
- Side Hustle ROI
- Compound Savings Growth
- Investment Comparison
- Retirement Planning
- Emergency Fund Calculator

### Health & Wellness (7 scenarios)
- Sleep Optimization Benefits
- Daily Walking Impact
- Gym Routine Results
- Nutrition Investment
- Smoking Cessation Savings
- Water Intake Benefits
- Meditation Practice

### Productivity (6 scenarios)
- Deep Work Sessions
- Time Blocking Efficiency
- Automation Benefits
- Screen Time Reduction
- Morning Routine Impact
- Skill Development Time

### Career Development (5 scenarios)
- Side Hustle Growth
- Networking ROI
- Personal Brand Building
- Certification Value
- Remote Work Benefits

### Education (4 scenarios)
- Online Course Impact
- Language Learning
- Degree Value Analysis
- Skill Certification

### Lifestyle (5 scenarios)
- Meal Prep Savings
- Minimalism Benefits
- Family Time Value
- Social Connection Impact
- Relocation Analysis

### Environment (2 scenarios)
- Tree Planting Impact
- Sustainable Transport

### Technology (3 scenarios)
- Blog Creation Journey
- YouTube Channel Growth
- Content Creation ROI

## 🚀 Deployment

### Build Process

```bash
# Production build
npm run build

# Output directory: dist/
# Deploy the dist/ folder to your hosting platform
```

### Deployment Platforms

- **Vercel**: Zero-config deployment with GitHub integration
- **Netlify**: Easy static site hosting with form handling
- **GitHub Pages**: Free hosting for public repositories
- **Docker**: Containerized deployment for any platform

### Environment Variables

The application is currently client-side only and doesn't require environment variables. For API integration, add:

```bash
VITE_API_URL=your-api-endpoint
VITE_APP_NAME=What If Simulator
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following the development guidelines
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use provided component patterns
- Maintain responsive design principles
- Include proper error handling
- Write clear, descriptive commit messages
- Test across different screen sizes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui**: For the excellent component library
- **Radix UI**: For accessible component primitives
- **Tailwind CSS**: For the utility-first CSS framework
- **Lucide**: For the beautiful icon set
- **React Team**: For the amazing framework

## 📞 Support

For questions, issues, or contributions:

1. Check the [documentation files](./API_DOCUMENTATION.md) for detailed information
2. Review existing [GitHub issues](../../issues)
3. Create a new issue with detailed description
4. Join our community discussions

---

**Built with ❤️ using React, TypeScript, and modern web technologies**

