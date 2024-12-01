// SPDX-License-Identifier: MIT

pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract QuizFi is ERC1155 {

    constructor() ERC1155("https://quizfi.click/api/get-badge-by-id?id={id}") {}
    
}