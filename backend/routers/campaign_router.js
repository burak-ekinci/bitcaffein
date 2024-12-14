const router = require("express").Router()
const campaignController = require("../controllers/campaign_controller")

router.post("/test",(req,res) => {res.json({"feedback": "hello", "reqDeNevar": req.body.test})})

router.post("/add", campaignController.addCampaign)

router.get("/get/:id", campaignController.getCampaign)

router.post("/delete",  (req,res) => {res.json({"feedback": "hello", "reqDeNevar": req.body})})

router.post("/update",  (req,res) => {res.json({"feedback": "hello", "reqDeNevar": req.body})})

module.exports = router;