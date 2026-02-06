# Contributing to Biglabs

Thank you for your interest in contributing! Here's how to get started with local development.

## Prerequisites

- Node.js 18+ and npm
- Git

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/quantnexusai/biglabs.git
cd biglabs
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Dev Server

```bash
npm run dev
```

The app will start at `http://localhost:3000` with sample data (no API keys needed for local preview).

### 4. (Optional) Connect Real Services

Copy `.env.example` to `.env.local` and add your keys:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase and Anthropic credentials, then run `supabase/schema.sql` in your Supabase SQL Editor.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── about/             # About page
│   ├── services/          # Services listing and detail pages
│   ├── case-studies/      # Case studies listing and detail pages
│   ├── articles/          # Articles listing and detail pages
│   ├── careers/           # Careers listing page
│   ├── contact/           # Contact and consultation booking
│   ├── api/claude/        # Claude AI API endpoint
│   ├── dashboard/         # Admin dashboard
│   ├── reset-password/    # Password reset
│   └── profile/           # User profile settings
├── components/
│   ├── Header.tsx         # Sticky navigation
│   ├── Footer.tsx         # Site footer
│   ├── AuthModal.tsx      # Sign in/up modal
│   ├── DemoBanner.tsx     # Local preview banner
│   ├── ScrollReveal.tsx   # Scroll animation wrapper
│   ├── landing/           # Landing page sections
│   └── dashboard/         # Dashboard components
└── lib/
    ├── supabase.ts        # Supabase client
    ├── auth-context.tsx   # Auth state management
    ├── types.ts           # TypeScript interfaces
    ├── demo-data.ts       # Sample data for local preview
    └── utils.ts           # Utility functions
```

## Setting Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor in your Supabase dashboard
3. Copy the contents of `supabase/schema.sql` and run it
4. Copy your project URL and publishable key from Settings > API
5. Add them to your `.env.local` file

## Design System

See [STYLE-GUIDE.md](STYLE-GUIDE.md) for the full design system documentation including colors, typography, and component patterns.

## Code Style

- TypeScript throughout
- Tailwind CSS for styling (no inline styles)
- Functional React components with hooks
- `'use client'` directive for client-side components
- Lucide React for icons

## Making Changes

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Ensure `npm run build` passes without errors
4. Submit a pull request

## Reporting Issues

Please use [GitHub Issues](https://github.com/quantnexusai/biglabs/issues) to report bugs or request features.
