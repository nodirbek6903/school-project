const Staff = require("../models/Staff")
const User = require("../models/User")

const getStaff = async(req,res) => {
    try {
        const staff = await Staff.find().populate("user","fullName email role")
        res.json(staff)
    } catch (error) {
         res.status(500).json({ message: "Server xatosi", error: error.message });
    }
}

const getStaffById = async (req,res) => {
    try {
        const staff = await Staff.findById(req.params.id).populate("user","fullName email role")
        if(!staff){
            return res.status(404).json({message:"Xodim topilmadi"})
        }
        res.json(staff)
    } catch (error) {
         res.status(500).json({ message: "Server xatosi", error: error.message });
    }
}

const createStaff = async (req,res) => {
    try {
        const {firstName,lastName,role,contact} = req.body

        const staff = new Staff({
            firstName,
            lastName,
            role,
            contact,
            photo:req.file ? req.file.filename : null
        })
        const created = await staff.save()
        res.status(201).json(created)
    } catch (error) {
        res.status(500).json({ message: "Server xatosi", error: error.message });
    }
}


const updateStaff = async(req,res) => {
    try {
        const staff = await Staff.findById(req.params.id)
        if(!staff){
            return res.status(404).json({message:"Xodim topilmadi"})
        }

        staff.firstName = req.body.firstName || staff.firstName
        staff.lastName = req.body.lastName || staff.lastName
        staff.role = req.body.role || staff.role
        staff.contact = req.body.contact || staff.contact

        if(req.file){
            staff.photo = req.file.filename
        }

        const updated = await staff.save()
        res.json(updated)
    } catch (error) {
        res.status(500).json({ message: "Server xatosi", error: error.message });
    }
}

const deleteStaff = async (req,res) => {
    try {
        const staff = await Staff.findById(req.params.id)
        if(!staff){
            return res.status(404).json({message:"Xodim topilmadi"})
        }
        await staff.deleteOne()
        res.json({message:"Xodim o'chirildi"})
    } catch (error) {
        res.status(500).json({ message: "Server xatosi", error: error.message });
    }
}

const registerStaffUser = async(req,res) => {
    try {
       const {staffId,email,password} = req.body

       const staff = await Staff.findById(staffId)
       if(!staff){
        return res.status(404).json({message:"Xodim topilmadi"})
       }

       const userExists = await User.findOne({email})
       if(userExists){
        return res.status(400).json({message:"Bu email allaqachon ishlatilgan"})
       }

       const user = await User.create({
        fullName: `${staff.firstName} ${staff.lastName}`,
        email,
        password,
        role: staff.role === "Kutubxonachi" ? "librarian" : "staff"
       })

       staff.user = user._id

       await staff.save()

       res.status(201).json({
        message:"Xodim tizimga kirish uchun royxatdan o'tkazildi",
        user
       })
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Server xatosi"})
    }
}


module.exports = {getStaff,getStaffById,createStaff,updateStaff,deleteStaff,registerStaffUser}
