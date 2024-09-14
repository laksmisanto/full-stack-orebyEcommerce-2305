const cartSchema = require("../model/cartSchema");

async function addCartController(req, res) {
  const { productId, ownerId, quantity } = req.body;

  try {
    const exitingCart = await cartSchema.findOne({ productId: productId });

    if (exitingCart) {
      const updateCart = await cartSchema.findOneAndUpdate(
        { productId: productId },
        { $set: { quantity: quantity + 1 } },
        { new: true }
      );
      res.status(201).send({ "update_cart ": updateCart });
    } else {
      const createCart = new cartSchema({
        productId,
        ownerId,
        quantity,
      });
      await createCart.save();
      res.status(201).send({ message: "cart add successful", createCart });
    }
  } catch (error) {
    res.status(401).send(error);
  }
}

async function getAllCartProductController(req, res) {
  const allCartProduct = await cartSchema.find().populate("productId");
  res.status(200).send({ message: "show all cart product", allCartProduct });
}

async function incrementController(req, res) {
  const { productId } = req.body;

  try {
    const exitingProduct = await cartSchema.findOne({ productId: productId });

    if (exitingProduct) {
      const increaseQuantity = await cartSchema.findOneAndUpdate(
        { productId: productId },
        { $inc: { quantity: 1 } },
        { new: true }
      );

      res.status(200).send({
        message: "quantity update successful",
        increaseQuantity,
      });
    } else {
      res.status(401).send({ message: "product not exited" });
    }
  } catch (error) {
    res.status(401).send({ message: "product quantity error", error });
  }
}

async function decrementController(req, res) {
  const { productId } = req.body;

  try {
    const exitingProduct = await cartSchema.findOne({ productId: productId });

    if (exitingProduct) {
      const increaseQuantity = await cartSchema.findOneAndUpdate(
        { productId: productId },
        { $dec: { quantity: -1 } },
        { new: true }
      );

      res.status(200).send({
        message: "quantity update successful",
        increaseQuantity,
      });
    } else {
      res.status(401).send({ message: "product not exited" });
    }
  } catch (error) {
    res.status(401).send({ message: "product quantity error", error });
  }
}

module.exports = {
  addCartController,
  incrementController,
  decrementController,
  getAllCartProductController,
};
