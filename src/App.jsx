import { useEffect } from 'react'
import HeroSection        from './components/HeroSection'
import IntroductionSection from './components/IntroductionSection'
import AlgorithmSection    from './components/AlgorithmSection'

function hslToRgb(h, s, l) {
  s /= 100
  l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = n => {
    const k = (n + h / 30) % 12
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
  }
  return [
    Math.round(255 * f(0)),
    Math.round(255 * f(8)),
    Math.round(255 * f(4)),
  ]
}

export default function App() {
  useEffect(() => {
    // 랜덤 hue로 accent 컬러 생성 (채도 100%, 명도 55% 고정)
    const randomHue = Math.floor(Math.random() * 360)
    const [r, g, b] = hslToRgb(randomHue, 100, 55)

    document.documentElement.style.setProperty('--accent', `rgb(${r}, ${g}, ${b})`)
    document.documentElement.style.setProperty('--accent-rgb', `${r}, ${g}, ${b}`)
    document.documentElement.style.setProperty('--accent-hue', randomHue)
  }, [])

  return (
    <main>
      <HeroSection />
      <IntroductionSection />
      <AlgorithmSection />
    </main>
  )
}
