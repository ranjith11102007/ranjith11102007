'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ParticleField({ count = 1100 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const data = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      const radius = 2.6 + Math.random() * 3.8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      data[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      data[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.72
      data[i * 3 + 2] = radius * Math.cos(phi)
    }
    return data
  }, [count])

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.028
    ref.current.rotation.z += delta * 0.008
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#a5e9ff"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function Core() {
  const group = useRef<THREE.Group>(null)
  const outer = useRef<THREE.Mesh>(null)
  const inner = useRef<THREE.Mesh>(null)
  const ringA = useRef<THREE.Mesh>(null)
  const ringB = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime
    const targetScale = hovered ? 1.12 : 1

    if (group.current) {
      group.current.rotation.y += delta * 0.13
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        state.pointer.y * 0.32,
        0.045,
      )
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        -state.pointer.x * 0.22,
        0.045,
      )
      group.current.position.y = Math.sin(time * 0.65) * 0.09
      const scale = THREE.MathUtils.lerp(group.current.scale.x, targetScale, 0.07)
      group.current.scale.setScalar(scale)
    }

    if (outer.current) outer.current.rotation.z -= delta * 0.09
    if (inner.current) {
      inner.current.rotation.x += delta * 0.16
      inner.current.rotation.y -= delta * 0.1
    }
    if (ringA.current) {
      ringA.current.rotation.z += delta * 0.24
      ringA.current.rotation.x = Math.PI / 2.4 + Math.sin(time * 0.4) * 0.14
    }
    if (ringB.current) {
      ringB.current.rotation.z -= delta * 0.16
      ringB.current.rotation.y = Math.PI / 3 + Math.cos(time * 0.32) * 0.18
    }
  })

  return (
    <group
      ref={group}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.42, 3]} />
        <meshBasicMaterial color="#3ee7ff" wireframe transparent opacity={0.38} />
      </mesh>
      <mesh ref={inner} scale={0.9}>
        <icosahedronGeometry args={[1.42, 1]} />
        <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.3} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.58, 32, 32]} />
        <meshBasicMaterial color="#3ee7ff" transparent opacity={0.07} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.13, 24, 24]} />
        <meshBasicMaterial color="#c8f7ff" />
      </mesh>
      <mesh ref={ringA}>
        <torusGeometry args={[2.05, 0.006, 6, 140]} />
        <meshBasicMaterial color="#3ee7ff" transparent opacity={0.5} />
      </mesh>
      <mesh ref={ringB}>
        <torusGeometry args={[2.42, 0.004, 6, 140]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.36} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.85, 0.003, 6, 140]} />
        <meshBasicMaterial color="#3ee7ff" transparent opacity={0.16} />
      </mesh>
    </group>
  )
}

function Scene() {
  return (
    <>
      <fog attach="fog" args={['#05070d', 6.5, 12]} />
      <ParticleField />
      <Core />
    </>
  )
}

export default function NeuralScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [onScreen, setOnScreen] = useState(true)
  const [pageVisible, setPageVisible] = useState(true)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)

    const element = containerRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0.02 },
    )
    observer.observe(element)

    const onVisibility = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden="true">
      {reduced ? (
        <div className="scene-fallback absolute inset-0 grid place-items-center">
          <div className="size-52 rounded-full border border-neon/30" />
          <div className="absolute size-36 rounded-full border border-violet/25" />
        </div>
      ) : (
        <Canvas
          frameloop={onScreen && pageVisible ? 'always' : 'never'}
          dpr={[1, 1.6]}
          camera={{ position: [0, 0, 5.6], fov: 45 }}
          gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        >
          <Scene />
        </Canvas>
      )}
    </div>
  )
}
