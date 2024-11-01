// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BitCaffeinNFT is ERC721URIStorage {
    using Counters for Counters.Counter;

    uint public listingPrice = 0.025 ether;

    Counters.Counter private _listedItems;
    Counters.Counter private _tokenIds;

    constructor() ERC721("BitCaffeinNFT", "BCNFT") {}

    struct NftItem {
        uint tokenId;
        uint price;
        address creator;
        bool isListed;
    }

    mapping(string => bool) private _usedTokenURIs;
    mapping(uint => NftItem) public _idToNftItem;

    event NftItemCreated(
        uint tokenId,
        uint price,
        address creator,
        bool isListed
    );
    // PUBLIC FUNCTIONS
    function getNftItem(uint _tokenId) public view returns (NftItem memory) {
        return _idToNftItem[_tokenId];
    }

    function listedNftItems() public view returns (uint) {
        return _listedItems.current();
    }

    function tokenURIExists(string memory tokenURI) public view returns (bool) {
        return _usedTokenURIs[tokenURI];
    }

    //PRIVATE FUNCTIONS
    function mintNFT(
        string memory tokenURI,
        uint price
    ) public payable returns (uint) {
        require(!tokenURIExists(tokenURI), "Token URI is already exist!");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        _listedItems.increment();
        _tokenIds.increment();

        uint newTokenId = _tokenIds.current();

        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        _createNftItem(newTokenId, price);
        _usedTokenURIs[tokenURI] = true;

        return newTokenId;
    }

    function _createNftItem(uint _tokenId, uint _price) private {
        require(_price > 0, "Price must be at least 1 wei");
        _idToNftItem[_tokenId] = NftItem(_tokenId, _price, msg.sender, false);
        emit NftItemCreated(_tokenId, _price, msg.sender, false);
    }
}
