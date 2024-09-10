const cartSchema = require("../model/cartSchema");

async function addCartController(req, res) {
  const { productId, ownerId, quantity } = req.body;

  try {
    // create exiting product and update quantity
    const createCart = new cartSchema({
      productId,
      ownerId,
      quantity,
    });
    await createCart.save();
    res.status(201).send({ message: "cart add successful", createCart });
  } catch (error) {
    res.status(401).send(error);
  }
}

module.exports = { addCartController };
