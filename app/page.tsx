import { Metadata } from 'next';
import { notFound } from "next/navigation";

// 1. Metadata must be at the very top level
export const metadata: Metadata = {
  title: 'aitimized - AI Workflows & Automation Hub',
};

// 2. Fetcher - Defensive against missing tokens
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

// 3. Main Page Component
export default async function Page() {
  const tool = await getToolData();

  if (!tool) {
    return <div className="p-20 text-center font-sans">Syncing with Airtable...</div>;
  }

  return (
    <main className="min-h-screen p-8 max-w-7xl mx-auto bg-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3 glass-card p-10">
          <h1 className="text-5xl font-black mb-8">{String(tool["Tool Name"] || "AI Review")}</h1>
          <article 
            className="prose prose-invert max-w-none" 
            dangerouslySetInnerHTML={{ __html: String(tool["Article Content"] || "") }} 
          />
        </div>
        <div className="md:col-span-1 glass-card p-6 bg-blue-600">
           <p className="font-bold">Price: {String(tool["Price Point"] || "N/A")}</p>
           <a href={String(tool["Affiliate Link"] || "#")} className="block mt-4 text-center bg-white text-blue-600 py-2 rounded-xl font-bold">
             Check it out →
           </a>
        </div>
      </div>
    </main>
  );
}