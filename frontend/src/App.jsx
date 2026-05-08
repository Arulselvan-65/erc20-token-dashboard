import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import WalletConnect from './components/WalletConnect'
import { WalletProvider } from './context/WalletContext'
import TokenInfo from './components/TokenInfo'
import Transfer from './components/Transfer'


function App() {

  return (
    <>
      <WalletProvider>
        <section id="center">
          <h1 style={{ color: "#7237fc", fontWeight: "bold" }}>HToken Dashboard</h1>
          <WalletConnect />
          <TokenInfo />
          <Transfer />
        </section>
      </WalletProvider>
    </>
  )
}

export default App;
