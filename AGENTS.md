# AGENTS.md

Guidelines for AI agents working in this repository.

## Build Commands

```bash
npm run dev       # Start development server (hot reload)
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint (next/core-web-vitals + standard)
npm run clean     # Clean .next and out directories
npm run deploy   # Clean, build, and deploy to GitHub Pages
```

**Note:** No test framework is configured. Do not add tests unless explicitly requested.

## Project Overview

- **Type**: Next.js 16 web application
- **Framework**: React 18+ with Next.js App Router
- **Styling**: Tailwind CSS 4
- **Language**: JavaScript (ES6+)
- **Deployment**: GitHub Pages (subdirectory: /teamgenerator)

## File Structure

```
app/           # Next.js App Router pages
components/    # React components
public/        # Static assets
next.config.js # Next.js configuration
tailwind.config.js
postcss.config.js
package.json
```

## Code Style Guidelines

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `TeamCard`, `MainContainer` |
| Functions/Variables | camelCase | `elementos`, `generateTeams` |
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

- **Client Components**: Add `'use client'` directive at top for files using:
  - `useState`, `useEffect`, `useRef`
  - Event handlers (onClick, onChange)
  - Browser-only APIs

- **Component Structure**:
  ```javascript
  'use client'
  
  import React from 'react'
  
  export function ComponentName({ prop1, prop2 }) {
    const [state, setState] = useState(initialValue)
    
    const handleAction = () => { ... }
    
    return <div>...</div>
  }
  ```

### Tailwind CSS

Use utility classes in recommended order: layout → spacing → sizing → typography → visual → state → responsive.

```javascript
<div className="flex flex-col items-center justify-between p-4 bg-gray-300 hover:bg-gray-400 transition-colors">
```

### Environment Variables

```javascript
const basePath = process.env.NODE_ENV === 'production' ? '/teamgenerator' : ''
```

### ESLint

- Config: `next/core-web-vitals` + `standard`
- Run `npm run lint` before committing
- Fix all errors and warnings
- PropTypes disabled via `/* eslint-disable react/prop-types */`

### Error Handling

- Use try-catch for async operations
- Provide user-friendly error messages in UI
- Avoid console.log in production

## Common Tasks

### Add New Component
1. Create file in `components/` with PascalCase
2. Add `'use client'` if interactive
3. Export as named export

### Add New Page
1. Create `page.js` in `app/` directory
2. Export default function

## Anti-Patterns to Avoid

- ❌ Using `var` - use `const`/`let`
- ❌ console.log in production code
- ❌ Inline styles - use Tailwind classes
- ❌ Magic numbers - define constants
- ❌ Hardcoded paths - use environment/config
