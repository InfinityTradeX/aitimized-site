#!/bin/bash
# Quick deployment script for GO LIVE

echo "🚀 DEPLOYING AITIMIZED.COM TO PRODUCTION"
echo "========================================"
echo ""
echo "This script will deploy the website to GitHub Pages."
echo ""
echo "⚠️  IMPORTANT: You need GitHub push access to proceed."
echo ""
read -p "Do you have push access to the repository? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo ""
    echo "❌ Cannot proceed without push access."
    echo ""
    echo "📋 Alternative options:"
    echo "1. Ask repository owner to run this script"
    echo "2. Use GitHub UI to merge the PR"
    echo "3. Use GitHub Actions manual trigger"
    echo ""
    echo "See GO_LIVE_INSTRUCTIONS.md for details."
    exit 1
fi

echo ""
echo "📦 Preparing deployment..."
echo ""

# Ensure we're on the right branch
git checkout copilot/add-recommended-tools-directory

echo "🔄 Fetching latest changes..."
git fetch origin

echo ""
echo "🚀 Pushing to main branch..."
echo ""

git push origin copilot/add-recommended-tools-directory:main --force

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS! Deployment initiated!"
    echo ""
    echo "📊 Monitor deployment:"
    echo "   https://github.com/InfinityTradeX/aitimized-site/actions"
    echo ""
    echo "🌐 Live site (available in 2-5 minutes):"
    echo "   https://infinitytradex.github.io/aitimized-site/"
    echo ""
    echo "⚙️  Don't forget to enable GitHub Pages:"
    echo "   Settings → Pages → Source: 'GitHub Actions'"
    echo ""
else
    echo ""
    echo "❌ Deployment failed!"
    echo ""
    echo "Common issues:"
    echo "- Authentication failed → Check GitHub credentials"
    echo "- Permission denied → Need write access to repository"
    echo ""
    echo "See GO_LIVE_INSTRUCTIONS.md for alternative deployment methods."
    exit 1
fi
