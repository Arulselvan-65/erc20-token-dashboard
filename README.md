# HToken Dashboard

A full-stack Web3 application for interacting with the HToken (HTK) ERC-20 token deployed on the Ethereum Sepolia testnet.

🔗 **Live Demo**: [htoken-dashboard.vercel.app](https://htoken-dashboard.vercel.app)

---

## Overview

HToken Dashboard allows users to connect their MetaMask wallet and interact with the HTK token contract directly from the browser. The owner can mint new tokens within a fixed supply cap, and any holder can transfer tokens to other addresses.

---

## Features

- Connect MetaMask wallet with auto-reconnect (24hr session)
- View token name, symbol, total supply, and your balance
- Transfer HTK tokens to any address
- Real-time balance update after transfers
- Network guard — auto-prompts switch to Sepolia if wrong network
- Toast notifications for all actions

---

## Contract

| Property | Value |
|---|---|
| Token Name | HToken |
| Symbol | HTK |
| Network | Ethereum Sepolia Testnet |
| Contract Address | `0xDC51E177760b173078BCa487B924C053840F1823` |
| Max Supply | 1,000,000 HTK |
| Standard | ERC-20 |

[View on Sepolia Etherscan](https://sepolia.etherscan.io/address/0xDC51E177760b173078BCa487B924C053840F1823)

---

## Tech Stack

| Layer | Tool |
|---|---|
| Smart Contract | Solidity ^0.8.27 |
| Contract Framework | Hardhat |
| Contract Library | OpenZeppelin |
| Frontend | React + Vite |
| Web3 Library | ethers.js v6 |
| Wallet | MetaMask |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js v18+
- MetaMask browser extension
- Sepolia testnet ETH ([faucet](https://sepolia-faucet.pk910.de/))

### Installation

```bash
# Clone the repo
git clone https://github.com/Arulselvan-65/erc20-token-dashboard
cd erc20-token-dashboard

# Install contract dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

### Run locally

```bash
# In frontend/
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and connect your MetaMask wallet on Sepolia.

### Run tests

```bash
# In project root
npx hardhat test
```

---

## Project Structure

```
erc20-dashboard/
├── contracts/
│   └── HToken.sol
├── test/
│   └── HToken.test.js
├── ignition/modules/
│   └── HToken.js
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── WalletConnect.jsx
│       │   ├── TokenInfo.jsx
│       │   ├── Mint.jsx
│       │   ├── Transfer.jsx
│       │   ├── TransactionModal.jsx
│       │   └── EventLog.jsx
│       ├── context/
│       │   └── WalletContext.jsx
│       └── utils/
│           └── HToken.json
└── hardhat.config.js
```

---

## Environment Variables

Create a `.env` file in the project root:

```
SEPOLIA_RPC_URL=your_alchemy_sepolia_url
PRIVATE_KEY=your_wallet_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

Never commit `.env` to Git.


# HToken Contract 

HToken is a simple ERC20 token with owner-only minting and a fixed maximum supply.

## Features

- ERC20 token
- Owner-only mint
- Maximum supply limit
- Custom errors
- Mint event emission
- Transfer support

## Functions

### Mint

```solidity
mint(address to, uint256 amount)
````

Mints tokens to an address.

Only owner can call this function.

### Transfer

```solidity
transfer(address to, uint256 amount)
```

Transfers tokens to another address.

---

## Events

```solidity
event TokenMinted(address indexed to, uint256 amount);
```

Emitted when tokens are minted.

---

## Errors

```solidity
error ExceedsMintLimit();
error InsufficientBalance();
```

* `ExceedsMintLimit` → Mint exceeds max supply
* `InsufficientBalance` → For balance validations

---

## Tests Covered

* Contract deployment
* Owner minting
* Non-owner mint restriction
* Max supply validation
* Token transfers
* Event emission
* Error handling

