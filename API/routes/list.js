import express from 'express';
import List from '../models/List.js';

const router = express.Router();

// Create a new list
router.post('/', async (req, res) => {
  const { email, movieName, listName } = req.body;
  try {
    const newList = new List({ email, movieName, listName });
    await newList.save();
    res.status(201).json(newList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Get all lists for a user
router.get('/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const lists = await List.find({ email });
    res.json(lists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Delete a list
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await List.findByIdAndDelete(id);
    res.json({ message: 'List deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

export default router;
