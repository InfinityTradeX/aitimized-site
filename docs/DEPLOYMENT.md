# Deployment Guide

## Overview

This guide explains how to deploy the aitimized.com site to production.

## Automatic Deployment (GitHub Pages)

### Setup

The site is configured for automatic deployment to GitHub Pages using GitHub Actions.

**Prerequisites:**
1. Repository hosted on GitHub
2. GitHub Pages enabled in repository settings
3. Write access to the repository

### Deployment Workflow

The deployment happens automatically when:
- Code is pushed to `main` or `master` branch
- Workflow can also be triggered manually from Actions tab

**Workflow steps:**
1. Checkout code
2. Setup Node.js 20
3. Install dependencies with `npm ci`
4. Build site with `npm run build`
5. Upload `out/` directory as artifact
6. Deploy to GitHub Pages

**Workflow file:** `.github/workflows/deploy.yml`

### Enabling GitHub Pages

1. Go to repository Settings
2. Navigate to Pages section
3. Under "Build and deployment":
   - Source: Select "GitHub Actions"
4. Save settings

### Live URL

Once deployed, the site will be available at:
```
https://infinitytradex.github.io/aitimized-site/
```

### Monitoring Deployments

- View deployment status in the Actions tab
- Check deployment badge in README
- Review deployment logs for any issues

## Manual Deployment

### Build Production Site

```bash
# Install dependencies
npm install

# Build for production
npm run build
```

This creates a `out/` directory with all static files.

### Deploy to Other Services

#### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=out
```

#### AWS S3 + CloudFront

```bash
# Sync to S3 bucket
aws s3 sync out/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

#### Custom Server

Simply upload the contents of the `out/` directory to your web server:
```bash
# Example with rsync
rsync -avz --delete out/ user@server:/var/www/html/
```

## Build Information

### Build Output

- **Total Pages:** 22 static HTML pages
- **Total Size:** ~1.9MB
- **Build Time:** ~15 seconds
- **Node.js Version:** 20.x

### Generated Pages

- Homepage (`/`)
- Workflows listing and detail pages
- Prompts listing and detail pages
- Agents listing and detail pages
- Tools directory (`/tools`)
- Individual tool review pages (`/tools/[slug]`)
- Tool comparison pages (`/tools/compare/[slug]`)
- Redirect pages (`/go/[tool]`)
- Style demo page (`/style-demo`)

### Static Assets

All assets are optimized and included in the `out/` directory:
- JavaScript bundles (code-split)
- CSS stylesheets (with Tailwind)
- Static content (markdown-rendered)
- Images (unoptimized, as per config)

## Configuration

### Next.js Config

```javascript
// next.config.js
module.exports = {
  output: 'export',  // Static site generation
  images: {
    unoptimized: true,  // No image optimization for static export
  },
}
```

### Base Path (if needed)

If deploying to a subdirectory, update `next.config.js`:

```javascript
module.exports = {
  output: 'export',
  basePath: '/your-subdirectory',
  images: {
    unoptimized: true,
  },
}
```

## Troubleshooting

### Build Fails

1. Check Node.js version (should be 18.x or 20.x)
2. Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
3. Check for TypeScript errors: `npm run lint`

### Pages Not Updating

1. Clear browser cache
2. Wait 5-10 minutes for CDN to update
3. Hard refresh with Ctrl+F5 (Windows/Linux) or Cmd+Shift+R (Mac)

### GitHub Actions Failing

1. Check workflow logs in Actions tab
2. Verify repository permissions
3. Ensure GitHub Pages is enabled
4. Check if quota limits are reached

## Performance

### Optimization Features

- Static HTML generation (no server-side rendering)
- Code splitting for optimal load times
- CSS minification with Tailwind
- Asset bundling and compression
- CDN delivery via GitHub Pages

### Monitoring

Monitor site performance with:
- Google PageSpeed Insights
- Lighthouse audits
- WebPageTest
- Core Web Vitals

## Security

### Best Practices

- ✅ Static site (no server vulnerabilities)
- ✅ HTTPS by default on GitHub Pages
- ✅ No sensitive data in repository
- ✅ Dependencies regularly updated
- ✅ No database or backend

### Content Security

- All affiliate links use `/go/` redirect system
- No inline JavaScript (except Next.js hydration)
- CSP headers can be added via hosting provider

## Rollback

### To Previous Version

Using Git:
```bash
# View commit history
git log --oneline

# Revert to specific commit
git revert <commit-hash>
git push origin main
```

The deployment workflow will automatically deploy the reverted version.

## Custom Domain

### Setting Up Custom Domain

1. Add CNAME record in DNS:
   ```
   www.aitimized.com -> infinitytradex.github.io
   ```

2. Create `public/CNAME` file:
   ```
   www.aitimized.com
   ```

3. Configure in GitHub Pages settings:
   - Enter custom domain
   - Enable "Enforce HTTPS"

4. Wait for DNS propagation (up to 24 hours)

## Support

For deployment issues:
1. Check GitHub Actions logs
2. Review this documentation
3. Test build locally with `npm run build`
4. Check repository Issues for similar problems

---

**Last Updated:** 2026-02-06
**Version:** 1.0.0
