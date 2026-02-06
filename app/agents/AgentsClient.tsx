'use client'

import { useState, useCallback } from 'react'
import ContentCard from '@/components/ContentCard'
import FilterBar, { FilterState } from '@/components/FilterBar'
import { ContentItem } from '@/lib/content'

interface AgentsClientProps {
  initialAgents: ContentItem[]
  allTags: string[]
  allTools: string[]
}

export default function AgentsClient({ 
  initialAgents, 
  allTags, 
  allTools 
}: AgentsClientProps) {
  const [filteredAgents, setFilteredAgents] = useState(initialAgents)

  const handleFilterChange = useCallback((filters: FilterState) => {
    let filtered = initialAgents

    if (filters.tags.length > 0) {
      filtered = filtered.filter(agent =>
        filters.tags.some(tag => agent.tags.includes(tag))
      )
    }

    if (filters.tools.length > 0) {
      filtered = filtered.filter(agent =>
        filters.tools.some(tool => agent.tools.includes(tool))
      )
    }

    if (filters.difficulty !== 'all') {
      filtered = filtered.filter(agent => agent.difficulty === filters.difficulty)
    }

    setFilteredAgents(filtered)
  }, [initialAgents])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">AI Agents</h1>
      <p className="text-gray-600 mb-8 text-lg">
        Intelligent AI agents configured for specific tasks and autonomous operations
      </p>

      <FilterBar 
        allTags={allTags} 
        allTools={allTools} 
        onFilterChange={handleFilterChange}
      />

      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredAgents.length} of {initialAgents.length} agents
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <ContentCard
            key={agent.slug}
            title={agent.title}
            description={agent.description}
            tags={agent.tags}
            tools={agent.tools}
            difficulty={agent.difficulty}
            slug={agent.slug}
            type="agents"
            date={agent.date}
          />
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No agents match your filters. Try adjusting your search criteria.
          </p>
        </div>
      )}
    </div>
  )
}
