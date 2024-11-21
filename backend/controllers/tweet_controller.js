const Tweet = require("../models/tweet")

// twit kayıt
const SaveTweet = async (req, res) => {
    const tweetTemplate = new Tweet({
        username: req.body.username,
        tweetText:req.body.tweetText,
    })
     await tweetTemplate.save()
    .then(tweet => res.json({tweet}))
    .catch(error => res.json({error}))
}


// tüm tweetleri getir
const GetTweet = async (req,res) => {
    const tweet = await Tweet.find()

    if (tweet) {
      return res.json({tweets: tweet})
    } else {
      return  res.json({message: "There is no such tweet"})
    }
}

// herhangi bir kullanıcının twitini getir
const GetMyTweet = async (req,res) => {
    const myTweet = await Tweet.find({username: req.body.username})

    if (myTweet) {
      return res.json({tweets : myTweet})
    } else {
      return  res.json({message: "Burada hiç tweet yok :("})
    }
}


module.exports = {
    SaveTweet,
    GetTweet,
    GetMyTweet
}