// SPDX-License-Identifier: UNLICENSED
pragma solidity >0.8.0 <0.9.0;

contract BitCaffein {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    struct Campaign {
        uint id;
        address creator;
        string creatorName;
        string creatorJob;
        string title;
        string description;
        uint totalAmount;
        uint startTime;
    }
    // Campaign counter variable
    uint public campaignCounter = 0;
    // Mappings
    mapping(uint => Campaign) public campaigns;
    mapping(address => uint[]) public myCampaigns;
    mapping(uint => address[]) public donors;
    mapping(uint => mapping(address => uint)) public donorAmounts;
    mapping(address => uint) public reputations;

    // Events
    event CampaignCreated(
        uint campaignId,
        address creator,
        string title,
        uint goalAmount
    );
    event CampaignUpdated(
        uint campaignId,
        string newTitle,
        string newDescription
    );
    event DonationReceived(uint campaignId, address donor, uint amount);
    event ReputationUpdated(address user, uint newReputation);
    event DonationWithdrawn(uint campaignId, address donor, uint amount);

    // Custom Errors
    error InsufficientDonation(uint campaignId, string text);
    error Unauthorized(address caller, string text);
    error CampaignNotFound(uint campaignId);

    // Modifiers
    modifier onlyOwner() {
        require(owner == msg.sender, "Only owner can access this side");
        _;
    }

    modifier minAmount(uint campaignId, uint amount) {
        require(amount > 100000000000000, "Min donate amount is 0.0001 eth");
        _;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function test() public pure returns (string memory) {
        return "hello Burak";
    }

    function createCampaign(
        string memory title,
        string memory description,
        string memory creatorName,
        string memory creatorJob,
        uint goalAmount
    ) public {
        campaignCounter++;
        campaigns[campaignCounter] = Campaign({
            id: campaignCounter,
            creator: msg.sender,
            creatorName: creatorName,
            creatorJob: creatorJob,
            title: title,
            description: description,
            totalAmount: 0,
            startTime: block.timestamp
        });

        addCampaignId(campaignCounter);
        emit CampaignCreated(campaignCounter, msg.sender, title, goalAmount);
    }

    function addCampaignId(uint campaignId) private {
        myCampaigns[msg.sender].push(campaignId);
    }

    function getMyCampaigns(address user) public view returns (uint[] memory) {
        return myCampaigns[user];
    }

    function donation(uint campaignId) public payable {
        Campaign storage campaign = campaigns[campaignId];
        if (campaign.id == 0) revert CampaignNotFound(campaignId);

        campaign.totalAmount += msg.value;
        donors[campaignId].push(msg.sender);
        donorAmounts[campaignId][msg.sender] += msg.value;

        emit DonationReceived(campaignId, msg.sender, msg.value);
    }

    function withdrawDonations(uint campaignId) public {
        Campaign storage campaign = campaigns[campaignId];
        if (campaign.id == 0) revert CampaignNotFound(campaignId);

        uint amount = donorAmounts[campaignId][msg.sender];
        donorAmounts[campaignId][msg.sender] = 0;
        payable(msg.sender).transfer(amount);

        emit DonationWithdrawn(campaignId, msg.sender, amount);
    }

    function updateCampaign(
        uint campaignId,
        string memory newTitle,
        string memory newDescription
    ) public {
        Campaign storage campaign = campaigns[campaignId];
        if (campaign.id == 0) revert CampaignNotFound(campaignId);
        if (campaign.creator != msg.sender)
            revert Unauthorized(
                msg.sender,
                "Only campaign creator can update campaign"
            );

        campaign.title = newTitle;
        campaign.description = newDescription;

        emit CampaignUpdated(campaignId, newTitle, newDescription);
    }

    function updateReputation(address user, uint newReputation) public {
        reputations[user] = newReputation;

        emit ReputationUpdated(user, newReputation);
    }
}
