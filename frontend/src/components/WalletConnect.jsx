import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useWallet } from "../context/WalletContext";
import contractData from "../utils/HToken.json";
import TokenInfo from "./TokenInfo";

const WalletConnect = () => {
    const { setSigner, isConnected, setIsConnected, setContract, account, setAccount, showToast, setIsOwner } = useWallet();

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on("chainChanged", () => {
                localStorage.removeItem("wallet_session");
                setIsConnected(false);
            });
            window.ethereum.on("accountsChanged", () => {
                console.log("trigger")
                localStorage.removeItem("wallet_session");
                setIsConnected(false);
            });
        }
    });

    useEffect(() => {
        if (!isConnected) {
            reconnectWallet();
        }
    }, []);

    const reconnectWallet = async () => {
        try {
            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            if (!accounts || accounts.length === 0) return;

            const session = JSON.parse(localStorage.getItem("wallet_session"));
            if (!session) return;

            let isExpired = (Date.now() - session.timestamp) > (24 * 60 * 60 * 1000)
            if (isExpired || accounts[0].toLowerCase() != session.address.toLowerCase()) {
                localStorage.removeItem("wallet_session");
                return;
            }
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            setIsConnected(true);
            setSigner(signer);
            setAccount(session.address);
            getContract(signer, session.address);
        } catch (err) {
            showToast("Wallet connection failed.", "error");
        }
    }

    const connectWallet = async () => {
        if (!window.ethereum) {
            alert("Please install MetaMask");
            return;
        }
        if (typeof window.ethereum !== "undefined") {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                if ((await provider.getNetwork()).chainId != 11155111) {
                    await window.ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: "0xaa36a7" }]
                    });
                }
                const message = `Connect and sign with React DApp at ${new Date().toLocaleString()}`;
                await signer.signMessage(message);
                setIsConnected(true);
                setSigner(signer);
                setAccount(address);
                getContract(signer, address);
                showToast("Wallet Connected", "success");
                localStorage.setItem("wallet_session", JSON.stringify({
                    connected: true,
                    address: address,
                    timestamp: Date.now()
                }))
            } catch (err) {
                showToast("Wallet connection failed.", "error");
            }
        }
    }

    const DisconnectWallet = () => {
        localStorage.removeItem("wallet_session");
        window.location.reload();

    }

    const getContract = async (signer, address) => {
        const contract = await new ethers.Contract(contractData.address, contractData.abi, signer);
        setContract(contract);
        const owner = await contract.owner();
        if (owner == address) setIsOwner(true);
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
                            <div>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <div style={{
                                        borderRadius: "50%", height: "10px", width: "10px",
                                        backgroundColor: "green", marginRight: "10px"
                                    }}></div>
                                    <p>Connected</p>
                                </div>
                                <button style={{
                                    width: "106px", padding: "0px", height: "25px", borderRadius: "5px",
                                    backgroundColor: "transparent", fontWeight: "normal", border: "1px solid #fb542b",
                                    color: "#fb542b"
                                }} onClick={DisconnectWallet}>Disconnect</button>
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