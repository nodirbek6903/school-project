const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    date:{
        type:Date,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    images:[{type:String}],
    status:{
        type:String,
        enum:["upcoming","completed"],
        default:"upcoming"
    },
    createdAt: {
        type:Date,
        default:Date.now
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Event",eventSchema)
