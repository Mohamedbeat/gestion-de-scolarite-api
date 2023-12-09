const express = require("express");
const {
  createUserValidator,
  loginValidator,
} = require("../utils/validators/userValidator");
const { createUser, login, logout } = require("../services/userService");
const {
  verifyUser,
  verifyUserAndAdmin,
} = require("../middleweres/authMiddlewere");

const router = express.Router();
router.post("/login", loginValidator, login);
router.post("/logout", logout);
router.post("/new", verifyUserAndAdmin, createUserValidator, createUser);

module.exports = router;
