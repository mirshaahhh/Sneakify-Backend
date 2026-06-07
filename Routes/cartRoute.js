const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const protect = require("../middleware/authMiddleware");

// ================= ADD TO CART =================
router.post("/addcart", protect, cartController.addtocart);

// ================= GET CART =================
router.get("/getcart", protect, cartController.getcart);

// ================= REMOVE ITEM =================
router.delete("/removecart/:id", protect, cartController.removecart);

module.exports = router;