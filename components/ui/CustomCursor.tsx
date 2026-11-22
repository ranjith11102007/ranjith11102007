'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

const labels: Record<string, string> = {
  view: 'VIEW',
  open: 'OPEN',
  copy: 'COPY',
  drag: 'DRAG',
  link: '',
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return

    document.documentElement.classList.add('custom-cursor')

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 })

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.09, ease: 'power2.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.09, ease: 'power2.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.36, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.36, ease: 'power3.out' })

    let current = ''
    let visible = false

    const onMove = (event: MouseEvent) => {
      if (!visible) {
        visible = true
        gsap.to([dot, ring], { opacity: 1, duration: 0.25 })
      }
      dotX(event.clientX)
      dotY(event.clientY)
      ringX(event.clientX)
      ringY(event.clientY)
    }

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const state = target?.closest<HTMLElement>('[data-cursor]')?.dataset.cursor ?? ''
      if (state === current) return
      current = state

      const active = Boolean(state)
      label.textContent = labels[state] ?? ''
      ring.classList.toggle('is-active', active)
      gsap.to(ring, {
        scale: active ? (state === 'link' ? 1.35 : 1.75) : 1,
        duration: 0.32,
        ease: 'power3.out',
      })
      gsap.to(dot, { scale: active ? 0.4 : 1, duration: 0.25 })
    }

    const onDown = () => gsap.to(ring, { scale: current ? 1.45 : 0.8, duration: 0.15 })
    const onUp = () => gsap.to(ring, { scale: current ? 1.75 : 1, duration: 0.2 })
    const onLeave = () => {
      visible = false
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 })
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      document.documentElement.classList.remove('custom-cursor')
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      gsap.killTweensOf([dot, ring])
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring">
        <span ref={labelRef} className="cursor-label" />
      </div>
    </>
  )
}
