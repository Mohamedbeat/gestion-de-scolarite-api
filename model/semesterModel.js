const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema({
  sectionCode: {
    trim: true,
    type: String,
    required: true,
  },
  semesterCode: {
    trim: true,
    type: String,
    required: true,
  },
  semesterTitle: {
    trim: true,
    type: String,
    required: true,
    unique: true,
  },
  successfulStudents: {
    type: Number,
    default: 0,
  },
  failedStudents: {
    type: Number,
    default: 0,
  },
});

const semesterModel = mongoose.model("semester", semesterSchema);
module.exports = semesterModel;
