import { ArrowUp, Github, Linkedin } from 'lucide-react'
import { navItems, profile } from '@/lib/data'

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-deep/40">
      <div className="container-page py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <a href="#home" data-cursor="link" className="font-display text-2xl font-semibold tracking-tight">
              Ranjith<span className="text-neon">.</span>
            </a>
            <p className="mt-2 max-w-xs font-mono text-[0.68rem] leading-relaxed text-muted">
              {profile.role} · {profile.company}
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.68rem] tracking-wider text-muted uppercase">
            {navItems.slice(1).map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                data-cursor="link"
                className="transition-colors hover:text-neon"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="open"
              aria-label="GitHub"
              className="grid size-9 place-items-center border border-white/10 text-muted transition-colors hover:border-neon/40 hover:text-neon"
            >
              <Github size={15} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              data-cursor="open"
              aria-label="LinkedIn"
              className="grid size-9 place-items-center border border-white/10 text-muted transition-colors hover:border-neon/40 hover:text-neon"
            >
              <Linkedin size={15} />
            </a>
            <a
              href="#home"
              data-cursor="link"
              aria-label="Back to top"
              className="grid size-9 place-items-center border border-white/10 text-muted transition-colors hover:border-neon/40 hover:text-neon"
            >
              <ArrowUp size={15} />
            </a>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-2 border-t border-white/6 pt-5 font-mono text-[0.62rem] text-muted/60 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {profile.name}. Built with Next.js &amp; Three.js.</span>
          <span>Designed &amp; coded by me · No templates, just pixels and patience.</span>
        </div>
      </div>
    </footer>
  )
}
