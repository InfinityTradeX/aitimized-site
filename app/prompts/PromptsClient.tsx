'use client'

import { useState, useCallback } from 'react'
import ContentCard from '@/components/ContentCard'
import FilterBar, { FilterState } from '@/components/FilterBar'
import { ContentItem } from '@/lib/content'

interface PromptsClientProps {
  initialPrompts: ContentItem[]
  allTags: string[]
  allTools: string[]
}

export default function PromptsClient({ 
  initialPrompts, 
  allTags, 
  allTools 
}: PromptsClientProps) {
  const [filteredPrompts, setFilteredPrompts] = useState(initialPrompts)

  const handleFilterChange = useCallback((filters: FilterState) => {
    let filtered = initialPrompts

    if (filters.tags.length > 0) {
      filtered = filtered.filter(prompt =>
        filters.tags.some(tag => prompt.tags.includes(tag))
      )
    }

    if (filters.tools.length > 0) {
      filtered = filtered.filter(prompt =>
        filters.tools.some(tool => prompt.tools.includes(tool))
      )
    }

    if (filters.difficulty !== 'all') {
      filtered = filtered.filter(prompt => prompt.difficulty === filters.difficulty)
    }

    setFilteredPrompts(filtered)
  }, [initialPrompts])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">AI Prompts</h1>
      <p className="text-gray-600 mb-8 text-lg">
        Ready-to-use AI prompts optimized for ChatGPT, Claude, and other language models
      </p>

      <FilterBar 
        allTags={allTags} 
        allTools={allTools} 
        onFilterChange={handleFilterChange}
      />

      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredPrompts.length} of {initialPrompts.length} prompts
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrompts.map((prompt) => (
          <ContentCard
            key={prompt.slug}
            title={prompt.title}
            description={prompt.description}
            tags={prompt.tags}
            tools={prompt.tools}
            difficulty={prompt.difficulty}
            slug={prompt.slug}
            type="prompts"
            date={prompt.date}
          />
        ))}
      </div>

      {filteredPrompts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No prompts match your filters. Try adjusting your search criteria.
          </p>
        </div>
      )}
    </div>
  )
}
