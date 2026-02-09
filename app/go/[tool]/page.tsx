import { notFound, redirect } from 'next/navigation'
import { getToolById, tools } from '@/lib/tools'

interface RedirectPageProps {
  params: Promise<{
    tool: string
  }>
}

// Generate static params for all tools
export async function generateStaticParams() {
  return tools.map((tool) => ({
    tool: tool.id,
  }))
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const resolvedParams = await params
  const tool = getToolById(resolvedParams.tool)

  if (!tool) {
    notFound()
  }

  // For static export, we'll use meta refresh redirect
  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content={`0;url=${tool.partnerStackUrl}`} />
        <title>Redirecting to {tool.name}...</title>
      </head>
      <body>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600 mb-4"></div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Redirecting to {tool.name}...
            </h1>
            <p className="text-gray-600 mb-4">
              You&apos;ll be taken to their website in a moment.
            </p>
            <p className="text-sm text-gray-500">
              If you are not redirected automatically, 
              <a href={tool.partnerStackUrl} className="text-primary-600 hover:underline ml-1">
                click here
              </a>.
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}
