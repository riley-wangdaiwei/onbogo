import { useLocation } from 'react-router-dom'

const steps = ['/', '/intents', '/trade', '/mint', '/vote', '/insights']
const labels = ['Home', 'Intents', 'Trade', 'Mint', 'Vote', 'Insights']

export default function ProgressBar() {
  const { pathname } = useLocation()
  const currentStep = steps.indexOf(pathname)

  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
      {labels.map((label, i) => (
        <div
          key={label}
          style={{
            padding: '6px 12px',
            backgroundColor: i <= currentStep ? '#ffffff' : '#ccc',
            color: 'white',
            borderRadius: '4px',
            fontWeight: i === currentStep ? 'bold' : 'normal',
          }}
        >
          {label}
        </div>
      ))}
    </div>
  )
}