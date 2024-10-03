const cartSchema = require("../model/cartSchema");
const ObjectId = require("mongodb");

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
  const { id } = req.params;

  // console.log(id);

  try {
    if (id) {
      const allCartProduct = await cartSchema
        .find({ ownerId: id })
        .populate("productId");
      res
        .status(200)
        .send({ message: "show all cart product", allCartProduct });
    } else {
      res.status(400).send({ message: " can't show cart product" });
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
}

async function deleteCartProductController(req, res) {
  const { id } = req.body;

  try {
    const deleteCartProduct = await cartSchema.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .send({ message: "cart product delete successful", deleteCartProduct });
  } catch (error) {
    res.status(400).send(error);
  }
}

async function quantityUpdateController(req, res) {
  const { increment, decrement } = req.query;
  const { productId } = req.body;

  try {
    const exitingProduct = await cartSchema.findOne({ productId: productId });

    if (exitingProduct) {
      if (increment == "inc") {
        const increaseQuantity = await cartSchema.findOneAndUpdate(
          { productId: productId },
          { $inc: { quantity: 1 } },
          { new: true }
        );

        res.status(200).send({
          message: "quantity update successful",
          increaseQuantity,
        });
      } else if (decrement == "dec") {
        if (exitingProduct.quantity > 1) {
          const decrementQuantity = await cartSchema.findOneAndUpdate(
            { productId: productId },
            { $inc: { quantity: -1 } },
            { new: true }
          );
          res.status(200).send({
            message: "quantity update successful",
            decrementQuantity,
          });
        } else {
          res.status(200).send({
            message: "lees then 1",
          });
        }
      }
    } else {
      res.status(401).send({ message: "product not exited" });
    }
  } catch (error) {
    res.status(401).send({ message: "product quantity error", error });
  }
}

module.exports = {
  addCartController,
  getAllCartProductController,
  quantityUpdateController,
  deleteCartProductController,
};
