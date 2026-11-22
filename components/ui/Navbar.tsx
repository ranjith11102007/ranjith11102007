'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { navItems, profile } from '@/lib/data'

export const OPEN_PALETTE_EVENT = 'rt:open-command-palette'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[90] transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/8 bg-void/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="container-page flex h-[72px] items-center justify-between gap-6">
        <a
          href="#home"
          data-cursor="link"
          className="group flex items-center gap-3"
          aria-label="Back to top"
        >
          <span className="relative grid size-9 place-items-center border border-neon/40 bg-neon/5 font-display text-sm font-bold text-neon">
            RT
            <span className="absolute -bottom-px -right-px size-1.5 bg-neon" />
          </span>
          <span className="hidden font-mono text-xs tracking-[0.18em] text-ink/80 sm:block">
            RANJITH<span className="text-neon">.T</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-cursor="link"
              className="group relative px-3 py-2 font-mono text-[0.7rem] tracking-[0.12em] text-muted uppercase transition-colors hover:text-neon"
            >
              <span className="mr-1 text-[0.55rem] text-neon/40">{item.index}</span>
              {item.label}
              <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-neon transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
            data-cursor="link"
            aria-label="Open command palette"
            className="hidden items-center gap-2 border border-white/10 px-3 py-2 font-mono text-[0.68rem] text-muted transition-colors hover:border-neon/40 hover:text-neon sm:flex"
          >
            <span className="text-neon/70">⌘</span>
            <span>K</span>
          </button>
          <a
            href="#contact"
            data-cursor="link"
            className="hidden items-center gap-1.5 border border-neon/40 bg-neon/8 px-3.5 py-2 font-mono text-[0.68rem] tracking-wider text-neon uppercase transition-colors hover:bg-neon hover:text-void md:inline-flex"
          >
            Let&apos;s talk <ArrowUpRight size={13} />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            data-cursor="link"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="grid size-9 place-items-center border border-white/10 text-ink lg:hidden"
          >
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-white/8 bg-void/95 backdrop-blur-xl lg:hidden">
          <div className="container-page grid gap-1 py-5">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                data-cursor="link"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between border-b border-white/5 py-3 font-display text-xl text-ink/85"
              >
                <span>{item.label}</span>
                <span className="font-mono text-[0.65rem] text-neon/60">{item.index}</span>
              </a>
            ))}
            <a
              href={`mailto:${profile.email}`}
              data-cursor="copy"
              className="mt-3 font-mono text-xs text-muted"
            >
              {profile.email}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
