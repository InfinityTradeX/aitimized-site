import type { Metadata } from 'next'
import { getContentByType, getContentItemBySlug } from '@/lib/content'
import { markdownToHtml } from '@/lib/markdown'
import Link from 'next/link'

interface PromptPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const prompts = getContentByType('prompts')
  return prompts.map((prompt) => ({
    slug: prompt.slug,
  }))
}

export async function generateMetadata({ params }: PromptPageProps): Promise<Metadata> {
  const { slug } = await params
  const prompt = getContentItemBySlug('prompts', slug)
  
  if (!prompt) {
    return {
      title: 'Prompt Not Found',
    }
  }

  return {
    title: `${prompt.title} - aitimized`,
    description: prompt.description,
  }
}

export default async function PromptPage({ params }: PromptPageProps) {
  const { slug } = await params
  const prompt = getContentItemBySlug('prompts', slug)

  if (!prompt) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Prompt Not Found</h1>
        <p className="text-[color:var(--muted)] mb-8">The prompt you're looking for doesn't exist.</p>
        <Link href="/prompts" className="btn-primary">
          Back to Prompts
        </Link>
      </div>
    )
  }

  const contentHtml = await markdownToHtml(prompt.content)

  const difficultyClass = 
    prompt.difficulty === 'beginner' ? 'badge-beginner' :
    prompt.difficulty === 'intermediate' ? 'badge-intermediate' :
    'badge-advanced'

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/prompts" className="text-[color:var(--primary)] hover:text-[color:var(--foreground)] mb-4 inline-block">
        ← Back to Prompts
      </Link>

      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="font-heading text-4xl font-black tracking-tight">{prompt.title}</h1>
          <span className={difficultyClass}>{prompt.difficulty}</span>
        </div>
        <p className="text-xl text-[color:var(--muted)] mb-4">{prompt.description}</p>
        
        <div className="flex items-center gap-4 text-sm text-[color:var(--muted)] mb-4">
          <time>
            {new Date(prompt.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </time>
        </div>

        {prompt.tools.length > 0 && (
          <div className="mb-4">
            <div className="text-sm font-semibold text-[color:var(--muted)] mb-2">Tools Used:</div>
            <div className="flex flex-wrap gap-2">
              {prompt.tools.map((tool) => (
                <span key={tool} className="bg-white/5 text-[color:var(--muted)] px-3 py-1 rounded text-sm border border-white/10">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {prompt.tags.length > 0 && (
          <div className="flex flex-wrap">
            {prompt.tags.map((tag) => (
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
