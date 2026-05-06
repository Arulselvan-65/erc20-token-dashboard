import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import WalletConnect from './components/WalletConnect'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <WalletConnect/>
      </section>
      </>
  )
}

export default App;
