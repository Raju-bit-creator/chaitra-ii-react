const express = require("express");
const Product = require("../model/Product");
const fetchUser = require("../middleware/FetchUser");
const { body, validationResult } = require("express-validator");
const router = express.Router();

//get product
router.get("/allproduct", fetchUser, async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/allhomeproduct", fetchUser, async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

//add product
router.post(
  "/addproduct",
  fetchUser,
  body("title")
    .isLength({ min: 3 })
    .withMessage("product name should be atleats 3 character"),
  body("description")
    .isLength({ min: 10 })
    .withMessage("description should be atleast 10 character"),
  body("price").isNumeric().withMessage("price should be a number"),
  body("instock").isNumeric().withMessage("price should be a number"),

  async (req, res) => {
    try {
      const { title, price, description, instock } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const product = new Product({
        title,
        price,
        description,
        instock,
        user: req.user.id,
      });
      const saveProduct = await product.save();
      res.status(201).json({ saveProduct });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "internal server error" });
    }
  }
);

module.exports = router;
