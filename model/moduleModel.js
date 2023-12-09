const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  moduleCode: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  semesterCode: {
    trim: true,
    type: String,
    required: true,
  },
  moduleTitle: {
    type: String,
    required: true,
    trim: true,
  },
  moduleCoef: {
    type: Number,
    required: true,
    min: 1,
  },
  eleminationPoint: {
    type: Number,
    required: true,
    min: 1,
  },
  teacher: {
    type: String,
    requried: true,
    trim: true,
  },
  specialityid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "speciality",
  },
  specialityCode: {
    type: String,
    required: true,
  },
});

const moduleModel = mongoose.model("module", moduleSchema);

module.exports = moduleModel;
