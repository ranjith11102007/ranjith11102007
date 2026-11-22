'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, Github, Radio, Trophy } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { profile } from '@/lib/data'

type GithubState = {
  followers: number | null
  repos: number | null
  status: 'loading' | 'live' | 'fallback'
}

const staticStats = [
  { value: '04', label: 'Featured projects', note: 'shipped and documented' },
  { value: '02', label: 'Live demos', note: 'deployed on Vercel' },
  { value: '05', label: 'Languages', note: 'Python to TypeScript' },
]

export function Activity() {
  const [github, setGithub] = useState<GithubState>({
    followers: null,
    repos: null,
    status: 'loading',
  })

  useEffect(() => {
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 6000)

    fetch(`https://api.github.com/users/${profile.githubUsername}`, {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((response) => {
        if (!response.ok) throw new Error('GitHub API unavailable')
        return response.json()
      })
      .then((data: { followers?: number; public_repos?: number }) => {
        setGithub({
          followers: data.followers ?? null,
          repos: data.public_repos ?? null,
          status: 'live',
        })
      })
      .catch(() => setGithub((current) => ({ ...current, status: 'fallback' })))
      .finally(() => window.clearTimeout(timeout))

    return () => {
      controller.abort()
      window.clearTimeout(timeout)
    }
  }, [])

  return (
    <section id="activity" className="section relative border-t border-white/5">
      <div className="container-page">
        <Reveal>
          <div className="section-top">04 / Activity</div>
        </Reveal>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <h2 className="section-title">
              A pulse, not a <span className="text-gradient">resume.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.15em] text-muted uppercase">
              <Radio size={13} className={github.status === 'live' ? 'text-lime' : 'text-muted'} />
              {github.status === 'live'
                ? 'Live from GitHub API'
                : github.status === 'loading'
                  ? 'Syncing...'
                  : 'Snapshot mode'}
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {staticStats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.06}>
              <div className="panel h-full p-6">
                <p className="stat-value text-gradient">{stat.value}</p>
                <p className="mt-4 font-mono text-xs tracking-wider text-ink/80 uppercase">
                  {stat.label}
                </p>
                <p className="mt-1 font-mono text-[0.65rem] text-muted/70">{stat.note}</p>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.24}>
            <div className="panel h-full p-6">
              <p className="stat-value text-neon">
                {github.followers === null ? '—' : github.followers}
              </p>
              <p className="mt-4 font-mono text-xs tracking-wider text-ink/80 uppercase">
                GitHub followers
              </p>
              <p className="mt-1 font-mono text-[0.65rem] text-muted/70">
                {github.repos === null ? 'Live profile data' : `${github.repos} public repos`}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <Reveal>
            <div className="panel h-full overflow-hidden p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-[0.65rem] tracking-[0.2em] text-neon/80 uppercase">
                    Contribution graph
                  </p>
                  <h3 className="mt-2 font-display text-xl text-ink">A year in commits</h3>
                </div>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="open"
                  className="flex items-center gap-2 font-mono text-[0.68rem] text-muted transition-colors hover:text-neon"
                >
                  <Github size={14} /> View profile <ArrowUpRight size={12} />
                </a>
              </div>
              <div className="mt-6 overflow-x-auto pb-2">
                {/* Third-party contribution SVG — falls back gracefully if unavailable */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://ghchart.rshah.org/3ee7ff/${profile.githubUsername}`}
                  alt={`GitHub contribution graph for ${profile.githubUsername}`}
                  className="min-w-[680px] w-full opacity-90 invert-[0.92] hue-rotate-180"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <a
              href={profile.leetcode}
              target="_blank"
              rel="noreferrer"
              data-cursor="open"
              className="panel group flex h-full flex-col justify-between p-6 transition-colors hover:border-[#ffa116]/50"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-10 place-items-center border border-[#ffa116]/40 bg-[#ffa116]/10 font-display text-lg font-bold text-[#ffa116]">
                  LC
                </span>
                <Trophy size={17} className="text-muted/50 transition-colors group-hover:text-[#ffa116]" />
              </div>
              <div className="mt-10">
                <p className="font-mono text-[0.65rem] tracking-[0.2em] text-[#ffa116]/80 uppercase">
                  Problem solving
                </p>
                <h3 className="mt-2 font-display text-xl text-ink">LeetCode</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Working through data structures and algorithms, one problem at a time.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 font-mono text-[0.68rem] text-neon uppercase">
                Open profile <ArrowUpRight size={13} />
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
