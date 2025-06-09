const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: String,
  department: String,
  urgency: String,
  startDate: Date,
  endDate: Date,
  budget: Number,
  status: String,
  weight: Number // Added weight parameter
});

module.exports = mongoose.model('Project', projectSchema);
