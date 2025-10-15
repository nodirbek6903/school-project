const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    photo: { type: String },
    subjects: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Subject", default: null,required:false },
    ],
    user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);
