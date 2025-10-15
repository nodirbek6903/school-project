const mongoose = require("mongoose")

const fileSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true
        },
        description:{
            type:String,
            trim:true
        },
        category:{
            type:String,
            enum:["dastur","jadval","hisobot","hujjat","boshqa"],
            default:"boshqa"
        },
        file:{
            type:String,
            required:true
        },
        fileType:{
            type:String
        },
        fileSize:{
            type:Number
        },
        uploadedBy:{
            type:String,
            default:"admin"
        },
        uploadedDate:{
            type:Date,
            default:Date.now
        }
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model("File",fileSchema)