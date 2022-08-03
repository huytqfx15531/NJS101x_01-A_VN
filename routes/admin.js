const express = require("express");
const router = express.Router();
const { body } = require("express-validator/check");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

router.get("/add-product", isAuth, adminController.getAddProduct);

router.get("/products", isAuth, adminController.getProducts);

router.post(
  "/add-product",
  [
    body(
      "title",
      "Please enter a Title with at min 3 characters and max 200 characters."
    )
      .isString()
      .isLength({ min: 3, max: 200 })
      .trim(),
    body("imageUrl", "Please enter a valid imageUrl.").isURL(),
    body("price", "Please enter a valid price.").isFloat(),
    body(
      "description",
      "Please anter a description with at min 5 characters and max 200 characters."
    )
      .isLength({ min: 5, max: 200 })
      .trim(),
  ],
  isAuth,
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  [
    body(
      "title",
      "Please enter a Title with at min 3 characters and max 200 characters."
    )
      .isLength({ min: 3, max: 200 })
      .isString()
      .trim(),
    body("imageUrl", "Please enter a valid imageUrl.").isURL(),
    body("price", "Please enter a valid price.").isFloat(),
    body(
      "description",
      "Please anter a description with at min 5 characters and max 200 characters."
    )
      .isLength({ min: 5, max: 200 })
      .trim(),
  ],
  isAuth,
  adminController.postEditProduct
);

router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = router;