const express = require("express");
const {
  createProductController,
  deleteProductController,
} = require("../../../controller/productController");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 } });

router.post("/createproduct", upload.single("image"), createProductController);
router.post("/deleteproduct", deleteProductController);

module.exports = router;
