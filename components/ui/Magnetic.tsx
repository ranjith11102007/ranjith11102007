'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function Magnetic({
  children,
  strength = 0.22,
  className = '',
}: {
  children: React.ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || !window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const moveX = gsap.quickTo(element, 'x', { duration: 0.4, ease: 'power3.out' })
    const moveY = gsap.quickTo(element, 'y', { duration: 0.4, ease: 'power3.out' })

    const onMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      moveX((event.clientX - (rect.left + rect.width / 2)) * strength)
      moveY((event.clientY - (rect.top + rect.height / 2)) * strength)
    }
    const onLeave = () => {
      moveX(0)
      moveY(0)
    }

    element.addEventListener('mousemove', onMove)
    element.addEventListener('mouseleave', onLeave)
    return () => {
      element.removeEventListener('mousemove', onMove)
      element.removeEventListener('mouseleave', onLeave)
      gsap.killTweensOf(element)
    }
  }, [strength])

  return (
    <div ref={ref} className={`magnetic ${className}`}>
      {children}
    </div>
  )
}
