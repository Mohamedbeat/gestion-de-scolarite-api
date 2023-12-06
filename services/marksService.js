const marksModel = require("../model/marksModel");
const moduleModel = require("../model/moduleModel");
const semesterModel = require("../model/semesterModel");
const studentModel = require("../model/studentModel");
const appErr = require("../utils/appErr");
const asyncWrapper = require("../utils/asyncWrapper");

exports.createMark = asyncWrapper(async (req, res, next) => {
  const moduleCode = req.body.moduleCode;
  const semesterCode = req.body.semesterCode;
  const registerationNumber = req.body.registerationNumber;
  const controlOne = req.body.controlOne;
  const controlTwo = req.body.controlTwo;
  const exam = req.body.exam;
  const passage = req.body.passage || 0;

  // check if module exist
  const foundModule = await moduleModel.findOne({ moduleCode: moduleCode });

  ////////////
  if (!foundModule) return next(appErr.createErr("module not found", 404));

  /////////// check if student exist
  const foundStudent = await studentModel.findOne({
    registerationNumber: registerationNumber,
  });
  if (!foundStudent) return next(appErr.createErr("student not found", 404));
  /////////// check if semester exist
  const foundSemster = await semesterModel.findOne({
    semesterCode: semesterCode,
  });
  if (!foundSemster) return next(appErr.createErr("semester not found", 404));

  ///////////////////////////////////////

  //check if mark exist

  const existMark = await marksModel.findOne({
    registerationNumber: registerationNumber,
    moduleCode: moduleCode,
    semesterCode: semesterCode,
  });

  if (existMark) return next(appErr.createErr("this mark already exist", 400));

  var moduleAverage = (controlOne + controlTwo + exam) / 4;

  if (moduleAverage < 10 && exam < passage) {
    moduleAverage = (controlOne + controlTwo + passage) / 4;
  }

  const data = {
    moduleCode,
    registerationNumber,
    semesterCode,
    controlOne,
    controlTwo,
    exam,
    passage,
    moduleAverage,
  };

  const createdMark = await marksModel.create(data);

  return res
    .status(201)
    .json({ message: "created successfully", data: createdMark });
});

exports.updateMark = asyncWrapper(async (req, res, next) => {
  const moduleCode = req.body.moduleCode;
  const registerationNumber = req.body.registerationNumber;
  const semesterCode = req.body.semesterCode;
  // check if module exist
  const foundModule = await moduleModel.findOne({ moduleCode: moduleCode });

  ////////////
  if (!foundModule) return next(appErr.createErr("module not found", 404));

  /////////// check if student exist
  const foundStudent = await studentModel.findOne({
    registerationNumber: registerationNumber,
  });
  if (!foundStudent) return next(appErr.createErr("student not found", 404));

  /////////// check if semester exist
  const foundSemster = await semesterModel.findOne({
    semesterCode: semesterCode,
  });
  if (!foundSemster) return next(appErr.createErr("semester not found", 404));

  ///////////////////////////////////////

  //check if mark exist

  const existMark = await marksModel.findOne({
    registerationNumber: registerationNumber,
    moduleCode: moduleCode,
    semesterCode: semesterCode,
  });

  if (!existMark) return next(appErr.createErr("mark not found", 404));

  const controlOne = req.body.controlOne || existMark.controlOne;
  const controlTwo = req.body.controlTwo || existMark.controlTwo;
  const exam = req.body.exam || existMark.exam;
  const passage = req.body.passage || existMark.passage;

  /////////////////
  var moduleAverage = (controlOne + controlTwo + exam) / 4;

  if (moduleAverage < 10 && exam < passage) {
    moduleAverage = (controlOne + controlTwo + passage) / 4;
  }

  // const data = {
  //   moduleCode,
  //   registerationNumber,
  //   controlOne,
  //   controlTwo,
  //   exam,
  //   passage,
  //   moduleAverage,
  // };

  existMark.controlOne = controlOne;
  existMark.controlTwo = controlTwo;
  existMark.exam = exam;
  existMark.passage = passage;
  existMark.moduleAverage = moduleAverage;
  await existMark.save();

  res.status(200).json({ message: "updated successfully", data: existMark });
});

exports.getAllMarks = asyncWrapper(async (req, res, next) => {
  const moduleCode = req.query.moduleCode || "";
  const registerationNumber = req.query.registerationNumber || "";
  const semesterCode = req.query.semesterCode || "";

  const foundMarks = await marksModel.find({
    $and: [
      { moduleCode: { $regex: moduleCode, $options: "i" } },
      { registerationNumber: { $regex: registerationNumber, $options: "i" } },
      { semesterCode: { $regex: semesterCode, $options: "i" } },
    ],
  });

  return res.status(200).json({ data: foundMarks });
});

exports.deleteMark = asyncWrapper(async (req, res, next) => {
  const moduleCode = req.body.moduleCode;
  const registerationNumber = req.body.registerationNumber;
  const semesterCode = req.body.semesterCode;

  const foundMark = await marksModel.findOne({
    moduleCode: moduleCode,
    registerationNumber: registerationNumber,
    semesterCode: semesterCode,
  });
  if (!foundMark) return next(appErr.createErr("mark not found", 404));

  await marksModel.findOneAndDelete({
    moduleCode: moduleCode,
    registerationNumber: registerationNumber,
  });

  return res.status(200).json({ message: "deleted successfully" });
});
exports.getOneMark = asyncWrapper(async (req, res, next) => {
  const moduleCode = req.body.moduleCode;
  const registerationNumber = req.body.registerationNumber;
  const semesterCode = req.body.semesterCode;

  const foundMark = await marksModel.findOne({
    moduleCode: moduleCode,
    registerationNumber: registerationNumber,
    semesterCode: semesterCode,
  });
  if (!foundMark) return next(appErr.createErr("mark not found", 404));

  return res.status(200).json({ data: foundMark });
});
