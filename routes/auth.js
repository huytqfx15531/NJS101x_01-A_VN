const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator/check");

const authController = require("../controllers/auth");

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/signup",
  [
    check("email") // kiểm tra email dùng check đã import ở trên
      .isEmail() // method .isEmail() để kiểm tra trường này bắt buộc là email
      .withMessage("Please enter a valid email.") // .withMessage() là method của express-validator để tạo ra câu thông báo lỗi theo ý người lập trình
      .custom((value, { req }) => {
        if (value === "test@test.com") {
          throw new Error("This email address if forbidden.");
        }
        return true;
      }),
    body(
      // kiếm tra password dùng body được import ở trên
      "password",
      "Please enter a password with only text and numbers and at least 5 characters." // Thay vì sử dụng method .withMessage() như ở trên ta có thể gộp câu thông báo lỗi đó trong body như này hoặc check
    )
      .isLength({ min: 5 }) // method .isLength() để đặt điều kiện cho password có tối thiểu là 5 ký tự
      .isAlphanumeric(), // method .isAlphanumeric() để đặt điều kiện cho người dùng chỉ được đặt mật khẩu với chữ và số. không được có ký tự đặt biệt luôn.
  ],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

module.exports = router;