# Project Structure

## Frontend Pages (App Router)

### Public Routes

- `/` - Homepage with trending prompts
- `/gallery` - Browse all prompts
- `/prompt/[id]` - Individual prompt details
- `/about` - About page
- `/how-it-works` - How it works page

### Authenticated Routes

- `/generate` - Generate prompt from image
- `/dashboard` - User dashboard
- `/dashboard/prompts` - User's generated prompts
- `/dashboard/favorites` - Favorite prompts
- `/dashboard/settings` - User settings

### Auth Routes

- `/login` - Login page
- `/signup` - Signup page (optional)

## Backend API Routes

### Authentication

- `POST /api/auth/[...nextauth]` - NextAuth handler

### Prompts

- `GET /api/prompts` - Get all prompts (paginated)
- `GET /api/prompts/trending` - Get trending prompts
- `GET /api/prompts/[id]` - Get single prompt
- `POST /api/prompts/[id]/like` - Like a prompt

### User

- `GET /api/user` - Get current user info
- `GET /api/user/credits` - Get user credits

### Generation

- `POST /api/generate` - Generate prompt from image

### Upload

- `POST /api/upload` - Upload image to cloud storage

### Search

- `GET /api/search` - Search prompts

## Folder Structure

```
src/
├── app/
│   ├── (main)/              # Main pages group
│   │   ├── page.tsx         # Homepage
│   │   ├── generate/        # Generate page
│   │   ├── gallery/         # Gallery page
│   │   ├── prompt/[id]/     # Dynamic prompt page
│   │   ├── dashboard/       # User dashboard
│   │   └── layout.tsx       # Main layout
│   ├── (auth)/              # Auth pages group
│   │   └── login/           # Login page
│   ├── api/                 # API routes
│   │   ├── auth/            # NextAuth
│   │   ├── prompts/         # Prompt endpoints
│   │   ├── user/            # User endpoints
│   │   └── generate/        # Generate endpoint
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # UI components
│   ├── layout/              # Layout components
│   ├── prompt/              # Prompt components
│   ├── auth/                # Auth components
│   └── upload/              # Upload components
├── lib/
│   ├── db.ts                # Database connection
│   ├── auth.ts              # Auth configuration
│   ├── models/              # Mongoose models
│   ├── utils/               # Utility functions
│   └── hooks/               # Custom React hooks
└── types/
    ├── index.ts             # Type definitions
    └── next-auth.d.ts       # NextAuth types
```

## Route Groups

### (main) Group

Contains all main application pages with Navbar and Footer.

### (auth) Group

Contains authentication pages without Navbar and Footer.

## Dynamic Routes

- `[id]` - Dynamic segment for prompt IDs
- `[...nextauth]` - Catch-all for NextAuth routes

## API Route Patterns

- Use `route.ts` for API handlers
- Export `GET`, `POST`, `PUT`, `DELETE` functions
- Use `NextRequest` and `NextResponse`

## Component Patterns

- Server Components by default
- Use `'use client'` only when needed
- Co-locate components with pages when possible
