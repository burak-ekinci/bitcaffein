const mongoose = require("mongoose")

const TweetSchema = new mongoose.Schema({
    username: {type: String, required:true},
    tweetText: {type:String, required:true},
    // tweetLike: { type: Number, default: 0 },
    // tweetDisLike: { type: Number, default: 0 }
},{timestamps:true})

const Tweet = mongoose.model("tweet", TweetSchema)

module.exports = Tweet;