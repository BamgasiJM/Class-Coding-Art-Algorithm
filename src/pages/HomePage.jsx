import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import IntroductionSection from '../components/IntroductionSection'
import AlgorithmSection from '../components/AlgorithmSection'

export default function HomePage() {
  const location = useLocation()

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo)
      el?.scrollIntoView({ behavior: 'instant', block: 'start' })
    }
  }, [location.state])

  return (
    <main>
      <HeroSection />
      <IntroductionSection />
      <AlgorithmSection />
    </main>
  )
}
