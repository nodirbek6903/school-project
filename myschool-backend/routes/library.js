const express = require("express")
const router = express.Router()

const {createBook,createRecord,deleteBook,getBookById,getBooks,getRecords,returnBook,updateBook} = require("../controllers/libraryController")
const {protect,authorize} = require("../middleware/authMiddleware")

router.get("/books",getBooks)
router.get("/books/:id",getBookById)
router.post("/books",protect,authorize("admin","librarian"),createBook)
router.patch("/books/:id",protect, authorize("admin","librarian"),updateBook)
router.delete("/books/:id",protect,authorize("admin","librarian"),deleteBook)

router.post("/records",protect,authorize("librarian"),createRecord)
router.patch("/records/:id/return",protect,authorize("librarian"),returnBook)
router.get("/records",protect,authorize("admin","librarian"),getRecords)

module.exports = router