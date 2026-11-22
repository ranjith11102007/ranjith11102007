'use client'

import { useRef } from 'react'

export function TiltCard({
  children,
  className = '',
  intensity = 7,
}: {
  children: React.ReactNode
  className?: string
  intensity?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = ref.current
    if (!element || !window.matchMedia('(pointer: fine)').matches) return
    const rect = element.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height

    element.classList.add('is-tilting')
    element.style.setProperty('--ry', `${(px - 0.5) * intensity * 2}deg`)
    element.style.setProperty('--rx', `${(0.5 - py) * intensity * 2}deg`)
    element.style.setProperty('--mx', `${px * 100}%`)
    element.style.setProperty('--my', `${py * 100}%`)
    element.style.setProperty('--ty', '-4px')
  }

  const onLeave = () => {
    const element = ref.current
    if (!element) return
    element.classList.remove('is-tilting')
    element.style.setProperty('--rx', '0deg')
    element.style.setProperty('--ry', '0deg')
    element.style.setProperty('--ty', '0px')
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`tilt-card ${className}`}
    >
      {children}
    </div>
  )
}
