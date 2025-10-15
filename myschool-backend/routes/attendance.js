const express = require("express")
const router = express.Router()
const {getAllAttendance,getAttendanceClassAndDate,markAttendance,generateTodayAttendance,getAttendanceHistory,getAttendanceStats} = require("../controllers/attendanceController")
const {protect,authorize} = require("../middleware/authMiddleware")

router.post("/",protect,authorize("admin","teacher"),markAttendance)
router.get("/",protect,getAttendanceClassAndDate)
router.get("/all",protect,authorize("admin"),getAllAttendance)


router.get("/history",protect,getAttendanceHistory)
router.get("/stats",protect,getAttendanceStats)
router.get("/generate-today",protect,authorize("admin"),generateTodayAttendance)

module.exports = router