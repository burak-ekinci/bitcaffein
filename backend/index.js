const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const TweetModel = require("./models/tweet")
const userRouter = require("./routers/user_router")
const tweetRouter = require("./routers/tweet_router")
const User = require("./models/user")


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/apex")
.then(() => console.log("db connection is done"))
.catch(err => console.log(err))

app.use("/user", userRouter)
app.use("/tweet", tweetRouter)
app.use("/change", async (req, res) => {
    const degis = await User.findOneAndUpdate(
        {username: req.body.username},
        {$set: {email: "yyyyyyyyy"}},
        {new: true});
    res.json({degis})
})


app.listen(3000, () => {
    console.log("The server is up from port 3000!")
})

