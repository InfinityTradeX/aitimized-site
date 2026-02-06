import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">aitimized</h3>
            <p className="text-gray-400">
              Your hub for AI workflows, prompts, and automation blueprints
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/workflows" className="text-gray-400 hover:text-white transition-colors">
                  Workflows
                </Link>
              </li>
              <li>
                <Link href="/prompts" className="text-gray-400 hover:text-white transition-colors">
                  Prompts
                </Link>
              </li>
              <li>
                <Link href="/agents" className="text-gray-400 hover:text-white transition-colors">
                  Agents
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <p className="text-gray-400 text-sm">
              Curated collection of AI automation resources for businesses and developers.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} aitimized. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
