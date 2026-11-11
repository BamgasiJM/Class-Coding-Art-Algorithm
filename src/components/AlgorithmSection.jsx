import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ALGORITHMS, slugify } from '../algorithms/catalog'

// Fisher–Yates 셔플 (원본 배열 불변, 새 배열 반환)
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// 이름(name) 알파벳 오름차순 정렬 (원본 불변)
function sortAlpha(arr) {
  return [...arr].sort((x, y) => x.name.localeCompare(y.name))
}

// 카드 등장 애니메이션 설정
// - 카드마다 Observer를 두지 않고, 그리드 하나에 Observer 하나만 둡니다.
// - rootMargin으로 카드가 화면 하단에 닿기 전에 미리 등장을 시작해, 스크롤 시 기다리는 느낌을 줄입니다.
// - 같은 스크롤에서 함께 들어온 카드들만 짧게 순차 등장합니다.
//   지연은 전체 목록 위치가 아니라 "이번에 보이는 묶음" 기준이라 아래쪽 카드도 기다리지 않습니다.
const REVEAL_STEP = 0.05   // 묶음 안에서 카드 간 간격 (초)
const REVEAL_MAX = 0.3     // 묶음 전체의 최대 지연 (초)
const REVEAL_ROOT_MARGIN = '0px 0px 15% 0px'

function Card({ algo }) {
  const [hovered, setHovered]   = useState(false)
  const [checked, setChecked]   = useState(false)

  return (
    <Link
      to={`/algorithm/${slugify(algo.name)}`}
      className="algo-card"
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
  const gridRef = useRef()

  // 카드 표시 순서: 'alpha'(알파벳순, 기본값) ↔ 'shuffle'(랜덤) 토글
  const [mode, setMode] = useState('alpha')
  const [displayed, setDisplayed] = useState(() => sortAlpha(ALGORITHMS))

  function toggleOrder() {
    const next = mode === 'shuffle' ? 'alpha' : 'shuffle'
    setMode(next)
    // alpha면 정렬, shuffle이면 매번 새로 섞음
    setDisplayed(next === 'alpha' ? sortAlpha(ALGORITHMS) : shuffle(ALGORITHMS))
  }

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

  // 카드 등장: 그리드 전체에 Observer 하나를 두고, 화면에 들어온 카드 묶음을 한 번에 애니메이션
  // - 카드 목록은 고정되어 있고 셔플은 순서만 바꾸므로, 마운트 시 한 번만 관찰하면 됩니다.
  // - 한 번 등장한 카드는 unobserve 해서 이후 스크롤 비용을 없앱니다.
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const cards = grid.querySelectorAll('.algo-card')

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) =>
            (a.boundingClientRect.top - b.boundingClientRect.top) ||
            (a.boundingClientRect.left - b.boundingClientRect.left)
          )
          .map(e => e.target)

        if (visible.length === 0) return
        visible.forEach(el => observer.unobserve(el))

        gsap.to(visible, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: {
            amount: Math.min(REVEAL_MAX, visible.length * REVEAL_STEP),
            from: 'start',
          },
        })
      },
      { threshold: 0, rootMargin: REVEAL_ROOT_MARGIN }
    )

    cards.forEach(card => observer.observe(card))
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

          {/* 순서 토글 버튼 — 현재 모드를 표시하고, 클릭하면 셔플 ↔ 알파벳순 전환 */}
          <button
            onClick={toggleOrder}
            aria-label={mode === 'alpha' ? '무작위로 섞기' : '알파벳순으로 정렬'}
            style={{
              marginLeft: 'auto',
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.62rem', letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '0.5rem 1rem',
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--muted)',
              cursor: 'pointer',
              transition: 'border-color 0.25s ease, color 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.color = 'var(--accent)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--muted)'
            }}
          >
            {mode === 'alpha' ? '⤨ Shuffle' : '↓ A–Z'}
          </button>
        </div>

        {/*
          그리드 컨테이너
          - auto-fill + minmax(260px, 1fr): 카드 수가 늘어나도 자동 줄바꿈
          - alignItems: stretch (기본값): 같은 행의 모든 카드가 동일 높이
          - 카드 추가 시 ALGORITHMS 배열에 객체만 추가하면 자동으로 반영됨
        */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1px',
            background: 'var(--border)',
            alignItems: 'stretch',
          }}
        >
          {displayed.map((a) => (
            // 래퍼 div: 1px gap을 구분선으로 활용 (background: var(--border))
            <div key={a.no} style={{ background: 'var(--bg)', height: '100%' }}>
              <Card algo={a} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
