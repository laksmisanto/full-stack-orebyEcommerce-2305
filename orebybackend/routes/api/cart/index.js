const express = require("express");
const {
  addCartController,
  getAllCartProductController,
  quantityUpdateController,
  deleteCartProductController,
} = require("../../../controller/cartController");
const router = express.Router();

router.post("/addcart", addCartController);
router.get("/allcart", getAllCartProductController);
router.post("/cartproductdelete", deleteCartProductController);
router.post("/quantityupdate", quantityUpdateController);

module.exports = router;
