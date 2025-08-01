import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'

interface TokenInfo {
  symbol: string
  name: string
  address: string
  decimals: number
}

export default function Intents() {
  const navigate = useNavigate()
  const [gasFeeWei, setGasFeeWei] = useState<string | null>(null)
  const [swapSentence, setSwapSentence] = useState<string | null>(null)

  const [fromAddress, setFromAddress] = useState(
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
  ) // USDC
  const [toAddress, setToAddress] = useState(
    '0x0000000000000000000000000000000000000000'
  ) // ETH native
  const [amount, setAmount] = useState('25')

  // Fetch gas price on mount
  useEffect(() => {
    async function fetchGasPrice() {
      try {
        const res = await fetch(
          'https://1inch-vercel-proxy-git-main-onbogos-projects.vercel.app/gas-price/v1.4/1'
        )
        const data = await res.json()
        setGasFeeWei(data.medium?.maxFeePerGas || null)
      } catch (error) {
        console.error('Failed to fetch gas price:', error)
      }
    }
    fetchGasPrice()
  }, [])

  // Helper to fetch token info by address
  async function fetchTokenInfo(address: string): Promise<TokenInfo | null> {
    if (!address) return null
    try {
      const res = await fetch(
        `https://1inch-vercel-proxy-git-main-onbogos-projects.vercel.app/token/v1.2/1/custom/${address}`
      )
      if (!res.ok) {
        console.error('Failed to fetch token info for:', address)
        return null
      }
      const data = await res.json()
      return data as TokenInfo
    } catch (error) {
      console.error('Error fetching token info:', error)
      return null
    }
  }

  async function fetchSwapQuote() {
    setSwapSentence('Loading swap quote...')
    try {
      if (!fromAddress || !toAddress) {
        setSwapSentence('Please enter both token addresses.')
        return
      }

      if (isNaN(Number(amount)) || Number(amount) <= 0) {
        setSwapSentence('Please enter a valid positive amount.')
        return
      }

      // Fetch fromToken and toToken info for decimals and symbol
      const [fromTokenInfo, toTokenInfo] = await Promise.all([
        fetchTokenInfo(fromAddress),
        fetchTokenInfo(toAddress),
      ])

      if (!fromTokenInfo || !toTokenInfo) {
        setSwapSentence('Failed to fetch token info for one or both tokens.')
        return
      }

      // Convert amount to smallest unit string
      const amountBigInt = BigInt(
        Math.floor(Number(amount) * 10 ** fromTokenInfo.decimals)
      ).toString()

      const url =
        'https://1inch-vercel-proxy-git-main-onbogos-projects.vercel.app/fusion/quoter/v2.0/1/quote/receive'

      const params = new URLSearchParams({
        fromTokenAddress: fromAddress,
        toTokenAddress: toAddress,
        amount: amountBigInt,
        walletAddress: '0x0000000000000000000000000000000000000000',
        enableEstimate: 'false',
      })

      const response = await fetch(`${url}?${params.toString()}`)
      const data = await response.json()
      console.log('Swap quote response:', data)

      if (!data.toTokenAmount) {
        setSwapSentence('No valid quote available right now.')
        return
      }

      const toAmountWei = data.toTokenAmount as string
      const toAmountNum = Number(toAmountWei)
      if (isNaN(toAmountNum)) {
        setSwapSentence('Quote returned invalid amount.')
        return
      }

      const toAmount = toAmountNum / 10 ** toTokenInfo.decimals

      setSwapSentence(
        `Swapping ${amount} ${fromTokenInfo.symbol} right now would get you ~${toAmount.toFixed(
          6
        )} ${toTokenInfo.symbol}.`
      )
    } catch (error) {
      console.error('Error fetching swap quote:', error)
      setSwapSentence('Could not fetch swap quote at the moment.')
    }
  }

  return (
    <div
      style={{
        backgroundColor: 'black',
        minHeight: '100vh',
        color: 'white',
        padding: 40,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >

      <ProgressBar />

      {/* Header */}
      <h1
        style={{
          color: 'white',
          fontWeight: '700',
          fontSize: '2rem',
          textAlign: 'center',
          marginBottom: 24,
          fontFamily: 'Space Grotesk, sans-serif',
        }}
      >
        Onbogo School busers: learn by checking today's traffic.
      </h1>

      <div style={{ textAlign: 'center', fontSize: '1.3rem', marginTop: 20 }}>
        {gasFeeWei ? (
          <span>
            Live Estimated Gas Fee: <strong>{gasFeeWei} wei</strong>
          </span>
        ) : (
          <span>Loading gas fee...</span>
        )}
      </div>

      {/* Swap inputs: Swap [amount] of [from token address] for [to token address] */}
      <div
        style={{
          marginTop: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
          color: 'white',
          fontSize: '1.2rem',
        }}
      >
        <span>Swap</span>

        <input
          type="number"
          min="0"
          step="any"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            fontSize: '1.2rem',
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid white',
            backgroundColor: 'black',
            color: 'white',
            width: 120,
            textAlign: 'center',
          }}
        />

        <span>of</span>

        <input
          type="text"
          placeholder="From token address"
          value={fromAddress}
          onChange={(e) => setFromAddress(e.target.value.trim())}
          style={{
            fontSize: '1.2rem',
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid white',
            backgroundColor: 'black',
            color: 'white',
            width: 350,
            textAlign: 'center',
            textTransform: 'none',
          }}
        />

        <span>for</span>

        <input
          type="text"
          placeholder="To token address"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value.trim())}
          style={{
            fontSize: '1.2rem',
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid white',
            backgroundColor: 'black',
            color: 'white',
            width: 350,
            textAlign: 'center',
            textTransform: 'none',
          }}
        />

        <button
          onClick={fetchSwapQuote}
          style={{
            padding: '0.6rem 1.5rem',
            fontSize: '1.4rem',
            fontWeight: '700',
            borderRadius: 16,
            backgroundColor: 'white',
            color: 'black',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 6px 18px rgba(0,0,0,0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f0f0f0'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white'
          }}
        >
          Get Quote
        </button>
      </div>

      {/* Swap sentence display */}
      <div
        style={{
          textAlign: 'center',
          fontSize: '1.3rem',
          marginTop: 20,
          minHeight: 32,
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
        }}
      >
        {swapSentence || 'Enter token addresses and amount, then click Get Quote.'}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 120,
          gap: 100,
        }}
      >

        <button
          onClick={() => navigate('/trade')}
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
          Next →
        </button>
      </div>
    </div>
  )
}
