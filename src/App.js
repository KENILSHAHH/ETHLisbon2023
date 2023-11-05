/** @format */

import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import HomePage from './Pages/HomePage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePageContents from './Pages/HomePageContents';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { WagmiConfig } from 'wagmi';
import { polygonZkEvmTestnet, gnosisChiado, neonDevnet } from 'wagmi/chains';
import Create from './Pages/Preferences';
const projectId = '33ca6721d9a9d08304e2063c7f72596a';
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};
const chains = [polygonZkEvmTestnet, gnosisChiado, neonDevnet];
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,

});
createWeb3Modal({ wagmiConfig, projectId, chains, themeMode: 'light' });
// https://youtube.com/shorts/ESfDVsjJKtM?feature=share
function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<HomePage pageContents={HomePageContents} />}
          />
          <Route
            path="/preferences"
            element={<HomePage pageContents={Create} />}
          />
        </Routes>
      </Router>
    </WagmiConfig>
  );
}

export default App;
