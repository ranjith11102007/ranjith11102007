'use client'

import { useEffect, useRef, useState } from 'react'

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const value = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${value / 100})`
      setPercent(Math.round(value))
    }

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[96]">
      <div className="h-[2px] w-full bg-white/5">
        <div
          ref={barRef}
          className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-violet via-neon to-lime shadow-[0_0_12px_#3ee7ff]"
        />
      </div>
      <div className="absolute right-4 top-3 font-mono text-[0.6rem] tracking-widest text-muted/60">
        {String(percent).padStart(2, '0')}%
      </div>
    </div>
  )
}
