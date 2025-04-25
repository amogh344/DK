import express from 'express';
import Investment from '../models/InvestmentModel.js'; // Adjusted path

const router = express.Router();

// @route   GET /api/investments
// @desc    Get all investments
// @access  Public
router.get('/', async (req, res) => {
  try {
    const investments = await Investment.find();
    res.json(investments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/investments
// @desc    Add a new investment
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, amount, date } = req.body;

    // Basic validation
    if (!name || !amount || !date) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newInvestment = new Investment({
      name,
      amount,
      date,
    });

    const savedInvestment = await newInvestment.save();
    res.json(savedInvestment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/investments/:id
// @desc    Update an existing investment
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const { name, amount, date } = req.body;

    const updatedInvestment = await Investment.findByIdAndUpdate(
      req.params.id,
      { name, amount, date },
      { new: true }
    );

    if (!updatedInvestment) {
      return res.status(404).json({ message: 'Investment not found' });
    }

    res.json(updatedInvestment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE /api/investments/:id
// @desc    Delete an investment
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const investment = await Investment.findByIdAndDelete(req.params.id);

    if (!investment) {
      return res.status(404).json({ message: 'Investment not found' });
    }

    res.json({ message: 'Investment removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;