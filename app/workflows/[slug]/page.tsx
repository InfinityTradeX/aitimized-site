import type { Metadata } from 'next'
import { getContentByType, getContentItemBySlug } from '@/lib/content'
import { markdownToHtml } from '@/lib/markdown'
import Link from 'next/link'

interface WorkflowPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const workflows = getContentByType('workflows')
  return workflows.map((workflow) => ({
    slug: workflow.slug,
  }))
}

export async function generateMetadata({ params }: WorkflowPageProps): Promise<Metadata> {
  const workflow = getContentItemBySlug('workflows', params.slug)
  
  if (!workflow) {
    return {
      title: 'Workflow Not Found',
    }
  }

  return {
    title: `${workflow.title} - aitimized`,
    description: workflow.description,
  }
}

export default async function WorkflowPage({ params }: WorkflowPageProps) {
  const workflow = getContentItemBySlug('workflows', params.slug)

  if (!workflow) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Workflow Not Found</h1>
        <p className="text-gray-600 mb-8">The workflow you're looking for doesn't exist.</p>
        <Link href="/workflows" className="btn-primary">
          Back to Workflows
        </Link>
      </div>
    )
  }

  const contentHtml = await markdownToHtml(workflow.content)

  const difficultyClass = 
    workflow.difficulty === 'beginner' ? 'badge-beginner' :
    workflow.difficulty === 'intermediate' ? 'badge-intermediate' :
    'badge-advanced'

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/workflows" className="text-primary-600 hover:text-primary-700 mb-4 inline-block">
        ← Back to Workflows
      </Link>

      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl font-bold">{workflow.title}</h1>
          <span className={difficultyClass}>{workflow.difficulty}</span>
        </div>
        <p className="text-xl text-gray-600 mb-4">{workflow.description}</p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <time>
            {new Date(workflow.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </time>
        </div>

        {workflow.tools.length > 0 && (
          <div className="mb-4">
            <div className="text-sm font-semibold text-gray-700 mb-2">Tools Used:</div>
            <div className="flex flex-wrap gap-2">
              {workflow.tools.map((tool) => (
                <span key={tool} className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {workflow.tags.length > 0 && (
          <div className="flex flex-wrap">
            {workflow.tags.map((tag) => (
              <span key={tag} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div 
        className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary-600 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  )
}
