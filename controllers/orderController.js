const Order = require("../models/order");

// PLACE ORDER (keep if you already have it)
const placeOrder = async (req, res) => {
  try {
    const userId = req.user;

    const { items, totalAmount } = req.body;

    const newOrder = new Order({
      userId,
      items,
      totalAmount,
    });

    await newOrder.save();

    res.status(200).json({
      msg: "Order placed successfully",
      data: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};

// GET ORDERS
const getOrders = async (req, res) => {
  try {
    const data = await Order.find({ userId: req.user });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};

// ❌ CANCEL ORDER (NEW)
const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    // Optional safety check
    if (order.status === "shipped" || order.status === "delivered") {
      return res.status(400).json({
        msg: "Cannot cancel shipped/delivered orders",
      });
    }

    order.status = "cancelled";
    await order.save();

    res.json({
      msg: "Order cancelled successfully",
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};

module.exports = {
  placeOrder,
  getOrders,
  cancelOrder,
};