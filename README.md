# gemini-prompt-platform

Production-ready Next.js application with TypeScript, Tailwind CSS, ESLint, Prettier, and Husky.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Code Quality**: ESLint + Prettier
- **Git Hooks**: Husky + Lint-staged
- **Commit Convention**: Conventional Commits

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn or pnpm

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Update .env.local with your values
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Building

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## Code Quality

### Linting

```bash
# Check for linting errors
npm run lint

# Fix linting errors
npm run lint:fix
```

### Formatting

```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

### Type Checking

```bash
# Check TypeScript types
npm run type-check
```

## Git Workflow

This project uses Git hooks to maintain code quality:

### Pre-commit Hook

- Runs ESLint on staged files
- Formats code with Prettier
- Runs type checking

### Commit Message Convention

Commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding tests
- `build`: Build system changes
- `ci`: CI configuration changes
- `chore`: Other changes

**Example:**

```bash
git commit -m "feat(auth): add Google OAuth login"
git commit -m "fix(api): handle null response in prompts endpoint"
git commit -m "docs(readme): update installation instructions"
```

## Project Structure

```
src/
├── app/              # App router pages
│   ├── api/         # API routes
│   ├── (auth)/      # Auth pages group
│   └── (main)/      # Main pages group
├── components/       # React components
│   ├── ui/          # UI components
│   └── ...
├── lib/             # Utilities and configurations
│   ├── db.ts        # Database connection
│   ├── auth.ts      # Auth configuration
│   └── utils.ts     # Utility functions
└── types/           # TypeScript types
```

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Environment Variables

Make sure to set these in your deployment platform:

- `MONGODB_URI`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

## VS Code Setup

This project includes VS Code settings for:

- Format on save
- ESLint auto-fix on save
- TypeScript IntelliSense
- Tailwind CSS IntelliSense

**Recommended Extensions:**

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)

## License

MIT
