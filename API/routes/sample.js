// samples.js

import express from 'express';
import Sample from '../models/Sample.js';

const router = express.Router();

// Create a new sample
router.post('/', async (req, res) => {
  const { name ,email} = req.body;
  try {
    const newSample = new Sample({ name ,email});
    await newSample.save();
    res.status(201).json(newSample);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Get all samples
router.get('/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const samples = await Sample.find({ email });
    res.json(samples);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});


export default router;
