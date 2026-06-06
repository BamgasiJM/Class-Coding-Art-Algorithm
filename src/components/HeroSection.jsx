// src/components/HeroSection.jsx
import { useEffect, useRef } from 'react'
import { Canvas }            from '@react-three/fiber'
import { gsap }              from 'gsap'
import { ScrollTrigger }     from 'gsap/ScrollTrigger'
import ParticleBackground    from './canvas/ParticleBackground'

gsap.registerPlugin(ScrollTrigger)

// 타이틀 문자를 span 배열로 변환하는 헬퍼
// — JSX에서 직접 렌더링하므로 innerHTML 조작 불필요
function SplitChars({ text, style = {} }) {
  return (
    <>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className="hero-char"
          style={{ display: 'inline-block', ...style }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </>
  )
}

export default function HeroSection() {
  const sectionRef = useRef()
  const tagRef     = useRef()
  const titleRef   = useRef()
  const dividerRef = useRef()
  const scrollRef  = useRef()
  const cursorRef  = useRef()

  useEffect(() => {
    // 커스텀 커서
    const onMove = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX, y: e.clientY,
        duration: 0.15, ease: 'power2.out',
      })
    }
    window.addEventListener('mousemove', onMove)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      // 태그라인 등장
      tl.from(tagRef.current, {
        opacity: 0, y: 16, duration: 0.6, ease: 'power2.out',
      })

      // 구분선 스윕
      tl.from(dividerRef.current, {
        scaleX: 0, transformOrigin: 'left center',
        duration: 0.8, ease: 'expo.out',
      }, '-=0.3')

      // 타이틀 문자 등장 — .hero-char 클래스로 일괄 선택
      tl.from('.hero-char', {
        y: 120,
        opacity: 0,
        rotateX: -90,
        transformOrigin: '50% 100%',
        duration: 0.9,
        ease: 'back.out(1.5)',
        stagger: { amount: 0.6 },
      }, '-=0.5')

      // 스크롤 인디케이터 등장
      tl.from(scrollRef.current, {
        opacity: 0, y: 10, duration: 0.5,
      }, '-=0.2')

      // 스크롤 인디케이터 펄스
      gsap.to(scrollRef.current.querySelector('.scroll-line'), {
        scaleY: 0,
        transformOrigin: 'top center',
        yoyo: true, repeat: -1,
        duration: 1.1, ease: 'power1.inOut',
      })

      // 스크롤 시 히어로 페이드아웃
      gsap.to(sectionRef.current.querySelector('.hero-content'), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '40% top',
          scrub: true,
        },
        y: -60, opacity: 0,
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor" />

      <section
        ref={sectionRef}
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* R3F 파티클 배경 */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Canvas
            camera={{ position: [0, 0, 7], fov: 55 }}
            gl={{ antialias: false }}
            style={{ background: 'transparent' }}
          >
            <ParticleBackground />
          </Canvas>
        </div>

        {/* 방사형 비네트 */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, #080810 100%)',
        }} />

        {/* 노이즈 그레인 오버레이 */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: 0.06,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px',
        }} />

        {/* 히어로 콘텐츠 */}
        <div
          className="hero-content"
          style={{
            position: 'relative', zIndex: 2,
            textAlign: 'center',
            padding: '0 clamp(1.5rem, 5vw, 4rem)',
          }}
        >
          {/* 태그라인 */}
          <p
            ref={tagRef}
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 'clamp(0.8rem, 1vw, 0.95rem)',
              letterSpacing: '0.4em',
              color: 'var(--accent)',
              textTransform: 'uppercase',
              marginBottom: '1.2rem',
            }}
          >
            Generative Art &amp; Creative Coding
          </p>

          {/* 구분선 */}
          <div
            ref={dividerRef}
            style={{
              width: 'clamp(120px, 20vw, 220px)',
              height: 1,
              background: 'linear-gradient(to right, var(--accent), transparent)',
              margin: '0 auto 1.8rem',
            }}
          />

          {/* 메인 타이틀 — SplitChars로 문자 단위 분해 */}
          <h1
            ref={titleRef}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(4.5rem, 11vw, 11rem)',
              lineHeight: 0.92,
              letterSpacing: '0.03em',
              perspective: '600px',
            }}
          >
            <span style={{ display: 'block' }}>
              <SplitChars text="Coding Art with" />
            </span>
            <span style={{ display: 'block' }}>
              <SplitChars text="Algorithms" />
            </span>
          </h1>
        </div>

        {/* 스크롤 인디케이터 */}
        <div
          ref={scrollRef}
          style={{
            position: 'absolute', bottom: '2.5rem',
            zIndex: 2, display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '0.5rem',
          }}
        >
          <span style={{
            fontSize: '0.6rem', letterSpacing: '0.3em',
            color: 'var(--muted)', textTransform: 'uppercase',
          }}>
            Scroll
          </span>
          <div
            className="scroll-line"
            style={{
              width: 1, height: 48,
              background: 'linear-gradient(to bottom, var(--accent), transparent)',
            }}
          />
        </div>
      </section>
    </>
  )
}