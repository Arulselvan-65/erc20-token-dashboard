import { useEffect, useState } from "react";
import { useWallet } from "../context/WalletContext";

const Transfer = () => {

    const { signer, contract, isConnected, account } = useWallet();
    const [recipient, setRecipient] = useState([]);
    const [amount, setAmount] = useState(0);

    const handleSubmit = async () => {
        console.log(recipient);
        console.log(amount);
    }

    return (
        <>
            {
                isConnected ?
                    (
                        <div className="card" style={{
                            border: "1px gray solid", width: "90%", height: "auto", borderRadius: "12px", display: "flex",
                            flexDirection: "column", padding: "15px", flexWrap: "wrap"
                        }}>
                            <div style={{ justifyItems: "left", marginBottom: "10px" }}>
                                <p style={{ fontSize: "20px", fontWeight: "bold" }}>Transfer Tokens</p>
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-start", gap: "15px", width: "100%", flexDirection: "column" }}>
                                <div style={{ justifyItems: "left", width: "100%" }}>
                                    <p style={{ marginBottom: "5px" }}>Recipient Address</p>
                                    <input
                                        type="text"
                                        placeholder="0xf39F...7265"
                                        onChange={(e) => setRecipient(e.target.value)}
                                    />
                                </div>
                                <div style={{ justifyItems: "left", width: "100%" }}>
                                    <p style={{ marginBottom: "5px" }}>Amount</p>
                                    <input
                                        type="number"
                                        placeholder="100"
                                        onChange={(e) => setAmount(e.target.value)} />
                                </div>
                            </div>
                            <div style={{ margin: "20px", marginBottom: "0" }}>
                                <button onClick={handleSubmit}>
                                    Transfer
                                </button>
                            </div>

                        </div>
                    )
                    : ""
            }
        </>
    )
}

export default Transfer;