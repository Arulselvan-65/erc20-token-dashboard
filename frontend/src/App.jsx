import { useState } from 'react'
import viteLogo from './assets/vite.svg'
import './App.css'
import WalletConnect from './components/WalletConnect'
import { WalletProvider } from './context/WalletContext'
import TokenInfo from './components/TokenInfo'
import Transfer from './components/Transfer'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify"

function App() {

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        theme="dark"
      />
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
