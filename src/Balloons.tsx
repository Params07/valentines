import React, { useMemo } from "react"

type BalloonSpec = {
  left: number
  delay: number
  duration: number
  size: number
  color: string
}

const COLORS = ["#ff4d6d", "#ff85a1", "#ff99c8", "#ff2e63", "#ffc2d1"]

const Balloons: React.FC = () => {
  const balloons = useMemo(() => {
    const arr: BalloonSpec[] = []
    for (let i = 0; i < 12; i++) {
      arr.push({
        left: Math.round(Math.random() * 100),
        delay: +(Math.random() * 5).toFixed(2),
        duration: +(6 + Math.random() * 6).toFixed(2),
        size: 40 + Math.round(Math.random() * 40),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })
    }
    return arr
  }, [])

  return (
    <div className="balloons-container" aria-hidden>
      {balloons.map((b, i) => (
        <div
          key={i}
          className="balloon"
          style={{
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size * 1.2}px`,
            background: b.color,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        >
          <div className="string" />
        </div>
      ))}
    </div>
  )
}

export default Balloons
