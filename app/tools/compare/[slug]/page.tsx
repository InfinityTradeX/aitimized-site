import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getToolById } from '@/lib/tools'
import type { Metadata } from 'next'

interface ComparePageProps {
  params: {
    slug: string
  }
}

// Predefined comparisons
const comparisons = [
  { slug: 'jasper-vs-copy-ai', toolAId: 'jasper', toolBId: 'copy-ai' },
  { slug: 'notion-vs-jasper', toolAId: 'notion', toolBId: 'jasper' },
]

export async function generateStaticParams() {
  return comparisons.map((comp) => ({
    slug: comp.slug,
  }))
}

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const comparison = comparisons.find(c => c.slug === params.slug)
  
  if (!comparison) {
    return { title: 'Comparison Not Found - aitimized' }
  }

  const toolA = getToolById(comparison.toolAId)
  const toolB = getToolById(comparison.toolBId)

  if (!toolA || !toolB) {
    return { title: 'Comparison Not Found - aitimized' }
  }

  return {
    title: `${toolA.name} vs ${toolB.name} - Detailed Comparison | aitimized`,
    description: `Compare ${toolA.name} and ${toolB.name} to find the best AI tool for your business. See features, pricing, pros and cons side by side.`,
    keywords: [toolA.name, toolB.name, 'comparison', 'vs', 'AI tools', 'review'],
  }
}

export default function ComparePage({ params }: ComparePageProps) {
  const comparison = comparisons.find(c => c.slug === params.slug)
  
  if (!comparison) {
    notFound()
  }

  const toolA = getToolById(comparison.toolAId)
  const toolB = getToolById(comparison.toolBId)

  if (!toolA || !toolB) {
    notFound()
  }

  // Create comparison table data
  const comparisonTable = [
    { feature: 'Pricing', toolA: toolA.pricing || 'N/A', toolB: toolB.pricing || 'N/A' },
    { feature: 'Category', toolA: toolA.category, toolB: toolB.category },
    { feature: 'Best For', toolA: toolA.optimizationBenefit, toolB: toolB.optimizationBenefit },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/tools" className="text-white/80 hover:text-white transition-colors mb-4 inline-block">
            ← Back to Tools
          </Link>
          <h1 className="text-5xl font-bold mb-4">
            {toolA.name} vs {toolB.name}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            A comprehensive comparison to help you choose the best AI tool for your business needs.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Quick Overview */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Tool A Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-6 border-b border-primary-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{toolA.name}</h2>
              <p className="text-gray-700">{toolA.description}</p>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <span className="text-sm text-gray-600">Category:</span>
                <span className="ml-2 font-semibold">{toolA.category}</span>
              </div>
              {toolA.pricing && (
                <div className="mb-4">
                  <span className="text-sm text-gray-600">Pricing:</span>
                  <span className="ml-2 font-semibold">{toolA.pricing}</span>
                </div>
              )}
              <Link
                href={`/go/${toolA.id}`}
                className="block w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center px-6 py-3 rounded-lg font-bold hover:from-primary-700 hover:to-primary-800 transition-all duration-200"
              >
                Get Started with {toolA.name} →
              </Link>
            </div>
          </div>

          {/* Tool B Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-6 border-b border-primary-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{toolB.name}</h2>
              <p className="text-gray-700">{toolB.description}</p>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <span className="text-sm text-gray-600">Category:</span>
                <span className="ml-2 font-semibold">{toolB.category}</span>
              </div>
              {toolB.pricing && (
                <div className="mb-4">
                  <span className="text-sm text-gray-600">Pricing:</span>
                  <span className="ml-2 font-semibold">{toolB.pricing}</span>
                </div>
              )}
              <Link
                href={`/go/${toolB.id}`}
                className="block w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center px-6 py-3 rounded-lg font-bold hover:from-primary-700 hover:to-primary-800 transition-all duration-200"
              >
                Get Started with {toolB.name} →
              </Link>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-bold text-gray-900">Feature</th>
                  <th className="text-left py-4 px-4 font-bold text-primary-700">{toolA.name}</th>
                  <th className="text-left py-4 px-4 font-bold text-primary-700">{toolB.name}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonTable.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-4 px-4 font-semibold text-gray-700">{row.feature}</td>
                    <td className="py-4 px-4 text-gray-600">{row.toolA}</td>
                    <td className="py-4 px-4 text-gray-600">{row.toolB}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pros and Cons Comparison */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Pros & Cons</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Tool A Pros/Cons */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">{toolA.name}</h3>
              
              {toolA.pros && toolA.pros.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-green-700 mb-3 flex items-center gap-2">
                    <span className="text-xl">👍</span> Pros
                  </h4>
                  <ul className="space-y-2">
                    {toolA.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span className="text-gray-700">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {toolA.cons && toolA.cons.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-red-700 mb-3 flex items-center gap-2">
                    <span className="text-xl">👎</span> Cons
                  </h4>
                  <ul className="space-y-2">
                    {toolA.cons.map((con, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-red-600 mt-0.5">✗</span>
                        <span className="text-gray-700">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Tool B Pros/Cons */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">{toolB.name}</h3>
              
              {toolB.pros && toolB.pros.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-green-700 mb-3 flex items-center gap-2">
                    <span className="text-xl">👍</span> Pros
                  </h4>
                  <ul className="space-y-2">
                    {toolB.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span className="text-gray-700">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {toolB.cons && toolB.cons.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-red-700 mb-3 flex items-center gap-2">
                    <span className="text-xl">👎</span> Cons
                  </h4>
                  <ul className="space-y-2">
                    {toolB.cons.map((con, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-red-600 mt-0.5">✗</span>
                        <span className="text-gray-700">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Verdict */}
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Verdict</h2>
          <div className="space-y-4 text-gray-800">
            <p className="text-lg">
              <strong>{toolA.name}</strong> is ideal for: {toolA.optimizationBenefit}
            </p>
            <p className="text-lg">
              <strong>{toolB.name}</strong> is ideal for: {toolB.optimizationBenefit}
            </p>
            <div className="mt-6 p-6 bg-white rounded-lg">
              <p className="text-lg font-semibold text-primary-900 mb-3">
                Need help deciding? Try both tools:
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/go/${toolA.id}`}
                  className="flex-1 min-w-[200px] bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center px-6 py-3 rounded-lg font-bold hover:from-primary-700 hover:to-primary-800 transition-all duration-200"
                >
                  Try {toolA.name} →
                </Link>
                <Link
                  href={`/go/${toolB.id}`}
                  className="flex-1 min-w-[200px] bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center px-6 py-3 rounded-lg font-bold hover:from-primary-700 hover:to-primary-800 transition-all duration-200"
                >
                  Try {toolB.name} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
