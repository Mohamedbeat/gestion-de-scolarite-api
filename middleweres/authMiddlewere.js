const appErr = require("../utils/appErr");
const jwt = require("jsonwebtoken");

exports.verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token)
    return next(
      appErr.createErr("you are not athenticated please login ", 400)
    );

  const decoded = jwt.decode(token, process.env.JWT_KEY);

  if (!decoded)
    return next(appErr.createErr("session expired login again", 400));

  next();
};
exports.verifyUserAndAdmin = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(appErr.createErr("you are not athenticated", 400));

  const decoded = jwt.decode(token, process.env.JWT_KEY);

  if (!decoded)
    return next(appErr.createErr("session expired login again", 400));

  if (!decoded.isAdmin) {
    return next(appErr.createErr("you are not authorized", 401));
  }

  next();
};
