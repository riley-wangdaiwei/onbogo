import { Routes, Route } from 'react-router-dom'
import WalletProvider from './features/wallet/WalletProvider'

import Home from './pages/Home'
import Intents from './pages/Intents'
import Trade from './pages/Trade'

const App = () => {
  return (
    <WalletProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/intents" element={<Intents />} />
        <Route path="/trade" element={<Trade />} />
      </Routes>
    </WalletProvider>
  )
}

export default App