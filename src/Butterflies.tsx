import React, { useMemo } from 'react'

type ButterflySpec = { left: number; top: number; delay: number; duration: number; size: number; color: string }

const BUTTERFLY_COLORS = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb', '#ff4da6']

const Butterflies: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const butterflies = useMemo(() => {
    const arr: ButterflySpec[] = []
    for (let i = 0; i < 12; i++) {
      arr.push({
        left: Math.round(Math.random() * 100),
        top: Math.round(Math.random() * 80),
        delay: delay + +(Math.random() * 5).toFixed(2),
        duration: +(6 + Math.random() * 8).toFixed(2),
        size: 30 + Math.round(Math.random() * 40),
        color: BUTTERFLY_COLORS[Math.floor(Math.random() * BUTTERFLY_COLORS.length)],
      })
    }
    return arr
  }, [])

  return (
    <div className="butterflies-container" aria-hidden>
      {butterflies.map((b, i) => (
        <div
          key={i}
          className="butterfly"
          style={{
            left: `${b.left}%`,
            top: `${b.top}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        >
          <svg viewBox="0 0 200 200" fill="none" stroke={b.color} strokeWidth="2">
            {/* Upper left wing */}
            <path d="M 100 100 Q 60 60 40 50 Q 30 45 35 70 Q 50 90 100 100" fill={b.color} opacity="0.8" />
            {/* Upper right wing */}
            <path d="M 100 100 Q 140 60 160 50 Q 170 45 165 70 Q 150 90 100 100" fill={b.color} opacity="0.8" />
            {/* Lower left wing */}
            <path d="M 100 100 Q 70 130 50 150 Q 40 160 55 150 Q 80 130 100 100" fill={b.color} opacity="0.6" />
            {/* Lower right wing */}
            <path d="M 100 100 Q 130 130 150 150 Q 160 160 145 150 Q 120 130 100 100" fill={b.color} opacity="0.6" />
            {/* Body */}
            <ellipse cx="100" cy="100" rx="8" ry="20" fill={b.color} />
            {/* Head */}
            <circle cx="100" cy="85" r="6" fill={b.color} />
            {/* Antennae */}
            <line x1="100" y1="80" x2="95" y2="65" stroke={b.color} strokeWidth="1.5" />
            <line x1="100" y1="80" x2="105" y2="65" stroke={b.color} strokeWidth="1.5" />
          </svg>
        </div>
      ))}
    </div>
  )
}

export default Butterflies

