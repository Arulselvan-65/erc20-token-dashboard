require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const privateKey = process.env.PRIVATE_KEY || "";
const rpcUrl = process.env.RPC_URL || "";
const apiKey = process.env.API_KEY || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: rpcUrl,
      accounts: [privateKey],
    }
  },
  etherscan: {
    apiKey: apiKey
  }

};
