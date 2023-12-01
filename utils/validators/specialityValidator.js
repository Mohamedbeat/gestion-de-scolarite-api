const { body } = require("express-validator");
const validatorMiddleware = require("../../middleweres/validatorMiddleware");

exports.createSpecialityValidator = [
  body("specialityTitle")
    .trim()
    .notEmpty()
    .withMessage("speciality title is required")
    .isString()
    .withMessage("Invalid title format")
    .isLength({ min: 3 })
    .withMessage("title must be 3 caracters or above"),
  body("specialityCode")
    .trim()
    .notEmpty()
    .withMessage("speciality code is required")
    .isString()
    .withMessage("Invalid code format")
    .isLength({ min: 3 })
    .withMessage("code must be 3 caracters or above"),
  body("requiredLevel")
    .trim()
    .notEmpty()
    .withMessage("required level is required")
    .isString()
    .withMessage("Invalid level format : level must be (4AM,1AS,2AS,3AS)")
    .isLength({ min: 3 })
    .withMessage("Invalid level format : level must be (4AM,1AS,2AS,3AS)"),
  body("duration")
    .notEmpty()
    .withMessage("Duration is required")
    .toInt()
    .isNumeric()
    .withMessage("Duration must be a number"),

  validatorMiddleware,
];

exports.updateSpecialityValidator = [
  body("specialityTitle")
    .trim()
    .optional()
    .isString()
    .withMessage("Invalid title format")
    .isLength({ min: 3 })
    .withMessage("title must be 3 caracters or above"),
  body("specialityCode")
    .trim()
    .optional()
    .isString()
    .withMessage("Invalid code format")
    .isLength({ min: 3 })
    .withMessage("code must be 3 caracters or above"),
  body("requiredLevel")
    .trim()
    .optional()
    .isString()
    .withMessage("Invalid level format : level must be (4AM,1AS,2AS,3AS)")
    .isLength({ min: 3 })
    .withMessage("Invalid level format : level must be (4AM,1AS,2AS,3AS)"),
  body("duration")
    .optional()
    .toInt()
    .isNumeric()
    .withMessage("Duration must be a number"),

  validatorMiddleware,
];
