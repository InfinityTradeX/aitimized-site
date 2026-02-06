# aitimized.com

AI workflows, prompts, and automation blueprints - curated content hub for AI-powered business optimization.

## Overview

This is a Next.js 14 static site featuring AI workflows, automation blueprints, prompts, and AI agents. Content is managed via markdown files with frontmatter metadata.

## Features

- 🚀 Built with Next.js 14 App Router
- 📝 Content management via markdown files
- 🎨 Styled with Tailwind CSS
- 🔍 Client-side filtering by tags, tools, and difficulty
- 📱 Fully responsive design
- ⚡ Static site generation for optimal performance
- 🔎 SEO optimized with proper metadata

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

## Project Structure

```
aitimized-site/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── workflows/         # Workflows section
│   ├── prompts/           # Prompts section
│   └── agents/            # Agents section
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
│   └── markdown.ts       # Markdown rendering
└── public/               # Static assets
```

## Content Management

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

### Content Types

1. **Workflows** (`/content/workflows/*.md`) - Complete automation workflows
2. **Prompts** (`/content/prompts/*.md`) - AI prompt templates
3. **Agents** (`/content/agents/*.md`) - AI agent configurations

## Technologies

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [gray-matter](https://github.com/jonschlinkert/gray-matter) - Frontmatter parsing
- [remark](https://github.com/remarkjs/remark) - Markdown processing

## License

MIT
