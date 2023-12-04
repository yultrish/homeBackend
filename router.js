const router = require('express').Router();
const knex = require('./config/db_todo')

//create new item
router.post('/items', async (req, res) => {
  try {

    const item = req.body.item;

    if (!item) {
      return res.status(400).json({ error: 'item is required' });
    } else {
      const itemId = await knex('todo').insert({
        item: req.body.item
      });
      const currentItem = await knex('todo').where({ item }).first();
      return res.status(201).json(currentItem);
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'failed to add item' });
  }
});

// get all items
router.get('/allItems', async (req, res) => {
  try {
    const allItems = await knex('todo').select('*');
    return res.json(allItems);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})

// Delete a item by ID
router.delete('/item/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Delete the item from the database
      const result = await knex('todo').where({ id }).del();
  
      if (result) {
     
        res.status(200).json({ message: 'Item deleted successfully' });
      } else {
       
        res.status(404).json({ message: 'Item not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;