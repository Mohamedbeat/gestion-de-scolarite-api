const moduleModel = require("../model/moduleModel");
const semesterModel = require("../model/semesterModel");
const specialityModel = require("../model/specialityModel");
const appErr = require("../utils/appErr");
const asyncWrapper = require("../utils/asyncWrapper");
const { isObjIdValid } = require("../utils/validators/mongoIdValidator");

exports.createModule = asyncWrapper(async (req, res, next) => {
  const inputData = req.body;

  const foundSpc = await specialityModel.findById(inputData.specialityid);
  if (!foundSpc) return next(appErr.createErr("speciality not found", 404));

  const foundSemester = await semesterModel.findOne({
    semesterCode: inputData.semesterCode,
  });
  if (!foundSemester) return next(appErr.createErr("semester not found", 404));

  const foundModule = await moduleModel.findOne({
    moduleCode: inputData.moduleCode,
    semesterCode: inputData.semesterCode,
  });

  // console.log(foundModule);

  if (foundModule)
    return next(appErr.createErr("this module code already exist", 400));

  const createdModule = await moduleModel.create({
    ...inputData,
    specialityCode: foundSpc.specialityCode,
  });

  return res
    .status(201)
    .json({ message: "created successfully", data: createdModule });
});

exports.getAllModules = asyncWrapper(async (req, res, next) => {
  const moduleTitle = req.query.moduleTitle || "";
  const moduleCode = req.query.moduleCode || "";
  const specialityCode = req.query.specialityCode || "";
  const teacher = req.query.teacher || "";
  const foundData = await moduleModel.find({
    $and: [
      { moduleTitle: { $regex: moduleTitle, $options: "i" } },
      { moduleCode: { $regex: moduleCode, $options: "i" } },
      { teacher: { $regex: teacher, $options: "i" } },
      { specialityCode: { $regex: specialityCode, $options: "i" } },
    ],
  });

  res.status(200).json({ data: foundData });
});

exports.getModuleByid = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;

  const isvalid = isObjIdValid(id);

  if (!isvalid) return next(appErr.createErr("invalid id format", 400));

  const foundModule = await moduleModel.findById(id);
  if (!foundModule) return next(appErr.createErr("module not found", 404));

  return res.status(200).json({ data: foundModule });
});

exports.updateModule = asyncWrapper(async (req, res, next) => {
  // id validation

  const id = req.params.id;

  const isvalid = isObjIdValid(id);

  if (!isvalid) return next(appErr.createErr("invalid id format", 400));

  // id existance

  const foundModule = await moduleModel.findById(id);
  if (!foundModule) return next(appErr.createErr("module not found", 404));

  const inputData = req.body;

  // module code existance

  if (inputData.moduleCode && inputData.semesterCode) {
    const existModul = await moduleModel.findOne({
      moduleCode: inputData.moduleCode,
      semesterCode: inputData.semesterCode,
    });
    if (existModul)
      return next(appErr.createErr("this module code already exist", 400));
  }

  // semester code existance
  if (inputData.semesterCode) {
    const exsistSemester = await semesterModel.findOne({
      semesterCode: inputData.semesterCode,
    });
    if (!exsistSemester)
      return next(appErr.createErr("semester not found", 404));
  }

  if (inputData.specialityid) {
    const foundSpc = await specialityModel.findById(inputData.specialityid);

    if (!foundSpc) return next(appErr.createErr(" speciality not found", 404));
  }

  const updatedModule = await moduleModel.findByIdAndUpdate(
    id,
    {
      ...inputData,
    },
    { new: true }
  );

  if (inputData.specialityid) {
    const foundSpc = await specialityModel.findById(inputData.specialityid);

    if (!foundSpc) return next(appErr.createErr(" speciality not found", 404));

    updatedModule.specialityid = inputData.specialityid;
    updatedModule.specialityCode = foundSpc.specialityCode;

    await foundModule.save();
  }

  return res
    .status(200)
    .json({ message: "updated successfully", data: updatedModule });
});

exports.deleteModule = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;

  const isvalid = isObjIdValid(id);

  if (!isvalid) return next(appErr.createErr("invalid id format", 400));

  const foundModule = await moduleModel.findById(id);
  if (!foundModule) return next(appErr.createErr("module not found", 404));

  await moduleModel.findByIdAndDelete(id);

  return res.status(200).json({ message: "deleted successfully" });
});
