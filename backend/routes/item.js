
const express = require('express');
const router = express.Router();
const cors = require('cors');
const Item = require('../models/item');

//app.use(cors());

// GET all items
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
    // console.log(items)
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
// router.post('/items', async (req, res) => {
//   try {
//     const newItem = new Item(req.body); 
//     const existingItem = await Item.findOne({ PId: newItem.PId });

//       if (!existingItem) {
        
//         const newItems = new Item(newItem);
//         await newItems.save();
//       } else {
        
//       }

//     // await newItem.save();

//     res.status(201).json({ message: 'Item added to the database', item: newItem });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error adding the item' });
//   }
// });
router.post('/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const existingItem = await Item.findOne({ PId: newItem.PId });

    if (!existingItem) {
      // If the item does not exist, save the new item
      await newItem.save();
      res.status(201).json({ message: 'Item added to the database', item: newItem });
    } else {
      // If the item already exists, you might want to handle this case
      res.status(409).json({ message: 'Item with the same PId already exists' });
    }
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
