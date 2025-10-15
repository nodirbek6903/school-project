const mongoose = require("mongoose")


const attendanceSchema = new mongoose.Schema({
    classId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Class",
        required:true
    },
    subjectId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subject",
        required:false
    },
    date:{
        type:Date,
        required:true
    },
    records:[
        {
            studentId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Student",
                required:true
            },
            status:{
                type:String,
                enum:["present","absent"],
                default:"present"
            },
            note:{
                type:String
            }
        }
    ],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Teacher",
        required:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Attendance",attendanceSchema)