const Student = require("../models/Student")


const getStudents = async (req,res) => {
    try {
        const students = await Student.find().populate("class","name")
        res.json(students)
    } catch (error) {
        res.status(500).json({message:"Server xatosi",error:error.message})
    }
}

const getStudentById = async(req,res) => {
    try {
        const student = await Student.findById(req.params.id).populate("class","name")
        if(!student){
            return res.status(404).json({message:"O'quvchi topilmadi"})
        }
        res.json(student)
    } catch (error) {
        res.status(500).json({message:"Server xatosi", error:error.message})
    }
}

const getStudentByClass = async(req,res) => {
    try {
        const {classId} = req.params
        const students = await Student.find({class:classId}).populate("class", "name")
        res.json(students)
    } catch (error) {
        res.status(500).json({message:"Server xatosi",error:error.message})
    }
}

const createStudent = async(req,res) => {
    try {
        const {firstName, lastName,birthday,classId} = req.body
        const student = new Student({
            firstName,
            lastName,
            birthday,
            class:classId,
            photo: req.file ? req.file.filename : null
        }) 

        const createdStudent = await student.save()
        res.status(201).json(createdStudent)
    } catch (error) {
        res.status(500).json({message:"Server xatosi",error:error.message})
    }
}

const updateStudent = async (req,res) => {
    try {
        const {firstName,lastName,birthday,classId} = req.body

        const student = await Student.findById(req.params.id)
        if(!student){
          return  res.status(404).json({message:"O'quvchi topilmadi"})
        }

        student.firstName = firstName || student.firstName
        student.lastName = lastName || student.lastName
        student.birthday = birthday || student.birthday
        student.class =   classId || student.class
        if(req.file) student.photo = req.file.filename

        const updatedStudent = await student.save()

        res.json(updatedStudent)
    } catch (error) {
        res.status(500).json({message:"Server xatosi", error:error.message})
    }
}

const deleteStudent = async (req,res) => {
    try {
        const student = await Student.findById(req.params.id)
        if(!student){
            return res.status(404).json({message:"O'quvchi topilmadi"})
        }

        await student.deleteOne()
        res.json({message:"O'quvchi o'chirildi"})
    } catch (error) {
        res.status(500).json({message:"Server xatosi",error:error.message})
    }
}

module.exports = {
    getStudents,getStudentById,getStudentByClass,createStudent,updateStudent,deleteStudent
}