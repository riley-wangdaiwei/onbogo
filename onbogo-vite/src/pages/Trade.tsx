import NextButton from '../components/NextButton'
import ProgressBar from '../components/ProgressBar'

export default function Trade() {
  return (
    <div>
      <ProgressBar />  
      <h1>Trade Page</h1>
      <NextButton to="/mint" label="Go to Mint" />
    </div>
  )
}