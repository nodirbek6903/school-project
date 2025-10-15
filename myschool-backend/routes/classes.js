const express = require("express")
const router = express.Router()
const {getClass,getClassById,createClass,updateClass,deleteClass} = require("../controllers/classController")
const {protect,authorize} = require("../middleware/authMiddleware")


router.get("/",protect,authorize("admin"),getClass)
router.get("/:id",protect,authorize("admin"),getClassById)
router.post("/",protect,authorize("admin"),createClass)
router.patch("/:id",protect,authorize("admin"),updateClass)
router.delete("/:id",protect,authorize("admin"),deleteClass)

module.exports = router