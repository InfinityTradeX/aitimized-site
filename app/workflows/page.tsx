import type { Metadata } from 'next'
import { getContentByType, getAllTags, getAllTools } from '@/lib/content'
import WorkflowsClient from './WorkflowsClient'

export const metadata: Metadata = {
  title: 'AI Workflows - aitimized',
  description: 'Browse our collection of AI automation workflows for various business processes',
}

export default function WorkflowsPage() {
  const workflows = getContentByType('workflows')
  const allTags = getAllTags('workflows')
  const allTools = getAllTools('workflows')

  return (
    <WorkflowsClient 
      initialWorkflows={workflows}
      allTags={allTags}
      allTools={allTools}
    />
  )
}
