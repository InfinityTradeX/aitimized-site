import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'aitimized - AI Workflows & Automation Hub',
};

interface AirtableFields {
  id: string;
  fields: {
    "Tool Name"?: string;
    "Article Content"?: string;
    "Price Point"?: string;
    "Affiliate Link"?: string;
    "Category"?: string;
    "Optimization Content"?: string;
    "Slug"?: string;
    "Status"?: string;
  };
}

async function getTools(): Promise<AirtableFields[]> {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!token || !baseId) return [];

  try {
    // We use Buzz%20Feed to match your tab name exactly
    const res = await fetch(
      `https://api.airtable.com/v0/${baseId}/Buzz%20Feed?filterByFormula=AND({Status}='Live', {Slug}!='')`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 60 },
      } as any
    );

    if (!res.ok) return [];
    const data = await res.json();
    return data.records || [];
  } catch (e) {
    console.error("Airtable Fetch Error:", e);
    return [];
  }
}

export default async function Page() {
  const tools = await getTools();

  // If no tools found, show the loading/syncing state
  if (tools.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-[color:var(--foreground)] font-sans">
        <div className="animate-pulse text-xl font-bold tracking-widest">
          Syncing with Airtable Engine...
        </div>
        <p className="text-[color:var(--muted)] mt-4 text-sm">Check Airtable for "Live" status & Slugs</p>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen p-8 max-w-7xl mx-auto text-[color:var(--foreground)]">
      <div className="relative z-10">
        <header className="mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-black tracking-tighter text-[color:var(--foreground)]">
            AITIMIZED
          </h1>
          <p className="text-[color:var(--muted)]">Precision AI Workflows</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div key={tool.id} className="glass-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] bg-[color:var(--primary)]/90 px-2 py-1 rounded-full font-bold uppercase tracking-widest">
                    {tool.fields.Category || "AI Tool"}
                  </span>
                </div>
                
                <h2 className="text-2xl font-black mb-3">{tool.fields["Tool Name"]}</h2>
                
                {/* We use a truncated version for the grid view */}
                <div 
                  className="text-[color:var(--muted)] text-sm line-clamp-4 mb-6"
                  dangerouslySetInnerHTML={{ __html: tool.fields["Article Content"] || "" }} 
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center border-t border-white/10 pt-4">
                  <span className="text-xs text-[color:var(--muted)] uppercase font-bold">Price</span>
                  <span className="font-bold text-[color:var(--primary)]">{tool.fields["Price Point"]}</span>
                </div>
                
                <a 
                  href={tool.fields["Affiliate Link"] || "#"}
                  target="_blank"
                  className="block w-full text-center bg-[color:var(--primary)] text-white py-3 rounded-xl font-bold hover:shadow-[0_0_30px_rgba(59,130,246,0.35)] transition-shadow"
                >
                  Visit Tool →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}