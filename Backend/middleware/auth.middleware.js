const userModel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BlacklistToken = require("../models/blacklisttokenmodel");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split("")[1];
  if (!token) {
    return res.status(401).json({ message: "Please authenticate" });
  }
  const isblacklisted = await BlacklistToken.findOne({ token: token });
  if (isblacklisted) {
    return res.status(401).json({ message: "Please authenticate" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ _id: decoded._id });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Please authenticate" });
  }
};
