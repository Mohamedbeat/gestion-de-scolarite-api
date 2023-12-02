const { body } = require("express-validator");
const validatorMiddleware = require("../../middleweres/validatorMiddleware");

exports.createStudentValidator = [
  body("registerationNumber")
    .notEmpty()
    .withMessage("registeration number is required")
    .isString()
    .matches(/[0-9]{3}-[1|2]-[0-9]{4}-[P|A]/)
    .withMessage("Invalid registration number format"),
  body("birthDate")
    .notEmpty()
    .withMessage("Birth date is required")
    .isDate({ format: "MM/DD/YYYY" })
    .withMessage("Invalid date format: must be MM/DD/YYYY "),
  body(["firstName", "lastName"])
    .notEmpty()
    .withMessage("first name and last name are required")
    .isString()
    .withMessage("invalid first name or last name format"),
  body("birthPlace")
    .notEmpty()
    .withMessage("birth place is required")
    .isString()
    .withMessage("invalid birth place format "),
  body("address")
    .notEmpty()
    .withMessage("address is required")
    .isString()
    .withMessage("invalid address format "),
  body("phoneNumber")
    .notEmpty()
    .withMessage("phoneNumber is required")
    .isString()
    .isLength({ min: 10, max: 10 })
    .withMessage("invalid phoneNumber format : must be 10 caracters "),
  body("fatherFirstName")
    .notEmpty()
    .withMessage("fatherFirstName is required")
    .isString()
    .withMessage("invalid fatherFirstName format"),
  body("motherFullName")
    .notEmpty()
    .withMessage("motherFullName is required")
    .isString()
    .withMessage("invalid motherFullName format"),
  body("studentLevel")
    .notEmpty()
    .withMessage("studentLevel is required")
    .isString()
    .matches(/[4AM|1AS|2AS|3AS]/)
    .withMessage("invalid studentLevel format : must be (4AM-1AS-2AS-3AS)"),
  body("scolareYear")
    .notEmpty()
    .withMessage("scolare Year is required")
    .isString()
    .matches(/[0-9]{4}-[0-9]{4}/)
    .withMessage("invalid scolare year format : must be YYYY-YYYY"),
  body("brothersNumber")
    .notEmpty()
    .withMessage("brothers number is required")
    .isNumeric()
    .withMessage("invalid brothers number format : must be number"),
  body("parentFamilyStatus")
    .notEmpty()
    .withMessage("parent family status is required")
    .isString()
    .matches(/[married|divorced]/)
    .withMessage(
      "invalid parentFamilyStatus format : must be married or divorced"
    ),
  body("studentFamilyStatus")
    .notEmpty()
    .withMessage("student Family Status is required")
    .isString()
    .matches(/[married|divorced|single]/)
    .withMessage(
      "invalid studentFamilyStatus format : must be (married-divorced-single)"
    ),
  body("fatherJob")
    .notEmpty()
    .withMessage("father job is required")
    .isString()
    .withMessage("invalid father job format"),
  body("motherJob")
    .notEmpty()
    .withMessage("mother job is required")
    .isString()
    .withMessage("invalid mother job format"),
  body("sex")
    .notEmpty()
    .withMessage("sex is required")
    .isString()
    .matches(/[male|female]{1}/)
    .withMessage("invalid sex format : sex must be male or female"),
  body("Nationality")
    .notEmpty()
    .withMessage("Nationality is required")
    .isString()
    .withMessage("invalide nationality format"),
  body("sectionid")
    .notEmpty()
    .withMessage("section id is required")
    .isMongoId()
    .withMessage("inavlid section id format"),
  validatorMiddleware,
];
