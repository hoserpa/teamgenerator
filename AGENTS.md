# AGENTS.md

## Build Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run clean` - Clean build directories
- `npm run deploy` - Deploy to GitHub Pages

## Code Style Guidelines
- **Framework**: Next.js with React components
- **Styling**: Tailwind CSS classes
- **File Structure**: App router (app/) and components (components/)
- **Imports**: Use ES6 imports, React components first
- **Naming**: camelCase for functions/variables, PascalCase for components
- **Linting**: ESLint with React rules, prop-types disabled
- **Client Components**: Use 'use client' directive for interactive components
- **Path Aliases**: Use @/* for absolute imports (configured in jsconfig.json)
- **Environment**: Use process.env.NODE_ENV for production/development checks