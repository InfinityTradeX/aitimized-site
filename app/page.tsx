import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'aitimized - AI Workflows & Automation Hub',
};

async function getToolData() {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!token || !baseId) return null;

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${baseId}/Buzz%20Feed?maxRecords=1`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 60 },
      }
    );
    const data = await res.json();
    return data.records?.[0]?.fields || null;
  } catch (e) {
    return null;
  }
}

export default async function Page() {
  const tool = await getToolData();

  if (!tool) {
    return <div className="p-20 text-center font-sans">Syncing with Airtable...</div>;
  }

  return (
    <main className="min-h-screen p-8 max-w-7xl mx-auto bg-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* MAIN CONTENT TILE */}
        <div className="md:col-span-3 glass-card p-10 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-md">
          <h1 className="text-5xl font-black mb-8">{String(tool["Tool Name"] || "AI Review")}</h1>
          <article 
            className="prose prose-invert max-w-none" 
            dangerouslySetInnerHTML={{ __html: String(tool["Article Content"] || "") }} 
          />
        </div>

        {/* SIDEBAR TILE */}
        <div className="md:col-span-1 space-y-6">
          <div className="glass-card p-6 bg-blue-600 rounded-3xl">
             <p className="text-sm uppercase opacity-70 mb-1">Pricing</p>
             <p className="font-bold text-2xl">{String(tool["Price Point"] || "N/A")}</p>
             <a href={String(tool["Affiliate Link"] || "#")} className="block mt-6 text-center bg-white text-blue-600 py-3 rounded-xl font-bold hover:scale-105 transition-transform">
               Get Started →
             </a>
          </div>
          
          <div className="glass-card p-6 border border-white/10 rounded-3xl bg-white/5">
             <p className="text-sm opacity-50">Category</p>
             <p className="font-medium">{String(tool["Category"] || "Automation")}</p>
          </div>
        </div>
      </div>
    </main>
  );
}