const specialityModel = require("../model/specialityModel");
const sectionModel = require("../model/sectionModel");
const asyncWrapper = require("../utils/asyncWrapper");
const { isObjIdValid } = require("../utils/validators/mongoIdValidator");
const appErr = require("../utils/appErr");

// get all sections => GET/sections

exports.getAllSections = asyncWrapper(async (req, res, next) => {
  const allsections = await sectionModel.find();

  return res.status(200).json({ data: allsections });
});

// create section => POST/sections/new
exports.createSection = asyncWrapper(async (req, res, next) => {
  const { specialityid, sectionCode } = req.body;

  const foundSpeciality = await specialityModel.findById(specialityid);
  if (!foundSpeciality) return next(appErr.createErr("speciality not found"));
  const foundSection = await sectionModel.findOne({ sectionCode: sectionCode });
  if (foundSection)
    return next(appErr.createErr("duplicate section code", 400));

  const inputData = req.body;

  const createdSection = await sectionModel.create(inputData);

  return res
    .status(201)
    .json({ message: "created successfully", data: inputData });
});

//get section By Id => GET/sections/:id
exports.getSectionById = asyncWrapper(async (req, res, next) => {
  const isidValid = isObjIdValid(req.params.id);

  if (!isidValid)
    return next(appErr.createErr("Invalid id format", 400, "error"));

  const foundSection = await sectionModel.findById(req.params.id);

  if (!foundSection)
    return next(appErr.createErr("Section not found", 404, "error"));

  return res.status(200).json({ data: foundSection });
});
//get section(s) => GET/sections/advancedSearch
exports.getSectionAdvanced = asyncWrapper(async (req, res, next) => {
  const {
    sectionCode,
    startDate,
    endDate,
    minStudentsNumber,
    maxStudentsNumber,
  } = req.body;

  const foundSections = await sectionModel.find({
    $and: [
      {
        sectionCode: { $regex: sectionCode || "", $options: "i" },
      },
      { startDate: { $eq: startDate || "01-01-1700" } },
      { endDate: { $eq: endDate || "01-01-2080" } },
      {
        studentsNumber: {
          $gte: parseInt(minStudentsNumber) || 0,
          $lte: parseInt(maxStudentsNumber) || 999,
        },
      },
    ],
  });
  return res.status(200).json({ data: foundSections });
  res.send("ok");
});

//update section => PUT /sections/:id
exports.updateSection = asyncWrapper(async (req, res, next) => {
  const isidValid = isObjIdValid(req.params.id);
  const dataInput = req.body;

  if (!isidValid)
    return next(appErr.createErr("Invalid id format", 400, "error"));

  const foundSection = await sectionModel.findById(req.params.id);

  if (!foundSection)
    return next(appErr.createErr("Section not found", 404, "error"));

  const updatedSection = await sectionModel.findByIdAndUpdate(
    { _id: req.params.id },
    dataInput,
    {
      new: true,
    }
  );
  return res
    .status(200)
    .json({ message: "modified successfully", data: updatedSection });
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
