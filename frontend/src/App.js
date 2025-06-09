import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API = 'http://localhost:5000/api/projects';

function App() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    name: '',
    department: '',
    urgency: 'low',
    startDate: '',
    endDate: '',
    budget: 0
  });

  // Filter state
  const [filters, setFilters] = useState({
    department: '',
    urgency: '',
    startDate: '',
    endDate: ''
  });

  // Fetch projects with filters
  const fetchProjects = async (filterParams = {}) => {
    const params = new URLSearchParams();
    Object.entries(filterParams).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    const res = await axios.get(`${API}?${params.toString()}`);
    setProjects(res.data);
  };

  const createProject = async () => {
    try {
      await axios.post(`${API}/create`, form);
      fetchProjects(filters);
      setForm({
        name: '',
        department: '',
        urgency: 'low',
        startDate: '',
        endDate: '',
        budget: 0
      });
    } catch (err) {
      alert(err.response?.data?.msg || 'Error creating project');
    }
  };

  useEffect(() => {
    fetchProjects(filters);
    // eslint-disable-next-line
  }, []);

  // Handle filter form submit
  const handleFilter = (e) => {
    e.preventDefault();
    fetchProjects(filters);
  };

  return (
    <div className="container">
      <h2>CivicFlow: Create Project</h2>
      <form className="project-form" onSubmit={e => { e.preventDefault(); createProject(); }}>
        <div className="form-row">
          <label>Name:</label>
          <input value={form.name} required onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="form-row">
          <label>Department:</label>
          <input value={form.department} required onChange={e => setForm({ ...form, department: e.target.value })} />
        </div>
        <div className="form-row">
          <label>Urgency:</label>
          <select value={form.urgency} onChange={e => setForm({ ...form, urgency: e.target.value })}>
            <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
          </select>
        </div>
        <div className="form-row">
          <label>Start Date:</label>
          <input type="date" value={form.startDate} required onChange={e => setForm({ ...form, startDate: e.target.value })} />
        </div>
        <div className="form-row">
          <label>End Date:</label>
          <input type="date" value={form.endDate} required onChange={e => setForm({ ...form, endDate: e.target.value })} />
        </div>
        <div className="form-row">
          <label>Budget:</label>
          <input type="number" value={form.budget} min="0" required onChange={e => setForm({ ...form, budget: Number(e.target.value) })} />
        </div>
        <button type="submit">Create</button>
      </form>

      <h3>Filter Projects</h3>
      <form className="filter-form" onSubmit={handleFilter}>
        <input
          placeholder="Department"
          value={filters.department}
          onChange={e => setFilters({ ...filters, department: e.target.value })}
        />
        <select
          value={filters.urgency}
          onChange={e => setFilters({ ...filters, urgency: e.target.value })}
        >
          <option value="">All Urgencies</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          value={filters.startDate}
          onChange={e => setFilters({ ...filters, startDate: e.target.value })}
        />
        <input
          type="date"
          value={filters.endDate}
          onChange={e => setFilters({ ...filters, endDate: e.target.value })}
        />
        <button type="submit">Apply Filters</button>
      </form>

      <h3>Existing Projects</h3>
      <table className="project-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Urgency</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Budget</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.department}</td>
              <td>{p.urgency}</td>
              <td>{p.startDate ? p.startDate.slice(0, 10) : ''}</td>
              <td>{p.endDate ? p.endDate.slice(0, 10) : ''}</td>
              <td>₹{p.budget}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
