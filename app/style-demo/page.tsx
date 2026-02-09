import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Style Demo - aitimized',
  description: 'Demo page showcasing the 2026 brand styling components',
}

export default function StyleDemoPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          AITIMIZED Brand Styling 2026
        </h1>
        
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          This page demonstrates the new custom CSS components designed for high-conversion affiliate marketing and professional SaaS aesthetics.
        </p>

        {/* Affiliate Button Demo */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Affiliate Button</h2>
          <p className="text-gray-700 mb-6">
            The high-conversion PartnerStack button with professional styling and hover effects.
          </p>
          <a href="#" className="affiliate-btn">
            Get Started with This Tool →
          </a>
          <p className="mt-4 text-sm text-gray-500">
            * This is a demonstration. Hover over the button to see the animation.
          </p>
        </section>

        {/* Verdict Box Demo */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Verdict Box</h2>
          <p className="text-gray-700 mb-6">
            A trust-building component for displaying recommendations and verdicts.
          </p>
          <div className="verdict-box">
            <h3 className="text-xl font-bold mb-3">Our Verdict</h3>
            <p className="text-gray-700 leading-relaxed">
              This tool is <strong>excellent for teams</strong> looking to automate their workflow 
              and boost productivity. With its intuitive interface and powerful AI capabilities, 
              it&apos;s a must-have for modern businesses optimizing their operations.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Easy to use interface</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Powerful automation features</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Great customer support</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Ad Slot Demo */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Ad Slot Placeholder</h2>
          <p className="text-gray-700 mb-6">
            Styled placeholder for Google AdSense or other advertisement slots.
          </p>
          <div className="ad-slot">
            Advertisement Placeholder - 728x90
          </div>
        </section>

        {/* Combined Example */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Combined Example</h2>
          <p className="text-gray-700 mb-6">
            Here&apos;s how these components work together in a typical affiliate review page:
          </p>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-3xl font-bold mb-4">AI Tool Review: Example Product</h3>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              This powerful AI tool helps businesses automate repetitive tasks and focus on 
              what matters most. With advanced features and intuitive design, it&apos;s perfect 
              for teams of all sizes.
            </p>

            <a href="#" className="affiliate-btn">
              Try Example Product Free →
            </a>

            <div className="ad-slot">
              Advertisement - 300x250
            </div>

            <div className="verdict-box">
              <h4 className="text-xl font-bold mb-3">💡 Final Verdict</h4>
              <p className="text-gray-700 leading-relaxed">
                <strong>Highly Recommended</strong> for businesses looking to streamline operations. 
                The tool offers excellent value for money and delivers on its promises. 
                We&apos;ve been using it for 6 months and seen a 40% productivity increase.
              </p>
            </div>

            <a href="#" className="affiliate-btn">
              Get Started Today →
            </a>
          </div>
        </section>

        {/* CSS Variables Info */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">CSS Variables</h2>
          <p className="text-gray-700 mb-6">
            The styling system uses CSS variables for consistent branding:
          </p>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ul className="space-y-3 font-mono text-sm">
              <li className="flex items-center">
                <div className="w-12 h-12 rounded mr-4" style={{backgroundColor: '#0070f3'}}></div>
                <span><strong>--primary-blue:</strong> #0070f3 (Professional AI Blue)</span>
              </li>
              <li className="flex items-center">
                <div className="w-12 h-12 rounded mr-4 border" style={{backgroundColor: '#f8fafc'}}></div>
                <span><strong>--soft-bg:</strong> #f8fafc (Clean background)</span>
              </li>
              <li className="flex items-center">
                <div className="w-12 h-12 rounded mr-4" style={{backgroundColor: '#1e293b'}}></div>
                <span><strong>--text-dark:</strong> #1e293b (Sharp text)</span>
              </li>
              <li>
                <span><strong>--radius:</strong> 12px (Modern rounded corners)</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
