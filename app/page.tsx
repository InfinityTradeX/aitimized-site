import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'aitimized - AI Workflows & Automation Hub',
  description: 'Discover AI workflows, prompts, and automation blueprints to optimize your business with artificial intelligence',
}

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            AI Workflows & Automation Hub
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover curated AI workflows, prompts, and automation blueprints to optimize your business processes
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/workflows" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
              Explore Workflows
            </Link>
            <Link href="/prompts" className="btn-secondary bg-primary-700 text-white hover:bg-primary-600">
              Browse Prompts
            </Link>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Workflows Card */}
          <Link href="/workflows" className="card group">
            <div className="text-4xl mb-4">🔄</div>
            <h2 className="text-2xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
              Workflows
            </h2>
            <p className="text-gray-600 mb-4">
              Complete end-to-end automation workflows for various business processes. Learn how to chain AI tools together for maximum efficiency.
            </p>
            <div className="text-primary-600 font-semibold">
              Explore Workflows →
            </div>
          </Link>

          {/* Prompts Card */}
          <Link href="/prompts" className="card group">
            <div className="text-4xl mb-4">💬</div>
            <h2 className="text-2xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
              Prompts
            </h2>
            <p className="text-gray-600 mb-4">
              Ready-to-use AI prompts for ChatGPT, Claude, and other language models. Optimized for various use cases and industries.
            </p>
            <div className="text-primary-600 font-semibold">
              Browse Prompts →
            </div>
          </Link>

          {/* Agents Card */}
          <Link href="/agents" className="card group">
            <div className="text-4xl mb-4">🤖</div>
            <h2 className="text-2xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
              Agents
            </h2>
            <p className="text-gray-600 mb-4">
              Intelligent AI agents configured for specific tasks. Pre-built configurations and custom instructions for autonomous AI systems.
            </p>
            <div className="text-primary-600 font-semibold">
              Discover Agents →
            </div>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">50+</div>
              <div className="text-gray-600">Curated Workflows</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">100+</div>
              <div className="text-gray-600">AI Prompts</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600 mb-2">30+</div>
              <div className="text-gray-600">AI Agents</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
