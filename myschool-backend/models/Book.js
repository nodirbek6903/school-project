const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title:{type:String,required:true},
    author:{type:String,required:true},
    isbn:{
        type:String,
        unique:true
    },
    copies:{
        type:Number,
        default:1
    },
    availableCopies:{
        type:Number,
        default:1
    },
    category:{type:String},
    publishedyear:{type:Number}
},{timestamps:true})

module.exports = mongoose.model("Books",bookSchema)
