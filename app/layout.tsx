import './globals.css'
import type { Metadata } from 'next'
import { Geist, Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

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
    <html lang="en" className={`${geist.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
