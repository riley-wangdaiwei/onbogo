import { useNavigate } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'
import { useAccount, useBalance } from 'wagmi'

const TOKEN_ADDRESS = '0x3247988647a331B68Ae86426F56CF56E9A2fbA1F'

export default function Intents() {
  const navigate = useNavigate()

  const { address, isConnected } = useAccount()

  const { data: balanceData, isError, isLoading } = useBalance({
    address,
    token: TOKEN_ADDRESS,
  })

  return (
    <div
      style={{
        backgroundColor: 'black',
        minHeight: '100vh',
        color: 'white',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        fontFamily: 'Space Grotesk, sans-serif',
      }}
    >
      <ProgressBar />

      {/* Container for texts, flex-grow to take available space */}
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1rem', // spacing between texts
          maxWidth: 600,
          margin: '0 auto',
        }}
      >
        <h1
          style={{
            fontWeight: '700',
            fontSize: '2rem',
            margin: 0,
          }}
        >
          Your Class Record
        </h1>

        <p
          style={{
            fontWeight: '400',
            fontSize: '1rem',
            color: '#ccc',
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          You onboarded, gone with the BUS, and governed by voting. Your BUS balance will onboard you this trip again 24/7.
        </p>

        {isConnected && (
          <div
            style={{
              fontWeight: '600',
              fontSize: '1.2rem',
              color: 'white',
            }}
          >
            Your BUS token balance:{' '}
            {isLoading
              ? 'Loading...'
              : isError
              ? 'Error fetching token balance'
              : `${balanceData?.formatted} ${balanceData?.symbol}`}
          </div>
        )}
      </div>

      {/* Button at the bottom */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: 100,
        }}
      >
        <button
          onClick={() => navigate('/insights')}
          style={{
            padding: '0.84rem 2.1rem',
            fontSize: '1.4rem',
            fontWeight: '700',
            borderRadius: '12px',
            backgroundColor: 'white',
            color: 'black',
            border: 'none',
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
          Ride to My Vote Log
        </button>
      </div>
    </div>
  )
}
