const express = require('express');
const router = express.Router();
const Project = require('../models/project.model');
const { authenticateToken, requireRole, requireDepartmentAccess } = require('../middleware/auth');

// Helper function to calculate weight
function calculateWeight({ urgency, budget, startDate, endDate }) {
  // Assign numeric values to urgency
  const urgencyMap = { low: 1, medium: 2, high: 3 };
  const urgencyScore = urgencyMap[urgency] || 1;

  // Normalize budget (assuming higher budget = higher priority)
  const budgetScore = Math.min(budget / 10000, 3);

  // Calculate project duration in days (shorter duration = higher priority)
  const start = new Date(startDate);
  const end = new Date(endDate);
  const duration = Math.max((end - start) / (1000 * 60 * 60 * 24), 1); // at least 1 day
  const timeScore = duration <= 7 ? 3 : duration <= 30 ? 2 : 1;

  // Weighted sum (you can adjust weights as needed)
  return urgencyScore * 2 + budgetScore + timeScore;
}

// Create a new project
router.post('/create', authenticateToken, requireDepartmentAccess, async (req, res) => {
  try {
    const { name, department, urgency, startDate, endDate, budget, status } = req.body;

    // Check for date conflicts in the same department
    const conflict = await Project.findOne({
      department,
      $or: [
        {
          startDate: { $lte: new Date(endDate) },
          endDate: { $gte: new Date(startDate) }
        }
      ]
    });

    if (conflict) {
      return res.status(400).json({ message: 'Date conflict with another project in the same department.' });
    }

    // Calculate weight
    const weight = calculateWeight({ urgency, budget, startDate, endDate });

    const newProject = new Project({
      name,
      department,
      urgency,
      startDate,
      endDate,
      budget,
      status,
      weight // Save weight
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all projects with search, filtering, and sorted by weight (descending)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { department, status, urgency, startDate, endDate } = req.query;
    let filter = {};

    if (department) filter.department = department;
    if (status) filter.status = status;
    if (urgency) filter.urgency = urgency;
    if (startDate || endDate) {
      filter.startDate = {};
      if (startDate) filter.startDate.$gte = new Date(startDate);
      if (endDate) filter.startDate.$lte = new Date(endDate);
    }

    // Filter by department access (non-admin users can only see their department)
    if (req.user.role !== 'admin') {
      filter.department = req.user.department;
    }

    // Sort by weight descending (higher weight = higher priority)
    const projects = await Project.find(filter).sort({ weight: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
