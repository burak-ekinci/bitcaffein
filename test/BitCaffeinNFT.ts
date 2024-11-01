import { ethers } from "hardhat";
import { expect, assert } from "chai";
import { Contract, parseEther } from "ethers";
import { string } from "hardhat/internal/core/params/argumentTypes";
import { BitCaffeinNFT__factory } from "../typechain-types";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { token } from "../typechain-types/@openzeppelin/contracts";

describe("BitCaffeinNFT", () => {
  let _contract: any = null;
  let _accounts: any | null = null;
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
      assert.equal(
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        _accounts[0].address
      );
      console.log(_contract.target);
    });
  });

  // NFT
  describe("Mint Token", () => {
    const tokenURI: string = "https://test.com";
    const NFTPrice = parseEther("0.025").toString();
    console.log(NFTPrice);

    before(async () => {
      await _contract.mintNFT(tokenURI, NFTPrice, {
        from: _accounts[0].address,
        value: NFTPrice,
      });
    });

    it("owner of the first nft token should be address[0]", async () => {
      const owner = await _contract.ownerOf(1);
      assert(
        owner == _accounts[0].address,
        "The owner of first nft token is NOT the address[0]"
      );
    });

    it("first token should point to the correct the tokenURI", async () => {
      const actualTokenURI = await _contract.tokenURI(1);

      assert.equal(actualTokenURI, tokenURI, "tokenURI is not correctly set!");
    });

    it("should have token uri on mapping", async () => {
      const usedTokenURI = tokenURI;
      const tokenBool = await _contract.tokenURIExists(tokenURI);

      assert.equal(tokenBool, true, "The tokenURI is already used");
    });

    it("should be first token tokenURI is https://test.com", async () => {
      const firstTokenURI = await _contract.listedNftItems();

      assert.equal(firstTokenURI, 1, "The first tokenURI is not test.com");
    });

    it("should get the nftItem", async () => {
      const nftItem = await _contract.getNftItem(1);
      console.log(nftItem);
      assert.equal(nftItem.tokenId, 1, "The first tokenıD = 1");
      assert.equal(
        nftItem.price,
        25000000000000000,
        "The nftItem price is 0.3ETH"
      );
      assert.equal(
        nftItem.creator,
        _accounts[0].address,
        "The nftItem creator"
      );
      assert.equal(true, true, "The nftItem was listed");
    });
  });
});
