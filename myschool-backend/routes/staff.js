const express = require("express")
const router = express.Router()
const {createStaff,deleteStaff,getStaff,getStaffById,updateStaff,registerStaffUser} = require("../controllers/staffController")
const {authorize,protect} = require("../middleware/authMiddleware")
const upload = require("../utils/fileUpload")

router.get("/",getStaff)
router.get("/:id",getStaffById)

router.post("/",protect,authorize("admin"),upload.single("photo"),createStaff)
router.post("/register-user",protect,authorize("admin"),registerStaffUser)
router.patch("/:id",protect,authorize("admin"),upload.single("photo"),updateStaff)
router.delete("/:id",protect,authorize("admin"),deleteStaff)


module.exports = router