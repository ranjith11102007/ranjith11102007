'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

type Phase = 'hidden' | 'counting' | 'leaving' | 'gone'

export function Preloader() {
  const [phase, setPhase] = useState<Phase>('hidden')
  const [count, setCount] = useState(0)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const seen = window.sessionStorage.getItem('rt-intro-seen')

    if (reduced || seen) {
      setPhase('gone')
      return
    }

    setPhase('counting')
    document.documentElement.classList.add('lenis-stopped')

    const counter = { value: 0 }
    const tween = gsap.to(counter, {
      value: 100,
      duration: 1.35,
      ease: 'power2.inOut',
      onUpdate: () => {
        setCount(Math.round(counter.value))
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${counter.value / 100})`
        }
      },
      onComplete: () => {
        window.sessionStorage.setItem('rt-intro-seen', '1')
        setPhase('leaving')
        window.setTimeout(() => {
          setPhase('gone')
          document.documentElement.classList.remove('lenis-stopped')
        }, 700)
      },
    })

    return () => {
      tween.kill()
      document.documentElement.classList.remove('lenis-stopped')
    }
  }, [])

  if (phase === 'gone') return null

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9990] flex flex-col items-center justify-center bg-void transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        phase === 'leaving' ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="mb-8 font-mono text-[0.65rem] tracking-[0.35em] text-neon/70 uppercase">
        Initializing portfolio
      </div>
      <div className="relative grid size-28 place-items-center">
        <div className="absolute inset-0 rotate-45 border border-neon/25" />
        <div className="absolute inset-3 -rotate-12 border border-violet/30" />
        <span className="font-display text-4xl font-semibold tracking-tighter text-ink">RT</span>
      </div>
      <div className="mt-10 w-56">
        <div className="h-px w-full bg-white/10">
          <div
            ref={progressRef}
            className="h-px w-full origin-left scale-x-0 bg-neon shadow-[0_0_14px_#3ee7ff]"
          />
        </div>
        <div className="mt-3 flex justify-between font-mono text-[0.65rem] tracking-widest text-muted">
          <span>LOADING</span>
          <span>{String(count).padStart(3, '0')}%</span>
        </div>
      </div>
    </div>
  )
}
