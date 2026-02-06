import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface ContentItem {
  slug: string
  title: string
  description: string
  tags: string[]
  tools: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  date: string
  content: string
}

const contentDirectory = path.join(process.cwd(), 'content')

export function getContentByType(type: 'workflows' | 'prompts' | 'agents'): ContentItem[] {
  const typeDirectory = path.join(contentDirectory, type)
  
  // Check if directory exists
  if (!fs.existsSync(typeDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(typeDirectory)
  const allContent = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(typeDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || '',
        description: data.description || '',
        tags: data.tags || [],
        tools: data.tools || [],
        difficulty: data.difficulty || 'beginner',
        date: data.date || '',
        content,
      }
    })

  // Sort by date (newest first)
  return allContent.sort((a, b) => {
    if (a.date < b.date) return 1
    if (a.date > b.date) return -1
    return 0
  })
}

export function getContentItemBySlug(
  type: 'workflows' | 'prompts' | 'agents',
  slug: string
): ContentItem | null {
  const fullPath = path.join(contentDirectory, type, `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    tags: data.tags || [],
    tools: data.tools || [],
    difficulty: data.difficulty || 'beginner',
    date: data.date || '',
    content,
  }
}

export function getAllTags(type: 'workflows' | 'prompts' | 'agents'): string[] {
  const items = getContentByType(type)
  const tagsSet = new Set<string>()
  
  items.forEach(item => {
    item.tags.forEach(tag => tagsSet.add(tag))
  })
  
  return Array.from(tagsSet).sort()
}

export function getAllTools(type: 'workflows' | 'prompts' | 'agents'): string[] {
  const items = getContentByType(type)
  const toolsSet = new Set<string>()
  
  items.forEach(item => {
    item.tools.forEach(tool => toolsSet.add(tool))
  })
  
  return Array.from(toolsSet).sort()
}

export function filterContent(
  items: ContentItem[],
  filters: {
    tags?: string[]
    tools?: string[]
    difficulty?: string
  }
): ContentItem[] {
  let filtered = items

  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(item =>
      filters.tags!.some(tag => item.tags.includes(tag))
    )
  }

  if (filters.tools && filters.tools.length > 0) {
    filtered = filtered.filter(item =>
      filters.tools!.some(tool => item.tools.includes(tool))
    )
  }

  if (filters.difficulty && filters.difficulty !== 'all') {
    filtered = filtered.filter(item => item.difficulty === filters.difficulty)
  }

  return filtered
}
