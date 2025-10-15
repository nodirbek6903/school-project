const express = require("express")
const router = express.Router()
const {addGrade,deleteGrade,getAllGrades,getStudentGrades,updateGrade} = require("../controllers/gradeController")
const {authorize,protect} = require("../middleware/authMiddleware")

router.post("/",protect,authorize("admin","teacher"), addGrade)
router.get("/",protect,authorize("admin"),getAllGrades)
router.get("/student/:id",protect,authorize("admin","teacher","student"),getStudentGrades)
router.patch("/:id",protect,authorize("admin","teacher"),updateGrade)
router.delete("/:id",protect,authorize("admin"),deleteGrade)

module.exports = router