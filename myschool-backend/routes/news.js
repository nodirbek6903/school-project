const express = require("express")
const router = express.Router()
const {createNews,deleteNews,getNews,getNewsById,updateNews} = require("../controllers/newsController")
const {authorize,protect} = require("../middleware/authMiddleware")
const upload = require("../utils/fileUpload")

router.get("/",getNews)
router.get("/:id",getNewsById)

router.post("/",protect,authorize("admin"),upload.single("image"),createNews)
router.patch("/:id",protect,authorize("admin"),upload.single("image"),updateNews)
router.delete("/:id",protect,authorize("admin"),deleteNews)

module.exports = router