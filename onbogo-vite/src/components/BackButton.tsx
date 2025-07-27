import { useNavigate } from 'react-router-dom'

type BackButtonProps = {
  to?: string  // optional: if not provided, navigates back one step
  label?: string
}

export default function BackButton({ to, label = 'Back' }: BackButtonProps) {
  const navigate = useNavigate()
  return (
    <button onClick={() => (to ? navigate(to) : navigate(-1))}>
      {label}
    </button>
  )
}