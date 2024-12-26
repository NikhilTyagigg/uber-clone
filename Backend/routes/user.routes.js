const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const usercontroller = require("../controllers/user.controller");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("Firstnmae must be atleast 3 len long"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 char long"),
  ],
  usercontroller.registerUser
);

module.exports = router;
