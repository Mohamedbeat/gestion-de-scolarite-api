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
  inputData.specialityTitle = foundSpeciality.specialityTitle;

  const createdSection = await sectionModel.create({ ...inputData });

  return res
    .status(201)
    .json({ message: "created successfully", data: createdSection });
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
    specialityTitle,
  } = req.body;
  console.log(req.body);

  const foundSections = await sectionModel.find({
    $and: [
      {
        sectionCode: { $regex: sectionCode || "", $options: "i" },
      },
      {
        specialityTitle: { $regex: specialityTitle || "", $options: "i" },
      },
      { startDate: { $gte: startDate || "01-01-1700" } },
      { endDate: { $lte: endDate || "01-01-2080" } },
      {
        studentsNumber: {
          $gte: parseInt(minStudentsNumber) || 0,
          $lte: parseInt(maxStudentsNumber) || 999,
        },
      },
    ],
  });
  return res.status(200).json({ data: foundSections });
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

  if (dataInput.specialityid) {
    const foundSpeciality = await specialityModel.findById(
      dataInput.specialityid
    );
    if (!foundSpeciality)
      return next(res.status(404).json({ message: "speciality id not found" }));
  }

  const updatedSection = await sectionModel.findByIdAndUpdate(
    { _id: req.params.id },
    dataInput,
    {
      new: true,
    }
  );
  if (dataInput.specialityid) {
    const foundSpeciality = await specialityModel.findById(
      dataInput.specialityid
    );
    if (!foundSpeciality)
      return next(res.status(404).json({ message: "speciality id not found" }));

    updatedSection.specialityid = dataInput.specialityid;

    updatedSection.specialityTitle = foundSpeciality.specialityTitle;
    await updatedSection.save();
  }
  return res
    .status(200)
    .json({ message: "modified successfully", data: updatedSection });
});

//delete Section => DELETE /sections/:id
exports.deleteSection = asyncWrapper(async (req, res, next) => {
  const isidValid = isObjIdValid(req.params.id);

  if (!isidValid)
    return next(appErr.createErr("Invalid id format", 400, "error"));

  const foundsec = await sectionModel.findById(req.params.id);

  if (!foundsec)
    return next(appErr.createErr("Section not found", 404, "error"));

  await sectionModel.findByIdAndDelete(req.params.id);

  return res.status(200).json({ message: "Deleted successfully" });
});
