
const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// GET all items
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching items' });
  }
});

router.get('/items/:id', async (req, res) => {
    try {
      const itemId = req.params.id;
      const item = await Item.findById(itemId);
  
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
  
      res.json(item);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching the item' });
    }
  });
  

// POST a new item
router.post('/items', async (req, res) => {
  try {
    const newItem = new Item(req.body); // Assuming you are sending the item data in the request body
    await newItem.save();
    res.status(201).json({ message: 'Item added to the database', item: newItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding the item' });
  }
});

// UPDATE an item by ID
router.put('/items/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Item updated', item: updatedItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating the item' });
  }
});

// DELETE an item by ID
router.delete('/items/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted', item: deletedItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting the item' });
  }
});

module.exports = router;