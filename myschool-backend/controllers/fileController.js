const File = require("../models/File")
const fs = require("fs")
const path = require("path")


const uploadFile = async (req,res) => {
    try {
        if(!req.file){
            return res.status(400).json({message:"Fayl yuklanmadi!"})
        }

        const {title,description,category,uploadedBy} = req.body


        const newFile = new File({
            title,
            description,
            category,
            uploadedBy:uploadedBy || "admin",
            file:req.file.filename,
            fileType:path.extname(req.file.originalname).replace(".", ""),
            fileSize:req.file.size
        })

        await newFile.save()
        res.status(201).json({message:"Fayl muvaffaqqiyatli yuklandi!", file:newFile})

    } catch (error) {
        console.error("Uploaded error:", error)
        res.status(500).json({message:"Server xatosi fayl yuklashda."})
    }
}

const getFiles = async(req,res) => {
    try {
        const files = await File.find().sort({createdAt: -1})
        res.status(200).json(files)
    } catch (error) {
        res.status(500).json({message:"Fayllarni olishda xatolik yuz berdi."})
    }
}

const getFileById = async(req,res) => {
    try {
        const file = await File.findById(req.params.id)
        if(!file){
            return res.status(404).json({message:"Fayl topilmadi."})
        }
        res.status(200).json(file)
    } catch (error) {
        res.status(500).json({message:"Server xatosi faylni olishda"})
    }
}

const deleteFile = async (req,res) =>{
    try {
        const file = await File.findById(req.params.id)
        if(!file){
            return res.status(404).json({message:"Fayl topilmadi"})
        }

        const filePath = path.join(__dirname, "../uploads/files",file.file)
        if(fs.existsSync(filePath)){
            fs.unlinkSync(filePath)
        }

        await file.deleteOne()
        res.status(200).json({message:"Fayl o'chirildi"})

    } catch (error) {
        res.status(500).json({message:"Faylni o'chirishda xatolik yuz berdi"})
    }
}

module.exports = {
    uploadFile,
    getFiles,
    getFileById,
    deleteFile
}