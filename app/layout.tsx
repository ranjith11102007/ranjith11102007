import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'

import { Preloader } from '@/components/ui/Preloader'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { SmoothScroll } from '@/components/providers/SmoothScroll'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { Navbar } from '@/components/ui/Navbar'
import { CommandPalette } from '@/components/ui/CommandPalette'
import { Footer } from '@/components/sections/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space', display: 'swap' })
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Ranjith T — Building useful things, not tutorial demos',
    template: '%s | Ranjith T',
  },
  description:
    'Portfolio of Ranjith T, Computer Science Engineering student building practical web, AI and offline-first products. Projects: Care-AI, FormLink, LEARNOFFLINE and Mini-Runner.',
  keywords: [
    'Ranjith T',
    'portfolio',
    'computer science student',
    'web developer',
    'React',
    'TypeScript',
    'Python',
    'AI',
    'PWA',
  ],
  authors: [{ name: 'Ranjith T' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Ranjith T — Portfolio',
    title: 'Ranjith T — Building useful things, not tutorial demos',
    description:
      'CS engineering student. Web development, applied AI and offline-first tools. Explore the work.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ranjith T — Portfolio',
    description: 'Building useful things, not tutorial demos.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased">
        <SmoothScroll />
        <Preloader />
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <CommandPalette />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
