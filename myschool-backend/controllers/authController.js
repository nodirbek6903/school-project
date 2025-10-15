const User = require("../models/User")
const generateToken = require("../utils/generateToken")

const registerUser = async(req,res) => {
    try {
        const {fullName,email,password,role} = req.body

        const userExists = await User.findOne({email})
        if(userExists){
            return res.status(400).json({message:"Email allaqachon ishlatilgan"})
        }

        const user = await User.create({fullName,email,password,role})

        res.status(201).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            role:user.role
        })
    } catch (error) {
        res.status(500).json({ message: 'Server xatosi', error: err.message });
    }
}

const loginUser = async(req,res) => {
    const {email,password} = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
        res.json({
            token:generateToken(user._id),
            user:{
                _id:user._id,
            fullName:user.fullName,
            email:user.email,
            role:user.role,
            }
        })
    }else{
        res.status(401).json({message:"Email yoki parol noto'g'ri"})
    }
}

const getMe = async(req,res) => {
    res.json(req.user)
}

module.exports = {registerUser,loginUser,getMe} 
