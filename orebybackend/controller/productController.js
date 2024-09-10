const path = require("path");
const categorySchema = require("../model/categorySchema");
const productSchema = require("../model/productSchema");
const storeSchema = require("../model/storeSchema");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

async function createProductController(req, res) {
  const {
    name,
    description,
    categoryId,
    sellingPrice,
    price,
    ownerId,
    storeId,
  } = req.body;

  // console.log(categoryId);
  // const exitingCategoryId = await categorySchema.find({ _id: categoryId });
  // console.log("category id :", exitingCategoryId);
  // res.send(exitingStoreId);
  // return;

  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "ecommerce_image",
    });

    fs.unlink(req.file.path, () => {
      console.log("Image delete successfully.");
    });

    const product = new productSchema({
      name,
      description,
      image: result.secure_url,
      categoryId,
      sellingPrice,
      price,
      ownerId,
      storeId,
    });
    await product.save();
    res.status(201).send({ message: "Product created successfully.", product });

    await storeSchema.findOneAndUpdate(
      { _id: storeId },
      { $push: { productId: product._id } },
      { new: true }
    );
    await categorySchema.findOneAndUpdate(
      { _id: categoryId },
      { $push: { productId: product._id } },
      { new: true }
    );
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "can't create product" });
  }
}

async function allProductController(req, res) {
  try {
    const product = await productSchema.find({});
    res.status(201).send({ product });
  } catch (error) {
    res.status(404).send({ message: error });
  }
}

function updateProductController(req, res) {
  res.send("update product function");
}
async function deleteProductController(req, res) {
  const { _id } = req.body;
  let product = await productSchema.findByIdAndDelete({ _id }).then(() => {
    res.send("successfully delete this product");
  });
}

async function singleProductController(req, res) {
  const { id } = req.params;
  try {
    const singleProduct = await productSchema
      .findOne({ _id: id })
      .populate({ path: "review", populate: { path: "reviewBy" } });
    res
      .status(201)
      .send({ Message: "Your single product item is ", singleProduct });
  } catch (error) {
    res.status(400).send({ message: "perams error", error });
  }
}

module.exports = {
  createProductController,
  allProductController,
  updateProductController,
  deleteProductController,
  singleProductController,
};
