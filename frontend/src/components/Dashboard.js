import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './Dashboard.css';

// API base URL from environment variable
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const API = `${API_BASE_URL}/api/projects`;

function Dashboard() {
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    name: '',
    department: user?.department || '',
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
    try {
      const params = new URLSearchParams();
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const res = await axios.get(`${API}?${params.toString()}`);
      setProjects(res.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      if (error.response?.status === 401) {
        logout();
      }
    }
  };

  const createProject = async () => {
    try {
      await axios.post(`${API}/create`, form);
      fetchProjects(filters);
      setForm({
        name: '',
        department: user?.department || '',
        urgency: 'low',
        startDate: '',
        endDate: '',
        budget: 0
      });
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating project');
    }
  };

  useEffect(() => {
    if (user) {
      fetchProjects(filters);
    }
  }, [user, filters]);

  // Handle filter form submit
  const handleFilter = (e) => {
    e.preventDefault();
    fetchProjects(filters);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>UrbanSync Dashboard</h1>
          <div className="user-info">
            <span>Welcome, {user?.name}</span>
            <span className="user-role">({user?.role})</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="stats-section">
          <div className="stat-card">
            <h3>Total Projects</h3>
            <p>{projects.length}</p>
          </div>
          <div className="stat-card">
            <h3>Your Department</h3>
            <p>{user?.department}</p>
          </div>
          <div className="stat-card">
            <h3>Your Role</h3>
            <p>{user?.role}</p>
          </div>
        </div>

        <div className="main-content">
          <div className="project-section">
            <h2>Create New Project</h2>
            <form className="project-form" onSubmit={e => { e.preventDefault(); createProject(); }}>
              <div className="form-row">
                <label>Name:</label>
                <input 
                  value={form.name} 
                  required 
                  onChange={e => setForm({ ...form, name: e.target.value })} 
                />
              </div>
              <div className="form-row">
                <label>Department:</label>
                <input 
                  value={form.department} 
                  required 
                  onChange={e => setForm({ ...form, department: e.target.value })}
                  readOnly={user?.role !== 'admin'}
                />
              </div>
              <div className="form-row">
                <label>Urgency:</label>
                <select value={form.urgency} onChange={e => setForm({ ...form, urgency: e.target.value })}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="form-row">
                <label>Start Date:</label>
                <input 
                  type="date" 
                  value={form.startDate} 
                  required 
                  onChange={e => setForm({ ...form, startDate: e.target.value })} 
                />
              </div>
              <div className="form-row">
                <label>End Date:</label>
                <input 
                  type="date" 
                  value={form.endDate} 
                  required 
                  onChange={e => setForm({ ...form, endDate: e.target.value })} 
                />
              </div>
              <div className="form-row">
                <label>Budget:</label>
                <input 
                  type="number" 
                  value={form.budget} 
                  min="0" 
                  required 
                  onChange={e => setForm({ ...form, budget: Number(e.target.value) })} 
                />
              </div>
              <button type="submit" className="create-button">Create Project</button>
            </form>
          </div>

          <div className="filter-section">
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
              <button type="submit" className="filter-button">Apply Filters</button>
            </form>
          </div>

          <div className="projects-section">
            <h3>Projects ({projects.length})</h3>
            <div className="projects-grid">
              {projects.map(project => (
                <div key={project._id} className="project-card">
                  <div className="project-header">
                    <h4>{project.name}</h4>
                    <span className={`urgency-badge ${project.urgency}`}>
                      {project.urgency}
                    </span>
                  </div>
                  <div className="project-details">
                    <p><strong>Department:</strong> {project.department}</p>
                    <p><strong>Duration:</strong> {project.startDate ? project.startDate.slice(0, 10) : ''} → {project.endDate ? project.endDate.slice(0, 10) : ''}</p>
                    <p><strong>Budget:</strong> ₹{project.budget?.toLocaleString()}</p>
                    <p><strong>Priority Weight:</strong> {project.weight?.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 