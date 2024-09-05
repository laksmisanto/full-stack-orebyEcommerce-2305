const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    image: {
      type: String,
      // required: true,
    },
    categoryId: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },

    sellingPrice: {
      type: String,
    },
    price: {
      type: String,
      // require: true,
    },
    ownerId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    storeId: {
      type: mongoose.Schema.ObjectId,
      ref: "Store",
    },
    review: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
