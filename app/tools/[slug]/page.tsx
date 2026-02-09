import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getToolById, tools } from '@/lib/tools'
import type { Metadata } from 'next'

interface ToolPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.id,
  }))
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const tool = getToolById(resolvedParams.slug)
  
  if (!tool) {
    return {
      title: 'Tool Not Found - aitimized',
    }
  }

  return {
    title: `${tool.name} Review - aitimized`,
    description: tool.description,
    keywords: [tool.name, 'AI tool', 'review', tool.category, 'business optimization'],
  }
}

export default async function ToolPage({ params }: ToolPageProps) {
  const resolvedParams = await params
  const tool = getToolById(resolvedParams.slug)

  if (!tool) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/tools" className="text-white/80 hover:text-white transition-colors">
              ← Back to Tools
            </Link>
            <span className="text-white/50">|</span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
              {tool.category}
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            {tool.name}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            {tool.description}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Optimization Benefit */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                Why {tool.name}?
              </h2>
              <div className="bg-gradient-to-r from-primary-50 to-primary-100 border-l-4 border-primary-600 p-6 rounded-r-lg">
                <h3 className="text-lg font-bold text-primary-900 mb-3">
                  🚀 Optimization Benefit
                </h3>
                <p className="text-gray-800 text-lg leading-relaxed">
                  {tool.optimizationBenefit}
                </p>
              </div>
            </div>

            {/* Features */}
            {tool.features && tool.features.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  Key Features
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {tool.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <span className="text-primary-600 text-xl">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pros and Cons */}
            {(tool.pros || tool.cons) && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  Pros & Cons
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Pros */}
                  {tool.pros && tool.pros.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                        <span className="text-2xl">👍</span> Pros
                      </h3>
                      <ul className="space-y-3">
                        {tool.pros.map((pro, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-green-600 mt-1">✓</span>
                            <span className="text-gray-700">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Cons */}
                  {tool.cons && tool.cons.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
                        <span className="text-2xl">👎</span> Cons
                      </h3>
                      <ul className="space-y-3">
                        {tool.cons.map((con, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-red-600 mt-1">✗</span>
                            <span className="text-gray-700">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* CTA Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  Ready to Get Started?
                </h3>
                {tool.pricing && (
                  <div className="mb-4 p-4 bg-primary-50 rounded-lg border border-primary-200">
                    <p className="text-sm text-gray-600 mb-1">Starting Price</p>
                    <p className="text-2xl font-bold text-primary-700">{tool.pricing}</p>
                  </div>
                )}
                <Link
                  href={`/go/${tool.id}`}
                  className="block w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center px-6 py-4 rounded-lg font-bold text-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 mb-4"
                >
                  Get Started with {tool.name} →
                </Link>
                <p className="text-xs text-gray-500 text-center">
                  * This is an affiliate link. We may earn a commission at no extra cost to you.
                </p>
              </div>

              {/* Additional Info */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4 text-gray-900">
                  Tool Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="font-semibold text-gray-900">{tool.category}</p>
                  </div>
                  {tool.pricing && (
                    <div>
                      <p className="text-sm text-gray-600">Pricing</p>
                      <p className="font-semibold text-gray-900">{tool.pricing}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Comparison CTA */}
              <div className="bg-gradient-to-r from-primary-100 to-primary-200 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold mb-3 text-gray-900">
                  Comparing Tools?
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  Check out our detailed comparison guides to find the perfect tool for your needs.
                </p>
                <Link
                  href="/tools/compare"
                  className="block w-full bg-white text-primary-700 text-center px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  View Comparisons
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
