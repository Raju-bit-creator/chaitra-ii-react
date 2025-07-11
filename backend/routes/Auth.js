const express = require("express");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/FetchUser");
const router = express.Router();
const nodemailer = require("nodemailer");

const secret = "heisagoodboy";

router.post(
  "/createuser",
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be atleast 3 characters"),
    body("email").isEmail().withMessage("Please enter a valid email"),
  ],
  async (req, res) => {
    // const {name, email, password} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      const salt = bcrypt.genSaltSync(10);
      const secPassword = bcrypt.hashSync(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });
      const data = {
        user: {
          id: user._id,
        },
      };

      var authToken = jwt.sign(data, secret);
      res
        .status(201)
        .json({ message: "User created successfully", user, authToken });
    } catch (error) {
      console.log(error);
    }
  }
);

//login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 3 })
      .withMessage("Password must be atleast 5 characeter"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Email already exist" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const data = {
        user: {
          id: user._id,
        },
      };

      var authToken = jwt.sign(data, secret);

      res
        .status(201)
        .json({ success: true, message: "login success", user, authToken });
    } catch (error) {
      console.log(error);
      res.status(500).send("internal server error");
    }
  }
);

//user detail
router.get("/getuser", fetchUser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("internal server error");
  }
});

// Forgot Password Route
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ Status: "User not existed" });
    }

    // Generate JWT reset token
    const token = jwt.sign({ id: user._id }, "heisagoodboy", {
      expiresIn: "1d",
    });

    // Log the target email
    console.log("Sending password reset email to:", email);

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "postman.himalaya@gmail.com", // Your Gmail
        pass: "sssshhhhh", // Your Gmail App Password
      },
    });

    const resetLink = `http://localhost:5173/reset_password/${user._id}/${token}`;

    const mailOptions = {
      from: "postman.himalaya@gmail.com",
      to: email,
      subject: "Reset Password Link",
      text: `Click the link to reset your password: ${resetLink}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ Status: "Email not sent", Error: error });
      } else {
        console.log("Email sent successfully:", info.response);
        return res.status(200).json({ Status: "Success", Info: info.response });
      }
    });
  } catch (error) {
    console.error("Internal error:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/reset-password/:id/:token", (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  jwt.verify(token, "heisagoodboy", (err, decoded) => {
    if (err) {
      return res.json({ Status: "Error with token" });
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          User.findByIdAndUpdate({ _id: id }, { password: hash })
            .then((u) => res.send({ Status: "Success" }))
            .catch((err) => res.send({ Status: err }));
        })
        .catch((err) => res.send({ Status: err }));
    }
  });
});
module.exports = router;
