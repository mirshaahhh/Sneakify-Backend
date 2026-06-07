const Review = require("../models/review");
const User = require("../models/user");

/* ================= ADD REVIEW ================= */

const addReview = async (req, res) => {
  try {

    const user = await User.findById(req.user);

    const review = await Review.create({
      productId: req.body.productId,
      userId: req.user,
      userName: user.name,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    res.status(201).json(review);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      msg: "Server Error",
    });

  }
};

/* ================= GET PRODUCT REVIEWS ================= */

const getReviews = async (req, res) => {
  try {

    const reviews = await Review.find({
      productId: req.params.productId,
    }).sort({
      createdAt: -1,
    });

    res.json(reviews);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      msg: "Server Error",
    });

  }
};

module.exports = {
  addReview,
  getReviews,
};