const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const usercontroller = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");

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

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 char long"),
  ],
  usercontroller.loginUser
);
router.get("/profile", auth.authUser, usercontroller.getuserprofile);
router.get("/logout", auth.authUser, usercontroller.logoutUser);
module.exports = router;
