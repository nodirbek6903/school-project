const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination(req,file,cb) {
        cb(null,"uploads/")
    },
    filename(req,file, cb){
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
        cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`)
    }
})

const fileFilter = (req,file,cb) => {
    const allowed = /jpeg|jpg|png|pdf|doc|docx|ppt|pptx/;
    const extname = allowed.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowed.test(file.mimetype)

    if(extname && mimetype){
        cb(null,true)
    }else{
        cb(new Error("Yuklanayotgan fayl turi noto'g'ri!"), false)
    }
}

const upload = multer({
    storage,
    limits:{
        fileSize:10 * 1024 * 1024
    },
    fileFilter
})

module.exports = upload