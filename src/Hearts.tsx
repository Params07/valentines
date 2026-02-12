import React, { useMemo } from 'react'

type HeartSpec = { left: number; delay: number; duration: number; size: number; color: string }

const COLORS = ['#ff6b81', '#ff4da6', '#ffb3d9', '#ffd1e8', '#ff2d95']

const Hearts: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const hearts = useMemo(() => {
    const arr: HeartSpec[] = []
    for (let i = 0; i < 18; i++) {
      arr.push({
        left: Math.round(Math.random() * 100),
        delay: delay + +(Math.random() * 6).toFixed(2),
        duration: +(4 + Math.random() * 6).toFixed(2),
        size: 12 + Math.round(Math.random() * 28),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })
    }
    return arr
  }, [])

  return (
    <div className="hearts-container" aria-hidden>
      {hearts.map((h, i) => (
        <div
          key={i}
          className="heart"
          style={{
            left: `${h.left}%`,
            width: `${h.size}px`,
            height: `${h.size}px`,
            background: h.color,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

export default Hearts
