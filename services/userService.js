const userModel = require("../model/userModel");
const appErr = require("../utils/appErr");
const asyncWrapper = require("../utils/asyncWrapper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = asyncWrapper(async (req, res, next) => {
  const inputPassword = req.body.password;
  const inputUsername = req.body.username;

  const foundUser = await userModel.findOne({ username: inputUsername });

  if (!foundUser) return next(appErr.createErr("user not found", 404));

  const isPasswordCorrect = await bcrypt.compare(
    inputPassword,
    foundUser.password
  );

  if (!isPasswordCorrect) return next(appErr.createErr("worng password", 400));

  const data = {
    username: foundUser.username,
    isAdmin: foundUser.isAdmin,
  };
  const maxAge = 7 * 24 * 60 * 60 * 1000;
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7); // Expires in 7 days

  const { password, __v, ...others } = foundUser._doc;
  const access_token = jwt.sign(data, process.env.JWT_KEY);
  return res
    .cookie("access_token", access_token, {
      secure: true,
      httpOnly: true,
      sameSite: "None",
      maxAge,
    })
    .status(200)
    .json({
      message: "connected successfully",
      data: { ...others, access_token },
    });
});

exports.logout = asyncWrapper(async (req, res, next) => {
  res.clearCookie("access_token");
  return res.status(200).json({ message: "disconnected successfully" });
});

exports.createUser = asyncWrapper(async (req, res, next) => {
  const inputData = req.body;
  const userExist = await userModel.findOne({ username: inputData.username });

  if (userExist) return next(appErr.createErr("user already exist", 400));

  const hashedPassword = await bcrypt.hash(inputData.password, 10);

  const data = {
    username: inputData.username,
    password: hashedPassword,
    isAdmin: inputData.isAdmin,
  };

  const createdUser = await userModel.create(data);
  const { password, ...others } = createdUser._doc;

  return res
    .status(201)
    .json({ message: "created successfully", data: others });
});
