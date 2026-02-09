import Link from 'next/link'
import type { Metadata } from 'next'
import { tools, getAllCategories } from '@/lib/tools'

export const metadata: Metadata = {
  title: 'Recommended AI Tools - aitimized',
  description: 'Discover the best AI-powered tools to optimize your business operations, content creation, and productivity',
  keywords: ['AI tools', 'business optimization', 'productivity tools', 'AI software', 'PartnerStack'],
}

export default function ToolsPage() {
  const categories = getAllCategories()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4 text-center">
            Recommended AI Tools
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Discover hand-picked AI tools that supercharge your business operations. 
            Each tool is carefully selected for maximum optimization and ROI.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          <button className="px-4 py-2 rounded-full bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors">
            All Tools
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full bg-white text-gray-700 font-medium hover:bg-gray-100 transition-colors shadow-sm"
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Tools Grid */}
      <section className="container mx-auto px-4 py-8 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Tool Header */}
              <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-6 border-b border-primary-200">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {tool.name}
                  </h2>
                  <span className="px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
                    {tool.category}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">
                  {tool.description}
                </p>
              </div>

              {/* Tool Body */}
              <div className="p-6 flex-grow">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-primary-700 mb-2 uppercase tracking-wide">
                    🚀 Optimization Benefit
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {tool.optimizationBenefit}
                  </p>
                </div>

                {tool.pricing && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-semibold text-gray-600">Pricing: </span>
                    <span className="text-sm text-gray-800">{tool.pricing}</span>
                  </div>
                )}

                {tool.features && tool.features.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {tool.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start">
                          <span className="text-primary-600 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Tool Footer - CTA Buttons */}
              <div className="p-6 pt-0 space-y-3">
                <Link
                  href={`/go/${tool.id}`}
                  className="block w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center px-6 py-3 rounded-lg font-bold hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Get Started →
                </Link>
                <Link
                  href={`/tools/${tool.id}`}
                  className="block w-full bg-gray-100 text-gray-700 text-center px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Read Full Review
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison CTA Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Check out our detailed comparison guides to find the perfect tool for your needs.
          </p>
          <Link
            href="/tools/compare/jasper-vs-copy-ai"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-700 transition-colors"
          >
            Compare Tools
          </Link>
        </div>
      </section>
    </div>
  )
}
