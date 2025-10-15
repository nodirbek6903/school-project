const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const User = require("./models/User")
require("dotenv").config()

const createAdmin = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)

        const existingAdmin = await User.findOne({email:"admin@myschool.uz"})
        if(existingAdmin){
            console.log("Admin allaqachon mavjud", existingAdmin)
            process.exit()
        }


        const admin = new User({
            fullName: "Nodirbek Umarov",
            email:"admin@myschool.uz",
            password:"admin123",
            role:"admin"
        })

        await admin.save()
        console.log("Admin yaratildi:",admin)
        process.exit()

    } catch (error) {
        console.error("Xato:",error.message)
        process.exit(1)
    }
}

createAdmin()