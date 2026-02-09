# aitimized.com

AI workflows, prompts, and automation blueprints - curated content hub for AI-powered business optimization.

**🌐 Live Site:** [https://infinitytradex.github.io/aitimized-site/](https://infinitytradex.github.io/aitimized-site/)

## Overview

This is a Next.js 15 static site featuring AI workflows, automation blueprints, prompts, AI agents, and an **automated affiliate hub** for PartnerStack programs.

## Features

- 🚀 Built with Next.js 15 App Router
- 📝 Content management via markdown files
- 🎨 Styled with Tailwind CSS
- 🔍 Client-side filtering by tags, tools, and difficulty
- 📱 Fully responsive design
- ⚡ Static site generation for optimal performance
- 🔎 SEO optimized with proper metadata
- 💼 **Affiliate Tools Hub** - Automated system for managing PartnerStack affiliate tools
- 🔄 **Smart Redirects** - Clean `/go/` URLs for affiliate links
- 🤖 **GitHub Actions** - Automated tool addition workflow
- 📊 **Comparison Pages** - Side-by-side tool comparisons

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
```

This generates a static export in the `out` directory.

### Deployment

The site is automatically deployed to GitHub Pages using GitHub's native Actions integration.

**Live URL:** [https://infinitytradex.github.io/aitimized-site/](https://infinitytradex.github.io/aitimized-site/)

**GitHub Pages Setup:**
1. Go to repository Settings → Pages
2. Set "Build and deployment" source to "GitHub Actions"
3. Automatic deployment triggers on push to main/master branches

**Manual deployment:**
1. Build the site: `npm run build`
2. The static files in `out/` directory are ready for deployment
3. Deploy to any static hosting service (GitHub Pages, Vercel, Netlify, etc.)

## Affiliate Hub Features

### 1. Recommended Tools Directory

Visit `/tools` to see a beautifully designed directory of recommended AI tools. Each tool card includes:
- Tool name and category
- Short description
- Optimization benefit (how it helps businesses)
- Key features
- Pricing information
- "Get Started" CTA button linking to affiliate URL
- "Read Full Review" button for detailed information

### 2. Individual Tool Review Pages

Each tool has a dedicated review page at `/tools/[tool-id]` featuring:
- Comprehensive tool information
- Detailed optimization benefits
- Complete feature list
- Pros and cons comparison
- Pricing details
- Prominent affiliate CTA
- Mobile-responsive design

### 3. Tool Comparison Pages

Compare tools side-by-side at `/tools/compare/[slug]`:
- Feature comparison table
- Side-by-side pros and cons
- Quick overview cards
- Dual CTAs for both tools
- Helps users make informed decisions

### 4. Smart Redirect System

All affiliate links use the clean `/go/[tool-id]` format:
- Example: `aitimized.com/go/jasper` redirects to PartnerStack URL
- Uses meta refresh for instant redirection
- Includes fallback link if redirect fails
- Professional loading screen
- Easy to track and manage

### 5. Automated Tool Management

#### Via GitHub Actions (Recommended):
1. Go to **Actions** → **Add Affiliate Tool**
2. Click **Run workflow**
3. Fill in the tool information
4. The workflow automatically:
   - Adds the tool to the data file
   - Generates static pages
   - Commits and pushes changes

#### Via Python Script:
```bash
python scripts/add_tool.py \
  --name "Tool Name" \
  --url "https://partnerstack.com/your-link" \
  --description "Tool description" \
  --category "Category" \
  --benefit "How it optimizes business" \
  --pricing "Pricing info" \
  --features "feature1,feature2,feature3" \
  --pros "pro1,pro2,pro3" \
  --cons "con1,con2,con3"
```

See detailed documentation in [`scripts/README.md`](scripts/README.md).

## Project Structure

```
aitimized-site/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── workflows/         # Workflows section
│   ├── prompts/           # Prompts section
│   ├── agents/            # Agents section
│   ├── tools/             # 🆕 Affiliate tools hub
│   │   ├── page.tsx      # Tools directory
│   │   ├── [slug]/       # Individual tool pages
│   │   └── compare/      # Comparison pages
│   └── go/                # 🆕 Affiliate redirects
│       └── [tool]/       # Redirect handler
├── components/            # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ContentCard.tsx
│   └── FilterBar.tsx
├── content/               # Markdown content
│   ├── workflows/
│   ├── prompts/
│   └── agents/
├── lib/                   # Utility functions
│   ├── content.ts        # Content parsing
│   ├── markdown.ts       # Markdown rendering
│   └── tools.ts          # 🆕 Tools data and utilities
├── scripts/               # 🆕 Automation scripts
│   ├── add_tool.py       # Tool addition script
│   └── README.md         # Detailed automation docs
├── .github/
│   └── workflows/
│       └── add-tool.yml  # 🆕 GitHub Actions workflow
└── public/               # Static assets
```

## Content Management

### Markdown Content

Content is stored as markdown files in the `/content` directory with the following frontmatter schema:

```yaml
---
title: "Your Title"
description: "Your description"
tags: [tag1, tag2]
tools: [tool1, tool2]
difficulty: beginner # or intermediate, advanced
date: 2024-01-01
---
```

#### Content Types

1. **Workflows** (`/content/workflows/*.md`) - Complete automation workflows
2. **Prompts** (`/content/prompts/*.md`) - AI prompt templates
3. **Agents** (`/content/agents/*.md`) - AI agent configurations

### Affiliate Tools

Tools are managed in `lib/tools.ts` as TypeScript objects:

```typescript
{
  id: 'tool-slug',
  name: 'Tool Name',
  description: 'Brief description',
  optimizationBenefit: 'How it optimizes business',
  category: 'Category',
  partnerStackUrl: 'https://partnerstack.com/your-link',
  features: ['Feature 1', 'Feature 2'],
  pros: ['Pro 1', 'Pro 2'],
  cons: ['Con 1', 'Con 2'],
  pricing: 'Pricing information'
}
```

Use the automation scripts to add new tools instead of editing manually.

## Technologies

- [Next.js 15](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [gray-matter](https://github.com/jonschlinkert/gray-matter) - Frontmatter parsing
- [remark](https://github.com/remarkjs/remark) - Markdown processing
- [Python 3](https://www.python.org/) - Automation scripts
- [GitHub Actions](https://github.com/features/actions) - CI/CD automation

## License

MIT
