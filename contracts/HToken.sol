// SPDX-License-Identifier: MIT

pragma solidity ^0.8.27;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HToken is ERC20, Ownable {

    uint256 public immutable MAX_SUPPLY;

    constructor(uint256 _maxSupply)
        ERC20("HToken", "HTK")
        Ownable(msg.sender)
    {
        MAX_SUPPLY = _maxSupply;
    }

    error ExceedsMintLimit();
    event TokenMinted(address indexed to, uint256 amount);

    function mint(address to, uint256 amount) public onlyOwner {
        if(MAX_SUPPLY < (amount + totalSupply())) revert ExceedsMintLimit();
        _mint(to, amount);
        emit TokenMinted(to, amount);
    }
}
