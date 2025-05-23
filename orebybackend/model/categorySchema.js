const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
  discount: {
    type: String,
    ref: "Discount",
  },
});

module.exports = mongoose.model("Category", categorySchema);
