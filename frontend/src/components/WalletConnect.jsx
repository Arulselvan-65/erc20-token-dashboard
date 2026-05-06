import { ethers } from "ethers";
import { useEffect, useState } from "react";

const provider = new ethers.BrowserProvider(window.ethereum);

function WalletConnect() {
    const [account, setAccount] = useState(null);
    const [isWalletConnected, setIsWalletConnected] = useState(false);

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on("chainChanged", () => {
                window.location.reload();
            });
            window.ethereum.on("accountsChanged", () => {
                window.location.reload();
            })
        }
    })

    const connectWallet = async () => {
        if (typeof window.ethereum != undefined) {
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address);
            const message = `Connect and sign with React DApp at ${new Date().toLocaleString()}`;
            await signer.signMessage(message);
            console.log("Connected")
            setIsWalletConnected(true);
        }
    }

    return (
        <>
            {
                isWalletConnected ?
                    (
                        <div style={{
                            border: "1px gray solid", width: "90%", height: "auto", borderRadius: "12px", display: "flex",
                            justifyContent: "space-between", padding: "15px", flexWrap: "wrap"
                        }}>
                            <div style={{ justifyItems: "flex-start" }}>
                                <p>Wallet</p>
                                <p>{account}</p>
                            </div>
                            <div style={{ alignContent: "center" }}>
                                <div style={{display: "flex", alignItems: "center"}}>
                                <div style={{borderRadius: "50%", height: "10px", width: "10px", backgroundColor: "green", marginRight: "10px"}}></div>
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

            <h1>Welcome Back!!</h1>


        </>
    )
}

export default WalletConnect;