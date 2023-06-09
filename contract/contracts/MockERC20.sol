// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockERC20 is ERC20 {
    constructor(
        string memory name,
        string memory symbol
    ) ERC20(name, symbol) {
        _mint(msg.sender, 21000000000000000000000000);
    }

    function mintTokens(uint256 _amount) external {
        _mint(msg.sender, _amount);
    }
}