import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AlgorithmDetailPage from './pages/AlgorithmDetailPage'
import CustomCursor from './components/CustomCursor'

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
    // 랜덤 hue로 accent 컬러 생성 (채도 100%, 명도 65% 고정)
    const randomHue = Math.floor(Math.random() * 360)
    const [r, g, b] = hslToRgb(randomHue, 100, 65)

    document.documentElement.style.setProperty('--accent', `rgb(${r}, ${g}, ${b})`)
    document.documentElement.style.setProperty('--accent-rgb', `${r}, ${g}, ${b}`)
    document.documentElement.style.setProperty('--accent-hue', randomHue)
  }, [])

  return (
    <>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/algorithm/:slug" element={<AlgorithmDetailPage />} />
      </Routes>
    </>
  )
}
