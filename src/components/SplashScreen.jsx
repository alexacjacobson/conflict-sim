import { useState, useEffect } from 'react'

export default function SplashScreen({ onComplete }) {
  const [arrowRotation, setArrowRotation] = useState(-120)
  const [isSnapping, setIsSnapping] = useState(false)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => {
      setArrowRotation(0)
      setIsSnapping(true)
    }, 100)
    const t2 = setTimeout(() => setIsSnapping(false), 900)
    const t3 = setTimeout(() => setIsFading(true), 1200)
    const t4 = setTimeout(() => onComplete(), 1600)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [])

  return (
    <div className={`splash${isFading ? ' splash--fading' : ''}`}>
      <div className="splash__compass">
        <img src="/compass-base.svg" className="splash__base" alt="" />
        <img
          src="/compass-arrow.svg"
          className="splash__arrow"
          alt=""
          style={{ transform: `rotate(${arrowRotation}deg)` }}
        />
      </div>
    </div>
  )
}
