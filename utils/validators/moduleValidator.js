const { body } = require("express-validator");
const validatorMiddleware = require("../../middleweres/validatorMiddleware");

exports.createModuleValidator = [
  body("moduleCode")
    .notEmpty()
    .withMessage("module code is required")
    .isString()
    .withMessage("invalid module code format")
    .isLength({ min: 3 })
    .withMessage("invalid module code format : 3 caracters minimum"),
  body("semesterCode")
    .notEmpty()
    .withMessage("semester code is required ")
    .isString()
    .withMessage("invalid semester code format")
    .trim(),
  body("moduleTitle")
    .notEmpty()
    .withMessage("module title is required")
    .isString()
    .withMessage("invalid module title format")
    .isLength({ min: 3 })
    .withMessage("invalid module title format : 3 caracters minimum"),
  body("moduleCoef")
    .notEmpty()
    .withMessage("module coef is required")
    .isInt({ min: 1, max: 10 })
    .withMessage(
      "invalid module coef format: must be number between 1  and 10"
    ),
  body("eleminationPoint")
    .notEmpty()
    .withMessage("elemination point is required")
    .isInt({ min: 1, max: 20 })
    .withMessage(
      "invalid elemination point format: must be number between 1 and 20"
    ),
  body("teacher")
    .notEmpty()
    .withMessage("teacher is required")
    .isString()
    .withMessage("invalid teacher format"),
  body("specialityid")
    .notEmpty()
    .withMessage("speciality id is required")
    .isMongoId()
    .withMessage("invalid speciality id format"),
  validatorMiddleware,
];
exports.updateModuleValidator = [
  body("moduleCode")
    .optional()
    .isString()
    .withMessage("invalid module code format")
    .isLength({ min: 3 })
    .withMessage("invalid module code format : 3 caracters minimum")
    .toUpperCase(),
  body("semesterCode")
    .optional()
    .isString()
    .withMessage("invalid semester code format")
    .trim(),
  body("moduleTitle")
    .optional()
    .isString()
    .withMessage("invalid module title format")
    .isLength({ min: 3 })
    .withMessage("invalid module title format : 3 caracters minimum"),
  body("moduleCoef")
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage(
      "invalid module coef format: must be number between 1  and 10"
    ),
  body("eleminationPoint")
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage(
      "invalid elemination point format: must be number between 1 and 20"
    ),
  body("teacher").optional().isString().withMessage("invalid teacher format"),
  body("specialityid")
    .optional()
    .isMongoId()
    .withMessage("invalid speciality id format"),
  validatorMiddleware,
];
