// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract BitCaffeinNFT is ERC721URIStorage {
    constructor() ERC721("BitCaffeinNFT", "BCNFT") {}
}
