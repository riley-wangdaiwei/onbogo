import { useNavigate } from 'react-router-dom'
import ConnectButton from '../features/wallet/ConnectButton'
import ProgressBar from '../components/ProgressBar'

export default function Intents() {
  const navigate = useNavigate()

  return (
    <div
      style={{
        backgroundColor: 'black',
        minHeight: '100vh',
        color: 'white',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <ProgressBar />

      {/* Buttons Container */}
      <div
        style={{
          display: 'flex',
          gap: 200,
          justifyContent: 'center',
          marginTop: '2px',  
          alignItems: 'center',
          paddingBottom: '100px',
        }}
      >
        <div style={{ transform: 'scale(1.7)' }}>
          <ConnectButton />
        </div>

        <button
          onClick={() => navigate('/trade')}
          style={{
            padding: '0.84rem 2.1rem',
            fontSize: '1.4rem',
            fontWeight: '700',
            borderRadius: '12px',
            backgroundColor: 'white',
            color: 'black',
            border: 'none',
            fontFamily: 'Space Grotesk, sans-serif',
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
          Start to Trade!
        </button>
      </div>
    </div>
  )
}

