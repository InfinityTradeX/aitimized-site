import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'aitimized - AI Workflows & Automation Hub',
  description: 'Discover AI workflows, prompts, and automation blueprints for business optimization',
  keywords: ['AI', 'automation', 'workflows', 'prompts', 'AI agents', 'business optimization'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
