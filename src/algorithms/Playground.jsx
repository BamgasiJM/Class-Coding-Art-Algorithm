import { useMemo, useRef, useState } from 'react'
import PlaygroundCanvas from './PlaygroundCanvas'

// View / Play 토글 + 파라미터 슬라이더 패널.
// - View(기본): 슬라이더 없이 아트워크만 — 값이 모두 기본값이라 기존 화면과 동일.
// - Play: 캔버스 아래에 슬라이더가 나타나 실시간으로 조작.
// 캔버스(PlaygroundCanvas)는 두 모드에서 계속 살아있고, 토글은 패널 표시 여부만 바꾼다.
export default function Playground({ sketch, size = 560, params = [] }) {
  // 슬라이더가 바로 쓰는 mutable 객체 — 정체성 고정, 값만 변형.
  const paramsRef = useRef(
    Object.fromEntries(params.map((p) => [p.key, p.default])),
  )
  // 슬라이더 라벨 표시 및 리렌더용 상태 (값 표시만 담당, 실제 조작은 paramsRef).
  const [display, setDisplay] = useState(() => ({ ...paramsRef.current }))
  const [restartNonce, setRestartNonce] = useState(0)
  const [mode, setMode] = useState('view')

  const defaults = useMemo(
    () => Object.fromEntries(params.map((p) => [p.key, p.default])),
    [params],
  )

  const setParam = (key, value, restart) => {
    paramsRef.current[key] = value
    setDisplay((d) => ({ ...d, [key]: value }))
    if (restart) setRestartNonce((n) => n + 1)
  }

  const reset = () => {
    let needsRestart = false
    for (const p of params) {
      paramsRef.current[p.key] = p.default
      if (p.restart && display[p.key] !== p.default) needsRestart = true
    }
    setDisplay({ ...defaults })
    if (needsRestart) setRestartNonce((n) => n + 1)
  }

  return (
    <div>
      <PlaygroundCanvas
        sketch={sketch}
        size={size}
        paramsRef={paramsRef}
        restartNonce={restartNonce}
      />

      {/* View / Play 토글 */}
      <div
        style={{
          display: 'flex',
          gap: '1px',
          margin: '1.25rem auto 0',
          width: 'fit-content',
          border: '1px solid var(--border)',
          background: 'var(--border)',
        }}
      >
        {['view', 'play'].map((m) => {
          const active = mode === m
          return (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                background: active ? 'var(--accent)' : 'var(--bg)',
                color: active ? 'var(--bg)' : 'var(--muted)',
                border: 'none',
                padding: '0.55rem 1.6rem',
                cursor: 'pointer',
                fontFamily: "'IBM Plex Sans KR', sans-serif",
                fontSize: '0.72rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
            >
              {m} mode
            </button>
          )
        })}
      </div>

      {/* Play 모드 슬라이더 패널 */}
      {mode === 'play' && params.length > 0 && (
        <div
          style={{
            maxWidth: size,
            margin: '1.5rem auto 0',
            border: '1px solid var(--border)',
            background: 'var(--card-bg)',
            padding: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {params.map((p) => (
              <label key={p.key} style={{ display: 'block' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '0.5rem',
                    fontFamily: "'IBM Plex Sans KR', sans-serif",
                    fontSize: '0.72rem',
                    letterSpacing: '0.08em',
                    color: 'var(--fg)',
                  }}
                >
                  <span style={{ textTransform: 'uppercase' }}>{p.label}</span>
                  <span style={{ color: 'var(--accent)' }}>
                    {formatValue(display[p.key], p)}
                    {p.unit ? ` ${p.unit}` : ''}
                  </span>
                </div>
                <input
                  type="range"
                  min={p.min}
                  max={p.max}
                  step={p.step ?? 1}
                  value={display[p.key]}
                  onChange={(e) =>
                    setParam(p.key, Number(e.target.value), p.restart)
                  }
                  style={{ width: '100%', accentColor: 'var(--accent)', cursor: 'pointer' }}
                />
                {p.restart && (
                  <span
                    style={{
                      fontFamily: "'IBM Plex Sans KR', sans-serif",
                      fontSize: '0.6rem',
                      letterSpacing: '0.05em',
                      color: 'var(--muted)',
                    }}
                  >
                    구조 파라미터 · 변경 시 재시작
                  </span>
                )}
              </label>
            ))}
          </div>

          <button
            onClick={reset}
            style={{
              marginTop: '1.5rem',
              background: 'none',
              border: '1px solid var(--muted)',
              color: 'var(--muted)',
              padding: '0.5rem 1.2rem',
              cursor: 'pointer',
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.68rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.color = 'var(--accent)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--muted)'
              e.currentTarget.style.color = 'var(--muted)'
            }}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  )
}

// 소수 스텝이면 스텝 자릿수에 맞춰 표시, 정수면 그대로.
function formatValue(value, p) {
  const step = p.step ?? 1
  if (Number.isInteger(step)) return String(value)
  const decimals = (String(step).split('.')[1] || '').length
  return Number(value).toFixed(decimals)
}
