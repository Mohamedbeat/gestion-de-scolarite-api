const mongoose = require("mongoose");

const specialitySchema = new mongoose.Schema(
  {
    specialityTitle: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    specialityCode: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    requiredLevel: {
      type: String,
      trim: true,
      enum: ["4AM", "1AS", "2AS", "3AS"],
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const specialityModel = mongoose.model("speciality", specialitySchema);

module.exports = specialityModel;
