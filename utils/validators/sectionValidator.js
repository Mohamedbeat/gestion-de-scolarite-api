const { body } = require("express-validator");
const validatorMiddleware = require("../../middleweres/validatorMiddleware");

exports.createSectionValidator = [
  body("sectionCode")
    .notEmpty()
    .withMessage("Section code is required")
    .trim()
    .isString()
    .withMessage("Invalid Section code format"),
  body("specialityid")
    .notEmpty()
    .withMessage("speciality id is required")
    .isMongoId()
    .withMessage("Invalid speciality id format"),
  body("startDate")
    .notEmpty()
    .withMessage("startDate is required")
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("invalid startDate format : must be MM/DD/YYYY "),
  body("endDate")
    .notEmpty()
    .withMessage("endDate is required")
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("invalid endDate format : must be YYYY-MM-DD "),
  body("studentsNumber")
    .optional()
    .isNumeric()
    .withMessage("studentsNumber must be numeric"),
  body("cycle").optional().isString().withMessage("invalid cycle format"),
  body("maleStudentsNumber")
    .optional()
    .isNumeric()
    .withMessage("maleStudentsNumber must be numeric"),
  body("femaleStudentsNumber")
    .optional()
    .isNumeric()
    .withMessage("femaleStudentsNumber must be numeric"),
  validatorMiddleware,
];
exports.sectionAdvancedSearchValidation = [
  body("sectionCode")
    .optional()
    .trim()
    .isString()
    .withMessage("Invalid Section code format"),
  body("specialityid")
    .optional()
    .isMongoId()
    .withMessage("Invalid speciality id format"),
  body("startDate")
    .optional()
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("invalid startDate format : must be YYYY-MM-DD "),
  body("endDate")
    .optional()
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("invalid endDate format : must be YYYY-MM-DD "),
  body("minStudentsNumber")
    .optional()
    .isNumeric()
    .withMessage("studentsNumber must be numeric"),
  body("maxStudentsNumber")
    .optional()
    .isNumeric()
    .withMessage("studentsNumber must be numeric"),
  body("cycle").optional().isString().withMessage("invalid cycle format"),
  body("maleStudentsNumber")
    .optional()
    .isNumeric()
    .withMessage("maleStudentsNumber must be numeric"),
  body("femaleStudentsNumber")
    .optional()
    .isNumeric()
    .withMessage("femaleStudentsNumber must be numeric"),
  validatorMiddleware,
];

exports.updateSectionValidator = [
  body("sectionCode")
    .optional()

    .trim()
    .isString()
    .withMessage("Invalid Section code format"),
  body("specialityid")
    .optional()
    .isMongoId()
    .withMessage("Invalid speciality id format"),
  body("startDate")
    .optional()

    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("invalid startDate format : must be YYYY-MM-DD "),
  body("endDate")
    .optional()

    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("invalid endDate format : must be YYYY-MM-DD "),
  body("studentsNumber")
    .optional()
    .isNumeric()
    .withMessage("studentsNumber must be numeric"),
  body("cycle").optional().isString().withMessage("invalid cycle format"),
  body("maleStudentsNumber")
    .optional()
    .isNumeric()
    .withMessage("maleStudentsNumber must be numeric"),
  body("femaleStudentsNumber")
    .optional()
    .isNumeric()
    .withMessage("femaleStudentsNumber must be numeric"),
  validatorMiddleware,
];
