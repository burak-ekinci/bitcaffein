// SPDX-License-Identifier: UNLICENSED
pragma solidity >0.8.0 <0.9.0;

contract BitCaffein {
    // Owner of the contract
    address public owner;

    // Constructor
    constructor() {
        owner = msg.sender;
    }

    // Structs
    struct Campaign {
        uint id;
        address creator;
        string creatorName;
        string creatorJob;
        string title;
        string description;
        uint totalAmount;
        uint goalAmount;
        uint startTime;
    }

    // State Variables
    uint public campaignCounter = 0; // Tracks the number of campaigns created
    Campaign[] public _allCampaigns; // Stores all campaigns

    // Mappings
    mapping(uint => Campaign) public _campaigns; // Maps campaign ID to Campaign details
    mapping(address => uint[]) public _myCampaigns; // Maps an address to its created campaigns
    mapping(uint => address[]) public _donors; // Maps campaign ID to its donors
    mapping(uint => mapping(address => uint)) public _donorAmounts; // Tracks donation amounts by donor per campaign
    mapping(address => uint) public _reputations; // Stores reputation scores for users

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
    event CampaignDeleted(uint campaignId, address deletedBy);

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

    // **Utility Functions**
    /**
     * @dev Returns the contract owner's address.
     */
    function getOwner() public view returns (address) {
        return owner;
    }

    /**
     * @dev Test function for deployment verification.
     */
    function test() public pure returns (string memory) {
        return "hello Burak";
    }

    // **Getter Functions**
    /**
     * @dev Gets the donation amount for the sender in a specific campaign.
     */
    function getDonorAmount(uint campaignId) public view returns (uint) {
        return _donorAmounts[campaignId][msg.sender];
    }

    /**
     * @dev Retrieves campaign IDs created by a specific user.
     */
    function getCampaignByAddress(address user) public view returns (uint[] memory) {
        return _myCampaigns[user];
    }

    /**
     * @dev Retrieves details of a specific campaign by ID.
     */
    function getCampaignById(uint campaignID) public view returns (Campaign memory) {
        return _campaigns[campaignID];
    }

    /**
     * @dev Retrieves all campaigns created by a specific user.
     */
    function getMyCampaigns(address _address) public view returns (Campaign[] memory) {
        uint256 campaignNumber = _allCampaigns.length;
        Campaign[] memory cmpgns = new Campaign[](campaignNumber);

        for (uint i = 0; i < campaignNumber; i++) {
            Campaign storage campaign = _allCampaigns[i];
            if (campaign.creator == _address) {
                cmpgns[i] = campaign;
            }
        }

        return cmpgns;
    }

     /**
     * @dev Adds a campaign ID to the user's created campaigns list.
     */
    function addCampaignId(uint campaignId) private {
        _myCampaigns[msg.sender].push(campaignId);
    }

    /**
     * @dev Retrieves all campaigns.
     */
    function getAllCampaigns() public view returns (Campaign[] memory) {
        uint256 campaignNumber = _allCampaigns.length;
        Campaign[] memory cmpgns = new Campaign[](campaignNumber);

        for (uint i = 0; i < campaignNumber; i++) {
            Campaign storage campaign = _allCampaigns[i];
            cmpgns[i] = campaign;
        }

        return cmpgns;
    }

    // **Campaign Management Functions**
    /**
     * @dev Creates a new campaign with the provided details.
     */
    function createCampaign(
        string memory title,
        string memory description,
        string memory creatorName,
        string memory creatorJob,
        uint goalAmount
    ) public {
        campaignCounter++;
        Campaign memory newCampaign = Campaign({
            id: campaignCounter,
            creator: msg.sender,
            creatorName: creatorName,
            creatorJob: creatorJob,
            title: title,
            description: description,
            totalAmount: 0,
            goalAmount: goalAmount,
            startTime: block.timestamp
        });

        _campaigns[campaignCounter] = newCampaign;
        addCampaignId(campaignCounter);
        _allCampaigns.push(newCampaign);

        emit CampaignCreated(campaignCounter, msg.sender, title, goalAmount);
    }

    /**
     * @dev Deletes a campaign by its ID.
     * Only the creator of the campaign or the contract owner can delete it.
     */
    function deleteCampaign(uint campaignId) public {
        Campaign storage campaign = _campaigns[campaignId];

        if (campaign.id == 0) revert CampaignNotFound(campaignId);
        if (campaign.creator != msg.sender && msg.sender != owner)
            revert Unauthorized(msg.sender, "Not authorized to delete this campaign");

        delete _campaigns[campaignId];

        // Remove campaign from global campaigns list
        for (uint i = 0; i < _allCampaigns.length; i++) {
            if (_allCampaigns[i].id == campaignId) {
                _allCampaigns[i] = _allCampaigns[_allCampaigns.length - 1];
                _allCampaigns.pop();
                break;
            }
        }

        emit CampaignDeleted(campaignId, msg.sender);
    }

    /**
     * @dev Updates a campaign's title and description.
     */
    function updateCampaign(
        uint campaignId,
        string memory newTitle,
        string memory newDescription,
        uint newGoalAmount
    ) public {
        Campaign storage campaign = _campaigns[campaignId];
        if (campaign.id == 0) revert CampaignNotFound(campaignId);
        if (campaign.creator != msg.sender)
            revert Unauthorized(
                msg.sender,
                "Only campaign creator can update campaign"
            );

        campaign.title = newTitle;
        campaign.description = newDescription;
        campaign.goalAmount = newGoalAmount;

        emit CampaignUpdated(campaignId, newTitle, newDescription);
    }

    // **Donation Management Functions**
    /**
     * @dev Allows users to donate to a specific campaign.
     */
    function donation(uint campaignId) public payable {
        Campaign storage campaign = _campaigns[campaignId];
        if (campaign.id == 0) revert CampaignNotFound(campaignId);

        campaign.totalAmount += msg.value;
        _donors[campaignId].push(msg.sender);
        _donorAmounts[campaignId][msg.sender] += msg.value;

        emit DonationReceived(campaignId, msg.sender, msg.value);

        // Update reputation after donation
        updateReputation(msg.sender, msg.value);
    }

    /**
     * @dev Updates the reputation score for a user based on their donation amount.
     * Reputation scores are awarded based on predefined donation ranges.
     */
    function updateReputation(address user, uint donationAmount) internal {
        uint newReputation;

        if (donationAmount < 0.001 ether) {
            newReputation = 1; // < 3,70$ eth'ın 3700 old an
        } else if (donationAmount < 0.003 ether) {
            newReputation = 2; // < 11$
        } else if (donationAmount < 0.01 ether) {
            newReputation = 3; // < 37$
        } else if (donationAmount < 0.03 ether) {
            newReputation = 4; // < 111$
        } else {
            newReputation = 5;
        }

        _reputations[user] += newReputation;

        emit ReputationUpdated(user, _reputations[user]);
    }

    /**
     * @dev Allows the campaign creator to withdraw donations.
     */
    function withdrawDonations(uint campaignId) public {
        Campaign storage campaign = _campaigns[campaignId];

        if (campaign.id == 0) revert CampaignNotFound(campaignId);
        require(
            campaign.creator == msg.sender,
            "Only campaign owner can withdraw donations"
        );

        uint amount = campaign.totalAmount;
        require(
            amount >= 0.1 ether,
            "The minimum amount that can be withdrawn is 0.1 ether"
        );

        campaign.totalAmount = 0;
        payable(msg.sender).transfer(amount);

        emit DonationWithdrawn(campaignId, msg.sender, amount);
    }
}
