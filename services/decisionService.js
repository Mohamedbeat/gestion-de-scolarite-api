const decisionModel = require("../model/dicisionModel");
const marksModel = require("../model/marksModel");
const moduleModel = require("../model/moduleModel");
const sectionModel = require("../model/sectionModel");
const semesterModel = require("../model/semesterModel");
const studentModel = require("../model/studentModel");
const appErr = require("../utils/appErr");
const asyncWrapper = require("../utils/asyncWrapper");
const { isObjIdValid } = require("../utils/validators/mongoIdValidator");

exports.createDecision = asyncWrapper(async (req, res, next) => {
  const inputData = req.body;

  const foundStudent = await studentModel.findOne({
    registerationNumber: inputData.registerationNumber,
  });

  if (!foundStudent) return next(appErr.createErr("student not found", 404));
  const foundSemester = await semesterModel.findOne({
    semesterCode: inputData.semesterCode,
  });

  if (!foundSemester) return next(appErr.createErr("semester not found", 404));

  // check if decision exist

  const existDecision = await decisionModel.findOne({
    registerationNumber: inputData.registerationNumber,
    semesterCode: inputData.semesterCode,
  });
  if (existDecision)
    return next(appErr.createErr("decision already exist", 400));

  //getting all module averages in foundSemester

  const semesterModuleAverages = await marksModel.find({
    registerationNumber: inputData.registerationNumber,
    semesterCode: inputData.semesterCode,
  });
  if (!semesterModuleAverages.length)
    return next(
      appErr.createErr(`no points for this registrationcode 
${inputData.registerationNumber} and this semestercode ${inputData.semesterCode} `)
    );

  //get student sectoion
  const studentSection = await sectionModel.findOne({
    sectionCode: foundStudent.sectionCode,
  });

  //get section speciality

  //get all module to check if the student passed all exams
  const allModule = await moduleModel.find({
    specialityid: studentSection.specialityid,
  });
  if (allModule.length !== semesterModuleAverages.length)
    return next(
      appErr.createErr(
        `there are still some empty exam points, number of missing points :${
          allModule.length - semesterModuleAverages.length
        }`,
        400
      )
    );

  let totalCoef = 0;
  let total = 0;

  for (let index = 0; index < allModule.length; index++) {
    totalCoef += allModule[index].moduleCoef;
  }
  for (let index = 0; index < allModule.length; index++) {
    total +=
      semesterModuleAverages[index].moduleAverage * allModule[index].moduleCoef;
  }

  const semesterAverage = total / totalCoef;
  const decision = semesterAverage >= 10 ? "successful" : "failed";

  const data = {
    registerationNumber: inputData.registerationNumber,
    semesterCode: inputData.semesterCode,
    semesterAverage: semesterAverage,
    decision: decision,
  };

  const createdDecision = await decisionModel.create(data);

  res
    .status(201)
    .json({ message: "calculated successfully", data: createdDecision });
});

exports.getAllDecisions = asyncWrapper(async (req, res, next) => {
  const registerationNumber = req.query.registerationNumber || "";
  const semesterCode = req.query.semesterCode || "";
  const decision = req.query.decision || "";
  const minAverage = req.query.minAverage || 0;
  const maxAverage = req.query.maxAverage || 20;

  //minAverage", "maxAverage

  const allDec = await decisionModel.find({
    $and: [
      { registerationNumber: { $regex: registerationNumber, $options: "i" } },
      { semesterCode: { $regex: semesterCode, $options: "i" } },
      { decision: { $regex: decision, $options: "i" } },
      { semesterAverage: { $gte: minAverage, $lte: maxAverage } },
    ],
  });

  return res.status(200).json({ data: allDec });
});

exports.deleteDecisionByid = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const isValid = isObjIdValid(id);
  if (!isValid) return next(appErr.createErr("Invalid id format", 400));

  const foundDec = await decisionModel.findById(id);
  if (!foundDec) return next(appErr.createErr("decision not found", 404));

  await decisionModel.findByIdAndDelete(id);

  return res.status(200).json({ message: "deleted successfully" });
});
exports.getDecisionByid = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const isValid = isObjIdValid(id);
  if (!isValid) return next(appErr.createErr("Invalid id format", 400));

  const foundDec = await decisionModel.findById(id);
  if (!foundDec) return next(appErr.createErr("decision not found", 404));

  return res.status(200).json({ data: foundDec });
});

exports.updateDecision = asyncWrapper(async (req, res, next) => {
  const inputData = req.body;

  const foundStudent = await studentModel.findOne({
    registerationNumber: inputData.registerationNumber,
  });

  if (!foundStudent) return next(appErr.createErr("student not found", 404));
  const foundSemester = await semesterModel.findOne({
    semesterCode: inputData.semesterCode,
  });

  if (!foundSemester) return next(appErr.createErr("semester not found", 404));

  // check if decision exist

  // const existDecision = await decisionModel.findOne({
  //   registerationNumber: inputData.registerationNumber,
  //   semesterCode: inputData.semesterCode,
  // });
  // if (existDecision)
  //   return next(appErr.createErr("decision already exist", 400));

  //getting all module averages in foundSemester

  const semesterModuleAverages = await marksModel.find({
    registerationNumber: inputData.registerationNumber,
    semesterCode: inputData.semesterCode,
  });
  if (!semesterModuleAverages.length)
    return next(
      appErr.createErr(`no points for this registrationcode 
${inputData.registerationNumber} and this semestercode ${inputData.semesterCode} `)
    );

  //get student sectoion
  const studentSection = await sectionModel.findOne({
    sectionCode: foundStudent.sectionCode,
  });

  //get section speciality

  //get all module to check if the student passed all exams
  const allModule = await moduleModel.find({
    specialityid: studentSection.specialityid,
  });
  if (allModule.length !== semesterModuleAverages.length)
    return next(
      appErr.createErr(
        `there are still some empty exam points, number of missing points :${
          allModule.length - semesterModuleAverages.length
        }`,
        400
      )
    );

  let totalCoef = 0;
  let total = 0;

  for (let index = 0; index < allModule.length; index++) {
    totalCoef += allModule[index].moduleCoef;
  }
  for (let index = 0; index < allModule.length; index++) {
    total +=
      semesterModuleAverages[index].moduleAverage * allModule[index].moduleCoef;
  }

  const semesterAverage = total / totalCoef;
  const decision = semesterAverage >= 10 ? "successful" : "failed";

  const data = {
    registerationNumber: inputData.registerationNumber,
    semesterCode: inputData.semesterCode,
    semesterAverage: semesterAverage,
    decision: decision,
  };

  const updatedDecision = await decisionModel.findOneAndUpdate(
    {
      registerationNumber: data.registerationNumber,
      semesterCode: data.semesterCode,
    },
    data
  );

  res
    .status(201)
    .json({ message: "calculated successfully", data: updatedDecision });
});
