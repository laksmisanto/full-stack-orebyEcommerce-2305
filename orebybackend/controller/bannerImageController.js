const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const bannerImageSchema = require("../model/bannerImageSchema");

async function createBannerImageController(req, res) {
  try {
    const exitingImages = await bannerImageSchema.find({});

    if (exitingImages.length < 3) {
      console.log(exitingImages.length);
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
    } else {
      console.log("3 lees then image support");
    }
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

async function deleteBannerImageController(req, res) {
  try {
    let { imageId, image } = req.body;
    let deleteImage = await bannerImageSchema.findByIdAndDelete({
      _id: imageId,
    });

    res
      .status(201)
      .send({ message: "Banner image delete successful", deleteImage });
  } catch (error) {
    res
      .status(201)
      .send({ message: "something is wrong delete banner image", error });
  }
}

module.exports = {
  createBannerImageController,
  allBannerImageController,
  deleteBannerImageController,
};
