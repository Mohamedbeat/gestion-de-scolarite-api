const specialityModel = require("../model/specialityModel");
const asyncWrapper = require("../utils/asyncWrapper");
const { isObjIdValid } = require("../utils/validators/mongoIdValidator");
const appErr = require("../utils/appErr");

// get all specialities => GET/specialities

exports.getAllSpecialities = asyncWrapper(async (req, res, next) => {
  const allSPC = await specialityModel.find();

  return res.status(200).json({ data: allSPC });
});

// create Speciality => POST/specialities/new
exports.createSpeciality = asyncWrapper(async (req, res, next) => {
  const inputData = req.body;

  const createdSpeciality = await specialityModel.create(inputData);

  return res
    .status(201)
    .json({ message: "created successfully", data: inputData });
});

//get Speciality By Id => GET/specialities/:id
exports.getSpecialityById = asyncWrapper(async (req, res, next) => {
  const isidValid = isObjIdValid(req.params.id);

  if (!isidValid)
    return next(appErr.createErr("Invalid id format", 400, "error"));

  const foundSpc = await specialityModel.findById(req.params.id);

  if (!foundSpc)
    return next(appErr.createErr("Speciality not found", 404, "error"));

  return res.status(200).json({ data: foundSpc });
});

//update Speciality => PUT /specialities/:id
exports.updateSpeciality = asyncWrapper(async (req, res, next) => {
  const isidValid = isObjIdValid(req.params.id);
  const dataInput = req.body;

  if (!isidValid)
    return next(appErr.createErr("Invalid id format", 400, "error"));

  const foundSpc = await specialityModel.findById(req.params.id);

  if (!foundSpc)
    return next(appErr.createErr("Speciality not found", 404, "error"));

  const updatedSpeciality = await specialityModel.findByIdAndUpdate(
    { _id: req.params.id },
    dataInput,
    {
      new: true,
    }
  );
  return res
    .status(200)
    .json({ message: "modified successfully", data: updatedSpeciality });
});

//delete Speciality => DELETE /specialities/:id
exports.deleteSpeciality = asyncWrapper(async (req, res, next) => {
  const isidValid = isObjIdValid(req.params.id);

  if (!isidValid)
    return next(appErr.createErr("Invalid id format", 400, "error"));

  const foundSpc = await specialityModel.findById(req.params.id);

  if (!foundSpc)
    return next(appErr.createErr("Speciality not found", 404, "error"));

  await specialityModel.findOneAndDelete(req.params.id);

  return res.status(200).json({ message: "Deleted successfully" });
});
