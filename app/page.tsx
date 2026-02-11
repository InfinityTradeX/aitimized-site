import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'aitimized - AI Workflows & Automation Hub',
}

interface AirtableFields {
  "Tool Name"?: string
  "Article Content"?: string
  "Price Point"?: string
  "Affiliate Link"?: string
  "Category"?: string
  "Optimization Content"?: string
  "Slug"?: string
  "Status"?: string
}

async function getToolData(): Promise<AirtableFields | null> {
  const token = process.env.AIRTABLE_TOKEN
  const baseId = process.env.AIRTABLE_BASE_ID

  if (!token || !baseId) return null

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${baseId}/Buzz%20Feed?filterByFormula=AND({Status}='Live', {Slug}!='')`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 60 },
      } as any
    )

    if (!res.ok) {
      console.error('Airtable Response Not OK:', res.statusText)
      return null
    }

    const data = await res.json()

    if (!data.records || data.records.length === 0) return null

    return data.records[0].fields
  } catch (e) {
    console.error('Fetch error:', e)
    return null
  }
}

export default async function Page() {
  const tool = await getToolData()

  console.log("CTO DEBUG - Tool Data:", tool);

  if (!tool) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-[color:var(--foreground)] font-sans">
        <div className="animate-pulse text-xl font-bold tracking-widest">
          Syncing with Airtable Engine...
        </div>
        <p className="text-[color:var(--muted)] mt-4 text-xs">
          Verify: Status="Live" and Slug is not empty
        </p>
      </div>
    )
  }

  return (
    <main className="relative min-h-screen p-8 max-w-7xl mx-auto text-[color:var(--foreground)]">
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
        <div className="md:col-span-3 glass-card p-10">
          <h1 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter italic">
            {String(tool['Tool Name'] || 'AI Review')}
          </h1>
          <article
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{
              __html: String(tool['Article Content'] || 'Content is being generated...'),
            }}
          />
        </div>

        <div className="md:col-span-1 space-y-6">
          <div className="glass-card p-6 bg-[color:var(--primary)] border-none">
            <p className="text-xs uppercase font-bold tracking-widest opacity-80 mb-1">Access Tier</p>
            <p className="font-black text-3xl mb-6">{String(tool['Price Point'] || 'Free Trial')}</p>
            <a
              href={String(tool['Affiliate Link'] || '#')}
              className="block text-center bg-white text-blue-700 py-4 rounded-2xl font-black hover:scale-[1.05] transition-transform"
            >
              Get Started →
            </a>
          </div>

          <div className="glass-card p-6">
            <p className="text-xs uppercase font-bold tracking-widest text-[color:var(--muted)] mb-1">
              Industry
            </p>
            <p className="font-bold text-xl">{String(tool['Category'] || 'General AI')}</p>
          </div>

          <div className="glass-card p-6">
            <p className="text-xs uppercase font-bold tracking-widest text-[color:var(--muted)] mb-1">
              Primary ROI
            </p>
            <p className="font-bold text-xl text-[color:var(--primary)]">
              {String(tool['Optimization Content'] || 'Efficiency')}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}