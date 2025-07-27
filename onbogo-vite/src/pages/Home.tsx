import ConnectButton from '../features/wallet/ConnectButton'
import NextButton from '../components/NextButton'

const Home = () => {
  return (
    <div>
      <h1>Onboard, Go, Govern.</h1>
      <ConnectButton />
      <NextButton to="/intents" label="Go to Intents" />
    </div>
  )
}

export default Home