const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = process.env.JWT_SECRET;

//ROUTE 1: Create a User using: POST "/api/auth/createuser"
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "password must be aleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    //if errors, return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.array() });
    }
    try {
      //Check whether the email exist already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success, error: "User already exists" });
      }
      var salt = await bcrypt.genSaltSync(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.cookie("authtoken", authtoken, { httpOnly: true, maxAge: 3600000 });
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE 2: Authenticate a user using: POST "/api/auth/login"
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can not be wrong").exists(),
  ],
  async (req, res) => {
    let success = false;
    //if errors, return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.cookie("authtoken", authtoken, { httpOnly: true, maxAge: 3600000 });
      success = true;
      res.send({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE 3: Getting a user details using: POST "/api/auth/getuser. login needed"
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// ROUTE 4: Logout user using: POST "/api/auth/logout"
router.post("/logout", fetchuser, (req, res) => {
  try {
    // Clear the authentication token cookie
    res.clearCookie("authtoken");

    // Send a success response
    res.json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// ROUTE 5: Update user details using: PATCH "/api/auth/updateuser. login needed"
router.patch("/updateuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      name,
      age,
      gender,
      dietPref,
      height,
      weight,
      exercise,
      disease,
      allergy,
    } = req.body;

    // You can customize the update fields based on your requirements
    const updateFields = {};
    if (name) updateFields.name = name;
    if (age !== undefined) updateFields.age = age;
    if (gender) updateFields.gender = gender;
    if (dietPref) updateFields.dietPref = dietPref;
    if (height !== undefined) updateFields.height = height;
    if (weight !== undefined) updateFields.weight = weight;
    if (exercise !== undefined) updateFields.exercise = exercise;
    if (disease) updateFields.disease = Array.isArray(disease) ? disease : [disease];
    if (allergy) updateFields.allergy = Array.isArray(allergy) ? allergy : [allergy];

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
