const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

/* REGISTER ADMIN */

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({
        msg: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json(admin);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: "Server Error",
    });
  }
});

/* LOGIN ADMIN */

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({
      email,
    });

    if (!admin) {
      return res.status(400).json({
        msg: "Admin Not Found",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        admin.password
      );

    if (!isMatch) {
      return res.status(400).json({
        msg: "Wrong Password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      admin,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: "Server Error",
    });
  }
});

module.exports = router;