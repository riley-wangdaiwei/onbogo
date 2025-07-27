import BackButton from '../components/BackButton'
import NextButton from '../components/NextButton'
import ProgressBar from '../components/ProgressBar'

export default function Intents() {
  return (
    <div>
      <ProgressBar />
      <h1>Intents Page</h1>
      <BackButton to="/" label="Back to Home" />
      <NextButton to="/trade" label="Go to Trade" />
    </div>
  )
}