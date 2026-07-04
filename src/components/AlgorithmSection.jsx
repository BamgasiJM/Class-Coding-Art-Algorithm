import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ALGORITHMS, slugify } from '../algorithms/catalog'

function Card({ algo, index }) {
  const ref               = useRef()
  const [hovered, setHovered]   = useState(false)
  const [checked, setChecked]   = useState(false)

  useEffect(() => {
    const el = ref.current

    // IntersectionObserver로 뷰포트 진입 감지 → GSAP 등장 애니메이션
    // ScrollTrigger 대신 사용 — React 렌더링 사이클과의 타이밍 충돌 없음
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(el, {
            y: 0, opacity: 1,
            duration: 0.75, ease: 'power3.out',
            delay: index * 0.1,
          })
          observer.unobserve(el) // 한 번만 실행
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)

    return () => observer.disconnect()
  }, [index])

  return (
    <Link
      to={`/algorithm/${slugify(algo.name)}`}
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        height: '100%',
        background: 'var(--card-bg)',
        border: hovered
          ? '1px solid var(--accent)'
          : '1px solid var(--border)',
        padding: '2rem 1.8rem',
        position: 'relative',
        cursor: 'pointer',
        opacity: 0,
        transform: 'translateY(60px)',
        // flexbox — desc가 남은 공간을 채워 tags를 항상 하단에 고정
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.25s ease',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      {/* 상단 악센트 라인 */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: '100%', height: 1,
        background: 'linear-gradient(to right, var(--accent), transparent)',
        opacity: 0.5,
      }} />

      {/* 체크박스
          - 수업 중 해당 알고리즘 설명 시 클릭해서 표시하는 용도
          - 클릭하면 액센트 컬러로 채워짐
          - 각 카드가 독립적인 checked 상태를 가짐 */}
      <div
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setChecked(prev => !prev)
        }}
        style={{
          width: 14,
          height: 14,
          border: '1.5px solid var(--accent)',
          marginBottom: '1rem',
          cursor: 'pointer',
          flexShrink: 0,
          background: checked ? 'var(--accent)' : 'transparent',
          transition: 'background 0.15s ease',
        }}
      />

      {/* 제목 — 호버 시 액센트 컬러 전환 */}
      <h3 style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
        fontWeight: 400,
        letterSpacing: '0.05em',
        marginBottom: '0.8rem',
        color: hovered ? 'var(--accent)' : 'var(--fg)',
        transition: 'color 0.25s ease',
      }}>
        {algo.name}
      </h3>

      {/* 설명 — IBM Plex Sans KR 폰트, flex:1로 남은 공간 차지 */}
      <p style={{
        fontFamily: "'IBM Plex Sans KR', sans-serif",
        fontWeight: 300,
        fontSize: '0.82rem',
        lineHeight: 1.8,
        color: 'var(--muted)',
        flex: 1,
        marginBottom: '1.4rem',
      }}>
        {algo.desc}
      </p>

      {/* 태그 — 항상 카드 하단에 위치 */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
        {algo.tags.map(t => (
          <span key={t} style={{
            fontSize: '0.6rem', letterSpacing: '0.12em',
            padding: '0.2rem 0.55rem',
            border: '1px solid rgba(var(--accent-rgb), 0.3)',
            color: 'var(--accent)',
            textTransform: 'uppercase',
          }}>
            {t}
          </span>
        ))}
      </div>
    </Link>
  )
}

export default function AlgorithmSection() {
  const headingRef = useRef()

  useEffect(() => {
    const el = headingRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(el, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="algorithms"
      style={{
        padding: 'clamp(5rem, 12vw, 10rem) clamp(1.5rem, 8vw, 7rem)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div
          ref={headingRef}
          style={{
            display: 'flex', alignItems: 'center',
            gap: '1.2rem', marginBottom: '3.5rem',
            opacity: 0,
            transform: 'translateX(-30px)',
          }}
        >
          <div style={{ width: 32, height: 1, background: 'var(--accent)' }} />
          <h2 style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.7rem', letterSpacing: '0.35em',
            textTransform: 'uppercase', color: 'var(--muted)',
          }}>
            Algorithms
          </h2>
        </div>

        {/*
          그리드 컨테이너
          - auto-fill + minmax(260px, 1fr): 카드 수가 늘어나도 자동 줄바꿈
          - alignItems: stretch (기본값): 같은 행의 모든 카드가 동일 높이
          - 카드 추가 시 ALGORITHMS 배열에 객체만 추가하면 자동으로 반영됨
        */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1px',
          background: 'var(--border)',
          alignItems: 'stretch',
        }}>
          {ALGORITHMS.map((a, i) => (
            // 래퍼 div: 1px gap을 구분선으로 활용 (background: var(--border))
            <div key={a.no} style={{ background: 'var(--bg)', height: '100%' }}>
              <Card algo={a} index={i} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
