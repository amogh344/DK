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
});

const Investment = mongoose.model('Investment', investmentSchema);

export default Investment;