import { useEffect, useState } from "react";
import { useWallet } from "../context/WalletContext";
import { ethers } from "ethers";

const Mint = () => {

    const { signer, contract, isConnected, account, showToast, isOwner, triggerRefresh } = useWallet();
    const [recipient, setRecipient] = useState([]);
    const [amount, setAmount] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (recipient.length !== 42) {
            showToast("Enter a valid Address.", "error");
            return;
        }
        if (amount <= 0) {
            showToast("Enter a valid token amount.", "error");
            return;
        }
        try {
            const tx = await contract.mint(recipient, ethers.parseEther(`${amount}`));
            await tx.wait();
            showToast("Token Minted", "success");
            triggerRefresh();
            return;
        } catch (err) {
            if (err.code === 4001 || err.code === "ACTION_REJECTED") {
                showToast("Transaction denied by user", "error");
                return;
            }
            const decodedError = contract.interface.parseError(err.data);
            switch (decodedError.name) {
                case "OwnableUnauthorizedAccount":
                    showToast("Only owner is allowed to mint", "error");
                    break;
                case "ExceedsMintLimit":
                    showToast("Mint Limit Exceeds!", "error");
                    break;
                default:
                    showToast(`Contract error: ${decodedError.name}`, "error");
            }
        }
    }

    return (
        <>
            { 
                (isConnected && isOwner) ?
                    (
                        <div className="card" style={{
                            border: "1px gray solid", width: "90%", height: "auto", borderRadius: "12px", display: "flex",
                            flexDirection: "column", padding: "15px", flexWrap: "wrap"
                        }}>
                            <div style={{ justifyItems: "left", marginBottom: "10px" }}>
                                <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                                    Mint Tokens 
                                </p>
                            </div>

                            <form style={{
                                display: "flex", justifyContent: "flex-start", gap: "15px",
                                width: "100%", flexDirection: "column"
                            }}
                                onSubmit={handleSubmit}>
                                <div style={{ justifyItems: "left", width: "100%" }}>
                                    <p style={{ marginBottom: "5px" }}>Recipient Address</p>
                                    <input
                                        type="text"
                                        required={true}
                                        placeholder="0xf39F...7265"
                                        onChange={(e) => setRecipient(e.target.value)}
                                    />
                                </div>
                                <div style={{ justifyItems: "left", width: "100%" }}>
                                    <p style={{ marginBottom: "5px" }}>Amount</p>
                                    <input
                                        type="number"
                                        required={true}
                                        placeholder="100"
                                        onChange={(e) => setAmount(e.target.value)} />
                                </div>
                                <div>
                                    <button>
                                        Mint Tokens
                                    </button>
                                </div>
                            </form>
                        </div>
                    )
                    : ""
            }
        </>
    )
}

export default Mint;