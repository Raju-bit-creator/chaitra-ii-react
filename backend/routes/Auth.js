const express = require("express");
const User = require("../model/User");
const router = express.Router();

router.post("/createuser", async (req, res) => {
  // const {name, email, password} = req.body;
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "User already exists111" });
    }
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
