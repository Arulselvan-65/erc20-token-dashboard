require("@nomicfoundation/hardhat-toolbox");
const prompt = require("prompt-sync")();

const privateKey = prompt("Enter private key: ");
const rpcUrl = prompt("Enter RPC URL: ");
const apiKey = prompt("Enter Etherscan API Key: ");

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
