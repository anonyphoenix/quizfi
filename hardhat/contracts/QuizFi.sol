// SPDX-License-Identifier: MIT

pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract QuizFi is ERC1155 {

    uint256 public constant MONEY = 0;
    uint256 public constant GOLD = 1;
    uint256 public constant SILVER = 2;
    uint256 public constant BRONZE = 3;
    uint256 public constant POAP = 4;

    constructor() ERC1155("https://quizfi.click/api/get-badge-by-id?id={id}") {
        _mint(msg.sender, MONEY, 10 ** 18, "");
        _mint(msg.sender, GOLD, 10 ** 9, "");
        _mint(msg.sender, SILVER, 10 ** 9, "");
        _mint(msg.sender, BRONZE, 10 ** 9, "");
        _mint(msg.sender, POAP, 10 ** 18, "");
    }
    
}