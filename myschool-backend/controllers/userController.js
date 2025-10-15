const User = require("../models/User")

const getUsers = async(req,res) => {
    try {
        const users = await User.find().select("-password")
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi', error: err.message });
    }
}

const getUserById = async(req,res) => {
    try {
        const user = User.findById(req.params.id).select("-password")
        if(!user){
            return res.status(404).json({message:"Foydalanuvchi topilmadi"})
            res.json(user)
        }
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi', error: err.message });
    }
}

const updateUser = async(req,res) => {
    try {
        const {fullName,email,role} = req.body

        const user = await User.findById(req.params.id)
        if(!user){
             return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
        }

        user.fullName = fullName || user.fullName
        user.email = email || user.email
        user.role = role || user.role

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            email:updatedUser.email,
            role:updatedUser.role
        })
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi', error: err.message });
    }
}

const deleteUser = async(req,res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
        }

        await user.deleteOne()
        res.json({ message: 'Foydalanuvchi o‘chirildi' });
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi', error: err.message });
    }
}

const updatePassword = async(req,res) => {
    try {
        const userId = req.params.id
        const {password} = req.body

        if(!password || password.length < 6){
            return res.status(400).json({message:"Yangi parol kamida 6 belgilangan iborat bo'lishi kerak"})
        }

        if(req.user.role !== "admin" && req.user._id.toString() !== userId){
            return res.status(403).json({message:"Ruxsat yo'q"})
        }

        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message:"User topilmadi"})
        }
        user.password = password
        await user.save()

        res.json({message:"Parol yangilandi"})

    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Server error"})
    }
}

module.exports = {getUsers,getUserById,updateUser,deleteUser,updatePassword}