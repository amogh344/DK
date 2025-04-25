import mongoose from 'mongoose';

const investmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['Stock', 'Mutual Fund', 'Crypto', 'Fixed Deposit', 'Other'], // Optional: restrict to known types
  },
});

const Investment = mongoose.model('Investment', investmentSchema);

export default Investment;