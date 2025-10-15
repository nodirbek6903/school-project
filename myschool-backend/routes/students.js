const express = require("express")
const router = express.Router()
const {getStudents,getStudentById,getStudentByClass,createStudent,deleteStudent,updateStudent} = require("../controllers/studentController")
const {protect,authorize} = require("../middleware/authMiddleware")
const upload = require("../utils/fileUpload")

router.get("/",protect, authorize("admin", "teacher","librarian"), getStudents)
router.get("/:id",protect, authorize("admin", "teacher"), getStudentById)
router.get("/class/:classId",protect, authorize("admin", "teacher"), getStudentByClass)
router.post("/",protect, authorize("admin"),upload.single("photo"),createStudent)
router.patch("/:id",protect,authorize("admin"),upload.single("photo"),updateStudent)
router.delete("/:id",protect,authorize("admin"),deleteStudent)

module.exports = router

