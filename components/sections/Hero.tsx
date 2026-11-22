'use client'

import dynamic from 'next/dynamic'
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import { Magnetic } from '@/components/ui/Magnetic'
import { profile } from '@/lib/data'

const NeuralScene = dynamic(() => import('@/components/three/NeuralScene'), {
  ssr: false,
  loading: () => <div className="scene-fallback absolute inset-0" />,
})

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-svh items-center overflow-hidden pt-28 pb-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="scene-aurora -left-32 top-10 size-[32rem] bg-violet/20" />
        <div className="scene-aurora right-0 top-1/3 size-[30rem] bg-neon/15" />
      </div>

      <div className="pointer-events-none absolute right-[-45%] top-[6%] h-[80%] w-[130%] opacity-35 lg:right-[-12%] lg:top-0 lg:h-full lg:w-[72%] lg:opacity-90">
        <NeuralScene />
      </div>

      <div className="container-page relative z-10">
        <div className="max-w-3xl">
          <div className="rise flex items-center gap-2.5" style={{ animationDelay: '0.1s' }}>
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-lime" />
            </span>
            <span className="font-mono text-[0.68rem] tracking-[0.18em] text-lime/90 uppercase">
              {profile.status}
            </span>
          </div>

          <p
            className="rise mt-8 font-mono text-xs tracking-[0.28em] text-neon uppercase"
            style={{ animationDelay: '0.2s' }}
          >
            // CSE STUDENT · BUILDER · PROBLEM SOLVER
          </p>

          <h1
            className="rise mt-4 font-display text-[clamp(3.4rem,9.2vw,7.6rem)] leading-[0.88] font-semibold tracking-[-0.065em]"
            style={{ animationDelay: '0.3s' }}
          >
            Hi, I&apos;m
            <br />
            <span className="text-gradient">Ranjith T.</span>
          </h1>

          <div
            className="rise mt-8 max-w-xl"
            style={{ animationDelay: '0.42s' }}
          >
            <p className="font-mono text-[0.72rem] tracking-wider text-violet/80">
              $ cat /about/me
            </p>
            <p className="mt-2 text-lg leading-relaxed text-ink/70 sm:text-xl">
              {profile.headline} Web development, applied AI and offline-first tools are my
              current playground.
            </p>
          </div>

          <div className="rise mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: '0.54s' }}>
            <Magnetic>
              <a href="#projects" data-cursor="link" className="btn btn-primary">
                Explore my work <ArrowDownRight size={16} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" data-cursor="link" className="btn btn-ghost">
                Get in touch <ArrowUpRight size={15} />
              </a>
            </Magnetic>
          </div>

          <div
            className="rise mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[0.68rem] tracking-wider text-muted uppercase"
            style={{ animationDelay: '0.66s' }}
          >
            <span className="text-neon/70">Find me on</span>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="open"
              aria-label="GitHub"
              className="flex items-center gap-1.5 transition-colors hover:text-neon"
            >
              <Github size={14} /> GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              data-cursor="open"
              aria-label="LinkedIn"
              className="flex items-center gap-1.5 transition-colors hover:text-neon"
            >
              <Linkedin size={14} /> LinkedIn
            </a>
            <a
              href={profile.leetcode}
              target="_blank"
              rel="noreferrer"
              data-cursor="open"
              aria-label="LeetCode"
              className="flex items-center gap-1.5 transition-colors hover:text-neon"
            >
              <span className="text-[0.8rem] font-bold text-[#ffa116]">LC</span> LeetCode
            </a>
            <a
              href={`mailto:${profile.email}`}
              data-cursor="copy"
              aria-label="Email"
              className="flex items-center gap-1.5 transition-colors hover:text-neon"
            >
              <Mail size={14} /> Email
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="font-mono text-[0.6rem] tracking-[0.3em] text-muted/70 uppercase">
          Scroll to explore
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-white/10">
          <span className="absolute inset-x-0 top-0 h-4 animate-[scrollLine_2.2s_ease-in-out_infinite] bg-neon" />
        </span>
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(280%); }
        }
      `}</style>
    </section>
  )
}
