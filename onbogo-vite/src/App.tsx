import WalletProvider from './features/wallet/WalletProvider';
import Home from './pages/Home';

const App = () => {
  return (
    <WalletProvider>
      <Home />
    </WalletProvider>
  );
};

export default App;