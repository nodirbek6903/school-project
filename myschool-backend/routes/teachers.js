const express = require("express")
const router = express.Router()
const {getTeacherById,createTeacher,deleteTeacher,getTeachers,updateTeacher,registerTeacherUser} = require("../controllers/teacherController")
const {protect,authorize} = require("../middleware/authMiddleware")
const upload = require("../utils/fileUpload")

router.get("/",protect,authorize("admin"),getTeachers)
router.get("/:id",protect,getTeacherById)
router.post("/",protect,authorize("admin"),upload.single("photo"),createTeacher)
router.post("/register-user",protect,authorize("admin"),registerTeacherUser)
router.patch("/:id",protect,authorize("admin"),upload.single("photo"),updateTeacher)
router.delete("/:id",protect,authorize("admin"),deleteTeacher)

module.exports = router
