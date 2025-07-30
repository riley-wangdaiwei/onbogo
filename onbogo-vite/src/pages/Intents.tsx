import { useNavigate } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'
import ConnectButton from '../features/wallet/ConnectButton'

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

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 120,
          gap: '100px', // spacing between the buttons
        }}
      >
        <div style={{ transform: 'scale(1.7)' }}>
          <ConnectButton />
        </div>

        <button
          onClick={() => navigate('/trade')}
          style={{
            padding: '0.6rem 1.5rem',
            fontSize: '1.8rem',
            fontWeight: '700',
            borderRadius: '16px',
            backgroundColor: 'white',
            color: 'black',
            border: 'none',
            fontFamily: 'Space Grotesk, sans-serif',
            cursor: 'pointer',
            boxShadow: '0 6px 18px rgba(0,0,0,0.3)',
            transition: 'background 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f0f0f0'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white'
          }}
        >
          Next →
        </button>
      </div>
    </div>
  )
}
