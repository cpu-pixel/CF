const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: String,
  department: String,
  urgency: { type: String, enum: ['low', 'medium', 'high'] },
  startDate: Date,
  endDate: Date,
  budget: Number,
  status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Project', projectSchema);
