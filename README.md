# HToken

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

