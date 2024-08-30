const express = require("express");
const {
  storeController,
  AllStoreController,
  deleteStoreController,
} = require("../../../controller/storeController");

const router = express.Router();

router.post("/createstore", storeController);
router.get("/allstore", AllStoreController);
router.post("/deletestore", deleteStoreController);

module.exports = router;
