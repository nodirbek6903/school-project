const express = require("express")
const router = express.Router()
const {createSubject,deleteSubject,getSubjectById,getSubjects,updateSubject} = require("../controllers/subjectController")
const {authorize,protect} = require("../middleware/authMiddleware")

router.get("/",protect,getSubjects)
router.get("/:id",protect,getSubjectById)
router.post("/",protect,authorize("admin"),createSubject)
router.patch("/:id",protect,authorize("admin"),updateSubject)
router.delete("/:id",protect,authorize("admin"),deleteSubject)


module.exports = router