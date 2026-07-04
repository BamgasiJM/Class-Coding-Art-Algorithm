import { useEffect, useRef } from 'react'
import p5 from 'p5'

export default function P5Canvas({ sketch, size = 560 }) {
  const containerRef = useRef()
  const p5InstanceRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let disposed = false

    // p5 인스턴스 생성을 한 프레임 늦춘다.
    // StrictMode가 effect를 mount → cleanup → mount로 두 번 실행할 때,
    // 첫 번째("버려질") 인스턴스는 이 rAF가 실행되기 전에 취소되므로
    // 애초에 캔버스를 만들지 않는다 (중복 캔버스 생성 자체를 차단).
    const raf = requestAnimationFrame(() => {
      if (disposed) return
      p5InstanceRef.current = new p5((p) => sketch(p, size), container)
    })

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      p5InstanceRef.current?.remove()
      p5InstanceRef.current = null
      container.innerHTML = ''
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
