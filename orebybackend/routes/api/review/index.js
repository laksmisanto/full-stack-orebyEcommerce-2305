const express = require("express");
const router = express.Router();
const {
  submitReviewController,
  getReviewController,
} = require("../../../controller/reviewController");

router.post("/submitreview", submitReviewController);
router.get("/getreview", getReviewController);

module.exports = router;
