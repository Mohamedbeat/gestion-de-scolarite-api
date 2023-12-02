const studentModel = require("../model/studentModel");
const asyncWrapper = require("../utils/asyncWrapper");
const appErr = require("../utils/appErr");
const sectionModel = require("../model/sectionModel");
const { isObjIdValid } = require("../utils/validators/mongoIdValidator");

exports.createStudent = asyncWrapper(async (req, res, next) => {
  const inputData = req.body;
  const { registerationNumber } = inputData;

  const foundSection = await sectionModel.findById(inputData.sectionid);
  if (!foundSection) return next(appErr.createErr("section not found", 404));

  const foundStudent = await studentModel.findOne({
    registerationNumber: registerationNumber,
  });
  if (foundStudent)
    return next(appErr.createErr("registration number already exist "));
  // ISODate(inputData.birthDate)

  const createdStudent = await studentModel.create({
    ...inputData,
    sectionCode: foundSection.sectionCode,
  });

  return res
    .status(201)
    .json({ message: "created successfully", data: createdStudent });
});

exports.getAllStudents = asyncWrapper(async (req, res, next) => {
  const data = await studentModel.find();

  return res.status(200).json({ data });
});

exports.getStudentById = asyncWrapper(async (req, res, next) => {
  const isValid = isObjIdValid(req.params.id);
  if (!isValid) return next(appErr.createErr("invalid id format", 400));

  const data = await studentModel.findById(req.params.id);
  if (!data) return next(appErr.createErr("student not found", 404));

  return res.status(200).json({ data });
});
