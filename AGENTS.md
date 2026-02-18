# AGENTS.md

This file provides guidelines for AI agents working in this repository.

## Build Commands

```bash
npm run dev       # Start development server (hot reload enabled)
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint (extends next/core-web-vitals)
npm run clean     # Clean build directories (.next, out)
npm run deploy    # Deploy to GitHub Pages (runs clean, build, then gh-pages)
```

**Note:** No test framework is currently configured. Do not add tests unless explicitly requested.

## Project Overview

- **Type**: Next.js 16 web application
- **Framework**: React 18+ with Next.js App Router
- **Styling**: Tailwind CSS 4
- **Language**: JavaScript (ES6+)
- **Deployment**: GitHub Pages (subdirectory: /teamgenerator)

## Code Style Guidelines

### General Principles

- Write clean, readable, and maintainable code
- Keep functions small and focused (single responsibility)
- Use meaningful variable and function names
- Avoid magic numbers - extract to named constants
- Remove console.log statements before committing

### File Structure

```
/
├── app/                    # Next.js App Router pages
│   ├── layout.js          # Root layout
│   └── page.js            # Home page
├── components/            # React components
│   └── teamCard.js        # Team display component
├── public/                # Static assets (images, SVGs)
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── package.json           # Dependencies and scripts
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `TeamCard`, `MainContainer` |
| Functions/Variables | camelCase | `elementos`, `__generate` |
| Files (components) | PascalCase.js | `teamCard.js` → `TeamCard.js` |
| Files (utilities) | camelCase.js | `utils.js`, `helpers.js` |
| CSS Classes | kebab-case (Tailwind) | `flex`, `bg-gray-300` |

### Import Order

1. React imports (`react`)
2. Next.js imports (`next/image`, `next/link`)
3. External libraries
4. Internal components/hooks
5. Path aliases (`@/components/...`)

```javascript
import React from 'react'
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid'
import { TeamCard } from '../components/teamCard'
import { useCustomHook } from '@/hooks/useCustomHook'
```

### React Patterns

- **Client Components**: Add `'use client'` directive at top of files that use:
  - `useState`, `useEffect`, `useRef`
  - Event handlers (onClick, onChange)
  - Browser-only APIs

- **Prop Types**: Currently disabled via eslint comment:
  ```javascript
  /* eslint-disable react/prop-types */
  ```
  If enabling, define PropTypes for all components.

- **Component Structure**:
  ```javascript
  'use client'
  
  import React from 'react'
  
  export function ComponentName({ prop1, prop2 }) {
    // Hooks first
    const [state, setState] = useState(initialValue)
    
    // Helper functions
    const handleAction = () => { ... }
    
    // Render
    return (
      <div>...</div>
    )
  }
  ```

### Tailwind CSS Guidelines

- Use utility classes for all styling (no custom CSS files unless necessary)
- Follow Tailwind's recommended class order:
  1. Layout (position, display, flex, grid)
  2. Spacing (margin, padding)
  3. Sizing (width, height)
  4. Typography (text, font)
  5. Visual (background, border, shadow)
  6. State (hover, focus, active)
  7. Responsive (sm:, md:, lg:)

- Example:
  ```javascript
  <div className="flex flex-col items-center justify-between p-4 bg-gray-300 hover:bg-gray-400 transition-colors">
  ```

### Environment Variables

- Always use `process.env.NODE_ENV` for environment checks
- Production check:
  ```javascript
  const basePath = process.env.NODE_ENV === 'production' ? '/teamgenerator' : ''
  ```

### ESLint Configuration

The project uses ESLint with Next.js core web vitals config:
```json
{
  "extends": "next/core-web-vitals"
}
```

- Run `npm run lint` before committing
- Fix all errors and warnings
- Common rules enforced: no unused vars, react-hooks dependencies

### Error Handling

- Use try-catch for async operations
- Provide user-friendly error messages in UI
- Log errors appropriately (avoid console.log in production)

### Git Conventions

- Commit messages should be clear and descriptive
- Group related changes in a single commit
- Do not commit: `node_modules/`, `.next/`, `out/`, `.env` files

### Path Aliases

The project uses path aliases via `jsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

Use `@/` for absolute imports from root:
```javascript
import { util } from '@/utils/util'
import { Component } from '@/components/Component'
```

## Common Tasks

### Adding a New Component

1. Create file in `components/` directory
2. Use PascalCase for component name
3. Add `'use client'` if interactive
4. Export as named export
5. Import in parent with relative or alias path

### Adding a New Page

1. Create file in `app/` directory
2. Use `page.js` or `page.jsx` for route
3. Export default function as page component

### Running Development Server

```bash
npm run dev
# Opens at http://localhost:3000
```

### Building for Production

```bash
npm run build
npm run start
# Opens at http://localhost:3000
```

## Anti-Patterns to Avoid

- ❌ Using `var` - use `const`/`let`
- ❌ Using `console.log` in production code
- ❌ Inline styles - use Tailwind classes
- ❌ Unnecessary re-renders - memoize expensive operations
- ❌ Magic numbers - define constants
- ❌ Hardcoded paths - use environment/config
- ❌ Prop drilling - consider context for deeply nested data
