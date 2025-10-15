const Class = require("../models/Class")

const getClass = async (req,res) => {
    try {
        const classes = await Class.find()
        .populate("classTeacher", "firstName lastName")
        res.json(classes)
    } catch (error) {
        res.status(500).json({message:"Server xatosi",error:error.message})
    }
}

const getClassById = async (req,res) => {
    try {
        const singleClass = await Class.findById(req.params.id)
        if(!singleClass){
            return res.status(404).json({message:"Sinf topilmadi"})
        }
        res.json(singleClass)
    } catch (error) {
        res.status(500).json({message:"Server xatosi",error:error.message})
    }
}

const createClass = async (req,res) => {
    try {
        const {name,gradeLevel,section,classTeacher,startYear,graduationYear} = req.body

        const newClass = new Class({
            name,gradeLevel,section,classTeacher,startYear,graduationYear
        })
        const createdClass = await newClass.save()
        res.status(201).json(createdClass)
    } catch (error) {
        res.status(500).json({message:"Server xatosi",error:error.message})
    }
}

const updateClass = async(req,res) => {
    try {
        const {name,gradeLevel,section,classTeacher,startYear,graduationYear} = req.body

        const singleClass = await Class.findById(req.params.id)

        if(!singleClass){
            return res.status(404).json({message:"Sinf topilmadi"})
        }

        singleClass.name = name || singleClass.name
        singleClass.gradeLevel = gradeLevel || singleClass.gradeLevel
        singleClass.section = section || singleClass.section
        singleClass.classTeacher = classTeacher || singleClass.classTeacher
        singleClass.startYear = startYear || singleClass.startYear
        singleClass.graduationYear = graduationYear || singleClass.graduationYear

        const updatedClass = await singleClass.save()
        res.json(updatedClass)
    } catch (error) {
        res.status(500).json({message:"Server xatosi",error:error.message})
    }
}

const deleteClass = async (req,res) => {
    try {
        const singleClass = await Class.findById(req.params.id)
        if(!singleClass){
            return res.status(404).json({message:"Sinf topilmadi"})
        }
        await singleClass.deleteOne()
        res.json({message:"Sinf o'chirildi"})
    } catch (error) {
        res.status(500).json({message:"Server xatosi",error:error.message})
    }
}

module.exports = {getClass,createClass,getClassById,updateClass,deleteClass}