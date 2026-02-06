'use client'

import { useState, useCallback } from 'react'
import ContentCard from '@/components/ContentCard'
import FilterBar, { FilterState } from '@/components/FilterBar'
import { ContentItem } from '@/lib/content'

interface WorkflowsClientProps {
  initialWorkflows: ContentItem[]
  allTags: string[]
  allTools: string[]
}

export default function WorkflowsClient({ 
  initialWorkflows, 
  allTags, 
  allTools 
}: WorkflowsClientProps) {
  const [filteredWorkflows, setFilteredWorkflows] = useState(initialWorkflows)

  const handleFilterChange = useCallback((filters: FilterState) => {
    let filtered = initialWorkflows

    if (filters.tags.length > 0) {
      filtered = filtered.filter(workflow =>
        filters.tags.some(tag => workflow.tags.includes(tag))
      )
    }

    if (filters.tools.length > 0) {
      filtered = filtered.filter(workflow =>
        filters.tools.some(tool => workflow.tools.includes(tool))
      )
    }

    if (filters.difficulty !== 'all') {
      filtered = filtered.filter(workflow => workflow.difficulty === filters.difficulty)
    }

    setFilteredWorkflows(filtered)
  }, [initialWorkflows])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">AI Workflows</h1>
      <p className="text-gray-600 mb-8 text-lg">
        Discover complete end-to-end automation workflows for various business processes
      </p>

      <FilterBar 
        allTags={allTags} 
        allTools={allTools} 
        onFilterChange={handleFilterChange}
      />

      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredWorkflows.length} of {initialWorkflows.length} workflows
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkflows.map((workflow) => (
          <ContentCard
            key={workflow.slug}
            title={workflow.title}
            description={workflow.description}
            tags={workflow.tags}
            tools={workflow.tools}
            difficulty={workflow.difficulty}
            slug={workflow.slug}
            type="workflows"
            date={workflow.date}
          />
        ))}
      </div>

      {filteredWorkflows.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No workflows match your filters. Try adjusting your search criteria.
          </p>
        </div>
      )}
    </div>
  )
}
