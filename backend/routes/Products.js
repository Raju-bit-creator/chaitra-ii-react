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
    const searchQuery = req.query.searchQuery
      ? {
          title: { $regex: req.query.searchQuery, $options: "i" },
        }
      : "";
    const products = await Product.find({ ...searchQuery });
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
      console.log("this from frontend", req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let image = req.files.map((el) => {
        return el.filename;
      });

      const product = new Product({
        title,
        price,
        description,
        instock,
        image,
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

//update product

router.put("/updateproduct/:id", fetchUser, async (req, res) => {
  const { title, price, description, instock } = req.body;

  console.log("edit product", req.body);

  try {
    const newProduct = {};
    if (title) newProduct.title = title;
    if (price) newProduct.price = price;
    if (description) newProduct.description = description;
    if (instock) newProduct.instock = instock;

    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "product not found" });
    if (!product.user || product.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "unauthorized access" });
    }
    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: newProduct },
      { new: true }
    );
    res.status(200).json({ product });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "internal server error" });
  }
});

//delete product
router.delete("/deleteproduct/:id", fetchUser, async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "product not found" });
    if (!product.user || product.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "unauthorized access" });
    }
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "product deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
