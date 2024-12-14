const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv").config()
const campaignRouter = require("./routers/campaign_router")

const app = express()

app.use(cors())
app.use(express.json({limit: "10mb"}))
app.use(express.urlencoded({limit: '10mb', extended: true }));

app.use("/campaign", campaignRouter)
app.use("/", (req,res) => {
    res.send("hlow")
})


app.listen(process.env.CONNECTION_PORT, () => {
    console.log(`The server is up from port ${process.env.CONNECTION_PORT} !`)
})
mongoose.connect("mongodb://127.0.0.1:27017/bitcaffein")
.then(() => console.log("db connection is done"))
.catch(err => console.log(err))

