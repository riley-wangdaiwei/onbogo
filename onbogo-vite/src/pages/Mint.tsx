import NextButton from '../components/NextButton'
import ProgressBar from '../components/ProgressBar'

export default function Mint() {
  return (
    <div>
      <ProgressBar />  
      <h1>Mint Page</h1>
      <NextButton to="/vote" label="Go to Vote" />
    </div>
  )
}