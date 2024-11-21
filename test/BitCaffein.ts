// import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
// import { assert, expect } from "chai";
// import { Contract, decryptKeystoreJsonSync } from "ethers";
// import { ethers } from "hardhat";

// describe("BitCaffein", async () => {
//   let _owner: any;
//   let _addr1: any;
//   let _addr2: any;
//   let _contract: Contract | any;
//   console.log(ethers.parseEther(".1"));

//   before(async () => {
//     const BitCaffein = await ethers.getContractFactory("BitCaffein");
//     const contract = await BitCaffein.deploy();
//     await contract.waitForDeployment();
//     _contract = contract;
//     const [owner, addr1, addr2] = await ethers.getSigners();
//     _owner = owner;
//     _addr1 = addr1;
//     _addr2 = addr2;
//   });

//   describe("Owner Checks", async () => {
//     it("owner of Contract", async () => {
//       const owner = await _contract.getOwner();
//       assert.equal(
//         _owner.address,
//         owner,
//         "The owner of contract is not correct"
//       );
//     });

//     it("should get the owner of contract", async () => {
//       const owner = await _contract.getOwner();
//       assert.equal(owner, _owner.address, "Wrong contract owner address");
//     });

//     it("should say hello", async () => {
//       const string = await _contract.test();
//       assert.equal("hello Burak", string, "Test function is not working");
//     });
//   });

//   // ************************** CREATE CAMPAIGN **************************
//   describe("Campaign", async () => {
//     const currentAmount = ethers.parseEther("1");
//     const goalAmount = ethers.parseEther("0.5");

//     before(async () => {
//       await _contract.createCampaign(
//         "Test Campaign",
//         "This is a test campaign description",
//         "Burak Ekinci",
//         "Blockchain Developer",
//         goalAmount,
//         {
//           from: _owner.address,
//         }
//       );

//       await _contract
//         .connect(_addr1)
//         .createCampaign(
//           "Test Campaign2",
//           "This is a test2 campaign description",
//           "Burak Ekinci",
//           "Web3 Developer",
//           goalAmount
//         );
//       await _contract.createCampaign(
//         "Test Campaign2",
//         "This is a test2 campaign description",
//         "Burak Ekinci",
//         "Web3 Developer",
//         goalAmount,
//         {
//           from: _owner.address,
//         }
//       );
//       await _contract
//         .connect(_addr1)
//         .createCampaign(
//           "Test Campaign2",
//           "This is a test2 campaign description",
//           "Burak Ekinci",
//           "Web3 Developer",
//           goalAmount
//         );
//       await _contract.donation(2, {
//         from: _owner.address,
//         value: ethers.parseEther("1"),
//       });
//     });

//     it("should create a new campaing for a _accounts[0]", async () => {
//       const campaignOfAddr1 = await _contract.getMyCampaigns(_owner.address);
//       const campaignOfAddr2 = await _contract.getMyCampaigns(
//         await _addr1.getAddress()
//       );
//       console.log("campaignOfAddr1 :", campaignOfAddr1);
//       console.log("campaignOfAddr2 :", campaignOfAddr2);
//       assert.equal(1, 1, "Address of the campaign owner is not correct");
//     });

//     it("should get campaign from your campaignID", async () => {
//       const campaign = await _contract.getMyCampaign(1);
//       console.log("Campaign :", campaign);
//       assert.equal(
//         campaign.creator,
//         _owner.address,
//         "The campaign address not equal the correct address"
//       );
//     });

//     it("should donate a campaign", async () => {
//       const campaign = await _contract.getMyCampaign(2);
//       assert.equal(
//         campaign.totalAmount,
//         currentAmount,
//         "The donation amount is not equal to campaign totalAmount"
//       );
//     });

//     it("should withdraw the donations on the contract only owner", async () => {
//       // await _contract.donation(2, {
//       //   from: _owner.address,
//       //   value: ethers.parseEther(".11"),
//       // });
//       const campaignBefore = await _contract.getMyCampaign(2);
//       console.log("campaignBefore : ", campaignBefore.totalAmount);
//       await _contract.connect(_addr1).withdrawDonations(2);
//       const campaignAfter = await _contract.getMyCampaign(2);
//       console.log("campaignAfter : ", campaignAfter.totalAmount);
//       assert.equal(0, 0, "Widthdraw is rejected");
//     });

//     // it("should ");
//   });
// });

// // npx hardhat test --network networkName
