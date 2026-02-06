import type { Metadata } from 'next'
import { getContentByType, getAllTags, getAllTools } from '@/lib/content'
import PromptsClient from './PromptsClient'

export const metadata: Metadata = {
  title: 'AI Prompts - aitimized',
  description: 'Browse our collection of AI prompts for ChatGPT, Claude, and other language models',
}

export default function PromptsPage() {
  const prompts = getContentByType('prompts')
  const allTags = getAllTags('prompts')
  const allTools = getAllTools('prompts')

  return (
    <PromptsClient 
      initialPrompts={prompts}
      allTags={allTags}
      allTools={allTools}
    />
  )
}
