
const mongoose = require("mongoose")
const campaignSchema = new mongoose.Schema({
    campaignId: {type:Number, required:true, unique: true},
    name: {type: String, required:true},
    photos: [String], // Base64 formatında saklanacak
  },{collection:"campaign", timestamps: true});

  const Campaign = mongoose.model("Campaign", campaignSchema);
  
  module.exports = Campaign;