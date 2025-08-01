import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'

const STORAGE_KEY = 'votes'

type ParsedVote = {
  amount: number
  gas: number
  token: string
  preference: number
}

function parseVote(raw: string): ParsedVote | null {
  const amountMatch = raw.match(/got ([\d.]+) ([\w\s]+)/)
  const gasMatch = raw.match(/gas fee of (\d+)/)

  if (!amountMatch || !gasMatch) return null

  const amount = parseFloat(amountMatch[1])
  const token = amountMatch[2].trim()
  const gas = parseFloat(gasMatch[1])

  return { amount, gas, token, preference: 0 }
}

function computePreferences(votes: ParsedVote[]): ParsedVote[] {
  const maxAmount = Math.max(...votes.map(v => v.amount))
  const maxGas = Math.max(...votes.map(v => v.gas))

  return votes.map(v => {
    const normAmount = v.amount / maxAmount
    const normGas = v.gas / maxGas
    const preference = normAmount / (normAmount + normGas)
    return { ...v, preference }
  })
}

function PreferenceBar({ preference }: { preference: number }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#ccc' }}>
        <span>Gas Preference</span>
        <span>Amount Preference</span>
      </div>
      <div style={{ position: 'relative', height: 20, background: '#333', borderRadius: 10 }}>
        <div
          style={{
            position: 'absolute',
            left: `${preference * 100}%`,
            transform: 'translateX(-50%)',
            top: -5,
            fontSize: 18,
            color: '#fff',
          }}
        >
          ●
        </div>
      </div>
    </div>
  )
}

export default function Insights() {
  const [parsedVotes, setParsedVotes] = useState<ParsedVote[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const storedVotes = localStorage.getItem(STORAGE_KEY)
    if (storedVotes) {
      const rawVotes: string[] = JSON.parse(storedVotes)
      const parsed = rawVotes.map(parseVote).filter(Boolean) as ParsedVote[]
      setParsedVotes(computePreferences(parsed))
    }
  }, [])

  return (
    <div style={{ padding: 20, backgroundColor: '#000', minHeight: '100vh', color: '#eee' }}>
      <ProgressBar />
      <h1 style={{ color: '#fff' }}>Bus Ride Trip Review</h1>

      <h2 style={{ marginTop: 20 }}>What is the Onbogo Ratio?</h2>
      <p style={{ maxWidth: 600, lineHeight: 1.6 }}>
        The <strong>Onbogo Ratio</strong> reflects preference between trade <strong>amount</strong> and <strong>gas fee</strong>.
        It is calculated as:
      </p>
      <pre
        style={{
          backgroundColor: '#111',
          padding: '10px 15px',
          borderRadius: '8px',
          margin: '12px 0',
          fontSize: '16px',
          fontFamily: 'monospace',
          color: '#fff',
        }}
      >
        normalizedAmount / (normalizedAmount + normalizedGas)
      </pre>
      <p>
        → Closer to <strong>0</strong> means gas was prioritized. <br />
        → Closer to <strong>1</strong> means amount was prioritized.
      </p>

      <h2 style={{ marginTop: 30 }}>Preference Balance (Amount vs Gas):</h2>
      {parsedVotes.length === 0 ? (
        <p>No votes stored yet.</p>
      ) : (
        parsedVotes.map((vote, idx) => (
          <div key={idx}>
            <p>
              {vote.amount.toLocaleString()} {vote.token} with gas {vote.gas.toLocaleString()}
            </p>
            <PreferenceBar preference={vote.preference} />
          </div>
        ))
      )}

      <div style={{ marginTop: 40 }}>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1.2rem',
            fontWeight: '600',
            borderRadius: 10,
            backgroundColor: '#fff',
            color: '#000',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Back to Home & Restart the Ride
        </button>
      </div>
    </div>
  )
}
