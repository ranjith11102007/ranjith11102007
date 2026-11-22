'use client'

import { Cpu, Layers3, ServerCog, Wrench } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { skillGroups } from '@/lib/data'

const icons = [Cpu, Layers3, ServerCog, Wrench]

function Radar() {
  const dots = [
    { top: '8%', left: '50%', label: 'JS' },
    { top: '28%', left: '82%', label: 'AI' },
    { top: '68%', left: '88%', label: 'PY' },
    { top: '90%', left: '50%', label: 'DB' },
    { top: '68%', left: '12%', label: 'UI' },
    { top: '28%', left: '18%', label: 'API' },
  ]

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[300px]">
      <div className="absolute inset-0 rounded-full border border-white/8" />
      <div className="absolute inset-[14%] rounded-full border border-white/8" />
      <div className="absolute inset-[30%] rounded-full border border-white/8" />
      <div className="absolute inset-x-1/2 inset-y-0 w-px -translate-x-1/2 bg-white/6" />
      <div className="absolute inset-x-0 inset-y-1/2 h-px -translate-y-1/2 bg-white/6" />
      <div
        className="absolute inset-0 rounded-full opacity-60"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0deg, rgba(62,231,255,0.28) 32deg, rgba(139,92,246,0.12) 62deg, transparent 96deg)',
          animation: 'radarSpin 9s linear infinite',
        }}
      />
      <div className="absolute inset-[42%] rounded-full border border-neon/40 bg-neon/10 shadow-[0_0_35px_rgba(62,231,255,0.35)]" />
      <div className="absolute inset-0 grid place-items-center font-mono text-[0.6rem] tracking-[0.3em] text-neon/80">
        STACK
      </div>
      {dots.map((dot) => (
        <span
          key={dot.label}
          className="absolute grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-neon/30 bg-void/80 font-mono text-[0.6rem] text-neon/80"
          style={{ top: dot.top, left: dot.left }}
        >
          {dot.label}
        </span>
      ))}
      <style jsx>{`
        @keyframes radarSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export function Skills() {
  return (
    <section id="stack" className="section relative border-t border-white/5">
      <div className="container-page">
        <Reveal>
          <div className="section-top">03 / Toolkit</div>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <h2 className="section-title">
                The tools
                <br />
                I reach for.
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
                A working stack, not a wishlist. These are the technologies I&apos;ve actually used
                to ship the projects above.
              </p>
              <div className="mt-6 w-full">
                <Radar />
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {skillGroups.map((group, index) => {
              const Icon = icons[index]
              return (
                <Reveal key={group.label} delay={index * 0.08}>
                  <div className="panel group h-full p-6 transition-colors hover:border-neon/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="grid size-8 place-items-center border border-neon/25 bg-neon/5 text-neon">
                          <Icon size={15} />
                        </span>
                        <h3 className="font-display text-lg font-medium text-ink">{group.label}</h3>
                      </div>
                      <span className="font-mono text-[0.6rem] text-muted/50">0{index + 1}</span>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span key={item} className="chip">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )
            })}

            <Reveal delay={0.32}>
              <div className="border border-dashed border-white/12 p-6">
                <p className="font-mono text-[0.65rem] tracking-[0.2em] text-violet/80 uppercase">
                  Always expanding
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Currently deepening my fundamentals in data structures, modern React patterns
                  and offline-first architecture. Next up: Three.js, testing and backend
                  fundamentals.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
