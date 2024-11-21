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
        uint goalAmount;
        uint startTime;
    }
    // Campaign counter variable
    uint public campaignCounter = 0;

    // All Campaigns
    Campaign[] public _allCampaigns;

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

    // Getter Functions
    function getOwner() public view returns (address) {
        return owner;
    }

    function test() public pure returns (string memory) {
        return "hello Burak";
    }

    function getDonorAmount(uint campaignId) public view returns (uint) {
        return donorAmounts[campaignId][msg.sender];
    }

    // +
    function getMyCampaign(address user) public view returns (uint[] memory) {
        return myCampaigns[user];
    }

    // +
    function getMyCampaign(
        uint campaignID
    ) public view returns (Campaign memory) {
        return campaigns[campaignID];
    }

    function getAllCampaigns() public view returns (Campaign[] memory) {
    uint256 campaignNumber = _allCampaigns.length;

    // Campaign dizisi için bellek alanı oluşturuyoruz.
    Campaign[] memory cmpgns = new Campaign[](campaignNumber);

    for (uint i = 0; i < campaignNumber; i++) {
        // Storage'dan alınan her kampanyayı bellek alanına kopyalıyoruz.
        Campaign storage campaign = _allCampaigns[i];
        cmpgns[i] = campaign;
    }

    return cmpgns; // Doğru değişken ismi ile döndürülüyor.
}

function getMyCampaigns(address _address) public view returns (Campaign[] memory) {
    uint256 campaignNumber = _allCampaigns.length;

    // Campaign dizisi için bellek alanı oluşturuyoruz.
    Campaign[] memory cmpgns = new Campaign[](campaignNumber);

    for (uint i = 0; i < campaignNumber; i++) {
        // Storage'dan alınan her kampanyayı bellek alanına kopyalıyoruz.
        Campaign storage campaign = _allCampaigns[i];
        if(campaign.creator == _address){
        cmpgns[i] = campaign;
        }
    }

    return cmpgns; // Doğru değişken ismi ile döndürülüyor.
}


    // +
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
    campaigns[campaignCounter] = newCampaign;
        addCampaignId(campaignCounter);
        _allCampaigns.push(newCampaign);
        emit CampaignCreated(campaignCounter, msg.sender, title, goalAmount);
    }


    function deleteCampaign(uint campaignId) public {
        
    }

    // +
    function addCampaignId(uint campaignId) private {
        myCampaigns[msg.sender].push(campaignId);
    }
    

    

    // +
    function donation(uint campaignId) public payable {
        Campaign storage campaign = campaigns[campaignId];
        if (campaign.id == 0) revert CampaignNotFound(campaignId);

        campaign.totalAmount += msg.value;
        donors[campaignId].push(msg.sender);
        donorAmounts[campaignId][msg.sender] += msg.value;

        emit DonationReceived(campaignId, msg.sender, msg.value);
    }
    // +
    function withdrawDonations(uint campaignId) public {
        Campaign storage campaign = campaigns[campaignId];

        // Kampanya mevcut mu?
        if (campaign.id == 0) revert CampaignNotFound(campaignId);

        // Çekim yapmaya çalışan kişinin kampanya sahibi olup olmadığı kontrolü
        require(
            campaign.creator == msg.sender,
            "Only campaign owner can withdraw donations"
        );

        // Kampanyanın toplam bağış miktarını al
        uint amount = campaign.totalAmount;

        // Çekilebilecek minimum miktarın kontrolü
        require(
            amount >= 0.1 ether,
            "The minimum amount that can be withdrawn is 0.1 ether"
        );

        // Kampanyanın toplam bağış miktarını sıfırla
        campaign.totalAmount = 0;

        // Çekimi gerçekleştir
        payable(msg.sender).transfer(amount);

        // Olayı yayınla
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
