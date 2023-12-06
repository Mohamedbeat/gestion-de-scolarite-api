const sectionModel = require("../model/sectionModel");
const semesterModel = require("../model/semesterModel");
const appErr = require("../utils/appErr");
const asyncWrapper = require("../utils/asyncWrapper");
const { isObjIdValid } = require("../utils/validators/mongoIdValidator");

exports.createSemester = asyncWrapper(async (req, res, next) => {
  const sectionCode = req.body.sectionCode;
  const semesterTitle = req.body.semesterTitle;

  const foundSection = await sectionModel.findOne({
    sectionCode: sectionCode,
  });

  if (!foundSection) return next(appErr.createErr("section not found", 404));

  const existSemester = await semesterModel.findOne({
    sectionCode,
    semesterTitle,
  });

  if (existSemester)
    return next(appErr.createErr("this semester already exist", 400));

  const data = {
    sectionCode,
    semesterTitle,
    semesterCode: semesterTitle.trim() + "-" + sectionCode,
  };

  const createdSemester = await semesterModel.create({ ...data });

  return res
    .status(201)
    .json({ message: "created succesfully", data: createdSemester });
});

exports.getAllSemesters = asyncWrapper(async (req, res, next) => {
  const sectionCode = req.query.sectionCode || "";
  const foundSemesters = await semesterModel.find({
    $and: [{ sectionCode: { $regex: sectionCode, $options: "i" } }],
  });
  return res.status(200).json({ data: foundSemesters });
});

exports.getSemesterByid = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;

  const isValid = isObjIdValid(id);

  if (!isValid) return next(appErr.createErr("invalid id format", 400));

  const foundSemester = await semesterModel.findById(id);
  if (!foundSemester) return next(appErr.createErr("semester not found", 404));
  return res.status(200).json({ data: foundSemester });
});

exports.updateSemester = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;

  const isValid = isObjIdValid(id);

  if (!isValid) return next(appErr.createErr("invalid id format", 400));

  const foundSemester = await semesterModel.findById(id);
  if (!foundSemester) return next(appErr.createErr("semester not found", 404));

  const sectionCode = req.body.sectionCode;
  const semesterTitle = req.body.semesterTitle;

  const foundSection = await sectionModel.findOne({ sectionCode: sectionCode });
  if (!foundSection)
    return next(appErr.createErr("section code not found", 404));

  const data = {
    sectionCode,
    semesterTitle,
    semesterCode: semesterTitle.trim() + "-" + sectionCode,
  };

  const existSemester = await semesterModel.findOne({
    semesterCode: data.sectionCode,
  });
  if (existSemester)
    return next(appErr.createErr("semester code already exist", 400));

  const updatedSemester = await semesterModel.findByIdAndUpdate(
    id,
    { ...data },
    { new: true }
  );

  return res
    .status(200)
    .json({ message: "updated seccessfully", data: updatedSemester });
});

exports.deleteSemester = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;

  const isValid = isObjIdValid(id);

  if (!isValid) return next(appErr.createErr("invalid id format", 400));

  const foundSemester = await semesterModel.findById(id);
  if (!foundSemester) return next(appErr.createErr("semester not found", 404));

  await semesterModel.findByIdAndDelete(id);

  return res.status(200).json({ message: "deleted successfully" });
});
