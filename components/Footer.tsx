import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading text-xl font-black mb-4">AITIMIZED</h3>
            <p className="text-[color:var(--muted)]">
              Your hub for AI workflows, prompts, and automation blueprints
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/workflows" className="text-[color:var(--muted)] hover:text-[color:var(--foreground)] transition-colors">
                  Workflows
                </Link>
              </li>
              <li>
                <Link href="/prompts" className="text-[color:var(--muted)] hover:text-[color:var(--foreground)] transition-colors">
                  Prompts
                </Link>
              </li>
              <li>
                <Link href="/agents" className="text-[color:var(--muted)] hover:text-[color:var(--foreground)] transition-colors">
                  Agents
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <p className="text-[color:var(--muted)] text-sm">
              Curated collection of AI automation resources for businesses and developers.
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-[color:var(--muted)] text-sm">
          © {new Date().getFullYear()} aitimized. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
