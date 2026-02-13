import React, { useRef, useState, useEffect } from 'react'
import './Valentine.css'
import Hearts from './Hearts'
import RosePetals from './Rosepedal'

const Valentine: React.FC = () => {
  const [imageSet, setImageSet] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Sample images - replace with your own image paths
  const images = [
    '/pic1.jpeg',
    '/pic2.jpeg',
    '/pic3.jpeg',
    '/pic4.jpeg',
    '/pic5.jpeg',
    '/pic6.jpeg',
  ]

  // Define sets of 4 images from the 6 available
  const imageSets = [
    [0, 1, 2, 3],  // Set 1: images 1,2,3,4
    [2, 3, 4, 5],  // Set 2: images 3,4,5,6
    [4, 5, 0, 1],  // Set 3: images 5,6,1,2
  ]

  // Random position configuration for 4 images with better spacing
  const randomPositions = [
    { transform: `rotate(${-8 + Math.random() * 4}deg)`, left: '3%', top: '5%' },
    { transform: `rotate(${4 + Math.random() * 4}deg)`, right: '3%', top: '8%' },
    { transform: `rotate(${-5 + Math.random() * 3}deg)`, left: '4%', bottom: '10%' },
    { transform: `rotate(${5 + Math.random() * 4}deg)`, right: '4%', bottom: '12%' },
  ]

  // Cycle through image sets and play music
  useEffect(() => {
    // Audio playback - starts at 3:35 (215 seconds)
    if (audioRef.current) {
      audioRef.current.currentTime = 215
      audioRef.current.play().catch(() => {
        // Autoplay might be blocked
      })
    }

    // Loop audio at 4:22 (262 seconds)
    const stopTime = 262
    const checkAudioTime = setInterval(() => {
      if (audioRef.current && audioRef.current.currentTime >= stopTime) {
        audioRef.current.currentTime = 215
      }
    }, 100)

    // Cycle through image sets every 6 seconds
    const imageInterval = setInterval(() => {
      setImageSet((prev) => (prev + 1) % imageSets.length)
    }, 6000)
    
    return () => {
      clearInterval(checkAudioTime)
      clearInterval(imageInterval)
    }
  }, [])

  return (
    <div className="valentine-container">
        <Hearts delay={0.5} />
        <RosePetals/>
      {/* Decorative Elements */}
      <div className="rose-decoration left">🌹</div>
      <div className="rose-decoration right">🌹</div>
      {/* Background Music - Plays from 3:35 to 4:22 */}
      <audio ref={audioRef} className="background-music">
        <source
          src="/Tum Se Hi From Jab We Met-320kbps.mp3"
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>

      {/* Main Content - Scrapbook Layout */}
      <div className="valentine-content-combined">
        <div className="scrapbook-container">
          {/* 4 Images from current set - Cycling through all 6 */}
          {imageSets[imageSet].map((imageIdx, positionIdx) => {
            const position = randomPositions[positionIdx]
            return (
              <div key={positionIdx} className="polaroid" style={position}>
                <img src={images[imageIdx]} alt={`Memory ${imageIdx + 1}`} />
              </div>
            )
          })}

          {/* Center Letter */}
          <div className="scrapbook-letter">
            <div className="letter-tape top-tape"></div>
            <div className="letter-tape bottom-tape"></div>
            <div className="poem-image-container">
              <img src="/letter.jpeg" alt="Handwritten Letter" className="letter-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Valentine
