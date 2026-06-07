require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= DATABASE CONNECTION ================= */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });

/* ================= ROUTES ================= */
const userRoute = require("./Routes/userRoute");
const productRoute = require("./Routes/productRoute");
const cartRoute = require("./Routes/cartRoute");
const orderRoute = require("./Routes/orderRoute");
const paymentRoute = require("./Routes/paymentRoute");
const adminRoute =require("./Routes/adminRoute");
const reviewRoute =require("./Routes/reviewRoute");
/* ================= API ROUTES ================= */

// AUTH / USER ROUTES
app.use("/user", userRoute);

// PRODUCT ROUTES
app.use("/product", productRoute);

// CART ROUTES
app.use("/cart", cartRoute);

// ORDER ROUTES
app.use("/order", orderRoute);

// PAYMENT ROUTES
app.use("/payment", paymentRoute);
app.use("/admin", adminRoute);
app.use("/review",reviewRoute);

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("Sneakify Backend Running 🚀");
});

/* ================= HANDLE UNKNOWN ROUTES ================= */
app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});