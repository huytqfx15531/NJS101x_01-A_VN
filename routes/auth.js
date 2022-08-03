const express = require("express");
const router = express.Router();
const { check } = require("express-validator/check");

const authController = require("../controllers/auth");

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/signup",
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .custom((value, { req }) => {
      if (value === "test@test.com") {
        throw new Error("This email address if forbidden.");
      }
      return true;
    }),
  authController.postSignup
);

router.post("/logout", authController.postLogout);

module.exports = router;