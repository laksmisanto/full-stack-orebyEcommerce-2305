const express = require("express");
const {
  createBannerImageController,
  allBannerImageController,
} = require("../../../controller/bannerImageController");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 } });

router.post(
  "/createbannerimage",
  upload.single("image"),
  createBannerImageController
);
router.get("/allbannerimage", allBannerImageController);

module.exports = router;
