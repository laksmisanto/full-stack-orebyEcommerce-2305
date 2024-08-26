const storeSchema = require("../model/storeSchema");
const userSchema = require("../model/userSchema");

async function storeController(req, res) {
  const { name, userId } = req.body;

  const exitingUser = await userSchema.findOne({ _id: userId });

  const exitingStore = await storeSchema.findOne({ name: name });

  if (!exitingStore) {
    if (exitingUser) {
      if (exitingUser.role == "admin" || exitingUser.role == "merchant") {
        try {
          const store = new storeSchema({
            name,
            userId,
          });
          store.save();
          res.status(201).send("Successfully Created Store");
        } catch (error) {
          res.status(400).send({ error: error });
        }
      } else {
        res.status(400).send({ message: "You can't access" });
      }
    } else {
      res.status(400).send({ message: "User not exit" });
    }
  } else {
    res.status(400).send({ message: "Store already exit" });
  }
}

async function AllStoreController(req, res) {
  try {
    const store = await storeSchema.find();
    res.status(201).send({ store });
  } catch (error) {
    res.status(404).send({ message: "Store data is empty." });
  }
}

module.exports = { storeController, AllStoreController };
