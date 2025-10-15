const express = require("express")
const router = express.Router()
const {createTimetable,deleteTimetable,getAllTimetables,getTimetableByClass,updateTimetable} = require("../controllers/timetableController")
const {protect,authorize} = require("../middleware/authMiddleware")

router.post("/",protect,authorize("admin","teacher"),createTimetable)
router.get("/",protect,getAllTimetables)
router.get("/class/:classId",protect,getTimetableByClass)
router.patch("/:id",protect,authorize("admin","teacher"),updateTimetable)
router.delete("/:id",protect,authorize("admin","teacher"),deleteTimetable)

module.exports = router