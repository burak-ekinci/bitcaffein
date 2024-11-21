const router = require("express").Router()
const UserController = require("../controllers/user_controller")

router.post("/getuser",(req,res) => {res.json({"feedback": "hello", "reqDeNevar": req.body})})

router.post("/signup", UserController.signUp)

router.post("/login",  UserController.login)

module.exports = router;