const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  registerationNumber: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  birthPlace: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  fatherFirstName: {
    type: String,
    required: true,
    trim: true,
  },
  motherFullName: {
    type: String,
    required: true,
    trim: true,
  },
  studentLevel: {
    type: String,
    required: true,
    enum: ["4AM", "1AS", "2AS", "3AS"],
  },
  scolareYear: {
    type: String,
  },
  brothersNumber: {
    type: Number,
  },
  parentFamilyStatus: {
    type: String,
    enum: ["married", "divorced"],
  },
  studentFamilyStatus: {
    type: String,
    enum: ["married", "divorced", "single"],
  },
  fatherJob: {
    type: String,
    trim: true,
  },
  motherJob: {
    type: String,
    trim: true,
  },
  sex: {
    type: String,
    trim: true,
    required: true,
    enum: ["male", "female"],
  },
  Nationality: {
    type: String,
    trim: true,
    required: true,
  },
  sectionid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "section",
    required: true,
  },
  sectionCode: {
    type: String,
    required: true,
  },
});

const studentModel = mongoose.model("student", studentSchema);

module.exports = studentModel;
