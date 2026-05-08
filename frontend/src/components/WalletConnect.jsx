import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useWallet } from "../context/WalletContext";
import contractData from "../utils/HToken.json";
import TokenInfo from "./TokenInfo";

const WalletConnect = () => {
    const { setSigner, isConnected, setIsConnected, setContract, account, setAccount, showToast } = useWallet();

    useEffect(() => {
        window.ethereum.on("chainChanged", () => {
            setIsConnected(false);
        });
        window.ethereum.on("accountsChanged", () => {
            setIsConnected(false);
        });
    });

    const connectWallet = async () => {
        if (!window.ethereum) {
            alert("Please install MetaMask");
            return;
        }
        if (typeof window.ethereum !== "undefined") {
            try{
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            const message = `Connect and sign with React DApp at ${new Date().toLocaleString()}`;
            await signer.signMessage(message);
            setIsConnected(true);
            setSigner(signer);
            setAccount(address);
            getContract(signer);
            showToast("Wallet Connected", "success");
            } catch(err) {
                showToast("Wallet connection failed.", "error");
            }
        }
    }

    const getContract = async (signer) => {
        const contract = await new ethers.Contract(contractData.address, contractData.abi, signer);
        setContract(contract);
    }

    return (
        <>
            {
                isConnected ?
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
                                    <div style={{
                                        borderRadius: "50%", height: "10px", width: "10px",
                                        backgroundColor: "green", marginRight: "10px"
                                    }}></div>
                                    <p>Connected</p>
                                </div>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div>
                            <p style={{ marginBottom: "20px", color: "gray" }}>Connect your wallet to continue......</p>
                            <button onClick={connectWallet} className="connect-button">
                                Connect Wallet
                            </button>
                        </div>

                    )
            }
        </>
    )
}

export default WalletConnect;