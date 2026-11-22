'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, CornerDownLeft, Github, Linkedin, Mail, Search, Terminal } from 'lucide-react'
import { navItems, profile } from '@/lib/data'
import { OPEN_PALETTE_EVENT } from './Navbar'

type Command = {
  id: string
  label: string
  hint: string
  group: string
  icon: 'section' | 'github' | 'linkedin' | 'leetcode' | 'mail'
  target: string
}

const commands: Command[] = [
  ...navItems.map((item) => ({
    id: item.id,
    label: `Go to ${item.label}`,
    hint: item.index,
    group: 'Navigate',
    icon: 'section' as const,
    target: `#${item.id}`,
  })),
  {
    id: 'github',
    label: 'Open GitHub profile',
    hint: '@ranjith11102007',
    group: 'Elsewhere',
    icon: 'github',
    target: profile.github,
  },
  {
    id: 'linkedin',
    label: 'Open LinkedIn',
    hint: 'Connect',
    group: 'Elsewhere',
    icon: 'linkedin',
    target: profile.linkedin,
  },
  {
    id: 'leetcode',
    label: 'Open LeetCode',
    hint: '@RanjithT2007',
    group: 'Elsewhere',
    icon: 'leetcode',
    target: profile.leetcode,
  },
  {
    id: 'mail',
    label: 'Send an email',
    hint: profile.email,
    group: 'Elsewhere',
    icon: 'mail',
    target: `mailto:${profile.email}`,
  },
]

function Icon({ type }: { type: Command['icon'] }) {
  if (type === 'github') return <Github size={15} />
  if (type === 'linkedin') return <Linkedin size={15} />
  if (type === 'mail') return <Mail size={15} />
  if (type === 'leetcode') return <Terminal size={15} />
  return <ArrowUpRight size={15} />
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((command) =>
      `${command.label} ${command.hint} ${command.group}`.toLowerCase().includes(q),
    )
  }, [query])

  useEffect(() => setSelected(0), [query])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((value) => !value)
      }
      if (event.key === 'Escape') setOpen(false)
    }
    const onOpen = () => setOpen(true)

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setSelected(0)
      window.requestAnimationFrame(() => inputRef.current?.focus())
      document.documentElement.classList.add('lenis-stopped')
    } else {
      document.documentElement.classList.remove('lenis-stopped')
    }
    return () => document.documentElement.classList.remove('lenis-stopped')
  }, [open])

  const run = (command: Command) => {
    setOpen(false)
    if (command.target.startsWith('#')) {
      document.getElementById(command.target.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.open(command.target, '_blank', 'noopener,noreferrer')
    }
  }

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setSelected((index) => (index + 1) % Math.max(results.length, 1))
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setSelected((index) => (index - 1 + results.length) % Math.max(results.length, 1))
    }
    if (event.key === 'Enter' && results[selected]) {
      event.preventDefault()
      run(results[selected])
    }
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="fixed inset-0 z-[9995] flex items-start justify-center bg-void/75 px-4 pt-[14vh] backdrop-blur-md"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false)
      }}
    >
      <div className="panel corner-brackets w-full max-w-xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.7)]">
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
          <Search size={16} className="shrink-0 text-neon" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Type a command or search..."
            className="w-full bg-transparent font-mono text-sm text-ink outline-none placeholder:text-muted/60"
          />
          <kbd className="border border-white/10 px-1.5 py-0.5 font-mono text-[0.6rem] text-muted">
            ESC
          </kbd>
        </div>

        <div className="max-h-[52vh] overflow-y-auto p-2" data-lenis-prevent>
          {results.length === 0 && (
            <p className="px-3 py-8 text-center font-mono text-xs text-muted">
              No matching commands.
            </p>
          )}
          {results.map((command, index) => (
            <button
              key={command.id}
              type="button"
              data-selected={index === selected}
              onMouseEnter={() => setSelected(index)}
              onClick={() => run(command)}
              className="palette-item group flex w-full items-center gap-3 border border-transparent px-3 py-2.5 text-left transition-colors"
            >
              <span className="grid size-7 place-items-center border border-white/10 text-muted group-hover:border-neon/40 group-hover:text-neon">
                <Icon type={command.icon} />
              </span>
              <span className="flex-1 font-mono text-xs text-ink/90">{command.label}</span>
              <span className="font-mono text-[0.62rem] text-muted/70">{command.hint}</span>
              {index === selected && <CornerDownLeft size={12} className="text-neon" />}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 border-t border-white/8 px-4 py-2.5 font-mono text-[0.6rem] tracking-wider text-muted/70 uppercase">
          <span>↑↓ Navigate</span>
          <span>↵ Select</span>
          <span className="ml-auto text-neon/60">RT/OS</span>
        </div>
      </div>
    </div>
  )
}
