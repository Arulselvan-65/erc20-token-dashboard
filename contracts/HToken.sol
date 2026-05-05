// SPDX-License-Identifier: MIT

pragma solidity ^0.8.27;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HToken is ERC20, Ownable {

    uint256 public immutable MAX_SUPPLY;
    uint256 public currentSupply;

    constructor(uint256 _maxSupply)
        ERC20("HToken", "HTK")
        Ownable(msg.sender)
    {
        MAX_SUPPLY = _maxSupply;
    }

    error ExceedsMintLimit();
    error InsufficientBalance();
    event TokenTransferred(address indexed from, address indexed to, uint256 amount);

    function mint(uint256 amount) public onlyOwner {
        if(MAX_SUPPLY < (amount + currentSupply)) revert ExceedsMintLimit();
        _mint(msg.sender, amount);
        currentSupply += amount;
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        address sender = msg.sender;
        if(balanceOf(sender) < amount) revert InsufficientBalance();
        _transfer(sender, to, amount);
        emit TokenTransferred(sender, to, amount);
        return true;
    }
}
