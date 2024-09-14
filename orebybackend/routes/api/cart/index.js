const express = require("express");
const {
  addCartController,
  incrementController,
  decrementController,
  getAllCartProductController,
} = require("../../../controller/cartController");
const router = express.Router();

router.post("/addcart", addCartController);
router.get("/allcart", getAllCartProductController);
router.post("/quantityincrement", incrementController);
router.post("/quantitydecrement", decrementController);

module.exports = router;
