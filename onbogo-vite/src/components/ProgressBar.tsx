import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, useAnimation } from 'framer-motion'
import logo from '../images/logo_onbogo_white.png'
import ConnectButton from '../features/wallet/ConnectButton' 

const steps = ['/', '/intents', '/trade', '/mint', '/vote', '/insights']
const labels = ['Home', 'Learn', 'Vote', 'Ballot', 'Complete', 'Insights']

export default function ProgressBar() {
  const { pathname } = useLocation()
  const currentStep = steps.indexOf(pathname)
  const containerRef = useRef(null)
  const [glassLeft, setGlassLeft] = useState(0)
  const [glassWidth, setGlassWidth] = useState(0)

  const logoControls = useAnimation()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const stepWidth = container.offsetWidth / labels.length
    setGlassLeft(stepWidth * currentStep)
    setGlassWidth(stepWidth)
  }, [currentStep])

  useEffect(() => {
    logoControls.start({
      x: ['-150%', '1300%'],
      transition: {
        duration: 12,
        ease: 'linear',
        repeat: Infinity,
      },
    })
  }, [logoControls])

  return (
    <>
      {/* Progress Bar */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          display: 'flex',
          gap: '8px',
          marginTop: '40px',
          marginBottom: '20px',
          justifyContent: 'center',
          padding: '10px 0',
          backgroundColor: 'black',
          overflow: 'visible',
          fontFamily: 'Space Grotesk, sans-serif',
          height: 70,
        }}
      >
        {/* Moving logo behind (zIndex 0) */}
        <motion.img
          src={logo}
          alt="Onbogo Logo"
          animate={logoControls}
          style={{
            position: 'absolute',
            top: '25%',
            left: 0,
            height: '40px',
            objectFit: 'contain',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 0,
          }}
        />

        {/* Glass animation (zIndex 1) */}
        <div
          style={{
            position: 'absolute',
            top: 5,
            bottom: 10,
            left: `${glassLeft}px`,
            width: `${glassWidth}px`,
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'left 0.8s ease-in-out',
            zIndex: 1,
          }}
        />

        {/* Step labels (zIndex 2) */}
        {labels.map((label, i) => (
          <div
            key={label}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '15px 0',
              color: i <= currentStep ? '#fff' : '#888',
              zIndex: 2,
              fontWeight: 'bold',
              userSelect: 'none',
            }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Connect Wallet Button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          paddingRight: '40px',
          marginBottom: '30px',
        }}
      >
        <div style={{ transform: 'scale(1.2)' }}>
          <ConnectButton />
        </div>
      </div>
    </>
  )
}
