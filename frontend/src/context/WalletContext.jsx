import { createContext, useContext, useState } from "react";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {

    const [signer, setSigner] = useState();
    const [account, setAccount] = useState();
    const [isConnected, setIsConnected] = useState(false);
    const [contract, setContract] = useState();

    return (
        <WalletContext.Provider
            value={{
                signer,
                setSigner,
                account,
                setAccount,
                isConnected,
                setIsConnected,
                contract,
                setContract
            }}
        >
            {children}
        </WalletContext.Provider>
    )
}

export const useWallet = () => {
    return useContext(WalletContext);
}