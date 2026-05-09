import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {

    const [signer, setSigner] = useState();
    const [account, setAccount] = useState();
    const [isConnected, setIsConnected] = useState(false);
    const [contract, setContract] = useState();
    const [isOwner, setIsOwner] = useState(false);

    const showToast = (text, type) => {
        if (type === "success") {
            toast.success(text);
        }
        else if (type === "error") {
            toast.error(text);
        }
        else {
            toast(text);
        }
    };

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
                setContract,
                showToast,
                isOwner,
                setIsOwner
            }}
        >
            {children}
        </WalletContext.Provider>
    )
}

export const useWallet = () => {
    return useContext(WalletContext);
}