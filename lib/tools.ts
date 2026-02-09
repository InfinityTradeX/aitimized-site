export interface Tool {
  id: string;
  name: string;
  description: string;
  optimizationBenefit: string;
  category: string;
  partnerStackUrl: string;
  features?: string[];
  pros?: string[];
  cons?: string[];
  pricing?: string;
  logo?: string;
}

export interface ComparisonTool {
  toolA: Tool;
  toolB: Tool;
  comparisonTable: {
    feature: string;
    toolA: string | boolean;
    toolB: string | boolean;
  }[];
}

export const tools: Tool[] = [
  {
    id: 'jasper',
    name: 'Jasper AI',
    description: 'AI-powered content creation platform for marketing teams',
    optimizationBenefit: 'Generate high-quality content 10x faster with AI, saving hours on copywriting and content creation.',
    category: 'Content Creation',
    partnerStackUrl: 'https://partnerstack.com/jasper',
    features: [
      'AI content generation',
      'Brand voice customization',
      'SEO optimization',
      'Multi-language support',
      'Team collaboration',
    ],
    pros: [
      'High-quality content output',
      'Easy to use interface',
      'Multiple content templates',
      'Good customer support',
    ],
    cons: [
      'Premium pricing',
      'Requires editing for best results',
      'Learning curve for advanced features',
    ],
    pricing: 'Starting at $49/month',
  },
  {
    id: 'notion',
    name: 'Notion AI',
    description: 'All-in-one workspace with AI-powered writing and brainstorming',
    optimizationBenefit: 'Streamline your workflow by combining notes, docs, and tasks in one place with AI assistance.',
    category: 'Productivity',
    partnerStackUrl: 'https://partnerstack.com/notion',
    features: [
      'AI writing assistant',
      'Project management',
      'Database creation',
      'Team wikis',
      'Integration capabilities',
    ],
    pros: [
      'Versatile and flexible',
      'Great for team collaboration',
      'Affordable pricing',
      'Clean user interface',
    ],
    cons: [
      'Can be overwhelming for beginners',
      'Mobile app limitations',
      'Steep learning curve',
    ],
    pricing: 'Free plan available, Plus at $8/month',
  },
  {
    id: 'copy-ai',
    name: 'Copy.ai',
    description: 'AI copywriting tool for marketing and sales content',
    optimizationBenefit: 'Create compelling marketing copy in seconds, boosting conversion rates and saving time.',
    category: 'Content Creation',
    partnerStackUrl: 'https://partnerstack.com/copy-ai',
    features: [
      'Marketing copy templates',
      'Social media content',
      'Email campaigns',
      'Blog post ideas',
      'Product descriptions',
    ],
    pros: [
      'User-friendly interface',
      'Quick content generation',
      'Affordable pricing',
      'Good for beginners',
    ],
    cons: [
      'Limited customization',
      'Output may need refinement',
      'Less advanced than competitors',
    ],
    pricing: 'Starting at $49/month',
  },
];

export function getToolById(id: string): Tool | undefined {
  return tools.find(tool => tool.id === id);
}

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter(tool => tool.category === category);
}

export function getAllCategories(): string[] {
  return [...new Set(tools.map(tool => tool.category))];
}
