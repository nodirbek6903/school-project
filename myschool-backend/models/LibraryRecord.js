const mongoose = require("mongoose")

const libraryRecordSchema = new mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student",
        required:true
    },
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Books",
        required:true
    },
    issuedDate:{
        type:Date,
        default:Date.now
    },
    dueDate:{type:Date,required:true},
    returnDate:{
        type:Date
    },
    status:{
        type:String,
        enum:["issued","returned"],
        default:"issued"
    }
},{timestamps:true})

module.exports = mongoose.model("LibraryRecord",libraryRecordSchema)