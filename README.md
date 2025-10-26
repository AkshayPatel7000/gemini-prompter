# Gemini Prompt Discovery Platform

A modern Next.js application for discovering, generating, and sharing AI image prompts for Google's Gemini model. Built with TypeScript, Tailwind CSS, and NextAuth.js for optimal SEO and user experience.

## ✨ Features

- **🎨 Prompt Discovery**: Browse curated AI image prompts
- **🤖 AI Generation**: Create custom prompts with advanced tools
- **👤 User Authentication**: Google OAuth integration
- **📱 Responsive Design**: Mobile-first, accessible UI
- **🌙 Dark Mode**: System-aware theme switching
- **⚡ Performance**: Optimized for speed and SEO
- **🔒 Security**: Built-in security headers and best practices

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **UI Components**: Radix UI + Custom components
- **Icons**: Lucide React
- **Code Quality**: ESLint + Prettier + Husky
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
src/
├── app/                    # App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── (public)/          # Public pages (SEO optimized)
│   └── api/               # API routes
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── layout/           # Layout components
│   └── features/         # Feature-specific components
├── lib/                  # Utilities and configurations
├── providers/            # Context providers
├── hooks/                # Custom React hooks
├── types/                # TypeScript definitions
└── styles/               # Global styles
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB database
- Google Cloud Console project (for OAuth)

### 1. Clone and Install

```bash
git clone <repository-url>
cd gemini-prompt-platform
npm install
```

### 2. Environment Configuration

Copy the environment template:

```bash
cp .env.example .env.local
```

Fill in your environment variables:

```env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/gemini-prompts

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Gemini API
GEMINI_API_KEY=your-gemini-api-key
```

### 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

### 4. Database Setup

Ensure MongoDB is running locally or use a cloud service like MongoDB Atlas.

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📄 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run type-check   # Run TypeScript checks
```

## 🎯 Key Features Implementation

### SEO Optimization

- **Metadata API**: Comprehensive meta tags for all pages
- **Structured Data**: JSON-LD for better search visibility
- **Sitemap & Robots**: Auto-generated for search engines
- **Performance**: Image optimization and lazy loading
- **Route Groups**: Organized for better URL structure

### Authentication Flow

- **Google OAuth**: Seamless sign-in with Google
- **Session Management**: Secure JWT-based sessions
- **Protected Routes**: Automatic redirects for auth-required pages
- **User Profiles**: Persistent user data and preferences

### Route Organization

- **Public Routes** (`(public)`): Landing, about, contact, legal pages
- **Auth Routes** (`(auth)`): Sign-in, sign-up with custom layouts
- **Dashboard Routes** (`(dashboard)`): Protected user dashboard and tools
- **API Routes**: RESTful endpoints for data operations

## 🏗️ Architecture Highlights

### Route Groups for Better Organization

```
app/
├── (public)/          # Public pages with SEO layout
│   ├── layout.tsx     # Public layout with navbar + footer
│   ├── page.tsx       # Home page
│   ├── about/         # About page
│   ├── contact/       # Contact page
│   ├── privacy/       # Privacy policy
│   └── terms/         # Terms of service
├── (auth)/            # Authentication pages
│   ├── layout.tsx     # Centered auth layout
│   ├── signin/        # Sign in page
│   └── signup/        # Sign up page
└── (dashboard)/       # Protected dashboard
    ├── layout.tsx     # Dashboard layout with sidebar
    ├── dashboard/     # Main dashboard
    ├── generate/      # Prompt generation
    └── history/       # User's prompt history
```

### Component Organization

```
components/
├── ui/                # Base UI components (Button, Input, etc.)
├── layout/            # Layout components (Navbar, Footer, Sidebar)
└── features/          # Feature-specific components
    ├── home/          # Home page components
    ├── auth/          # Authentication components
    ├── dashboard/     # Dashboard components
    └── generate/      # Generation tool components
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub/GitLab
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Manual Deployment

```bash
npm run build
npm run start
```

## 🔧 Configuration

### Tailwind CSS

Custom design system with:

- Color palette optimized for accessibility
- Custom animations and utilities
- Dark mode support
- Responsive breakpoints

### Next.js Config

Optimized for:

- Image optimization
- Security headers
- Performance monitoring
- SEO-friendly redirects

## 📊 SEO Features

- **Dynamic Metadata**: Page-specific titles and descriptions
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Enhanced Twitter sharing
- **Structured Data**: Rich snippets for search results
- **Sitemap Generation**: Automatic sitemap.xml
- **Robots.txt**: Search engine crawling instructions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

### Git Workflow

This project uses Git hooks to maintain code quality:

#### Pre-commit Hook

- Runs ESLint on staged files
- Formats code with Prettier
- Runs type checking

#### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(auth): add Google OAuth login
fix(api): handle null response in prompts endpoint
docs(readme): update installation instructions
```

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Create an issue on GitHub
- Check the documentation
- Contact the development team

---

Built with ❤️ using Next.js and modern web technologies for optimal SEO and user experience.
