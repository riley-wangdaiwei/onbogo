import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import ConnectButton from '../features/wallet/ConnectButton'
import { useNavigate } from 'react-router-dom'
import logo from '../images/logo_onbogo_white.png'

export default function Home() {
  const glassControls = useAnimation()
  const logoControls = useAnimation()
  const navigate = useNavigate()

  useEffect(() => {
    const glassPositions = ['-135%', '0%', '135%']
    let idx = 0

    const animateGlass = () => {
      glassControls.start({
        y: glassPositions[idx],
        transition: { duration: 1.5, ease: 'easeInOut' },
      })
      idx = (idx + 1) % glassPositions.length
    }

    animateGlass()
    const interval = setInterval(animateGlass, 1800)

    logoControls.start({
      x: [1500, -1500],
      transition: { duration: 12, ease: 'linear', repeat: Infinity },
    })

    return () => clearInterval(interval)
  }, [glassControls, logoControls])

  return (
    <div
      style={{
        backgroundColor: 'black',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        color: 'white',
        fontFamily: 'Space Grotesk, sans-serif',
        gap: '60px',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative', width: 750, height: 375 }}>
        {/* Sliding Logo */}
        <motion.img
          src={logo}
          alt="Onbogo Logo"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 950,
            height: 475,
            objectFit: 'contain',
            zIndex: 0,
          }}
          animate={logoControls}
        />

        {/* Three-line Text */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            margin: 0,
            fontWeight: 600,
            fontSize: '5rem',
            userSelect: 'none',
            color: 'white',
            lineHeight: 2.5,
            whiteSpace: 'pre-line',
            textAlign: 'center',
            zIndex: 2,
          }}
        >
          {'Onboard,\nGo,\nGovern.'}
        </div>

        {/* Moving Glass Highlight */}
        <motion.div
          animate={glassControls}
          style={{
            position: 'absolute',
            top: '32%',
            left: '20%',
            width: '60%',
            height: '40%',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(25px)',
            WebkitBackdropFilter: 'blur(25px)',
            borderRadius: 16,
            border: '1.5px solid rgba(255, 255, 255, 0.25)',
            boxShadow:
              'inset 0 0 10px rgba(255, 255, 255, 0.2), 0 4px 30px rgba(0,0,0,0.2)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      </div>

      {/* Buttons */}
      <div
        style={{
          display: 'flex',
          gap: 50,
          zIndex: 10,
          transform: 'scale(1.5)',
          marginTop: '80px',
          alignItems: 'center',
        }}
      >
        <ConnectButton />

        <button
          onClick={() => navigate('/intents')}
          style={{
            padding: '0.8rem 2rem',
            fontSize: '1.1rem',
            fontWeight: '700',
            borderRadius: '12px',
            backgroundColor: 'white',
            color: 'black',
            border: 'none',
            fontFamily: 'inherit',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
            transition: 'background 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f0f0f0'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white'
          }}
        >
          Start to Trade by a Few Clicks
        </button>
      </div>
    </div>
  )
}
