const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      requited: true,
    },
    categoryName: {
      type: String,
    },
    categoryId: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Discount", discountSchema);
