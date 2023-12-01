const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/gestionDeScolarite");
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectToDb;
