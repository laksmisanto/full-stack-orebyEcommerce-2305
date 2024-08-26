const express = require("express");
const {
  storeController,
  AllStoreController,
} = require("../../../controller/storeController");

const router = express.Router();

router.post("/createstore", storeController);
router.get("/allstore", AllStoreController);

module.exports = router;
