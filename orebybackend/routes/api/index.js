const express = require("express");
const router = express.Router();
const auth = require("./auth");
const category = require("./category");
const product = require("./product");
const store = require("./store");
const bannerimg = require("./bannerimg");
const discount = require("./discount");

router.use("/auth", auth);
router.use("/category", category);
router.use("/product", product);
router.use("/store", store);
router.use("/bannerimage", bannerimg);
router.use("/discount", discount);

module.exports = router;
