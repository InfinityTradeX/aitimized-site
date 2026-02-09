# Affiliate Tools Automation

This directory contains scripts and workflows for managing affiliate tools on aitimized.com.

## Quick Start

### Method 1: GitHub Actions (Recommended)

The easiest way to add a new tool is through the GitHub Actions workflow:

1. Go to **Actions** tab in your GitHub repository
2. Select **"Add Affiliate Tool"** workflow
3. Click **"Run workflow"**
4. Fill in the form:
   - **Tool Name**: The name of the tool (e.g., "Jasper AI")
   - **PartnerStack URL**: Your affiliate link
   - **Description**: Brief description of the tool (optional)
   - **Category**: Tool category (e.g., "Content Creation", "Productivity")
   - **Optimization Benefit**: How the tool optimizes business (optional)
   - **Pricing**: Pricing information (optional)
   - **Features**: Comma-separated list of features (optional)
   - **Pros**: Comma-separated list of pros (optional)
   - **Cons**: Comma-separated list of cons (optional)
5. Click **"Run workflow"**

The workflow will automatically:
- Add the tool to `lib/tools.ts`
- Build the site to ensure everything works
- Commit and push the changes
- Create the tool's review page at `/tools/[tool-slug]`
- Create the affiliate redirect at `/go/[tool-slug]`

### Method 2: Python Script (Local Development)

You can also add tools manually using the Python script:

```bash
# Basic usage (required fields only)
python scripts/add_tool.py \
  --name "Tool Name" \
  --url "https://partnerstack.com/your-affiliate-link"

# Full example with all options
python scripts/add_tool.py \
  --name "Jasper AI" \
  --url "https://partnerstack.com/jasper" \
  --description "AI-powered content creation platform for marketing teams" \
  --category "Content Creation" \
  --benefit "Generate high-quality content 10x faster with AI" \
  --pricing "Starting at $49/month" \
  --features "AI content generation,Brand voice customization,SEO optimization" \
  --pros "High-quality output,Easy to use,Multiple templates" \
  --cons "Premium pricing,Requires editing for best results"
```

### Arguments

#### Required:
- `--name`: Tool name
- `--url`: PartnerStack affiliate URL

#### Optional:
- `--description`: Tool description
- `--category`: Category (default: "AI Tools")
- `--benefit`: Optimization benefit
- `--pricing`: Pricing information
- `--features`: Comma-separated list of features
- `--pros`: Comma-separated list of pros
- `--cons`: Comma-separated list of cons

## How It Works

1. **Tool Data**: All tool information is stored in `lib/tools.ts` as TypeScript objects
2. **Tool Pages**: Individual tool review pages are automatically generated at `/tools/[tool-id]`
3. **Redirects**: Affiliate redirect pages are created at `/go/[tool-id]`
4. **Tools Directory**: All tools are listed on `/tools` page with cards
5. **Comparisons**: Comparison pages can be created at `/tools/compare/[slug]`

## File Structure

```
aitimized-site/
├── lib/
│   └── tools.ts              # Tool data and utilities
├── app/
│   ├── tools/
│   │   ├── page.tsx          # Tools directory page
│   │   ├── [slug]/
│   │   │   └── page.tsx      # Individual tool review pages
│   │   └── compare/
│   │       └── [slug]/
│   │           └── page.tsx  # Comparison pages
│   └── go/
│       └── [tool]/
│           └── page.tsx      # Affiliate redirects
├── scripts/
│   ├── add_tool.py           # Python automation script
│   └── README.md             # This file
└── .github/
    └── workflows/
        └── add-tool.yml      # GitHub Actions workflow
```

## Creating Comparison Pages

To create a comparison page (e.g., "Tool A vs Tool B"):

1. Open `app/tools/compare/[slug]/page.tsx`
2. Add a new entry to the `comparisons` array:

```typescript
const comparisons = [
  { slug: 'jasper-vs-copy-ai', toolAId: 'jasper', toolBId: 'copy-ai' },
  { slug: 'your-tool-vs-other-tool', toolAId: 'your-tool', toolBId: 'other-tool' },
]
```

3. The comparison page will be available at `/tools/compare/your-tool-vs-other-tool`

## Customizing Tool Pages

To customize how tool pages look, edit:
- `app/tools/page.tsx` - Tools directory page
- `app/tools/[slug]/page.tsx` - Individual tool review pages
- `app/tools/compare/[slug]/page.tsx` - Comparison pages

## Affiliate Links

All affiliate links go through `/go/[tool-id]` which:
1. Shows a brief loading screen
2. Redirects to the PartnerStack URL
3. Allows you to track clicks (add analytics in the redirect page)

## Best Practices

1. **Accurate Information**: Ensure tool descriptions and benefits are accurate
2. **Compelling Benefits**: Focus on how the tool optimizes business operations
3. **Clear Pricing**: Include transparent pricing information
4. **Regular Updates**: Keep tool information up to date
5. **Comparison Pages**: Create comparisons for similar tools to help users decide
6. **Mobile Testing**: Always test on mobile devices

## Example: Adding a Tool via GitHub Actions

1. Navigate to **Actions** → **Add Affiliate Tool** → **Run workflow**
2. Fill in:
   - Tool Name: `ChatGPT Plus`
   - PartnerStack URL: `https://partnerstack.com/chatgpt`
   - Description: `Advanced AI assistant for writing, analysis, and productivity`
   - Category: `Productivity`
   - Optimization Benefit: `Automate repetitive tasks and boost productivity by 5x`
   - Pricing: `$20/month`
   - Features: `Advanced reasoning,Priority access,Faster responses,DALL-E integration`
   - Pros: `Reliable and fast,Great for complex tasks,Affordable pricing`
   - Cons: `Requires subscription,Internet connection needed`
3. Click **Run workflow**

The tool will be live immediately after the workflow completes!

## Troubleshooting

**Build fails after adding tool:**
- Check that all string values are properly quoted
- Ensure there are no syntax errors in `lib/tools.ts`
- Run `npm run build` locally to see the error

**Tool page not showing:**
- Verify the tool was added to `lib/tools.ts`
- Check that `generateStaticParams()` is working
- Rebuild the site with `npm run build`

**Redirect not working:**
- Verify the PartnerStack URL is correct
- Check browser console for errors
- Test the redirect at `/go/[tool-id]`

## Support

For issues or questions, please open an issue on GitHub or contact the development team.
