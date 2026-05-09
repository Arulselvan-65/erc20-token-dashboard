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
            const fromBlock = 0;
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
                    border: "1px gray solid", width: "90%", height: "auto", borderRadius: "12px", display: "flex",
                    flexDirection: "column", padding: "15px", flexWrap: "wrap"
                }}>
                    <div style={{ justifyItems: "left", marginBottom: "10px" }}>
                        <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                            Transaction History
                        </p>
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-start", flexWrap: "wrap", gap: "15px", width: "100%", flexDirection: "column" }}>
                        {
                            events.map((v, i) => {
                                return (
                                    <div key={i} style={{
                                        minWidth: "120px", borderBottom: "1px gray solid", justifyContent: "space-between",
                                        justifyItems: "left", padding: "10px", display: "flex", fontSize: "16px"
                                    }}>
                                        <div>
                                            <div style={{
                                                display: "flex", alignItems: "center", gap: "10px", width: "100%"
                                            }}>
                                                <p style={{ margin: 0 }}>
                                                    {v.from.slice(0, 6)}...
                                                    {v.from.slice(-4)}
                                                    {" "}➜{" "}
                                                    {v.to.slice(0, 6)}...
                                                    {v.to.slice(-4)}
                                                </p>
                                                <span
                                                    style={{
                                                        padding: "0px 7px", border: `1px solid ${v.name == "Mint" ? "green" : "orange"}`, borderRadius: "12px",
                                                        fontSize: "12px", color: `${v.name == "Mint" ? "green" : "orange"}`, fontWeight: "600"
                                                    }}>
                                                    {v.name}
                                                </span>
                                            </div>
                                            <p style={{ color: "gray", display: "flex" }}>Block {v.block}</p>
                                        </div>
                                        <div style={{ alignItems: "center", display: "flex" }}>
                                            <p>{v.amount} HTK</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
                )
                : ""
            }
        </>
    )
}

export default EventLog;