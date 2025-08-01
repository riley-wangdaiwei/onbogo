import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NextButton from '../components/NextButton'
import ProgressBar from '../components/ProgressBar'

const STORAGE_KEY = 'votes'

export default function Mint() {
  const [latestVote, setLatestVote] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const existingVotes = localStorage.getItem(STORAGE_KEY)
    if (existingVotes) {
      const parsedVotes: string[] = JSON.parse(existingVotes)
      if (parsedVotes.length > 0) {
        setLatestVote(parsedVotes[parsedVotes.length - 1])
      }
    }
  }, [])

  return (
    <div
      style={{
        backgroundColor: 'black',
        minHeight: '100vh',
        color: 'white',
        padding: 40,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <ProgressBar />

      <div
        style={{
          textAlign: 'center',
          fontSize: '1.3rem',
          marginTop: 80,
          marginBottom: 380,
          minHeight: 80,
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          fontFamily: 'Space Grotesk, sans-serif',
        }}
      >
        <h2>Your Vote:</h2>
        {latestVote ? (
          <p
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginTop: 12,
              color: 'white',
            }}
          >
            {latestVote}
          </p>
        ) : (
          <p>No vote stored.</p>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 120,
        }}
      >
        <button
          onClick={() => navigate('/vote')}
          style={{
            padding: '1rem 2.3rem',
            fontSize: '1.8rem',
            fontWeight: '700',
            borderRadius: 16,
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
          Complete
        </button>
      </div>
    </div>
  )
}

