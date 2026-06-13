require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= DATABASE CONNECTION ================= */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err.message);
  });

/* ================= ROUTES IMPORT ================= */
const userRoute = require("./Routes/userRoute");
const productRoute = require("./Routes/productRoute");
const cartRoute = require("./Routes/cartRoute");
const orderRoute = require("./Routes/orderRoute");
const paymentRoute = require("./Routes/paymentRoute");
const adminRoute = require("./Routes/adminRoute");
const reviewRoute = require("./Routes/reviewRoute");

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("Sneakify Backend Running 🚀");
});

/* ================= API ROUTES ================= */
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);
app.use("/payment", paymentRoute);
app.use("/admin", adminRoute);
app.use("/review", reviewRoute);

/* ================= UNKNOWN ROUTE ================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    msg: "Route not found",
  });
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});