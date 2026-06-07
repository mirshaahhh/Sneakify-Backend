const express = require("express");

const router = express.Router();

const Razorpay = require("razorpay");

const auth = require("../middleware/authMiddleware");

/* ================= RAZORPAY INSTANCE ================= */

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

/* ================= CREATE PAYMENT ORDER ================= */

router.post(
  "/create-order",
  auth,
  async (req, res) => {
    try {

      const { amount } = req.body;

      if (!amount || amount <= 0) {
        return res.status(400).json({
          msg: "Invalid Amount",
        });
      }

      const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      };

      const order =
        await razorpay.orders.create(
          options
        );

      res.json(order);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        msg: "Payment Failed",
      });
    }
  }
);

module.exports = router;