import { useEffect, useState } from "react";
import { useWallet } from "../context/WalletContext";
import { ethers } from "ethers";
import contractData from "../utils/HToken.json";

const EventLog = () => {

    const { signer, contract, isConnected, account, showToast, isOwner } = useWallet();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (!isConnected || !contract || !signer) return;

        const getEvents = async () => {
            const fromBlock = 10827073;
            const toBlock = "latest";
            let logs = [];
            const allEvents = await contract.queryFilter("*", fromBlock, toBlock);

            allEvents.forEach(event => {
                const eventName = event.fragment.name;
                if (eventName == "TokenMinted" && isOwner) {
                    logs.push({
                        name: "Mint",
                        from: contractData.address,
                        to: event.args[0],
                        block: event.blockNumber,
                        amount: event.args[1] / (10n ** 18n)
                    })
                }
                if ((eventName == "Transfer" && event.args[0] != ethers.ZeroAddress) && (event.args[0] == account)) {
                    logs.push({
                        name: "Transfer",
                        from: event.args[0],
                        to: event.args[1],
                        block: event.blockNumber,
                        amount: event.args[2] / (10n ** 18n)
                    })
                }
            });

            setEvents(logs);
        }
        getEvents();
    });

    return (
        <>
            {
                isConnected && events.length > 0 ?
                    (
                        <div className="card" style={{
                            border: "1px gray solid", width: "94%", height: "auto", borderRadius: "12px", display: "flex",
                            flexDirection: "column", padding: "15px", boxSizing: "border-box"
                        }}>
                            <div style={{ marginBottom: "10px", justifyItems: "left" }}>
                                <p style={{ fontSize: "20px", fontWeight: "bold", margin: 0, display: "block" }}>
                                    Transaction History
                                </p>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "0px", width: "100%" }}>
                                {events.map((v, i) => (
                                    <div key={i} style={{
                                        borderBottom: "1px gray solid",
                                        padding: "10px 0",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        gap: "8px",
                                        flexWrap: "wrap",
                                    }}>

                                        <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: 0 }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                                                <p style={{ margin: 0, fontSize: "14px", wordBreak: "break-all" }}>
                                                    {v.from.slice(0, 6)}...{v.from.slice(-4)}
                                                    {" "}➜{" "}
                                                    {v.to.slice(0, 6)}...{v.to.slice(-4)}
                                                </p>
                                                <span style={{
                                                    padding: "0px 7px",
                                                    border: `1px solid ${v.name === "Mint" ? "green" : "orange"}`,
                                                    borderRadius: "12px",
                                                    fontSize: "12px",
                                                    color: v.name === "Mint" ? "green" : "orange",
                                                    fontWeight: "600",
                                                    whiteSpace: "nowrap",
                                                }}>
                                                    {v.name}
                                                </span>
                                            </div>
                                            <p style={{ color: "gray", margin: 0, fontSize: "13px", textAlign: "left" }}>Block {v.block}</p>
                                        </div>

                                        <p style={{ margin: 0, fontWeight: "600", whiteSpace: "nowrap" }}>
                                            {v.amount} HTK
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                    : ""
            }
        </>
    )
}

export default EventLog;