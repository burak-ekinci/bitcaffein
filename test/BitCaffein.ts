import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("BitCaffein", function () {
  async function deployContract() {
    const [owner] = await ethers.getSigners();
    const BitCaffein = await ethers.getContractFactory("BitCaffein");
    const contract = await BitCaffein.deploy();

    return { owner, contract };
  }

  describe("Get owner", () => {
    it("should be right owner", async () => {
      const { owner, contract } = await loadFixture(deployContract);
      expect(await contract.owner()).to.equal(owner);
    });
  });

  describe("Functions", function () {
    it("Get Owner", async () => {
      const { owner, contract } = await loadFixture(deployContract);
      const getOwnerFunctionOnContract = await contract.getOwner();
      expect(owner).to.equal(getOwnerFunctionOnContract);
    });
  });
});

// npx hardhat test --network hardhat
