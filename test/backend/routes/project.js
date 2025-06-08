const express = require('express');
const router = express.Router();
const Project = require('../models/project.model');

router.post('/create', async (req, res) => {
  try {
    const { name, department, urgency, startDate, endDate, budget } = req.body;

    const conflict = await Project.findOne({
      department,
      $or: [
        { startDate: { $lte: new Date(endDate), $gte: new Date(startDate) } },
        { endDate: { $gte: new Date(startDate), $lte: new Date(endDate) } }
      ]
    });

    if (conflict) return res.status(409).json({ msg: 'Conflicting project exists!' });

    const newProject = new Project({ name, department, urgency, startDate, endDate, budget });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', err });
  }
});

router.get('/', async (req, res) => {
  const projects = await Project.find({});
  res.json(projects);
});

module.exports = router;
