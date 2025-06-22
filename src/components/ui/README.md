# UI Components

This directory contains all the reusable UI components organized by their purpose and functionality. The structure is designed to make components easy to find and maintain.

## Organization Structure

- **data-display/**: Components for displaying data (tables, cards, avatars, etc.)
- **inputs/**: Form controls and input components (buttons, inputs, selects, etc.)
- **feedback/**: Components that provide user feedback (alerts, toasts, progress, etc.)
- **layout/**: Components that handle page and content layout (aspect-ratio, scroll areas, etc.)
- **navigation/**: Components for navigating the application (menus, tabs, pagination, etc.)  
- **overlays/**: Components that appear above the main content (dialogs, popovers, etc.)
- **utils/**: Utility functions and hooks that support the components

## Usage

Import components directly from their category folder:

```tsx
// Direct import from category
import { Button } from "@/components/ui/inputs/button";
import { Card } from "@/components/ui/data-display/card";
```

Or use the main index import (recommended):

```tsx
// Import through the main index
import { Button, Card } from "@/components/ui";
```

## Adding New Components

When adding new components:

1. Place them in the appropriate category folder based on their primary purpose
2. Export them from the category's `index.ts` file
3. Components should be small, focused, and follow the project's styling conventions
4. Add appropriate TypeScript types and props documentation

## Component Design Principles

- **Accessibility**: Components should be accessible by default
- **Flexibility**: Allow for customization via props while providing sensible defaults
- **Consistency**: Follow naming patterns and styling approach of existing components
- **Performance**: Components should be performant and avoid unnecessary re-renders 