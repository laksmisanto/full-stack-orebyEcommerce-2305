const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
  ownerId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
