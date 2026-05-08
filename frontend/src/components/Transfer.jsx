import { useEffect, useState } from "react";
import { useWallet } from "../context/WalletContext";
import { ethers } from "ethers";

const Transfer = () => {

    const { signer, contract, isConnected, account, showToast } = useWallet();
    const [isOwner, setIsOwner] = useState(false);
    const [recipient, setRecipient] = useState([]);
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        if (!isConnected || !contract || !signer) return;

        const checkIsOwner = async () => {
            const owner = await contract.owner();
            if (owner == account) setIsOwner(true);
        }

        checkIsOwner();
    });

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
        if (isOwner) {
            try {
                var res = await contract.mint(recipient, ethers.parseEther(`${amount}`));
                contract.on("TokenMinted", showToast("Token Minted", "success"));
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

        try {
            const tx = await contract.transfer(recipient, ethers.parseEther(`${amount}`));
            await tx.wait();
            contract.on("Transfer", showToast("Token Transferred", "success"));
            return;
        } catch (err) {
            if (err.code === 4001 || err.code === "ACTION_REJECTED") {
                showToast("Transaction denied by user", "error");
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
        }
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
                                <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                                    {isOwner ? "Mint Tokens" : "Transfer Tokens"}
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
                                        {isOwner ? "Mint Tokens" : "Transfer"}
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