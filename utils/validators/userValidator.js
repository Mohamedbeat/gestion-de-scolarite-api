const { body } = require("express-validator");
const validationMiddlewere = require("../../middleweres/validatorMiddleware");

exports.loginValidator = [
  body("username").notEmpty().withMessage("username is required"),
  body("password").notEmpty().withMessage("password is required"),
  validationMiddlewere,
];

exports.createUserValidator = [
  body("username")
    .notEmpty()
    .withMessage("username is required")
    .isString()
    .withMessage("invalid username format")
    .isLength({ min: 5 })
    .withMessage("very short username: must be 5 caracters or more"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("invalid password format")
    .isLength({ min: 5 })
    .withMessage("very short password: must be 5 caracters or more"),
  body("isAdmin")
    .notEmpty()
    .withMessage("isAdmin is required")
    .isBoolean()
    .withMessage("invalid isAdmin format: must be true of false"),

  validationMiddlewere,
];
