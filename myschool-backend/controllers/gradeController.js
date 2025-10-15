const Grade = require("../models/Grade")
const Student = require("../models/Student")

const addGrade = async (req,res) => {
    try {
        const {studentId,subject,grade} = req.body

        if(!studentId || !subject || !grade){
            return res.status(400).json({message:"Barcha maydonlar to'ldirilishi shart"})
        }

        const student = await Student.findById(studentId)
        if(!student){
            return res.status(404).json({message:"O'quvchi topilmadi"})
        }

        const newGrade = new Grade({
            student:studentId,
            subject,
            grade
        })

        const savedGrade = await newGrade.save()

        res.status(201).json(savedGrade)
    } catch (error) {
        res.status(500).json({message:"Server xatosi",error:error.message})
    }
}

const getStudentGrades = async (req,res) => {
    try {
        const studentId = req.params.id
        const grades = await Grade.find({student:studentId}).sort({date:-1})
        res.json(grades)
    } catch (error) {
        res.status(500).json({message:"Server xatosi",error:error.message})
    }
}

const getAllGrades = async(req,res) => {
    try {
        const grades = await Grade.find().populate("student", "firstName lastName class")
        res.json(grades)
    } catch (error) {
        res.status(500).json({message:"Server xatosi", error:error.message})
    }
}

const updateGrade = async (req,res) => {
    try {
        const {subject,grade} = req.body
        const gradeRecord =  await Grade.findById(req.params.id)

        if(!gradeRecord){
            return res.status(404).json({message:"Baho topilmadi"})
        }

        gradeRecord.subject = subject || gradeRecord.subject
        gradeRecord.grade = grade || gradeRecord.grade

        const updatedGrade = await gradeRecord.save()

        res.json(updatedGrade)
    } catch (error) {
        res.status(500).json({message:"Server xatosi",error:error.message})
    }
}

const deleteGrade = async (req,res) => {
    try {
        const gradeRecord = await Grade.findById(req.params.id)
        if(!gradeRecord){
            return res.status(404).json({message:"Baho topilmadi"})
        }

        await gradeRecord.deleteOne()
        res.json({message:"Baho o'chirildi"})
    } catch (error) {
        res.status(500).json({message:"server xatosi",error:error.message})
    }
}

module.exports = {
    addGrade,
    getStudentGrades,
    getAllGrades,
    updateGrade,
    deleteGrade
}