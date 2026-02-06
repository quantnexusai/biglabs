# Biglabs

Consulting-grade template for professional services firms. Manage case studies, articles, services, careers, testimonials, and client consultations with AI-powered analytics. Deploy in minutes, no local setup required.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fquantnexusai%2Fbiglabs&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,ANTHROPIC_API_KEY&envDescription=Get%20keys%20from%20Supabase%20and%20Anthropic&envLink=https%3A%2F%2Fgithub.com%2Fquantnexusai%2Fbiglabs%23environment-variables&project-name=biglabs&repository-name=biglabs)

## Features

- **Case Studies** — Showcase client success stories with metrics, challenges, solutions, and testimonials
- **Thought Leadership** — Publish articles and insights with categories, excerpts, and rich content
- **Service Pages** — Present your consulting services with detailed descriptions and feature lists
- **Client Testimonials** — Display social proof from satisfied clients with roles and companies
- **Consultation Booking** — Public intake form for prospective clients with scheduling preferences
- **Careers Portal** — Post open positions with departments, requirements, benefits, and salary ranges
- **Pricing Plans** — Configurable service tiers with feature lists and highlighted plans
- **AI Analytics** — Claude-powered insights and reporting on your consulting data
- **Contact Management** — Collect and manage inbound inquiries from your website
- **Local Preview** — Full UI preview with sample data, no API keys required

## Quick Start

### Step 1: Get Your API Keys

Before deploying, you'll need:

1. **Supabase** — Create a free project at [supabase.com](https://supabase.com)
2. **Anthropic** — Get an API key at [console.anthropic.com](https://console.anthropic.com)

### Step 2: Deploy to Vercel

Click the deploy button above and enter your API keys when prompted.

### Step 3: Set Up Database

Run `supabase/schema.sql` in your Supabase SQL Editor (Settings > SQL Editor).

### Step 4: Done!

Your Biglabs platform is now fully functional.

## Environment Variables

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Supabase > Settings > API |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key | Supabase > Settings > API |
| `ANTHROPIC_API_KEY` | Claude API key | console.anthropic.com |

## Local Development

For local UI development without API keys, the app includes sample data:

- Sample case studies, articles, services, testimonials, and careers displayed throughout
- Any credentials work for local auth
- Simulated Claude AI responses for analytics insights

**Note:** This is for development only. Deployment requires valid API keys.

```bash
# Clone the repo
git clone https://github.com/quantnexusai/biglabs.git
cd biglabs

# Install dependencies
npm install

# Start dev server (no env vars needed for preview)
npm run dev
```

## Database Schema

| Table | Purpose |
|-------|---------|
| `profiles` | User profiles extending Supabase auth |
| `articles` | Thought leadership content and blog posts |
| `case_studies` | Client success stories with metrics and testimonials |
| `careers` | Job postings with requirements and benefits |
| `services` | Consulting service offerings with features |
| `consultations` | Client consultation booking requests |
| `analytics_reports` | AI-generated analytics and insights |
| `testimonials` | Client testimonials and social proof |
| `pricing_plans` | Service pricing tiers with feature lists |
| `contacts` | General contact form submissions |

## Tech Stack

Next.js 15 · Tailwind CSS · Supabase · Claude API · Vercel

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for local development setup.

## Need Help?

For assistance with deployment, configuration, or customization (MCP servers, AI agents, etc.), contact us at **ari@quantnexus.ai**

## License

MIT License — use freely for personal or commercial projects.
