const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");

const Product = require("../models/product");

/* ================= ADD PRODUCT ================= */

router.post("/addproduct", async (req, res) => {
  try {
    const {
      name,
      price,
      brand,
      description,
      image,
    } = req.body;

    if (
      !name ||
      !price ||
      !brand ||
      !description ||
      !image
    ) {
      return res.status(400).json({
        msg: "All fields are required",
      });
    }

    const product = await Product.create({
      name,
      price,
      brand,
      description,
      image,
    });

    res.status(201).json(product);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: "Server Error",
    });
  }
});

/* ================= GET ALL PRODUCTS ================= */

router.get("/getproducts", async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.json(products);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: "Server Error",
    });
  }
});

/* ================= GET SINGLE PRODUCT ================= */

router.get("/getproduct/:id", async (req, res) => {
  try {

    if (
      !mongoose.Types.ObjectId.isValid(
        req.params.id
      )
    ) {
      return res.status(400).json({
        msg: "Invalid Product ID",
      });
    }

    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        msg: "Product Not Found",
      });
    }

    res.json(product);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: "Server Error",
    });
  }
});

/* ================= UPDATE PRODUCT ================= */

router.put("/updateproduct/:id", async (req, res) => {
  try {

    if (
      !mongoose.Types.ObjectId.isValid(
        req.params.id
      )
    ) {
      return res.status(400).json({
        msg: "Invalid Product ID",
      });
    }

    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedProduct) {
      return res.status(404).json({
        msg: "Product Not Found",
      });
    }

    res.json(updatedProduct);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: "Server Error",
    });
  }
});

/* ================= DELETE PRODUCT ================= */

router.delete("/deleteproduct/:id", async (req, res) => {
  try {

    if (
      !mongoose.Types.ObjectId.isValid(
        req.params.id
      )
    ) {
      return res.status(400).json({
        msg: "Invalid Product ID",
      });
    }

    const product =
      await Product.findByIdAndDelete(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        msg: "Product Not Found",
      });
    }

    res.json({
      msg: "Product Deleted Successfully",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: "Server Error",
    });
  }
});

module.exports = router;