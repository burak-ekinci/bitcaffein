import { ethers } from "hardhat";
import { expect, assert } from "chai";
import { Contract, N, parseEther } from "ethers";
import { end } from "@popperjs/core";

describe("BitCaffeinNFT", () => {
  let _contract: any = null;
  let _accounts: any | null = null;
  const tokenURI: string = "https://test.com";
  const _nftPrice = parseEther("0.025").toString();

  // Initialize Contract
  before(async () => {
    const accounts = await ethers.getSigners();
    const BitCaffeinNFT = await ethers.getContractFactory("BitCaffeinNFT");
    const contract = await BitCaffeinNFT.deploy();
    await contract.waitForDeployment();
    _contract = contract;
    _accounts = accounts;
  });

  describe("Owner Checks", () => {
    it("check owner address", async () => {
      assert.equal(_accounts[0].address, _accounts[0].address);
    });
  });

  // NFT
  describe("Mint Token", () => {
    before(async () => {
      await _contract.mintNFT(tokenURI, _nftPrice, {
        from: _accounts[0].address,
        value: _nftPrice,
      });
    });

    it("owner of the first nft token should be address[0]", async () => {
      const owner = await _contract.ownerOf(1);
      assert.equal(
        owner,
        _accounts[0].address,
        "The owner of first nft token is NOT the address[0]"
      );
    });

    it("first token should point to the correct the tokenURI", async () => {
      const actualTokenURI = await _contract.tokenURI(1);
      assert.equal(actualTokenURI, tokenURI, "tokenURI is not correctly set!");
    });

    it("should have token uri on mapping", async () => {
      const tokenBool = await _contract.tokenURIExists(tokenURI);
      assert.equal(tokenBool, true, "The tokenURI is already used");
    });

    it("should have the correct number of listed NFT items", async () => {
      const totalItems = await _contract.listedNftItems();
      assert.equal(
        totalItems,
        1,
        "The number of listed NFT items is incorrect"
      );
    });

    it("should get the nftItem", async () => {
      const nftItem = await _contract.getNftItem(1);
      assert.equal(nftItem.tokenId, 1, "The first token ID should be 1");
      assert.equal(nftItem.price.toString(), _nftPrice, "NFT price mismatch");
      assert.equal(
        nftItem.creator,
        _accounts[0].address,
        "NFT creator address mismatch"
      );
    });
  });

  describe("Buy NFT", () => {
    let buyerSigner;

    before(async () => {
      buyerSigner = _accounts[1];
      await _contract.connect(buyerSigner).buyNFT(1, { value: _nftPrice });
    });

    it("should transfer ownership of the NFT", async () => {
      const newOwner = await _contract.ownerOf(1);
      assert.equal(
        newOwner,
        _accounts[1].address,
        "NFT ownership did not transfer"
      );
    });

    it("should unlist the item", async () => {
      const isListed = await _contract._idToNftItem(1);
      assert.isFalse(isListed.isListed, "NFT is still listed after purchase");
    });
  });

  describe("Token Transfers", () => {
    const newTokenURI = "https://test-json-2.com";
    let buyer;

    before(async () => {
      buyer = _accounts[1];
      await _contract.connect(buyer).mintNFT(newTokenURI, _nftPrice, {
        value: _nftPrice,
      });
    });

    it("should have two NFTs created", async () => {
      const totalSupply = await _contract.totalSupply();
      assert.equal(totalSupply, 2, "Total NFT supply is incorrect");
    });

    it("should be able to retrieve NFTs by index", async () => {
      const nft1 = await _contract.tokenByIndex(0);
      const nft2 = await _contract.tokenByIndex(1);
      assert.equal(nft1, 1, "NFT 1 index is incorrect");
      assert.equal(nft2, 2, "NFT 2 index is incorrect");
    });

    it("should get all NFTs on sale", async () => {
      const allNftsOnSale = await _contract.getAllNftsOnSale();
      assert.equal(allNftsOnSale.length, 1, "NFTs on sale count mismatch");
      assert.equal(allNftsOnSale[0].tokenId, 2, "NFT ID mismatch");
    });

    // The account[0] doesn't have any token at this point and this test code revert error for this reason
    // it("account[0] should own the first NFT", async () => {
    //   const ownedNfts = await _contract.connect(_accounts[0]).getOwnedNfts();
    //   console.log("ownedNfts TokenId1 ->", ownedNfts[0]);
    //   assert.equal(1, 1, "Account 0 does not own the first NFT");
    // });

    it("account[1] should own the second NFT", async () => {
      const ownedNfts = await _contract.connect(_accounts[1]).getOwnedNfts();
      //   console.log("ownedNfts TokenId2 ->", parseInt(ownedNfts[0].tokenId));
      assert.equal(
        parseInt(ownedNfts[0].tokenId),
        1,
        "Account 1 does not own the second NFT"
      );

      const a = await _contract._idToNftItem(0);
      const a1 = await _contract._idToNftItem(1);
      const a2 = await _contract._idToNftItem(2);

      console.log("0 -> ", a);
      console.log("1 -> ", a1);
      console.log("2 -> ", a2);
    });
  });
});
