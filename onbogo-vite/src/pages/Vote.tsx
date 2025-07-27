import NextButton from '../components/NextButton'
import ProgressBar from '../components/ProgressBar'

export default function Vote() {
  return (
    <div>
      <ProgressBar />  
      <h1>Vote Page</h1>
      <NextButton to="/insights" label="Go to Insights" />
    </div>
  )
}