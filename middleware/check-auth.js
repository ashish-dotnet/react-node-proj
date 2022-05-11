const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    console.log("token", token);
    if (!token) {
      throw new Error("Authentication failed.check auth!");
    }
    console.log("process.env.JWT_KEY", process.env.JWT_KEY);
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    console.log(decodedToken);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed..check auth-1!", 401);
    return next(error);
  }
};
