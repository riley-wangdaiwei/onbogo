import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ConnectButton from '../features/wallet/ConnectButton'
import ProgressBar from '../components/ProgressBar'

type EventData = {
  amount: string | null
  fee: string | null
  address: string | null
  tokenName: string | null
  id: string
}

const STORAGE_KEY = 'votes'

export default function Trade() {
  const navigate = useNavigate()
  const [events, setEvents] = useState<EventData[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [wallet, setWallet] = useState<string | null>(null)
  const [inputWallet, setInputWallet] = useState<string>('')
  const [latestVote, setLatestVote] = useState<string | null>(null)

  useEffect(() => {
    // Load latest vote from localStorage
    const existingVotes = localStorage.getItem(STORAGE_KEY)
    if (existingVotes) {
      const votes: string[] = JSON.parse(existingVotes)
      if (votes.length > 0) {
        setLatestVote(votes[votes.length - 1])
      }
    }
  }, [])

  useEffect(() => {
    if (!wallet) return

    async function fetchEvents() {
      try {
        const res = await fetch(
          `https://1inch-vercel-proxy-git-main-onbogos-projects.vercel.app/history/v2.0/history/${wallet}/events?chainId=1&limit=10`
        )
        if (!res.ok) {
          setError(`HTTP error: ${res.status}`)
          return
        }
        const data = await res.json()
        if (!data.items || data.items.length === 0) {
          setError('No events found')
          return
        }

        const latestThree = data.items.slice(0, 3)

        const eventsWithTokens = await Promise.all(
          latestThree.map(async (event: any) => {
            const addr = event.details?.tokenActions?.[0]?.address ?? null
            let tokenName = 'Unknown Token'
            if (addr) {
              try {
                const tokenRes = await fetch(
                  `https://1inch-vercel-proxy-git-main-onbogos-projects.vercel.app/token/v1.2/1/custom/${addr}`
                )
                if (tokenRes.ok) {
                  const tokenData = await tokenRes.json()
                  tokenName = tokenData.name ?? tokenName
                }
              } catch {
                // fallback silently
              }
            }

            return {
              id: event.id,
              amount: event.details?.tokenActions?.[0]?.amount ?? null,
              fee: event.details?.feeInSmallestNative ?? null,
              address: addr,
              tokenName,
            }
          })
        )

        setEvents(eventsWithTokens)
        setSelectedId(eventsWithTokens[0]?.id ?? null)
      } catch (e) {
        setError(`Fetch error: ${(e as Error).message}`)
      }
    }

    fetchEvents()
  }, [wallet])

  function storeVote() {
    const selectedEvent = events.find((e) => e.id === selectedId)
    if (!selectedEvent) return

    const { amount, fee, tokenName } = selectedEvent
    const sentence =
      amount && fee && tokenName
        ? `Your professor just got ${amount} ${tokenName} with gas fee of ${fee}.`
        : 'Data incomplete.'

    const existingVotes = localStorage.getItem(STORAGE_KEY)
    let votes: string[] = existingVotes ? JSON.parse(existingVotes) : []
    votes.push(sentence)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(votes))
    setLatestVote(sentence)
  }

  if (!wallet || events.length === 0) {
    return (
      <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', padding: 40 }}>
        <ProgressBar />
        <div style={{ textAlign: 'center', marginTop: 60 }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', marginBottom: 24 }}>
            Enter Professor's Wallet Address
          </h2>
          <input
            type="text"
            placeholder="0x..."
            value={inputWallet}
            onChange={(e) => setInputWallet(e.target.value)}
            style={{
              padding: '12px',
              fontSize: '1rem',
              borderRadius: '8px',
              border: 'none',
              width: '300px',
              marginRight: '12px',
            }}
          />
          <button
            onClick={() => {
              setError(null)
              setEvents([])
              setWallet(inputWallet.trim())
            }}
            style={{
              padding: '12px 20px',
              fontSize: '1rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: 'white',
              color: 'black',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Load Events
          </button>
          {error && <p style={{ color: 'red', marginTop: 20 }}>{error}</p>}
        </div>
      </div>
    )
  }

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

      {/* Multiple Choice Section */}
      <div style={{ marginTop: 60, marginBottom: 40, textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', marginBottom: 24 }}>
          Vote Your Professor's Smartest Trade
        </h2>

        <form
          style={{
            display: 'inline-block',
            textAlign: 'left',
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '1.2rem',
          }}
        >
          {events.map(({ id, amount, fee, tokenName }) => {
            const sentence =
              amount && fee && tokenName
                ? `Your professor just got ${amount} ${tokenName} with gas fee of ${fee}.`
                : 'Data incomplete.'

            return (
              <label
                key={id}
                style={{
                  display: 'block',
                  padding: '12px 20px',
                  borderRadius: 12,
                  backgroundColor: selectedId === id ? 'white' : '#222',
                  color: selectedId === id ? 'black' : 'white',
                  cursor: 'pointer',
                  marginBottom: 12,
                  transition: 'background-color 0.3s ease, color 0.3s ease',
                  userSelect: 'none',
                }}
              >
                <input
                  type="radio"
                  name="eventChoice"
                  value={id}
                  checked={selectedId === id}
                  onChange={() => setSelectedId(id)}
                  style={{ marginRight: 12, cursor: 'pointer' }}
                />
                {sentence}
              </label>
            )
          })}
        </form>
      </div>

      {/* Buttons Container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: 100,
          gap: 20,
        }}
      >
        <div style={{ transform: 'scale(1.7)' }}>
          <ConnectButton />
        </div>

        <button
          onClick={() => {
            storeVote()
            navigate('/mint')
          }}
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
          Vote and claim reward!
        </button>
      </div>
    </div>
  )
}

