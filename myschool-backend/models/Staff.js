const mongoose = require("mongoose")

const staffSchema = new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    role:{
        type:String,
        required:true
    },
    photo:{type:String},
    contact:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

module.exports = mongoose.model("Staff",staffSchema)