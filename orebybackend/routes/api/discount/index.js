const express = require("express");
const {
  createDiscountController,
  allDiscountController,
} = require("../../../controller/discountController");
const router = express.Router();

router.post("/creatediscount", createDiscountController);
router.get("/alldiscount", allDiscountController);

module.exports = router;
