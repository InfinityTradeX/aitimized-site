import { Metadata } from 'next';
import { notFound } from "next/navigation";

// 1. Metadata must be at the very top level
export const metadata: Metadata = {
  title: 'aitimized - AI Workflows & Automation Hub',
};

// Interface to stop TypeScript "Implicit Any" errors
interface AirtableFields {
  [key: string]: any;
}

async function getToolData(): Promise<AirtableFields | null> {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!token || !baseId) return null;

  try {
    // The "as any" cast clears the 'next' property error in your editor
    const res = await fetch(
      `https://api.airtable.com/v0/${baseId}/Buzz%20Feed?maxRecords=1`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 60 },
      } as any 
    );
    const data = await res.json();
    return data.records?.[0]?.fields || null;
  } catch (e) {
    console.error("Fetch error:", e);
    return null;
  }
}

export default async function Page() {
  const tool = await getToolData();

  if (!tool) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white font-sans">
        <div className="animate-pulse text-xl font-bold tracking-widest">
          Syncing with Airtable Engine...
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen p-8 max-w-7xl mx-auto bg-[#020617] text-white overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
        
        {/* MAIN CONTENT TILE - With Border Beam */}
        <div className="md:col-span-3 glass-card border-beam p-10">
          <h1 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter">
            {String(tool["Tool Name"] || "AI Review")}
          </h1>
          <article 
            className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-p:text-gray-300" 
            dangerouslySetInnerHTML={{ __html: String(tool["Article Content"] || "") }} 
          />
        </div>

        {/* SIDEBAR TILES */}
        <div className="md:col-span-1 space-y-6">
          <div className="glass-card p-6 bg-blue-600 border-none">
             <p className="text-xs uppercase font-bold tracking-widest opacity-80 mb-1">Access Tier</p>
             <p className="font-black text-3xl mb-6">{String(tool["Price Point"] || "N/A")}</p>
             <a 
               href={String(tool["Affiliate Link"] || "#")} 
               className="block text-center bg-white text-blue-700 py-4 rounded-2xl font-black hover:scale-[1.02] transition-all shadow-lg"
             >
               Get Started →
             </a>
          </div>
          
          <div className="glass-card p-6">
             <p className="text-xs uppercase font-bold tracking-widest text-gray-500 mb-1">Industry</p>
             <p className="font-bold text-xl">{String(tool["Category"] || "General AI")}</p>
          </div>

          <div className="glass-card p-6">
             <p className="text-xs uppercase font-bold tracking-widest text-gray-500 mb-1">Primary ROI</p>
             <p className="font-bold text-xl text-blue-400">{String(tool["Optimization Benefit"] || "Efficiency")}</p>
          </div>
        </div>
      </div>
    </main>
  );
}