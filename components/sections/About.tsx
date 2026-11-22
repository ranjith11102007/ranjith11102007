'use client'

import { Compass, GraduationCap, Lightbulb, Terminal as TerminalIcon } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { learning, profile } from '@/lib/data'

const facts = [
  {
    icon: GraduationCap,
    label: 'Education',
    value: 'B.E. Computer Science Engineering, KSR College of Engineering — 2029',
  },
  {
    icon: Lightbulb,
    label: 'Focus',
    value: 'Practical, user-centered products across web and applied AI',
  },
  {
    icon: Compass,
    label: 'Mindset',
    value: 'Usable products over tutorial demos. Curious, collaborative, shipping.',
  },
]

export function About() {
  return (
    <section id="about" className="section relative border-t border-white/5">
      <div className="container-page">
        <Reveal>
          <div className="section-top">01 / About</div>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal>
            <div>
              <h2 className="section-title">
                Building to <span className="text-gradient">learn.</span>
                <br />
                Learning to build.
              </h2>
              <p className="mt-7 max-w-lg text-[0.98rem] leading-relaxed text-muted">
                {profile.intro} I care about the boring parts too — clean code, things that work
                offline, and interfaces that feel considered.
              </p>

              <div className="mt-9 space-y-4">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="group flex gap-4 border-l border-white/10 pl-4 transition-colors hover:border-neon/60"
                  >
                    <fact.icon size={17} className="mt-0.5 shrink-0 text-neon/70" />
                    <div>
                      <p className="font-mono text-[0.65rem] tracking-[0.2em] text-neon/70 uppercase">
                        {fact.label}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-ink/75">{fact.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="panel corner-brackets overflow-hidden">
              <div className="terminal-bar">
                <span className="terminal-dot bg-[#ff5f57]" />
                <span className="terminal-dot bg-[#febc2e]" />
                <span className="terminal-dot bg-[#28c840]" />
                <span className="ml-3 flex items-center gap-2 font-mono text-[0.65rem] tracking-wider text-muted">
                  <TerminalIcon size={12} /> ranjith@portfolio: ~/about
                </span>
                <span className="ml-auto font-mono text-[0.6rem] text-muted/50">bash</span>
              </div>

              <div className="space-y-5 p-6 sm:p-8">
                <div className="terminal-line">
                  <p>
                    <span className="prompt">$</span> whoami
                  </p>
                  <p className="text-ink/80">
                    <span className="prompt">→</span> Ranjith T — CSE student @ KSR College of
                    Engineering
                  </p>
                </div>
                <div className="terminal-line">
                  <p>
                    <span className="prompt">$</span> cat interests.txt
                  </p>
                  <p className="text-ink/80">
                    <span className="prompt">→</span> web development, applied AI, offline-first
                    systems, hackathons
                  </p>
                </div>
                <div className="terminal-line">
                  <p>
                    <span className="prompt">$</span> cat philosophy.md
                  </p>
                  <p className="text-lime/90">
                    <span className="prompt">→</span> &quot;Build usable products, not tutorial
                    demos.&quot;
                  </p>
                </div>
                <div className="terminal-line">
                  <p>
                    <span className="prompt">$</span> echo $CURRENTLY
                  </p>
                  <p className="text-ink/80">
                    <span className="prompt">→</span> Strengthening fundamentals, shipping real
                    things, showing up.
                  </p>
                </div>
                <p className="terminal-line caret text-neon">
                  <span className="prompt">$</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="marquee-mask mt-12 overflow-hidden border-y border-white/6 py-4">
            <div className="marquee-track">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0 items-center">
                  <span className="mx-6 font-mono text-[0.65rem] tracking-[0.2em] text-neon/70 uppercase">
                    Currently learning
                  </span>
                  {learning.map((item) => (
                    <span key={item} className="flex shrink-0 items-center gap-6">
                      <span className="font-mono text-xs text-muted">{item}</span>
                      <span className="text-violet/60">✳</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
