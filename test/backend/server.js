const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://localhost:27017/urbansync');

app.use(cors());
app.use(express.json());
app.use('/api/projects', require('./routes/project'));

app.listen(5000, () => console.log('Server running on port 5000'));
