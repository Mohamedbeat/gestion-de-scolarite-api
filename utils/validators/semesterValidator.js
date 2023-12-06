const { body } = require("express-validator");

const validationMiddlewere = require("../../middleweres/validatorMiddleware");

exports.createSemesterValidator = [
  body("sectionCode")
    .notEmpty()
    .withMessage("section code is requried")
    .isString()
    .withMessage("invalid section code format")
    .trim(),
  body("semesterTitle")
    .notEmpty()
    .withMessage("semester title is requried")
    .isString()
    .matches(/[semester]{1}[1-5]{1}/)
    .withMessage(
      "invalid semester title format: semeste1, semester2...semester5"
    )
    .trim(),
  validationMiddlewere,
];
exports.updateSemesterValidator = [
  body("sectionCode")
    .optional()
    .isString()
    .withMessage("invalid section code format")
    .trim(),
  body("semesterTitle")
    .optional()
    .isString()
    .matches(/[semester]{1}[1-5]{1}/)
    .withMessage(
      "invalid semester title format: semeste1, semester2...semester5"
    )
    .trim(),
  validationMiddlewere,
];
