import type { Metadata } from 'next'
import { getContentByType, getAllTags, getAllTools } from '@/lib/content'
import AgentsClient from './AgentsClient'

export const metadata: Metadata = {
  title: 'AI Agents - aitimized',
  description: 'Browse our collection of intelligent AI agents for autonomous task execution',
}

export default function AgentsPage() {
  const agents = getContentByType('agents')
  const allTags = getAllTags('agents')
  const allTools = getAllTools('agents')

  return (
    <AgentsClient 
      initialAgents={agents}
      allTags={allTags}
      allTools={allTools}
    />
  )
}
