import { useEffect, useState } from "react";
import { useWallet } from "../context/WalletContext";
import { ethers } from "ethers";
import TransactionModal from './TransactionModal';

const Transfer = () => {

    const { signer, contract, isConnected, account, showToast, triggerRefresh } = useWallet();
    const [recipient, setRecipient] = useState([]);
    const [amount, setAmount] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState("loading");
    const [txhash, setTxHash] = useState();

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
            setIsModalOpen(true);
            setStatus("loading");
            const tx = await contract.transfer(recipient, ethers.parseEther(`${amount}`));
            await tx.wait();
            showToast("Token Transferred", "success");
            setTxHash(await tx.hash)
            setStatus("success");
            triggerRefresh();
            setRecipient([]);
            setAmount();
            return;
        } catch (err) {
            if (err.code === 4001 || err.code === "ACTION_REJECTED") {
                showToast("Transaction denied by user", "error");
                setStatus("error");
                return;
            }
            const decodedError = contract.interface.parseError(err.data);
            switch (decodedError.name) {
                case "ERC20InsufficientBalance":
                    showToast("Insufficient Balance", "error");
                    break;
                default:
                    showToast(`Contract error: ${decodedError.name}`, "error");
            }
            setStatus("error");
        }
    }

    return (
        <>
            {isModalOpen ?
                <TransactionModal status={status} txhash={txhash} onClose={() => setIsModalOpen(false)} />
                : ""
            }
            {
                isConnected ?
                    (
                        <div className="card" style={{
                            border: "1px gray solid", width: "90%", height: "auto", borderRadius: "12px", display: "flex",
                            flexDirection: "column", padding: "15px", flexWrap: "wrap"
                        }}>
                            <div style={{ justifyItems: "left", marginBottom: "10px" }}>
                                <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                                    Transfer Tokens
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
                                        value={recipient}
                                        onChange={(e) => setRecipient(e.target.value)}
                                    />
                                </div>
                                <div style={{ justifyItems: "left", width: "100%" }}>
                                    <p style={{ marginBottom: "5px" }}>Amount</p>
                                    <input
                                        type="number"
                                        required={true}
                                        placeholder="100"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        />
                                </div>
                                <div>
                                    <button>
                                        Transfer
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

export default Transfer;