import { Routes, Route } from 'react-router-dom'
import WalletProvider from './features/wallet/WalletProvider'

import Home from './pages/Home'
import Intents from './pages/Intents'
import Trade from './pages/Trade'
import Mint from './pages/Mint'
import Vote from './pages/Vote'
import Insights from './pages/Insights'

const App = () => {
  return (
    <WalletProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/intents" element={<Intents />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/mint" element={<Mint />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </WalletProvider>
  )
}

export default App