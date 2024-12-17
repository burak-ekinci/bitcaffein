# BitCaffein
## Empowering creators with decentralized donations on Ethereum.
BitCaffein is a decentralized platform inspired by buymeacoffee.com, built on the Ethereum blockchain. It enables creators to receive ETH donations transparently and securely, leveraging blockchain technology for privacy and efficiency.

 <b> Functionalities: </b>

## 1. Create Campaigns
```bash
   function createCampaign(
        string memory title,
        string memory description,
        uint goalAmount
    ) public
```
Creators can easily launch fundraising campaigns by specifying a title, description, and fundraising goal.

## 2. Donate ETH
```bash
   function donate(uint campaignId) public payable
```
Users can contribute ETH to campaigns they support. Each donation is recorded on the blockchain securely.

## 3. Update Campaigns
```bash
   function updateCampaign(
        uint campaignId,
        string memory newTitle,
        string memory newDescription
    ) public 
```
Campaign creators can update campaign details such as title and description to keep supporters informed.

## 4. Withdraw Donations
```bash
   function withdrawDonations(uint campaignId) public
```
Campaign creators can withdraw received donations to their Ethereum address at any time.

## 5. Reputation System
```bash
   function updateReputation(address user, uint newReputation) public
```
A reputation system tracks user contributions and activity, enhancing transparency and trust.

