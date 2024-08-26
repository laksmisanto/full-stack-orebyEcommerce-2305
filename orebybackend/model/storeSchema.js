const mongoose = require("mongoose");

const storeController = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  productId: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = mongoose.model("Store", storeController);
