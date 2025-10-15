const mongoose = require("mongoose")

const GradeSchema = new mongoose.Schema({
    student:{type:mongoose.Schema.Types.ObjectId, ref:"Student", required:true},
    subject:{type:String,required:true},
    grade:{
        type:String,required:true
    },
    date:{type:Date,default:Date.now}
},{timestamps:true})

module.exports = mongoose.model("Grade",GradeSchema)