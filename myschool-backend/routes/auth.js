const express = require("express")
const router = express.Router()
const {registerUser,getMe,loginUser} = require("../controllers/authController")
const {protect,authorize} = require("../middleware/authMiddleware")

router.post("/login",loginUser)

router.post("/register", protect, authorize("admin"), registerUser)

router.get("/me",protect,getMe)

module.exports = router