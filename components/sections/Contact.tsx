'use client'

import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Github, Linkedin, Send } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { profile } from '@/lib/data'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" className="section relative border-t border-white/5">
      <div className="pointer-events-none absolute left-1/3 top-0 size-[28rem] rounded-full bg-violet/10 blur-[120px]" />
      <div className="container-page relative">
        <Reveal>
          <div className="section-top">05 / Contact</div>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <Reveal>
            <div>
              <h2 className="section-title">
                Let&apos;s build
                <br />
                <span className="text-gradient">something real.</span>
              </h2>
              <p className="mt-7 max-w-md text-[0.98rem] leading-relaxed text-muted">
                Have a project, a hackathon idea, or just want to talk about web tech and AI? My
                inbox is open. I usually reply within a day or two.
              </p>

              <button
                type="button"
                onClick={copyEmail}
                data-cursor={copied ? undefined : 'copy'}
                className="mt-9 flex w-full max-w-md items-center justify-between gap-4 border border-white/12 bg-white/[0.02] px-5 py-4 text-left transition-colors hover:border-neon/40"
              >
                <span>
                  <span className="block font-mono text-[0.6rem] tracking-[0.2em] text-muted uppercase">
                    Email me at
                  </span>
                  <span className="mt-1 block font-mono text-sm text-ink sm:text-base">
                    {profile.email}
                  </span>
                </span>
                <span className="grid size-9 shrink-0 place-items-center border border-neon/30 text-neon">
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                </span>
              </button>

              <div className="mt-8 flex flex-wrap gap-4 font-mono text-xs text-muted">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="open"
                  className="flex items-center gap-2 transition-colors hover:text-neon"
                >
                  <Github size={14} /> GitHub <ArrowUpRight size={11} />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="open"
                  className="flex items-center gap-2 transition-colors hover:text-neon"
                >
                  <Linkedin size={14} /> LinkedIn <ArrowUpRight size={11} />
                </a>
                <a
                  href={profile.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="open"
                  className="flex items-center gap-2 transition-colors hover:text-neon"
                >
                  <span className="text-[0.8rem] font-bold text-[#ffa116]">LC</span> LeetCode{' '}
                  <ArrowUpRight size={11} />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              action={`https://formsubmit.co/${profile.email}`}
              method="POST"
              className="panel corner-brackets p-6 sm:p-8"
            >
              <input type="hidden" name="_subject" value="New message from your portfolio" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />

              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl text-ink">Send a message</h3>
                <span className="font-mono text-[0.6rem] tracking-widest text-neon/70 uppercase">
                  /contact.php
                </span>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block font-mono text-[0.65rem] tracking-[0.16em] text-muted uppercase">
                    Your name
                  </span>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="Ada Lovelace"
                    className="field"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block font-mono text-[0.65rem] tracking-[0.16em] text-muted uppercase">
                    Email address
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="field"
                  />
                </label>
              </div>

              <label className="mt-5 block">
                <span className="mb-2 block font-mono text-[0.65rem] tracking-[0.16em] text-muted uppercase">
                  Message
                </span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me what you're building..."
                  className="field resize-none"
                />
              </label>

              <button
                type="submit"
                data-cursor="link"
                className="btn btn-primary mt-6 w-full"
              >
                Send message <Send size={14} />
              </button>

              <p className="mt-4 font-mono text-[0.62rem] leading-relaxed text-muted/60">
                Note: the first submission triggers a one-time confirmation email from
                FormSubmit. For anything urgent, use the copy button above.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
