import React, { useMemo } from "react"

type PetalSpec = {
  left: number
  delay: number
  duration: number
  size: number
  rotate: number
}

const COLORS = ["#ff6b81", "#ff4d6d", "#ff758f", "#ff99ac"]

const RosePetals: React.FC = () => {
  const petals = useMemo(() => {
    const arr: PetalSpec[] = []
    for (let i = 0; i < 25; i++) {
      arr.push({
        left: Math.round(Math.random() * 100),
        delay: +(Math.random() * 6).toFixed(2),
        duration: +(6 + Math.random() * 6).toFixed(2),
        size: 10 + Math.round(Math.random() * 15),
        rotate: Math.round(Math.random() * 360),
      })
    }
    return arr
  }, [])

  return (
    <div className="petals-container" aria-hidden>
      {petals.map((p, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size / 2}px`,
            background: COLORS[i % COLORS.length],
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotate}deg)`
          }}
        />
      ))}
    </div>
  )
}

export default RosePetals
