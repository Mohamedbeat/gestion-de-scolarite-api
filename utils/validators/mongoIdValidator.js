const mongoose = require("mongoose");

exports.isObjIdValid = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};
