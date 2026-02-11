import Link from 'next/link'

interface ContentCardProps {
  title: string
  description: string
  tags: string[]
  tools: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  slug: string
  type: 'workflows' | 'prompts' | 'agents'
  date: string
}

export default function ContentCard({ 
  title, 
  description, 
  tags, 
  tools, 
  difficulty, 
  slug, 
  type,
  date 
}: ContentCardProps) {
  const difficultyClass = 
    difficulty === 'beginner' ? 'badge-beginner' :
    difficulty === 'intermediate' ? 'badge-intermediate' :
    'badge-advanced'

  return (
    <Link href={`/${type}/${slug}`} className="card group">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold group-hover:text-primary-600 transition-colors">
          {title}
        </h3>
        <span className={difficultyClass}>
          {difficulty}
        </span>
      </div>
      
      <p className="text-[color:var(--muted)] mb-4 line-clamp-2">
        {description}
      </p>

      {tools.length > 0 && (
        <div className="mb-3">
          <div className="text-sm font-semibold text-[color:var(--muted)] mb-1">Tools:</div>
          <div className="flex flex-wrap gap-1">
            {tools.map((tool) => (
              <span key={tool} className="text-xs bg-white/5 text-[color:var(--muted)] px-2 py-1 rounded border border-white/10">
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 text-sm text-[color:var(--muted)]">
        {new Date(date).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </div>
    </Link>
  )
}
