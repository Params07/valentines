import React, { useMemo } from 'react'

type ButterflySpec = { left: number; top: number; delay: number; duration: number; size: number; color1: string; color2: string }

const BUTTERFLY_COLORS = [
  { primary: '#ff69b4', secondary: '#ffb6c1' },
  { primary: '#ff1493', secondary: '#ffc0cb' },
  { primary: '#ffb6c1', secondary: '#ffc0cb' },
  { primary: '#ff4da6', secondary: '#ff69b4' },
  { primary: '#ff2d95', secondary: '#ff69b4' },
]

const Butterflies: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const butterflies = useMemo(() => {
    const arr: ButterflySpec[] = []
    for (let i = 0; i < 15; i++) {
      const colors = BUTTERFLY_COLORS[Math.floor(Math.random() * BUTTERFLY_COLORS.length)]
      arr.push({
        left: Math.round(Math.random() * 100),
        top: Math.round(Math.random() * 80),
        delay: delay + +(Math.random() * 6).toFixed(2),
        duration: +(7 + Math.random() * 9).toFixed(2),
        size: 40 + Math.round(Math.random() * 50),
        color1: colors.primary,
        color2: colors.secondary,
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
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Upper left wing */}
            <path
              d="M 100 100 Q 70 70 50 40 Q 35 20 40 60 Q 55 85 100 100 Z"
              fill={b.color1}
              opacity="0.9"
            />
            {/* Upper left wing details */}
            <circle cx="55" cy="50" r="4" fill={b.color2} opacity="0.7" />
            <circle cx="60" cy="65" r="3" fill={b.color2} opacity="0.7" />

            {/* Upper right wing */}
            <path
              d="M 100 100 Q 130 70 150 40 Q 165 20 160 60 Q 145 85 100 100 Z"
              fill={b.color1}
              opacity="0.9"
            />
            {/* Upper right wing details */}
            <circle cx="145" cy="50" r="4" fill={b.color2} opacity="0.7" />
            <circle cx="140" cy="65" r="3" fill={b.color2} opacity="0.7" />

            {/* Lower left wing */}
            <path
              d="M 100 100 Q 75 125 60 155 Q 50 175 65 150 Q 80 125 100 100 Z"
              fill={b.color2}
              opacity="0.75"
            />
            {/* Lower left wing details */}
            <circle cx="70" cy="140" r="3" fill={b.color1} opacity="0.6" />

            {/* Lower right wing */}
            <path
              d="M 100 100 Q 125 125 140 155 Q 150 175 135 150 Q 120 125 100 100 Z"
              fill={b.color2}
              opacity="0.75"
            />
            {/* Lower right wing details */}
            <circle cx="130" cy="140" r="3" fill={b.color1} opacity="0.6" />

            {/* Body */}
            <ellipse cx="100" cy="100" rx="6" ry="18" fill={b.color1} />
            {/* Head */}
            <circle cx="100" cy="88" r="5" fill={b.color1} />
            {/* Eyes */}
            <circle cx="97" cy="86" r="1.5" fill="#ffffff" opacity="0.8" />
            <circle cx="103" cy="86" r="1.5" fill="#ffffff" opacity="0.8" />
            {/* Antennae left */}
            <line x1="98" y1="84" x2="88" y2="65" stroke={b.color1} strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="88" cy="65" r="2" fill={b.color1} />
            {/* Antennae right */}
            <line x1="102" y1="84" x2="112" y2="65" stroke={b.color1} strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="112" cy="65" r="2" fill={b.color1} />
          </svg>
        </div>
      ))}
    </div>
  )
}

export default Butterflies


