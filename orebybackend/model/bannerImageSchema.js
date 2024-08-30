const mongoose = require("mongoose");

const bannerImage = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bannerimage", bannerImage);
