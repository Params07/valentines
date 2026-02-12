import React, { useState, useEffect, useRef } from 'react'
import './Valentine.css'
import Hearts from './Hearts'
import RosePetals from './Rosepedal'

const Valentine: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showPoem, setShowPoem] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Sample images - replace with your own image paths
  const images = [
    'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1474447014849-39c03dec128f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1504919911861-b06641ce4f3b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1469072079915-a3bbc2d4fe0d?w=800&h=600&fit=crop',
  ]

  const poem = `
    When I see your smile,
    My heart knows the reason why,
    Every moment with you
    Feels like a gentle sigh.

    Your laughter fills the air,
    Like petals on the breeze,
    Being close to you
    Puts my worried mind at ease.

    On this Valentine's Day,
    I want to say it's true,
    You're my greatest blessing,
    I'm forever grateful for you.

    With all my heart,
    Today and every day,
    I'll cherish every moment,
    In every single way.
  `

  // Auto-rotate images every 4 seconds and control music
  useEffect(() => {
    if (!showPoem && audioRef.current) {
      // Play music when on slideshow
      audioRef.current.play().catch(() => {
        // Autoplay might be blocked, user will need to interact
      })
    } else if (showPoem && audioRef.current) {
      // Pause music when back on poem
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }, [showPoem])

  // Auto-rotate images every 4 seconds (only when not on poem)
  useEffect(() => {
    if (showPoem) return
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [showPoem])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="valentine-container">
        <Hearts delay={0.5} />
        <RosePetals/>
      {/* Decorative Elements */}
      <div className="rose-decoration left">🌹</div>
      <div className="rose-decoration right">🌹</div>
      {/* Background Music - Only plays on slideshow */}
      <audio ref={audioRef} loop className="background-music">
        <source
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>

      {/* Main Content */}
      <div className="valentine-content">
        {/* Poem Section */}
        <div className={`poem-section ${!showPoem ? 'hidden' : ''}`}>
          <h1 className="poem-title">💌 A Letter for You 💌</h1>
          <div className="poem-text">
            {poem.split('\n').map((line, idx) => (
              line.trim() && <p key={idx}>{line}</p>
            ))}
          </div>
          <button className="toggle-btn" onClick={() => setShowPoem(false)}>
            View Slideshow →
          </button>
        </div>

        {/* Slideshow Section */}
        <div className={`slideshow-section ${showPoem ? 'hidden' : ''}`}>
          <div className="slideshow-container">
            <div className="slideshow-wrapper">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`slide ${idx === currentImageIndex ? 'active' : ''}`}
                >
                  <img src={img} alt={`Slide ${idx + 1}`} />
                  <div className="heart-overlay">❤️</div>
                </div>
              ))}
            </div>

            {/* Navigation Controls */}
            <button className="nav-btn prev-btn" onClick={prevImage}>
              ❮
            </button>
            <button className="nav-btn next-btn" onClick={nextImage}>
              ❯
            </button>

            {/* Indicators */}
            <div className="indicators">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  className={`dot ${idx === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(idx)}
                />
              ))}
            </div>
          </div>

          <button className="toggle-btn" onClick={() => setShowPoem(true)}>
            ← Back to Letter
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="rose-decoration left">🌹</div>
        <div className="rose-decoration right">🌹</div>
      </div>
    </div>
  )
}

export default Valentine
