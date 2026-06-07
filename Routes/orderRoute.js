const express = require("express");

const router = express.Router();

const {
  placeOrder,
  getOrders,
  cancelOrder,
} = require("../controllers/orderController");

const Order = require("../models/order");

const protect = require("../middleware/authMiddleware");

/* ================= USER ROUTES ================= */

// PLACE ORDER
router.post(
  "/place",
  protect,
  placeOrder
);

// GET MY ORDERS
router.get(
  "/myorders",
  protect,
  getOrders
);

// CANCEL ORDER
router.put(
  "/cancel/:id",
  protect,
  cancelOrder
);

/* ================= ADMIN ROUTES ================= */

// GET ALL ORDERS
router.get(
  "/allorders",
  async (req, res) => {
    try {

      const orders =
        await Order.find()
          .sort({
            createdAt: -1,
          });

      res.json(orders);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        msg: "Server Error",
      });
    }
  }
);

// UPDATE ORDER STATUS
router.put(
  "/updatestatus/:id",
  async (req, res) => {
    try {

      const order =
        await Order.findByIdAndUpdate(
          req.params.id,
          {
            status:
              req.body.status,
          },
          {
            new: true,
          }
        );

      if (!order) {
        return res.status(404).json({
          msg: "Order Not Found",
        });
      }

      res.json(order);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        msg: "Server Error",
      });
    }
  }
);

module.exports = router;