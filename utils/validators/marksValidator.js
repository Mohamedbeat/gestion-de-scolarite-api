const { body, query } = require("express-validator");
const validationMiddleWere = require("../../middleweres/validatorMiddleware");

exports.createMarkMiddlewere = [
  body("controlOne")
    .notEmpty()
    .withMessage("control one is required")
    // .isInt({ min: 0, max: 20 })
    .isFloat({ min: 0, max: 20 })
    .withMessage(
      "invalid control One format : must be number between 0 and 20"
    ),
  body("controlTwo")
    .notEmpty()
    .withMessage("control two is required")
    .isFloat({ min: 0, max: 20 })
    .withMessage(
      "invalid control two format : must be number between 0 and 20"
    ),
  body("exam")
    .notEmpty()
    .withMessage("exam is required")
    .isFloat({ min: 0, max: 40 })
    .withMessage("invalid exam format : must be number between 0 and 40"),
  body("passage")
    .optional()
    .isFloat({ min: 0, max: 40 })
    .withMessage("invalid passage format : must be number between 0 and 40"),
  body("moduleCode")
    .notEmpty()
    .withMessage("moduleCode is required")
    .isString()
    .withMessage("invalid moduleCode format "),
  body("registerationNumber")
    .notEmpty()
    .withMessage("registeration number is required")
    .isString()
    .matches(/[0-9]{3}-[1|2]-[0-9]{4}-[P|A]/)
    .withMessage("Invalid registration number format"),
  body("semesterCode")
    .notEmpty()
    .withMessage("semester code is required")
    .isString()
    .withMessage("Invalid semester code format"),

  validationMiddleWere,
];
exports.updateMarkMiddlewere = [
  body("controlOne")
    .optional()
    // .isInt({ min: 0, max: 20 })
    .isFloat({ min: 0, max: 20 })
    .withMessage(
      "invalid control One format : must be number between 0 and 20"
    ),
  body("controlTwo")
    .optional()
    .isFloat({ min: 0, max: 20 })
    .withMessage(
      "invalid control two format : must be number between 0 and 20"
    ),
  body("exam")
    .optional()
    .isFloat({ min: 0, max: 40 })
    .withMessage("invalid exam format : must be number between 0 and 40"),
  body("passage")
    .optional()
    .isFloat({ min: 0, max: 40 })
    .withMessage("invalid passage format : must be number between 0 and 40"),
  body("moduleCode")
    .notEmpty()
    .withMessage("moduleCode is required")
    .isString()
    .withMessage("invalid moduleCode format "),
  body("registerationNumber")
    .notEmpty()
    .withMessage("registeration number is required")
    .isString()
    .matches(/[0-9]{3}-[1|2]-[0-9]{4}-[P|A]/)
    .withMessage("Invalid registration number format"),
  body("semesterCode")
    .notEmpty()
    .withMessage("semester code is required")
    .isString()
    .withMessage("Invalid semester code format"),
  validationMiddleWere,
];
exports.getAllmarksValidator = [
  query("moduleCode")
    .optional()
    .isString()
    .withMessage("invalid moduleCode format "),
  body("semesterCode")
    .optional()
    .isString()
    .withMessage("Invalid semester code format"),
  // query("registerationNumber")
  //   .optional()
  //   .isString()
  //   .matches(/[0-9]{3}-[1|2]-[0-9]{4}-[P|A]/)
  //   .withMessage("Invalid registration number format"),
  validationMiddleWere,
];
exports.getOneMarkValidator = [
  body("moduleCode")
    .notEmpty()
    .withMessage("moduleCode is required")
    .isString()
    .withMessage("invalid moduleCode format "),
  body("registerationNumber")
    .notEmpty()
    .withMessage("registeration number is required")
    .isString()
    .matches(/[0-9]{3}-[1|2]-[0-9]{4}-[P|A]/)
    .withMessage("Invalid registration number format"),
  body("semesterCode")
    .notEmpty()
    .withMessage("semester code is required")
    .isString()
    .withMessage("Invalid semester code format"),
  validationMiddleWere,
];
