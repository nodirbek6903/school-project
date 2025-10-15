const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const {deleteFile,getFileById,uploadFile,getFiles} = require("../controllers/fileController")
const {protect,authorize} = require("../middleware/authMiddleware")

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "uploads/files/")
    },
    filename: function(req,file,cb){
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
        cb(null,uniqueSuffix + path.extname(file.originalname))
    }
})

const upload = multer({storage})

router.post("/",upload.single("file"),protect,authorize("admin","teacher"),uploadFile)

router.get("/",protect,getFiles)
router.get("/:id",protect,getFileById)

router.delete("/:id",protect,authorize("admin","teacher"),deleteFile)

module.exports = router