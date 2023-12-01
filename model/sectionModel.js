const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema(
  {
    sectionCode: {
      trim: true,
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    specialityid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "speciality",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    studentsNumber: {
      type: Number,
      default: 0,
    },
    cycle: {
      type: String,
    },
    maleStudentsNumber: {
      type: Number,
      default: 0,
    },
    femaleStudentsNumber: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const sectionModel = mongoose.model("section", sectionSchema);

module.exports = sectionModel;
