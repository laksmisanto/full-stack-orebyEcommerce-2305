const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const bannerImageSchema = require("../model/bannerImageSchema");

async function createBannerImageController(req, res) {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "banner_image",
    });

    fs.unlink(req.file.path, () => {
      console.log("Image delete successful");
    });

    const bannerImage = new bannerImageSchema({
      image: result.secure_url,
    });

    await bannerImage.save();

    res
      .status(201)
      .send({ message: "banner image upload successful ", bannerImage });
  } catch (error) {
    res.status(500).json({ error: "Error uploading image" });
  }
}

async function allBannerImageController(req, res) {
  try {
    const allBannerImage = await bannerImageSchema.find({});
    res.send(allBannerImage);
  } catch (error) {
    res.status(501).send({ message: error });
  }
}

module.exports = { createBannerImageController, allBannerImageController };
