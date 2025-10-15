const Book = require("../models/Book")
const LibraryRecord = require("../models/LibraryRecord")


const getBooks = async (req, res) => {
    try {
        const books = await Book.find()
        res.json(books)
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi', error: error.message });
    }
}

const getBookById = async(req,res) => {
    try {
        const book = await Book.findById(req.params.id)
        if(!book){
            return res.status(404).json({message:"Kitob topilmadi"})
        }
        res.json(book)
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi', error: error.message });
    }
}

const createBook = async (req,res) => {
    try {
        const {title,author,isbn,publishedyear,category,copies} = req.body

        const book = new Book({
            title,
            author,
            isbn,
            copies,
            availableCopies,
            category,
            publishedyear
        })

        const createdBook = await book.save()
        res.status(201).json(createdBook)
    } catch (error) {
        res.status(500).json({ message: "Server xatosi", error: error.message });
    }
}

const updateBook = async(req,res) => {
    try {
        const { title, author, isbn, copies, availableCopies, category, publishedyear } = req.body;

        const book = await Book.findById(req.params.id)
        if(!book){
            return res.status(404).json({ message: "Kitob topilmadi" });
        }

        book.title = title || book.title
        book.author = author || book.author
        book.isbn = isbn || book.isbn
        book.copies = copies || book.copies
        book.availableCopies = availableCopies || book.availableCopies
        book.category = category || book.category
        book.publishedyear = publishedyear || book.publishedyear

        const updatedBook = await book.save()
        res.json(updatedBook)
    } catch (error) {
        res.status(500).json({ message: "Server xatosi", error: error.message });
    }
}

const deleteBook = async(req,res) => {
    try {
        const book = await Book.findById(req.params.id)

        if(!book){
            return res.status(404).json({message:"Kitob topilmadi"})
        }

        await book.deleteOne()
        res.json({message:"Kitob o'chirildi"})
    } catch (error) {
         res.status(500).json({ message: "Server xatosi", error: error.message });
    }
}


const createRecord = async(req,res) => {
    try {
        const {student,book,dueDate} = req.body

        const foundBook = await Book.findById(book)

        if(!foundBook){
            return res.status(404).json({message:"Kitob topilmadi"})
        }

        if(foundBook.availableCopies <=0){
            return res.status(400).json({message:"Kitob qolmagan"})
        }

        const record =new LibraryRecord({
            student,
            book,
            dueDate
        })

        foundBook.availableCopies -= 1

        await record.save()
        await foundBook.save()

        res.status(201).json(record)
    } catch (error) {
        res.status(500).json({ message: "Server xatosi", error: error.message });
    }
}


const returnBook  = async (req,res) => {
    try {
        const record = await LibraryRecord.findById(req.params.id).populate("book")

        if(!record){
            return res.status(404).json({message:"Record topilmadi"})
        }

        if(record.returnDate){
            return res.status(400).json({message:"Kitob allaqachon qaytarilgan"})
        }

        record.returnDate = new Date()
        record.status = "returned"
        record.book.availableCopies += 1

        await record.save()
        await record.book.save()

        res.json({message:"Kitob qaytarildi", record})
    } catch (error) {
        res.status(500).json({ message: "Server xatosi", error: error.message });
    }
}

const getRecords = async(req, res) => {
    try {
        const records = await LibraryRecord.find()
        .populate("student","firstName lastName").populate("book", "title author isbn")

        res.json(records)
    } catch (error) {
        res.status(500).json({ message: "Server xatosi", error: error.message });
    }
}

module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    createRecord,
    returnBook,
    getRecords
}