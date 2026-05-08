import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import WalletConnect from './components/WalletConnect'
import { WalletProvider } from './context/WalletContext'
import TokenInfo from './components/TokenInfo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <WalletProvider>
        <section id="center">
          <WalletConnect />
          <TokenInfo />
        </section>
      </WalletProvider>
    </>
  )
}

export default App;
