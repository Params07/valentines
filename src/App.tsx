import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import ValentineFireworks from './Fireworks'
import Hearts from './Hearts'
import Balloons from "./Balloons"
import RosePetals from './Rosepedal'
import Valentine from './Valentine'


function App() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const boxRef = useRef<HTMLDivElement | null>(null)
  // position of the No button relative to the 200x200 box (center coordinates in px)
  const [noPos, setNoPos] = useState({ left: '150px', top: '100px' })
  const [showFireworks, setShowFireworks] = useState(false)
  const [showPoem, setShowPoem] = useState(false)
  useEffect(() => {
    // initial: align vertically with Yes (center of 200x200 box), slightly to the right
    setNoPos({ left: '150px', top: '100px' })
  }, [])

  function moveNoAway(e: React.MouseEvent) {
    const box = boxRef.current
    const btn = e.currentTarget as HTMLElement
    if (!box || !btn) return
    const padding = 8
    const btnW = Math.max(64, btn.offsetWidth)
    const btnH = Math.max(32, btn.offsetHeight)

    const minCenterX = padding + btnW / 2
    const maxCenterX = 200 - btnW / 2 - padding
    const minCenterY = padding + btnH / 2
    const maxCenterY = 200 - btnH / 2 - padding

    const curX = typeof noPos.left === 'string' ? parseInt(noPos.left, 10) : noPos.left
    const curY = typeof noPos.top === 'string' ? parseInt(noPos.top, 10) : noPos.top

    function rand(min: number, max: number) {
      return Math.round(Math.random() * (max - min) + min)
    }

    // Decide dominant axis: flip only the axis where the button is farthest from center
    const dx = curX - 100
    const dy = curY - 100
    let targetX = curX
    let targetY = curY

    if (Math.abs(dx) > Math.abs(dy)) {
      // Horizontal dominant: flip left/right, pick a new vertical center (can vary)
      targetX = curX < 100 ? maxCenterX : minCenterX
      targetY = rand(minCenterY, maxCenterY)
    } else if (Math.abs(dy) > Math.abs(dx)) {
      // Vertical dominant: flip top/bottom, pick a new horizontal center
      targetY = curY < 100 ? maxCenterY : minCenterY
      targetX = rand(minCenterX, maxCenterX)
    } else {
      // Equal: randomly choose horizontal or vertical flip
      if (Math.random() < 0.5) {
        targetX = curX < 100 ? maxCenterX : minCenterX
        targetY = rand(minCenterY, maxCenterY)
      } else {
        targetY = curY < 100 ? maxCenterY : minCenterY
        targetX = rand(minCenterX, maxCenterX)
      }
    }

    setNoPos({ left: `${targetX}px`, top: `${targetY}px` })
  }

  function handleYes() {
    // start fireworks overlay
    setShowFireworks(true)
    // disable for 3 seconds then redirect to Valentine component
    setTimeout(() => {
      setShowFireworks(false)
      setShowPoem(true)
    }, 5000)
  }

  // If showSurprise is true, show the Valentine component
  if (showPoem) {
    return <Valentine />
  }

  return (
    <div className="valentine-root" ref={containerRef}>
      <Hearts delay={0.5} />
      <Balloons />
      {showFireworks && <ValentineFireworks />}
      <RosePetals />
     
       <div className={` ${!showFireworks ? 'card valentine-card ': 'accepted'}  `} >
       {!showFireworks ? <h1 className="main-text">Will you be my Valentine? Subhalakshmi ❤️</h1>:
       <div> <h1>You're my Valentine! ❤️</h1>
      <p>Thanks for saying yes — here's to love and happy moments.</p></div>
       }
        
        {
          !showFireworks &&
          <div className="buttons" ref={boxRef}>
          <button className="yes" onClick={handleYes} disabled={showFireworks}>
            Yes
          </button>

          <button
            className="no"
            style={{ position: 'absolute', left: noPos.left, top: noPos.top }}
            onMouseEnter={moveNoAway}
            onMouseOver={moveNoAway}
            onClick={(e) => e.preventDefault()}
          >
            No
          </button>
        </div>
        }
        </div>
      </div>
    
  )
}

export default App
