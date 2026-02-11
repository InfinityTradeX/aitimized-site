import Link from 'next/link'

export default function Header() {
  return (
    <header className="site-header">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Link
            href="/"
            className="font-heading text-2xl md:text-3xl font-black italic tracking-tight text-[color:var(--foreground)]"
          >
            AITIMIZED
          </Link>
          <div className="flex flex-wrap gap-5 text-sm md:text-base">
            <Link
              href="/workflows"
              className="text-[color:var(--muted)] hover:text-[color:var(--primary)] transition-colors font-medium"
            >
              Workflows
            </Link>
            <Link
              href="/prompts"
              className="text-[color:var(--muted)] hover:text-[color:var(--primary)] transition-colors font-medium"
            >
              Prompts
            </Link>
            <Link
              href="/agents"
              className="text-[color:var(--muted)] hover:text-[color:var(--primary)] transition-colors font-medium"
            >
              Agents
            </Link>
            <Link
              href="/tools"
              className="text-[color:var(--muted)] hover:text-[color:var(--primary)] transition-colors font-medium"
            >
              Tools
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
