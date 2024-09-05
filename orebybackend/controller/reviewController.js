const productSchema = require("../model/productSchema");
const reviewSchema = require("../model/reviewSchema");
const userSchema = require("../model/userSchema");

async function submitReviewController(req, res) {
  const { review, message, reviewBy, product } = req.body;

  try {
    const reviews = new reviewSchema({
      review,
      message,
      reviewBy,
      product,
    });

    await reviews.save();

    await productSchema.findByIdAndUpdate(
      { _id: product },
      { $set: { review: reviews._id } },
      { new: true }
    );
    await userSchema.findByIdAndUpdate(
      { _id: reviewBy },
      { $set: { review: reviews._id } },
      { new: true }
    );

    res.status(200).send({ message: "review submit", reviews });
  } catch (error) {
    res.status(404).send({ message: "review submit error", error });
  }
}
async function getReviewController(req, res) {
  const productReview = await reviewSchema.find();

  res.send({ message: "get review data", review: productReview });
}

module.exports = { submitReviewController, getReviewController };
