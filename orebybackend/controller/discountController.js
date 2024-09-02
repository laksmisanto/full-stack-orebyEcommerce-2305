const categorySchema = require("../model/categorySchema");
const discountSchema = require("../model/discountSchema");
const userSchema = require("../model/userSchema");

async function createDiscountController(req, res) {
  const { amount, userId, categoryId } = req.body;

  try {
    const exitingUser = await userSchema.findById({ _id: userId });
    const findCategoryName = await categorySchema.findById({ _id: categoryId });

    if (exitingUser.role == "admin" || exitingUser.role == "merchant") {
      const discount = await discountSchema({
        amount,
        userId,
        categoryId,
        categoryName: findCategoryName.name,
      });
      await discount.save();

      res.status(201).send({ message: "discount create", discount });
    } else {
      res.status(401).send({ message: "you can't access" });
    }
  } catch (error) {
    res.status(404).send({ message: "discount error ", error });
  }
}

async function allDiscountController(req, res) {
  try {
    const discount = await discountSchema.find({});

    res.status(201).send({ message: "discount create", discount });
  } catch (error) {
    res.status(404).send({ message: "discount error ", error });
  }
}

module.exports = { createDiscountController, allDiscountController };
