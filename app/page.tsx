import { Metadata } from 'next';
import { notFound } from "next/navigation";

// 1. METADATA (Always at the top)
export const metadata: Metadata = {
  title: 'aitimized - AI Workflows & Automation Hub',
  description: 'The central hub for AI content and automation reviews.',
};

// 2. FETCH FUNCTION: Connects to your "Buzz Machine" Engine
async function getToolData(slug: string) {
  // We use a fallback slug if none is provided for the homepage
  const targetSlug = slug || 'jasper-ai'; 
  
  const res = await fetch(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Buzz%20Feed?filterByFormula={Slug}='${targetSlug}'`,
    {
      headers: { Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}` },
      next: { revalidate: 60 },
    }
  );
  const data = await res.json();
  return data.records?.[0]?.fields;
}

// 3. PAGE COMPONENT
export default async function Page({ params }: { params: { slug?: string } }) {
  const tool = await getToolData(params?.slug || "");

  if (!tool) return notFound();

  return (
    <main className="min-h-screen p-4 md:p-12 max-w-7xl mx-auto">
      {/* THE BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* MAIN CONTENT TILE */}
        <div className="md:col-span-3 glass-card p-8 md:p-12">
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Featured Review
              </span>
              <span className="text-gray-500 text-xs">2026 Edition</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
              {tool["Tool Name"] as string || "AI Tool Review"}
            </h1>
          </header>

          <article className="prose-modern">
            <div dangerouslySetInnerHTML={{ __html: tool["Article Content"] as string }} />
          </article>
        </div>

        {/* SIDEBAR BENTO TILES */}
        <div className="md:col-span-1 space-y-6">
          <div className="glass-card p-6 bg-gradient-to-br from-blue-500/5 to-purple-500/5">
            <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">Quick Look</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400">Benefit</p>
                <p className="font-bold">{tool["Optimization Benefit"] as string || "Efficiency"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Price</p>
                <p className="font-bold text-green-500">{tool["Price Point"] as string || "Check Site"}</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 bg-blue-600 border-none group">
            <a href={tool["Affiliate Link"] as string} className="block text-center">
              <p className="text-white font-black text-xl mb-1">Try {tool["Tool Name"] as string}</p>
              <p className="text-blue-100 text-sm opacity-80 group-hover:opacity-100">Get the AI Edge →</p>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}