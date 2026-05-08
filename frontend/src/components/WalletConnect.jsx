import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useWallet } from "../context/WalletContext";
import contractData from "../utils/HToken.json";
import TokenInfo from "./TokenInfo";

const WalletConnect = () => {
    const { setSigner, setIsConnected, setContract, account, setAccount } = useWallet();
    const [isWalletConnected, setIsWalletConnected] = useState(false);

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on("chainChanged", () => {
                setIsWalletConnected(false);
            });
            window.ethereum.on("accountsChanged", () => {
                setIsWalletConnected(false);
            });
             window.ethereum.on("networkChanged", () => {
                window.location.reload()
            });
        }
    });

    const connectWallet = async () => {
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            const message = `Connect and sign with React DApp at ${new Date().toLocaleString()}`;
            await signer.signMessage(message);
            setIsWalletConnected(true);
            setIsConnected(true);
            setSigner(signer);
            setAccount(address);
            getContract(signer);
        }
    }

    const getContract = async (signer) => {
        const contract = await new ethers.Contract(contractData.address, contractData.abi, signer);
        setContract(contract);
    }

    return (
        <>
            {
                isWalletConnected ?
                    (
                        <div className="card" style={{
                            border: "1px gray solid", width: "90%", height: "auto", borderRadius: "12px", display: "flex",
                            justifyContent: "space-between", padding: "15px", flexWrap: "wrap"
                        }}>
                            <div style={{ justifyItems: "flex-start" }}>
                                <p>Wallet</p>
                                <p>{account.slice(0, 6)}...{account.slice(-4)}</p>
                            </div>
                            <div style={{ alignContent: "center" }}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <div style={{ borderRadius: "50%", height: "10px", width: "10px", backgroundColor: "green", marginRight: "10px" }}></div>
                                    <p>Connected</p>
                                </div>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div>
                            <button onClick={connectWallet}
                                style={{
                                    padding: "6px", borderRadius: "6px", backgroundColor: "transparent",
                                    cursor: "pointer", border: "1px grey solid", outline: "none"
                                }}>
                                Connect Wallet
                            </button>
                        </div>

                    )
            }
        </>
    )
}

export default WalletConnect;