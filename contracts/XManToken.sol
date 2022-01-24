// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract XManToken is ERC20 {

    uint256 supply = 10000000000000000000000000;

    constructor() ERC20("XMan", "XMN") {

        uint256 internalInitialSupply = supply;

        _mint(msg.sender, internalInitialSupply);
    }
}
