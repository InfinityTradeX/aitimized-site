import type { Metadata } from 'next'
import { getContentByType, getContentItemBySlug } from '@/lib/content'
import { markdownToHtml } from '@/lib/markdown'
import Link from 'next/link'

interface AgentPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const agents = getContentByType('agents')
  return agents.map((agent) => ({
    slug: agent.slug,
  }))
}

export async function generateMetadata({ params }: AgentPageProps): Promise<Metadata> {
  const { slug } = await params
  const agent = getContentItemBySlug('agents', slug)
  
  if (!agent) {
    return {
      title: 'Agent Not Found',
    }
  }

  return {
    title: `${agent.title} - aitimized`,
    description: agent.description,
  }
}

export default async function AgentPage({ params }: AgentPageProps) {
  const { slug } = await params
  const agent = getContentItemBySlug('agents', slug)

  if (!agent) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Agent Not Found</h1>
        <p className="text-[color:var(--muted)] mb-8">The agent you're looking for doesn't exist.</p>
        <Link href="/agents" className="btn-primary">
          Back to Agents
        </Link>
      </div>
    )
  }

  const contentHtml = await markdownToHtml(agent.content)

  const difficultyClass = 
    agent.difficulty === 'beginner' ? 'badge-beginner' :
    agent.difficulty === 'intermediate' ? 'badge-intermediate' :
    'badge-advanced'

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/agents" className="text-[color:var(--primary)] hover:text-[color:var(--foreground)] mb-4 inline-block">
        ← Back to Agents
      </Link>

      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="font-heading text-4xl font-black tracking-tight">{agent.title}</h1>
          <span className={difficultyClass}>{agent.difficulty}</span>
        </div>
        <p className="text-xl text-[color:var(--muted)] mb-4">{agent.description}</p>
        
        <div className="flex items-center gap-4 text-sm text-[color:var(--muted)] mb-4">
          <time>
            {new Date(agent.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </time>
        </div>

        {agent.tools.length > 0 && (
          <div className="mb-4">
            <div className="text-sm font-semibold text-[color:var(--muted)] mb-2">Tools Used:</div>
            <div className="flex flex-wrap gap-2">
              {agent.tools.map((tool) => (
                <span key={tool} className="bg-white/5 text-[color:var(--muted)] px-3 py-1 rounded text-sm border border-white/10">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {agent.tags.length > 0 && (
          <div className="flex flex-wrap">
            {agent.tags.map((tag) => (
              <span key={tag} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div
        className="prose prose-lg max-w-none text-[color:var(--foreground)]"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  )
}
