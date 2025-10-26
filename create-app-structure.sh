#!/bin/bash

# =============================================================================
# Next.js App Router Structure Generator
# For Gemini Prompt Discovery Platform
# =============================================================================
# This script creates complete folder structure with:
# - Frontend pages (public and authenticated)
# - Backend API routes
# - Components structure
# - Lib utilities
# - Types definitions
# =============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

echo -e "${BLUE}"
echo "================================================"
echo "  Next.js App Router Structure Generator"
echo "  Gemini Prompt Discovery Platform"
echo "================================================"
echo -e "${NC}"

# Check if we're in a Next.js project
if [ ! -f "package.json" ]; then
    print_error "Error: package.json not found. Run this script from your Next.js project root."
    exit 1
fi

print_info "Creating folder structure..."

# =============================================================================
# Frontend Structure - App Router Pages
# =============================================================================
print_info "Step 1/6: Creating frontend pages structure..."

# Main pages group (public routes)
mkdir -p src/app/\(main\)

# Auth pages group
mkdir -p src/app/\(auth\)/login
mkdir -p src/app/\(auth\)/signup

# Main public pages
mkdir -p src/app/\(main\)/generate
mkdir -p src/app/\(main\)/prompt/\[id\]
mkdir -p src/app/\(main\)/gallery
mkdir -p src/app/\(main\)/about
mkdir -p src/app/\(main\)/how-it-works

# User dashboard (authenticated)
mkdir -p src/app/\(main\)/dashboard
mkdir -p src/app/\(main\)/dashboard/prompts
mkdir -p src/app/\(main\)/dashboard/favorites
mkdir -p src/app/\(main\)/dashboard/settings

print_success "Frontend pages structure created"

# =============================================================================
# Backend Structure - API Routes
# =============================================================================
print_info "Step 2/6: Creating backend API routes..."

# Auth routes
mkdir -p src/app/api/auth/\[...nextauth\]

# Prompt routes
mkdir -p src/app/api/prompts/trending
mkdir -p src/app/api/prompts/\[id\]
mkdir -p src/app/api/prompts/\[id\]/like

# User routes
mkdir -p src/app/api/user
mkdir -p src/app/api/user/credits

# Generate route
mkdir -p src/app/api/generate

# Upload route
mkdir -p src/app/api/upload

# Search route
mkdir -p src/app/api/search

print_success "Backend API routes created"

# =============================================================================
# Components Structure
# =============================================================================
print_info "Step 3/6: Creating components structure..."

mkdir -p src/components/ui
mkdir -p src/components/layout
mkdir -p src/components/prompt
mkdir -p src/components/auth
mkdir -p src/components/upload

print_success "Components structure created"

# =============================================================================
# Lib Structure (Database, Auth, Utils)
# =============================================================================
print_info "Step 4/6: Creating lib structure..."

mkdir -p src/lib/models
mkdir -p src/lib/utils
mkdir -p src/lib/hooks

print_success "Lib structure created"

# =============================================================================
# Types Structure
# =============================================================================
print_info "Step 5/6: Creating types structure..."

mkdir -p src/types

print_success "Types structure created"

# =============================================================================
# Create Placeholder Files
# =============================================================================
print_info "Step 6/6: Creating placeholder files..."

# Root layout
cat > src/app/layout.tsx << 'EOF'
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gemini Prompt Discovery',
  description: 'Discover and generate AI image prompts for Gemini',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
EOF

# Main group layout
cat > src/app/\(main\)/layout.tsx << 'EOF'
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
EOF

# Homepage
cat > src/app/\(main\)/page.tsx << 'EOF'
import Hero from '@/components/layout/Hero';
import PromptGallery from '@/components/prompt/PromptGallery';
import dbConnect from '@/lib/db';
import Prompt from '@/lib/models/Prompt';

export const metadata = {
  title: 'Gemini Prompt Discovery | Find Amazing AI Image Prompts',
  description: 'Browse thousands of trending AI image prompts for Gemini',
};

// Revalidate every hour
export const revalidate = 3600;

async function getTrendingPrompts() {
  await dbConnect();
  
  const prompts = await Prompt.find({ isTrending: true })
    .sort({ likes: -1 })
    .limit(20)
    .lean();
  
  return JSON.parse(JSON.stringify(prompts));
}

export default async function HomePage() {
  const trendingPrompts = await getTrendingPrompts();
  
  return (
    <>
      <Hero />
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-8">🔥 Trending Prompts</h2>
        <PromptGallery prompts={trendingPrompts} />
      </section>
    </>
  );
}
EOF

# Generate page
cat > src/app/\(main\)/generate/page.tsx << 'EOF'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import GeneratePromptForm from '@/components/prompt/GeneratePromptForm';

export const metadata = {
  title: 'Generate Prompt | Gemini Prompt Discovery',
  description: 'Upload an image and generate AI-powered prompts',
};

export default async function GeneratePage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">🎨 Generate Prompt from Image</h1>
      <p className="text-lg text-gray-600 mb-8">
        Upload a reference image and get an AI-generated prompt
      </p>
      <GeneratePromptForm />
    </div>
  );
}
EOF

# Prompt detail page (dynamic)
cat > src/app/\(main\)/prompt/\[id\]/page.tsx << 'EOF'
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/db';
import Prompt from '@/lib/models/Prompt';
import PromptDetail from '@/components/prompt/PromptDetail';

export async function generateMetadata({ 
  params 
}: { 
  params: { id: string } 
}): Promise<Metadata> {
  await dbConnect();
  const prompt = await Prompt.findById(params.id).lean();
  
  if (!prompt) {
    return { title: 'Prompt Not Found' };
  }
  
  return {
    title: `${prompt.prompt.substring(0, 60)}... | Gemini Prompts`,
    description: prompt.prompt.substring(0, 160),
    openGraph: {
      title: prompt.prompt.substring(0, 60),
      description: prompt.prompt.substring(0, 160),
      images: [prompt.imageUrl],
    },
  };
}

async function getPrompt(id: string) {
  await dbConnect();
  
  const prompt = await Prompt.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } },
    { new: true }
  ).populate('userId', 'name image').lean();
  
  return prompt ? JSON.parse(JSON.stringify(prompt)) : null;
}

export default async function PromptPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const prompt = await getPrompt(params.id);
  
  if (!prompt) {
    notFound();
  }
  
  return <PromptDetail prompt={prompt} />;
}
EOF

# Gallery page
cat > src/app/\(main\)/gallery/page.tsx << 'EOF'
import PromptGallery from '@/components/prompt/PromptGallery';
import FilterBar from '@/components/prompt/FilterBar';

export const metadata = {
  title: 'Gallery | Gemini Prompt Discovery',
  description: 'Browse all AI image prompts',
};

export default function GalleryPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Prompt Gallery</h1>
      <FilterBar />
      <PromptGallery />
    </div>
  );
}
EOF

# Login page
cat > src/app/\(auth\)/login/page.tsx << 'EOF'
'use client';

import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-gray-600 text-center mb-8">
          Sign in to continue to Gemini Prompts
        </p>
        
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 rounded-lg px-6 py-3 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all"
        >
          <FcGoogle size={24} />
          Continue with Google
        </button>
        
        <p className="text-xs text-gray-500 text-center mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
EOF

# Dashboard page
cat > src/app/\(main\)/dashboard/page.tsx << 'EOF'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import DashboardStats from '@/components/dashboard/DashboardStats';

export const metadata = {
  title: 'Dashboard | Gemini Prompt Discovery',
  description: 'View your prompts and stats',
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <DashboardStats />
    </div>
  );
}
EOF

# =============================================================================
# API Routes
# =============================================================================

# NextAuth API route
cat > src/app/api/auth/\[...nextauth\]/route.ts << 'EOF'
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
EOF

# Get all prompts API
cat > src/app/api/prompts/route.ts << 'EOF'
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Prompt from '@/lib/models/Prompt';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    const query: any = {};
    if (category) query.category = category;
    if (search) query.$text = { $search: search };
    
    const prompts = await Prompt.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('userId', 'name image');
    
    const total = await Prompt.countDocuments(query);
    
    return NextResponse.json({
      prompts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch prompts' },
      { status: 500 }
    );
  }
}
EOF

# Get trending prompts API
cat > src/app/api/prompts/trending/route.ts << 'EOF'
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Prompt from '@/lib/models/Prompt';

export async function GET() {
  try {
    await dbConnect();
    
    const prompts = await Prompt.find({ isTrending: true })
      .sort({ likes: -1, createdAt: -1 })
      .limit(20)
      .populate('userId', 'name image');
    
    return NextResponse.json(prompts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch trending prompts' },
      { status: 500 }
    );
  }
}
EOF

# Get single prompt API
cat > src/app/api/prompts/\[id\]/route.ts << 'EOF'
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Prompt from '@/lib/models/Prompt';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const prompt = await Prompt.findById(params.id)
      .populate('userId', 'name image');
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(prompt);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch prompt' },
      { status: 500 }
    );
  }
}
EOF

# Like prompt API
cat > src/app/api/prompts/\[id\]/like/route.ts << 'EOF'
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Prompt from '@/lib/models/Prompt';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const prompt = await Prompt.findByIdAndUpdate(
      params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt not found' },
        { status: 404 }
      );
    }
    
    // Mark as trending if likes > 10
    if (prompt.likes >= 10) {
      prompt.isTrending = true;
      await prompt.save();
    }
    
    return NextResponse.json(prompt);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to like prompt' },
      { status: 500 }
    );
  }
}
EOF

# Generate prompt API
cat > src/app/api/generate/route.ts << 'EOF'
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import Prompt from '@/lib/models/Prompt';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const user = await User.findOne({ email: session.user.email });
    
    if (!user || user.credits < 1) {
      return NextResponse.json(
        { error: 'Insufficient credits' },
        { status: 403 }
      );
    }
    
    const formData = await request.formData();
    const image = formData.get('image') as File;
    
    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }
    
    // TODO: Process image and generate prompt
    // This is a placeholder
    
    return NextResponse.json({
      prompt: 'Generated prompt will appear here',
      style: 'Digital Art',
      tags: ['example', 'tag'],
      creditsRemaining: user.credits - 1,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate prompt' },
      { status: 500 }
    );
  }
}
EOF

# User info API
cat > src/app/api/user/route.ts << 'EOF'
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const user = await User.findOne({ email: session.user.email });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      name: user.name,
      email: user.email,
      image: user.image,
      credits: user.credits,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}
EOF

# =============================================================================
# Lib Files (Database, Auth, Models)
# =============================================================================

# Database connection
cat > src/lib/db.ts << 'EOF'
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
EOF

# User model
cat > src/lib/models/User.ts << 'EOF'
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  image: String,
  googleId: String,
  credits: { type: Number, default: 10 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
EOF

# Prompt model
cat > src/lib/models/Prompt.ts << 'EOF'
import mongoose from 'mongoose';

const PromptSchema = new mongoose.Schema({
  prompt: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: String,
  tags: [String],
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isTrending: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

PromptSchema.index({ isTrending: 1, likes: -1 });
PromptSchema.index({ prompt: 'text' });

export default mongoose.models.Prompt || mongoose.model('Prompt', PromptSchema);
EOF

# Auth configuration
cat > src/lib/auth.ts << 'EOF'
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import dbConnect from './db';
import User from './models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: [
            'openid',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/generative-language.retriever',
          ].join(' '),
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      await dbConnect();
      
      let dbUser = await User.findOne({ email: user.email });
      
      if (!dbUser) {
        dbUser = await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          googleId: profile?.sub,
          credits: 10,
        });
      }
      
      return true;
    },
    async session({ session }) {
      if (session.user) {
        await dbConnect();
        const dbUser = await User.findOne({ email: session.user.email });
        
        if (dbUser) {
          (session.user as any).id = dbUser._id.toString();
          (session.user as any).credits = dbUser.credits;
        }
      }
      
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
};
EOF

# Types
cat > src/types/index.ts << 'EOF'
export interface Prompt {
  _id: string;
  prompt: string;
  imageUrl: string;
  category?: string;
  tags: string[];
  likes: number;
  views: number;
  userId?: {
    _id: string;
    name: string;
    image: string;
  };
  isTrending: boolean;
  createdAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
  credits: number;
  createdAt: string;
}
EOF

# NextAuth types
cat > src/types/next-auth.d.ts << 'EOF'
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      credits?: number;
    };
  }
}
EOF

# Placeholder components
cat > src/components/layout/Navbar.tsx << 'EOF'
export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold">Gemini Prompts</h1>
      </div>
    </nav>
  );
}
EOF

cat > src/components/layout/Footer.tsx << 'EOF'
export default function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p>&copy; 2025 Gemini Prompt Discovery. All rights reserved.</p>
      </div>
    </footer>
  );
}
EOF

cat > src/components/layout/Hero.tsx << 'EOF'
export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-purple-600 to-blue-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">
          ✨ Discover Amazing Gemini Image Prompts
        </h1>
        <p className="text-xl mb-8">
          Browse thousands of AI-generated prompts or create your own
        </p>
      </div>
    </section>
  );
}
EOF

cat > src/components/prompt/PromptGallery.tsx << 'EOF'
export default function PromptGallery({ prompts }: { prompts?: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {prompts?.map((prompt) => (
        <div key={prompt._id} className="border rounded-lg p-4">
          <p>{prompt.prompt}</p>
        </div>
      ))}
    </div>
  );
}
EOF

print_success "All files created"

# =============================================================================
# Create Structure Documentation
# =============================================================================

cat > STRUCTURE.md << 'EOF'
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
EOF

print_success "STRUCTURE.md created"

# =============================================================================
# Success Message
# =============================================================================
echo ""
echo -e "${GREEN}"
echo "================================================"
echo "  ✓ App Structure Created Successfully!"
echo "================================================"
echo -e "${NC}"
echo ""
echo -e "${BLUE}Created:${NC}"
echo "  • Frontend pages (public & authenticated)"
echo "  • Backend API routes"
echo "  • Components structure"
echo "  • Lib utilities"
echo "  • Type definitions"
echo "  • Placeholder files"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo ""
echo "1. Review the structure:"
echo -e "   ${GREEN}cat STRUCTURE.md${NC}"
echo ""
echo "2. Install additional dependencies:"
echo -e "   ${GREEN}npm install next-auth @next-auth/mongodb-adapter mongoose${NC}"
echo -e "   ${GREEN}npm install @google/generative-ai zod react-hook-form${NC}"
echo ""
echo "3. Start development:"
echo -e "   ${GREEN}npm run dev${NC}"
echo ""
echo "4. Check the structure:"
echo -e "   ${GREEN}tree src/ -L 3${NC}"
echo ""
print_success "Ready to build your Gemini Prompt Platform! 🚀"
echo ""
EOF