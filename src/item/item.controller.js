const express = require("express");

const {
  getAllItems,
  getItemById,
  createItem,
  editItemById,
  deleteItemById,
} = require("./item.service");

const router = express.Router();
const authorizeJWT = require("../middleware/authorizeJWT");
const adminAuthorization = require("../middleware/adminAuthorization");

// Get All Items
router.get("/", authorizeJWT, async (req, res) => {
  try {
    const items = await getAllItems();

    res.status(200).send(items);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get Item by ID
router.get("/:id", authorizeJWT, async (req, res) => {
  try {
    const itemId = parseInt(req.params.id);

    const item = await getItemById(itemId);

    res.status(200).send(item);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Create Item
router.post("/", adminAuthorization, async (req, res) => {
  try {
    const newItemData = req.body;

    const newItem = await createItem(newItemData);

    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Update Item
router.put("/:id", adminAuthorization, async (req, res) => {
  try {
    const itemId = req.params.id;

    const itemData = req.body;

    const updatedItem = await editItemById(itemId, itemData);

    res.send(updatedItem);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Delete Item
router.delete("/:id", adminAuthorization, async (req, res) => {
  try {
    const itemId = req.params.id;

    await deleteItemById(itemId);

    res.status(200).json({ message: "Item Deleted" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
