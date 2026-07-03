import { useEffect, useRef } from 'react'
import p5 from 'p5'

export default function P5Canvas({ sketch, size = 560 }) {
  const containerRef = useRef()
  const p5InstanceRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // StrictMode에서 effect가 두 번 실행될 때, 먼저 만든 인스턴스의
    // setup/draw가 비동기로 늦게 실행되어 캔버스가 중복 생성되는 것을 방지
    let disposed = false
    const guardedSketch = (p) => {
      sketch(p, size)
      const originalSetup = p.setup
      const originalDraw = p.draw
      p.setup = (...args) => {
        if (disposed) return
        originalSetup?.(...args)
      }
      p.draw = (...args) => {
        if (disposed) return
        originalDraw?.(...args)
      }
    }

    const p5Instance = new p5(guardedSketch, container)
    p5InstanceRef.current = p5Instance

    return () => {
      disposed = true
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove()
        p5InstanceRef.current = null
      }
    }
  }, [sketch, size])

  return (
    <div
      ref={containerRef}
      style={{
        width: size,
        height: size,
        margin: '0 auto',
        border: '1px solid var(--border)',
        background: 'var(--card-bg)',
        overflow: 'hidden',
      }}
    />
  )
}
