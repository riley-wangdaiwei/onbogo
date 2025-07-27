import BackButton from '../components/BackButton'
import NextButton from '../components/NextButton'

export default function Intents() {
  return (
    <div>
      <h1>Intents Page</h1>
      <BackButton to="/" label="Back to Home" />
      <NextButton to="/trade" label="Go to Trade" />
    </div>
  )
}