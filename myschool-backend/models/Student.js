const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    firstName:{
        type:String, required:true
    },
    lastName:{
        type:String,
        required:true
    },
    birthday:{type:Date},
    photo:{type:String},
    class: {type:mongoose.Schema.Types.ObjectId, ref:"Class",default:null},
},
{timestamps:true}
)

module.exports = mongoose.model("Student",studentSchema)