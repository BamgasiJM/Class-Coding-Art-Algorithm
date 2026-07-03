import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

const COUNT = 5000

// 모듈 최상단에서 한 번만 초기화
// useMemo 내부의 Math.random() 호출은 ESLint react-hooks 규칙 위반으로 경고가 발생하므로
// 컴포넌트 외부에서 선언합니다.
const positions  = new Float32Array(COUNT * 3)
const velocities = new Float32Array(COUNT * 2)

for (let i = 0; i < COUNT; i++) {
  positions[i * 3 + 0] = (Math.random() - 0.5) * 22
  positions[i * 3 + 1] = (Math.random() - 0.5) * 14
  positions[i * 3 + 2] = (Math.random() - 0.5) * 6
  velocities[i * 2 + 0] = (Math.random() - 0.5) * 0.01
  velocities[i * 2 + 1] = (Math.random() - 0.5) * 0.01
}

export default function ParticleBackground() {
  const meshRef = useRef()
  const materialRef = useRef()

  useEffect(() => {
    if (!materialRef.current) return

    const timeout = setTimeout(() => {
      const accentColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent')
        .trim()

      if (accentColor) {
        materialRef.current.color.set(accentColor)
      }
    }, 0)

    return () => clearTimeout(timeout)
  }, [])

  useFrame(({ clock }) => {
    const t   = clock.getElapsedTime() * 0.25
    const pos = meshRef.current.geometry.attributes.position.array

    for (let i = 0; i < COUNT; i++) {
      const i3    = i * 3
      const x     = pos[i3]
      const y     = pos[i3 + 1]
      const angle = Math.sin(x * 0.25 + t) * Math.cos(y * 0.25 + t) * Math.PI * 2

      pos[i3 + 0] += Math.cos(angle) * 0.006 + velocities[i * 2]
      pos[i3 + 1] += Math.sin(angle) * 0.006 + velocities[i * 2 + 1]

      if (pos[i3]     >  11) pos[i3]     = -11
      if (pos[i3]     < -11) pos[i3]     =  11
      if (pos[i3 + 1] >   7) pos[i3 + 1] =  -7
      if (pos[i3 + 1] <  -7) pos[i3 + 1] =   7
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.028}
        color="#ff4d1c"
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  )
}
