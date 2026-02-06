'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getToolById } from '@/lib/tools'

interface RedirectPageProps {
  params: {
    tool: string
  }
}

export default function RedirectPage({ params }: RedirectPageProps) {
  const router = useRouter()
  const tool = getToolById(params.tool)

  useEffect(() => {
    if (tool) {
      // Track the click (you can add analytics here)
      console.log(`Redirecting to ${tool.name}: ${tool.partnerStackUrl}`)
      
      // Redirect to PartnerStack URL
      window.location.href = tool.partnerStackUrl
    } else {
      // If tool not found, redirect to tools page
      router.push('/tools')
    }
  }, [tool, router, params.tool])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600 mb-4"></div>
        {tool ? (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Redirecting to {tool.name}...
            </h1>
            <p className="text-gray-600">
              You&apos;ll be taken to their website in a moment.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Tool not found
            </h1>
            <p className="text-gray-600">
              Redirecting to our tools page...
            </p>
          </>
        )}
      </div>
    </div>
  )
}
