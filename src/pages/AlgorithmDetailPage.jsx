import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { findAlgorithmBySlug, slugify } from '../algorithms/catalog'
import { getAlgorithmDetail } from '../algorithms/details'
import P5Canvas from '../algorithms/P5Canvas'
import Playground from '../algorithms/Playground'

export default function AlgorithmDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()

  // 캔버스는 마운트 시 한 번만 화면 너비에 맞춰 크기를 정한다 (반응형 리사이즈 아님 — P5Canvas 규칙 참고)
  const [canvasSize] = useState(() =>
    typeof window === 'undefined' ? 560 : Math.min(560, Math.floor(window.innerWidth * 0.85))
  )

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [slug])

  const algorithm = findAlgorithmBySlug(slug)
  const detail = algorithm ? getAlgorithmDetail(slug) : null
  const relatedAlgorithms = detail?.related
    ?.map((name) => findAlgorithmBySlug(slugify(name)))
    .filter(Boolean) ?? []

  if (!algorithm) {
    return (
      <section style={{ padding: '5rem 2rem', minHeight: '100vh' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <button
            onClick={() => navigate('/', { state: { scrollTo: 'algorithms' } })}
            style={{
              background: 'none',
              border: '1px solid var(--muted)',
              color: 'var(--fg)',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              marginBottom: '2rem',
            }}
          >
            ← back
          </button>
          <p style={{ color: 'var(--muted)' }}>Algorithm not found.</p>
        </div>
      </section>
    )
  }

  return (
    <section style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1.5rem, 8vw, 7rem)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => navigate('/', { state: { scrollTo: 'algorithms' } })}
          style={{
            background: 'none',
            border: '1px solid var(--muted)',
            color: 'var(--muted)',
            padding: '0.6rem 1.2rem',
            cursor: 'pointer',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '3rem',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = 'var(--accent)'
            e.target.style.color = 'var(--accent)'
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = 'var(--muted)'
            e.target.style.color = 'var(--muted)'
          }}
        >
          ← Back
        </button>

        {/* 알고리즘 헤더 */}
        <div style={{ marginBottom: '3rem' }}>
          <p
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.8rem',
              letterSpacing: '0.2em',
              color: 'var(--accent)',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
            }}
          >
            Algorithm {algorithm.no}
          </p>
          <h1
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(3rem, 7vw, 5rem)',
              fontWeight: 400,
              letterSpacing: '0.02em',
              color: 'var(--fg)',
              marginBottom: '1.5rem',
            }}
          >
            {algorithm.name}
          </h1>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {algorithm.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  padding: '0.3rem 0.7rem',
                  border: '1px solid rgba(var(--accent-rgb), 0.4)',
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 콘텐츠: 좌우 레이아웃 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))',
            gap: '4rem',
            alignItems: 'start',
          }}
        >
          {/* 설명 섹션 */}
          <div>
            <h2
              style={{
                fontFamily: "'IBM Plex Sans KR', sans-serif",
                fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                fontWeight: 400,
                letterSpacing: '0.05em',
                color: 'var(--fg)',
                marginBottom: '1.5rem',
              }}
            >
              Overview
            </h2>
            {detail ? (
              <>
                <p
                  style={{
                    fontFamily: "'IBM Plex Sans KR', sans-serif",
                    fontSize: '1rem',
                    lineHeight: 1.8,
                    color: 'var(--fg)',
                    marginBottom: '1.5rem',
                  }}
                >
                  {detail.longDescription.ko}
                </p>
                <p
                  style={{
                    fontFamily: "'IBM Plex Sans KR', sans-serif",
                    fontSize: '1rem',
                    lineHeight: 1.8,
                    color: 'var(--muted)',
                  }}
                >
                  {detail.longDescription.en}
                </p>
              </>
            ) : (
              <p style={{ color: 'var(--muted)', fontStyle: 'italic' }}>
                상세 설명 준비 중입니다.
              </p>
            )}
          </div>

          {/* 아트워크 섹션 */}
          <div>
            <h2
              style={{
                fontFamily: "'IBM Plex Sans KR', sans-serif",
                fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                fontWeight: 400,
                letterSpacing: '0.05em',
                color: 'var(--fg)',
                marginBottom: '1.5rem',
              }}
            >
              Visualization
            </h2>
            {detail && detail.sketch && detail.params?.length ? (
              <Playground sketch={detail.sketch} size={canvasSize} params={detail.params} />
            ) : detail && detail.sketch ? (
              <P5Canvas sketch={detail.sketch} size={canvasSize} />
            ) : (
              <div
                style={{
                  width: canvasSize,
                  height: canvasSize,
                  margin: '0 auto',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--muted)',
                  fontStyle: 'italic',
                  background: 'var(--card-bg)',
                }}
              >
                Visualization not available yet.
              </div>
            )}
          </div>
        </div>

        {/* 관련 알고리즘 */}
        {relatedAlgorithms.length > 0 && (
          <div style={{ marginTop: 'clamp(4rem, 8vw, 6rem)' }}>
            <h2
              style={{
                fontFamily: "'IBM Plex Sans KR', sans-serif",
                fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                fontWeight: 400,
                letterSpacing: '0.05em',
                color: 'var(--fg)',
                marginBottom: '1.5rem',
              }}
            >
              Related Algorithms
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1px',
                background: 'var(--border)',
              }}
            >
              {relatedAlgorithms.map((rel) => (
                <Link
                  key={rel.no}
                  to={`/algorithm/${slugify(rel.name)}`}
                  style={{
                    background: 'var(--bg)',
                    padding: '1.4rem 1.2rem',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block',
                    transition: 'background 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--card-bg)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg)')}
                >
                  <p
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: '0.7rem',
                      letterSpacing: '0.15em',
                      color: 'var(--accent)',
                      marginBottom: '0.4rem',
                    }}
                  >
                    {rel.no}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '1.3rem',
                      letterSpacing: '0.03em',
                      color: 'var(--fg)',
                    }}
                  >
                    {rel.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
