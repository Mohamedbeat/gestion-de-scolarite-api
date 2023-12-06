const mongoose = require("mongoose");

const decisionSchema = new mongoose.Schema({
  semesterCode: {
    trim: true,
    type: String,
    required: true,
  },
  registerationNumber: {
    type: String,
    required: true,
    trim: true,
  },
  decision: {
    type: String,
    required: true,
    default: "unset",
    enum: ["unset", "successful", "failed"],
  },
  semesterAverage: {
    type: Number,
    default: 0,
  },
});

const decisionModel = mongoose.model("decision", decisionSchema);

module.exports = decisionModel;
