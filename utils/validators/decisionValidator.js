const { body, query } = require("express-validator");

const validationMiddlewere = require("../../middleweres/validatorMiddleware");

exports.createDecisionValidator = [
  body("registerationNumber")
    .notEmpty()
    .withMessage("registeration number is required")
    .isString()
    .matches(/[0-9]{3}-[1|2]-[0-9]{4}-[P|A]/)
    .withMessage("Invalid registration number format"),
  body("semesterCode")
    .notEmpty()
    .withMessage("semester code is requried")
    .isString()
    .withMessage("invalid semester code format")
    .trim(),

  //   body("decision")
  //     .notEmpty()
  //     .withMessage("decision is required")
  //     .isString()
  //     .matches()
  //     .withMessage("invalid decision format"),
  validationMiddlewere,
];
exports.updateDecisionValidator = [
  body("registerationNumber")
    .notEmpty()
    .withMessage("registeration number is required")
    .isString()
    .matches(/[0-9]{3}-[1|2]-[0-9]{4}-[P|A]/)
    .withMessage("Invalid registration number format"),
  body("semesterCode")
    .notEmpty()
    .withMessage("semester code is requried")
    .isString()
    .withMessage("invalid semester code format")
    .trim(),

  //   body("decision")
  //     .notEmpty()
  //     .withMessage("decision is required")
  //     .isString()
  //     .matches()
  //     .withMessage("invalid decision format"),
  validationMiddlewere,
];
exports.getAllDecisionsValidator = [
  query("registerationNumber")
    .optional()
    .isString()
    .matches(/[0-9]{3}-[1|2]-[0-9]{4}-[P|A]/)
    .withMessage("Invalid registration number format"),
  query("semesterCode")
    .optional()
    .isString()
    .withMessage("invalid semester code format")
    .trim(),
  query("decision")
    .optional()
    .isString()
    .withMessage("invalid decision format"),
  query(["minAverage", "maxAverage"])
    .optional()
    .isFloat()
    .withMessage("invalid min average or max average format"),
  validationMiddlewere,
];
