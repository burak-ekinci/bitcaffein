const Campaign = require("../models/campaign")

const addCampaign = async (req,res) => {
    try {
        const {campaignId, name, photos   } = req.body;
    
        const newCampaign = new Campaign({ campaignId, name, photos });
        await newCampaign.save();
    
        res.status(200).json({ message: "Photos uploaded successfully", valid : true});
      } catch (error) {
        res.status(500).json({ error: error.message, valid : false });
      }
}

const getCampaign = async (req,res) => {
    try {
        const campaign = await Campaign.findOne({campaignId:req.params.id});
        res.status(200).json({campaign , valid : true});
      } catch (error) {
        res.status(404).json({ error: "Photo not found", valid : false });
      }
}

module.exports = {
    addCampaign,
    getCampaign
}