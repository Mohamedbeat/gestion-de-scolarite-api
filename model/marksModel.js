const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
  moduleCode: {
    type: String,
    required: true,
  },
  registerationNumber: {
    type: String,
    required: true,
  },
  semesterCode: {
    trim: true,
    type: String,
    required: true,
  },
  controlOne: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 20,
  },
  controlTwo: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 20,
  },
  exam: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 40,
  },
  passage: {
    type: Number,
    default: 0,
    min: 0,
    max: 20,
  },
  moduleAverage: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 20,
  },
});

const marksModel = mongoose.model("marks", marksSchema);

module.exports = marksModel;
