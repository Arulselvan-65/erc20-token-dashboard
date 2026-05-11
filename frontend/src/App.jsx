import { useState } from 'react';
import './App.css';
import { useWallet, WalletProvider } from './context/WalletContext';
import WalletConnect from './components/WalletConnect';
import TokenInfo from './components/TokenInfo';
import Mint from './components/Mint';
import Transfer from './components/Transfer';
import EventLog from './components/EventLog';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function App() {

  const { isOwner } = useWallet();

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
        toastStyle={{ zIndex: 100000 }}
        style={{ zIndex: 100000 }}
      />
      <WalletProvider>
        <section id="center">
          <h1 style={{ color: "#7237fc", fontWeight: "bold" }}>HToken Dashboard</h1>
          <WalletConnect />
          <TokenInfo />
          <Mint />
          <Transfer />
          <EventLog />
        </section>
      </WalletProvider>
    </>
  )
}

export default App;
