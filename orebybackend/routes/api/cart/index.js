const express = require("express");
const { addCartController } = require("../../../controller/cartController");
const router = express.Router();

router.post("/addcart", addCartController);

module.exports = router;
