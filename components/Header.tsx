import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            aitimized
          </Link>
          <div className="flex gap-6">
            <Link 
              href="/workflows" 
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Workflows
            </Link>
            <Link 
              href="/prompts" 
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Prompts
            </Link>
            <Link 
              href="/agents" 
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Agents
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
