const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  review: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
  },
  reviewBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
});

module.exports = mongoose.model("Review", reviewSchema);
