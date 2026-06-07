const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addReview,
  getReviews,
} = require("../controllers/reviewController");

/* ================= ADD REVIEW ================= */

router.post(
  "/addreview",
  protect,
  addReview
);

/* ================= GET REVIEWS ================= */

router.get(
  "/getreviews/:productId",
  getReviews
);

module.exports = router;