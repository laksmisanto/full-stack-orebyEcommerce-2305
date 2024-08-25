const productSchema = require("../model/productSchema");

async function createProductController(req, res) {
  const { name, description, image, category, sellingPrice, price, ownerId } =
    req.body;

  res.send(req.file);
  return;

  try {
    const product = new productSchema({
      name,
      description,
      image,
      category,
      sellingPrice,
      price,
      ownerId,
    });
    await product.save();
    res.send(product);
  } catch (error) {
    res.status(404).send({ error: error });
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

module.exports = {
  createProductController,
  updateProductController,
  deleteProductController,
};
