import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const KEYWORDS = [
  {
    title: 'Algorithm',
    subtitle: '알고리즘',
    description:
      'The brush that paints with logic. Algorithms are the foundation of creative expression in code, transforming abstract mathematical concepts into visual poetry. 논리로 그리는 붓입니다. 추상적인 수학 개념을 시각적 시(詩)로 변환하는 창의적 표현의 기초입니다.',
  },
  {
    title: 'Data',
    subtitle: '데이터',
    description:
      'The pigment that flows through algorithms. Data is the raw material of digital creation — every number, every value carries the potential to become art. 알고리즘을 흐르는 물감입니다. 모든 숫자와 값이 예술로 변할 수 있는 디지털 창작의 원재료입니다.',
  },
  {
    title: 'Canvas',
    subtitle: '캔버스',
    description:
      'The space where the mind unfolds. Our inner imagination becomes tangible through visual representation, where thoughts crystallize into form and color. 마음이 펼쳐지는 공간입니다. 우리의 내적 상상력이 시각적 표현을 통해 구체화되고, 생각이 형태와 색상으로 결정화됩니다.',
  },
  {
    title: 'Expression',
    subtitle: '표현',
    description:
      'The purpose that drives creation. When algorithm, data, and canvas converge, they become a vehicle for authentic expression — a way to communicate what words alone cannot. 창작을 이끄는 목적입니다. 알고리즘, 데이터, 캔버스가 만날 때, 말로는 표현할 수 없는 것을 전달하는 수단이 됩니다.',
  },
]

function Keyword({ item, index }) {
  const ref = useRef()

  useEffect(() => {
    const el = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(el, {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
            delay: index * 0.12,
          })
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: 'translateY(40px)',
        paddingTop: '1.6rem',
        borderTop: '1px solid var(--border)',
      }}
    >
      <h3
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
          fontWeight: 400,
          letterSpacing: '0.05em',
          color: 'var(--accent)',
          marginBottom: '0.3rem',
        }}
      >
        {item.title}
      </h3>
      <p
        style={{
          fontFamily: "'IBM Plex Sans KR', sans-serif",
          fontWeight: 300,
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          color: 'var(--muted)',
          marginBottom: '1rem',
        }}
      >
        {item.subtitle}
      </p>
      <p
        style={{
          fontFamily: "'IBM Plex Sans KR', sans-serif",
          fontWeight: 300,
          fontSize: '0.85rem',
          lineHeight: 1.85,
          color: 'var(--muted)',
        }}
      >
        {item.description}
      </p>
    </div>
  )
}

export default function IntroductionSection() {
  const headingRef = useRef()
  const bodyRef = useRef()
  const ctaRef = useRef()

  useEffect(() => {
    const observers = []

    const observe = (el, animation) => {
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            gsap.to(el, animation)
            observer.unobserve(el)
          }
        },
        { threshold: 0.1 }
      )
      observer.observe(el)
      observers.push(observer)
    }

    observe(headingRef.current, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
    observe(bodyRef.current, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' })
    observe(ctaRef.current, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <section
      style={{
        padding: 'clamp(5rem, 12vw, 10rem) clamp(1.5rem, 8vw, 7rem)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* 섹션 헤딩 — Algorithms 헤딩과 동일한 스타일 */}
        <div
          ref={headingRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.2rem',
            marginBottom: '3.5rem',
            opacity: 0,
            transform: 'translateX(-30px)',
          }}
        >
          <div style={{ width: 32, height: 1, background: 'var(--accent)' }} />
          <h2
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.7rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            Introduction
          </h2>
        </div>

        {/* 타이틀 */}
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(2.6rem, 7vw, 5rem)',
            lineHeight: 1.05,
            letterSpacing: '0.02em',
            color: 'var(--fg)',
            marginBottom: '1rem',
          }}
        >
          Algorithmic Art
        </h1>
        <p
          style={{
            fontFamily: "'IBM Plex Sans KR', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(0.95rem, 1.6vw, 1.2rem)',
            letterSpacing: '0.05em',
            color: 'var(--muted)',
            marginBottom: '4rem',
          }}
        >
          창의적 여정 — A Creative Journey Where Code Meets Canvas
        </p>

        {/* 키워드 그리드 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '2.5rem',
            marginBottom: '5rem',
          }}
        >
          {KEYWORDS.map((item, i) => (
            <Keyword key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* 본문 설명 */}
        <div
          ref={bodyRef}
          style={{
            maxWidth: 860,
            opacity: 0,
            transform: 'translateY(30px)',
            paddingTop: '3rem',
            borderTop: '1px solid var(--border)',
            marginBottom: '3.5rem',
          }}
        >
          <p
            style={{
              fontFamily: "'IBM Plex Sans KR', sans-serif",
              fontWeight: 300,
              fontSize: '0.95rem',
              lineHeight: 1.9,
              color: 'var(--fg)',
              marginBottom: '1.4rem',
            }}
          >
            알고리즘 코딩 아트는 단순한 기술이 아닙니다. 그것은 우리의 내면을
            표현하고, 디지털 캔버스 위에 우리의 상상력과 감정을 펼쳐내는
            창의적 수단입니다. 붓 대신 알고리즘으로, 물감 대신 데이터로
            그려지는 이 예술 형식은, 모든 디자이너와 개발자가 자신의 고유한
            미적 언어를 발견하고 표현할 수 있는 가능성을 열어줍니다.
          </p>
          <p
            style={{
              fontFamily: "'IBM Plex Sans KR', sans-serif",
              fontWeight: 300,
              fontSize: '0.95rem',
              lineHeight: 1.9,
              color: 'var(--muted)',
            }}
          >
            Algorithmic Coding Art is not merely a technical skill — it is a
            creative medium through which we express our inner world and
            unfold our imagination and emotions on a digital canvas. Painted
            with algorithms instead of brushes and pigmented with data instead
            of paint, this art form opens endless possibilities for every
            designer and developer to discover and articulate their unique
            aesthetic language.
          </p>
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          style={{
            opacity: 0,
            transform: 'translateY(20px)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              color: 'var(--muted)',
            }}
          >
            아래의 알고리즘을 탐색하며 자신의 표현을 찾아보세요
          </span>
          <div
            style={{
              width: 32,
              height: 1,
              background: 'linear-gradient(to right, var(--accent), transparent)',
            }}
          />
        </div>
      </div>
    </section>
  )
}
