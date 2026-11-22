'use client'

import { ArrowUpRight, ExternalLink, Github } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { TiltCard } from '@/components/ui/TiltCard'
import { projects, type Project } from '@/lib/data'

function ProjectCard({ project, wide }: { project: Project; wide: boolean }) {
  return (
    <div className={wide ? 'lg:col-span-7' : 'lg:col-span-5'}>
      <Reveal>
        <TiltCard className="h-full">
          <article
            data-cursor="view"
            className="panel group relative flex h-full min-h-[320px] flex-col overflow-hidden p-6 transition-colors hover:border-white/25 sm:p-8"
            style={{ borderTopColor: project.accent }}
          >
            <div
              className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
              style={{ background: project.accent }}
            />
            <span className="pointer-events-none absolute -bottom-6 right-2 font-display text-[7rem] leading-none font-bold text-white/[0.025]">
              {project.index}
            </span>

            <div className="relative flex items-center justify-between">
              <span className="font-mono text-[0.65rem] tracking-[0.22em] text-muted">
                [{project.index}]
              </span>
              <span
                className="border px-2 py-1 font-mono text-[0.6rem] tracking-[0.12em] uppercase"
                style={{
                  color: project.accent,
                  borderColor: `${project.accent}40`,
                  background: `${project.accent}0d`,
                }}
              >
                {project.category}
              </span>
            </div>

            <h3 className="relative mt-8 font-display text-3xl font-semibold tracking-tight text-ink transition-colors group-hover:text-white sm:text-4xl">
              {project.title}
            </h3>
            <p className="relative mt-3 max-w-md text-sm leading-relaxed text-muted">
              {project.description}
            </p>

            <div className="relative mt-auto flex flex-wrap gap-2 pt-8">
              {project.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>

            <div className="relative mt-7 flex items-center gap-5 border-t border-white/8 pt-5">
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                data-cursor="open"
                aria-label={`${project.title} repository on GitHub`}
                className="flex items-center gap-2 font-mono text-[0.68rem] tracking-wider text-ink/70 uppercase transition-colors hover:text-neon"
              >
                <Github size={14} /> Source
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="open"
                  aria-label={`Live demo of ${project.title}`}
                  className="flex items-center gap-2 font-mono text-[0.68rem] tracking-wider text-ink/70 uppercase transition-colors hover:text-neon"
                >
                  <ExternalLink size={14} /> Live demo
                </a>
              )}
              <ArrowUpRight
                size={18}
                className="ml-auto text-muted/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon"
              />
            </div>

            <span className="tilt-glare" />
          </article>
        </TiltCard>
      </Reveal>
    </div>
  )
}

export function Projects() {
  const spans = [true, false, false, true]

  return (
    <section id="projects" className="section relative border-t border-white/5">
      <div className="container-page">
        <Reveal>
          <div className="section-top">02 / Selected work</div>
        </Reveal>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <h2 className="section-title">
              Things I&apos;ve <span className="text-gradient">shipped.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm font-mono text-xs leading-relaxed text-muted">
              Four projects, four different problems. Each one started as a &quot;wouldn&apos;t it
              be useful if...&quot; moment.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} wide={spans[index]} />
          ))}
        </div>

        <Reveal>
          <a
            href="https://github.com/ranjith11102007?tab=repositories"
            target="_blank"
            rel="noreferrer"
            data-cursor="open"
            className="mt-10 inline-flex items-center gap-2 border-b border-neon/40 pb-1 font-mono text-xs tracking-wider text-neon uppercase transition-colors hover:border-neon"
          >
            View all repositories <ArrowUpRight size={14} />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
