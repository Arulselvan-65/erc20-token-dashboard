import { useEffect, useState } from "react";
import { useWallet } from "../context/WalletContext";
import { ethers } from "ethers";

const TokenInfo = () => {

    const { signer, contract, isConnected, account, refreshTrigger } = useWallet();
    const [tokenData, setTokenData] = useState([]);
    const [totalSupply, setTotalSupply] = useState(0);

    useEffect(() => {
        if (!isConnected || !contract || !signer) return;

        const loadTokenData = async () => {
            let data = [];
            data.push({ key: "Name", value: await contract.name() });
            data.push({ key: "Symbol", value: await contract.symbol() });
            data.push({ key: "Total Supply", value: await contract.totalSupply() / (10n ** 18n) });
            data.push({ key: "Your Balance", value: await contract.balanceOf(account) / (10n ** 18n) });
            setTokenData(data);
        }

        loadTokenData();
    }, [contract, signer, isConnected, refreshTrigger]);

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
                        <p style={{ fontSize: "20px", fontWeight: "bold" }}>Token Info</p>
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-start", flexWrap: "wrap", gap: "15px", width: "100%" }}>
                        {
                            tokenData.map((v, i) => {
                                return (
                                    <div key={i} style={{
                                        minWidth: "120px",
                                        flex: "1 1 150px", border: "1px gray solid",
                                        borderRadius: "10px", justifyItems: "left", padding: "10px"
                                    }}>
                                        <p style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "5px" }}>{v.key}</p>
                                        <p>{v.value}</p>
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

export default TokenInfo;