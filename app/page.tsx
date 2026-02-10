import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'aitimized - AI Workflows & Automation Hub',
import { notFound } from "next/navigation";

// FETCH FUNCTION: Connects to your "Buzz Machine" Engine
async function getToolData(slug: string) {
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Buzz%20Feed?filterByFormula={Slug}='${slug}'`,
    {
      headers: { Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}` },
      next: { revalidate: 60 },
    }
  );
  const data = await res.json();
  return data.records?.[0]?.fields;
}

export default async function ToolPage({ params }: { params: { slug: string } }) {
  const tool = await getToolData(params.slug);

  if (!tool) return notFound();

  return (
    <main className="min-h-screen p-4 md:p-12 max-w-7xl mx-auto">
      {/* THE BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* 1. MAIN CONTENT TILE (The Article) */}
        <div className="md:col-span-3 glass-card p-8 md:p-12">
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                AI Review
              </span>
              <span className="text-gray-500 text-xs">Updated 2026</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
              {tool["Tool Name"] || "AI Tool Review"}
            </h1>
          </header>

          <article className="prose-modern">
            {/* The actual OpenAI content from Airtable */}
            <div dangerouslySetInnerHTML={{ __html: tool["Article Content"] }} />
          </article>
        </div>

        {/* 2. SIDEBAR BENTO TILES */}
        <div className="md:col-span-1 space-y-6">
          
          {/* Quick Stats Tile */}
          <div className="glass-card p-6 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
            <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">The Verdict</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400">Benefit</p>
                <p className="font-bold">{tool["Optimization Benefit"] || "High ROI"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Price Point</p>
                <p className="font-bold text-green-500">{tool["Price Point"] || "Contact Sales"}</p>
              </div>
            </div>
          </div>

          {/* CTA Tile */}
          <div className="glass-card p-6 bg-blue-600 border-none group">
            <a href={tool["Affiliate Link"]} className="block text-center">
              <p className="text-white font-black text-xl mb-1">Try {tool["Tool Name"]}</p>
              <p className="text-blue-100 text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                Get the AI Edge →
              </p>
            </a>
          </div>

          {/* Category Tile */}
          <div className="glass-card p-6 text-center">
             <p className="text-xs text-gray-500 mb-1">Category</p>
             <p className="font-medium">{tool["Category"] || "Fintech"}</p>
          </div>

        </div>
      </div>
    </main>
  );
}