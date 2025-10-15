const express = require("express")
const router = express.Router()
const {createEvent,deleteEvent,getEventById,getEvents,updateEvent} = require("../controllers/eventController")
const {authorize,protect} = require("../middleware/authMiddleware")
const upload = require("../utils/fileUpload")

router.get("/",getEvents)
router.get("/:id",getEventById)

router.post("/",protect,authorize("admin"),upload.array("images", 10),createEvent)
router.patch("/:id",protect,authorize("admin"),upload.array("images",10),updateEvent)
router.delete("/:id",protect,authorize("admin"),deleteEvent)


module.exports = router