import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import ConnectButton from '../features/wallet/ConnectButton'
import ProgressBar from '../components/ProgressBar'

export default function Intents() {
  const navigate = useNavigate()
  const [amount, setAmount] = useState('')
  const [tokens, setTokens] = useState<{ symbol: string; logoURI: string; address: string }[]>([])
  const [selectedToken, setSelectedToken] = useState<{ symbol: string; logoURI: string } | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchTokens() {
      try {
        const urls = [
          'https://1inch-vercel-proxy-git-main-onbogos-projects.vercel.app/token/v1.2/1/custom/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
          'https://1inch-vercel-proxy-git-main-onbogos-projects.vercel.app/token/v1.2/1/custom/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
          // add more token URLs here if you want
        ]

        const responses = await Promise.all(urls.map(url => fetch(url)))
        const fetchedTokens = await Promise.all(responses.map(res => res.json()))
        setTokens(fetchedTokens)
        setSelectedToken({ symbol: fetchedTokens[0].symbol, logoURI: fetchedTokens[0].logoURI })
      } catch (error) {
        console.error('Failed to fetch tokens:', error)
      }
    }

    fetchTokens()
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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

      {/* Token Dropdown + Amount Input */}
      <div
        style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '60px',
          marginBottom: '40px',
        }}
      >
        {selectedToken ? (
          <div
            ref={dropdownRef}
            style={{
              position: 'relative',
              cursor: 'pointer',
              userSelect: 'none',
              minWidth: '150px',
            }}
          >
            {/* Dropdown button */}
            <div
              onClick={() => setIsOpen(!isOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '0.75rem 1rem',
                fontSize: '1.2rem',
                borderRadius: '12px',
                backgroundColor: 'white',
                color: 'black',
                fontFamily: 'Space Grotesk, sans-serif',
                border: 'none',
              }}
            >
              <img
                src={selectedToken.logoURI}
                alt={selectedToken.symbol}
                style={{ width: 24, height: 24, borderRadius: 6 }}
              />
              <span>{selectedToken.symbol}</span>
              <svg
                style={{ marginLeft: 'auto' }}
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            {/* Dropdown list */}
            {isOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '110%',
                  left: 0,
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                  width: '100%',
                  zIndex: 10,
                  maxHeight: '200px',
                  overflowY: 'auto',
                }}
              >
                {tokens.map((token) => (
                  <div
                    key={token.symbol}
                    onClick={() => {
                      setSelectedToken({ symbol: token.symbol, logoURI: token.logoURI })
                      setIsOpen(false)
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '0.75rem 1rem',
                      fontSize: '1.2rem',
                      cursor: 'pointer',
                      color: 'black',
                      fontFamily: 'Space Grotesk, sans-serif',
                      userSelect: 'none',
                    }}
                  >
                    <img
                      src={token.logoURI}
                      alt={token.symbol}
                      style={{ width: 24, height: 24, borderRadius: 6 }}
                    />
                    <span>{token.symbol}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <p>Loading token info...</p>
        )}

        {/* Amount Input */}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          style={{
            padding: '0.75rem 1rem',
            fontSize: '1.2rem',
            borderRadius: '12px',
            border: 'none',
            fontFamily: 'Space Grotesk, sans-serif',
            width: '200px',
            backgroundColor: 'white',
            color: 'black',
          }}
        />
      </div>

      {/* Buttons Container */}
      <div
        style={{
          display: 'flex',
          gap: 200,
          justifyContent: 'center',
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
