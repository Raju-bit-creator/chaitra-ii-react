const express = require("express");
const Product = require("../model/Product");
const fetchUser = require("../middleware/FetchUser");
const router = express.Router();

router.post("/addproduct", fetchUser, async (req, res) => {
  try {
    const { title, price, description, instock } = req.body;
    const product = new Product({
      title,
      price,
      description,
      instock,
      user: user.id,
    });
    const saveProduct = await product.save();
    res.status(201).json({ saveProduct });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to add product" });
  }
});

module.exports = router;
