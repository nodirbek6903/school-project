const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    gradeLevel: { type: Number, required: true },

    section: { type: String },

    startYear: { type: Number, required: true },
    classTeacher: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Teacher",
      default:null
    },

    graduationYear: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", classSchema);
