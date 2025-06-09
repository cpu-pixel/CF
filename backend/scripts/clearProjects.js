const mongoose = require('mongoose');
const Project = require('../models/project.model');

mongoose.connect('mongodb://localhost:27017/urbansync', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Project.deleteMany({});
    console.log('All projects deleted.');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    mongoose.disconnect();
  });