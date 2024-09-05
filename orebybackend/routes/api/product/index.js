const express = require("express");
const {
  createProductController,
  deleteProductController,
  allProductController,
  singleProductController,
} = require("../../../controller/productController");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

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
router.get("/allproduct", allProductController);
router.post("/deleteproduct", deleteProductController);
router.get("/singleproduct/:id", singleProductController);

module.exports = router;
