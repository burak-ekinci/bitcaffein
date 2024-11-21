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

    struct NftItem {
        uint tokenId;
        uint price;
        address creator;
        bool isListed;
    }

    mapping(string => bool) private _usedTokenURIs;
    mapping(uint => NftItem) public _idToNftItem;
    mapping(uint => uint) private _idToNftIndex;
    mapping(address => mapping(uint => uint)) private _ownedTokens;

    uint256[] private _allNfts;
    mapping(uint => uint) private _idToOwnedIndex;

    event NftItemCreated(
        uint tokenId,
        uint price,
        address creator,
        bool isListed
    );

    constructor() ERC721("BitCaffeinNFT", "BCNFT") {}

    // PUBLIC FUNCTIONS

    function buyNFT(uint tokenId) public payable {
        uint price = _idToNftItem[tokenId].price;
        address owner = ERC721.ownerOf(tokenId);
        require(msg.sender != owner, "You already own this NFT");
        require(msg.value == price, "Please submit the asking price");

        _idToNftItem[tokenId].isListed = false;
        _listedItems.decrement();

        _transfer(owner, msg.sender, tokenId);
        payable(owner).transfer(msg.value);
    }

    function getNftItem(uint _tokenId) public view returns (NftItem memory) {
        return _idToNftItem[_tokenId];
    }

    function listedNftItems() public view returns (uint) {
        return _listedItems.current();
    }

    function tokenURIExists(string memory tokenURI) public view returns (bool) {
        return _usedTokenURIs[tokenURI];
    }

    function ownerOfToken(uint256 tokenId) public view returns (address) {
        return ERC721.ownerOf(tokenId);
    }

    function totalSupply() public view returns (uint) {
        return _allNfts.length;
    }

    function tokenByIndex(uint index) public view returns (uint) {
        require(index < totalSupply(), "Index out of bounds");
        return _allNfts[index];
    }
    function tokenOfOwnerByIndex(
        address owner,
        uint index
    ) public view returns (uint) {
        require(index < ERC721.balanceOf(owner), "Index out of bounds");
        return _ownedTokens[owner][index];
    }

    function getToken(uint tokenId) public view returns (NftItem memory) {
        return _idToNftItem[tokenId];
    }

    function getOwnedNfts() public view returns(NftItem[] memory) {
        uint ownedItemsCount = ERC721.balanceOf(msg.sender);
        NftItem[] memory items = new NftItem[](ownedItemsCount);

        for(uint i = 0; i < ownedItemsCount; i++){
            uint tokenId = tokenOfOwnerByIndex(msg.sender,i);
            NftItem storage item = _idToNftItem[tokenId];
            items[i] = item;
        }
        return items;
    }

   
    function getAllNftsOnSale() public view returns (NftItem[] memory) {
        uint totalItems = totalSupply();
        uint currentIndex = 0;
        NftItem[] memory items = new NftItem[](listedNftItems());

        for (uint256 i = 0; i < totalItems; i++) {
            uint tokenID = tokenByIndex(i);
            NftItem storage item = _idToNftItem[tokenID];

            if (item.isListed == true) {
                items[currentIndex] = item;
                currentIndex++;
            }
        }
        return items;
    }

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

    //PRIVATE FUNCTIONS
    function _createNftItem(uint _tokenId, uint _price) private {
        require(_price > 0, "Price must be at least 1 wei");
        _idToNftItem[_tokenId] = NftItem(_tokenId, _price, msg.sender, true);
        emit NftItemCreated(_tokenId, _price, msg.sender, true);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint tokenId
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, tokenId);

        if (from == address(0)) {
            _addTokenToAllTokensEnumeration(tokenId);
        }else if( from != to) {
            _removeTokenFromOwnerEnumeration(from, tokenId);
        }
        if(to == address(0)){
            _removeTokenFromAllTokensEnumeration(tokenId);
        }else if (to != from) {
            _addTokenToOwnerEnumeration(to, tokenId);
        }
    }

    function _addTokenToAllTokensEnumeration(uint tokenId) private {
        _idToNftIndex[tokenId] = _allNfts.length;
        _allNfts.push(tokenId);
    }

    function _addTokenToOwnerEnumeration(address to, uint tokenId) private {
        uint length = ERC721.balanceOf(to);
        _ownedTokens[to][length] = tokenId;
        _idToOwnedIndex[tokenId] = length;
    }

    function _removeTokenFromOwnerEnumeration(address from, uint tokenId) private {
        uint lastTokenIndex = ERC721.balanceOf(from) -1;
        uint tokenIndex = _idToOwnedIndex[tokenId];

        if(tokenIndex != lastTokenIndex) {
            uint lastTokenId = _ownedTokens[from][lastTokenIndex];

            _ownedTokens[from][tokenIndex] = lastTokenId;
            _idToOwnedIndex[lastTokenId] = tokenIndex;
        }   
        delete _idToOwnedIndex[tokenId];
        delete _ownedTokens[from][lastTokenIndex];
    }

    function _removeTokenFromAllTokensEnumeration(uint tokenId) private{
        uint lastTokenIndex = _allNfts.length - 1;
        uint lastTokenId = _allNfts[lastTokenIndex];
        uint tokenIndex = _idToNftIndex[tokenId];

        _allNfts[tokenIndex] = lastTokenId;
        _idToNftIndex[lastTokenId] = tokenIndex;

        delete _idToNftIndex[tokenId];
        _allNfts.pop();
    }

}
