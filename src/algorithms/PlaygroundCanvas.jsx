import { useEffect, useRef } from 'react'
import p5 from 'p5'

// P5Canvas와 동일한 StrictMode/rAF 방어 로직을 유지하되,
// sketch에 세 번째 인자로 mutable params 객체를 넘긴다.
//   - 실시간 값(live)   : sketch가 draw()에서 params.x를 매 프레임 읽어 즉시 반영
//   - 구조적 값(restart): setup()에서만 읽히므로, 값이 바뀌면 restartNonce로 인스턴스를 재생성
// params 객체의 "정체성(identity)"은 마운트 동안 고정 — 키 값만 변형(mutate)한다.
// 그래야 sketch 클로저가 캡처한 참조가 항상 최신 값을 본다.
export default function PlaygroundCanvas({ sketch, size = 560, paramsRef, restartNonce = 0 }) {
  const containerRef = useRef()
  const p5InstanceRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let disposed = false

    // p5 인스턴스 생성을 한 프레임 늦춘다 (StrictMode 중복 캔버스 방지 — P5Canvas 주석 참고).
    const raf = requestAnimationFrame(() => {
      if (disposed) return
      p5InstanceRef.current = new p5(
        (p) => sketch(p, size, paramsRef.current),
        container,
      )
    })

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      p5InstanceRef.current?.remove()
      p5InstanceRef.current = null
      container.innerHTML = ''
    }
    // restartNonce가 바뀌면 인스턴스를 재생성해 setup()이 최신 구조 파라미터를 다시 읽게 한다.
  }, [sketch, size, paramsRef, restartNonce])

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
