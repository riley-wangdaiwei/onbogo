import { useNavigate } from 'react-router-dom'

type NextButtonProps = {
  to: string
  label?: string
}

export default function NextButton({ to, label = 'Next' }: NextButtonProps) {
  const navigate = useNavigate()
  return <button onClick={() => navigate(to)}>{label}</button>
}