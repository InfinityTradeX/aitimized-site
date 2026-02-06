'use client'

import { useState, useEffect } from 'react'

interface FilterBarProps {
  allTags: string[]
  allTools: string[]
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  tags: string[]
  tools: string[]
  difficulty: string
}

export default function FilterBar({ allTags, allTools, onFilterChange }: FilterBarProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedTools, setSelectedTools] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')

  useEffect(() => {
    onFilterChange({
      tags: selectedTags,
      tools: selectedTools,
      difficulty: selectedDifficulty,
    })
  }, [selectedTags, selectedTools, selectedDifficulty, onFilterChange])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const toggleTool = (tool: string) => {
    setSelectedTools(prev => 
      prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]
    )
  }

  const clearFilters = () => {
    setSelectedTags([])
    setSelectedTools([])
    setSelectedDifficulty('all')
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button 
          onClick={clearFilters}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          Clear All
        </button>
      </div>

      {/* Difficulty Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Difficulty
        </label>
        <div className="flex gap-2 flex-wrap">
          {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedDifficulty(level)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedDifficulty === level
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tags Filter */}
      {allTags.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex gap-2 flex-wrap">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-primary-600 text-white'
                    : 'bg-primary-100 text-primary-800 hover:bg-primary-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tools Filter */}
      {allTools.length > 0 && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tools
          </label>
          <div className="flex gap-2 flex-wrap">
            {allTools.map((tool) => (
              <button
                key={tool}
                onClick={() => toggleTool(tool)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  selectedTools.includes(tool)
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tool}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
