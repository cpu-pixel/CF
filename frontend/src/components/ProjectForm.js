import React, { useState } from 'react';
import './Dashboard.css';
import { useDashboard } from './DashboardContext';

function ProjectForm({ user }) {
  const { createProject, loading } = useDashboard();
  const [form, setForm] = useState({
    name: '',
    department: user?.department || '',
    urgency: 'low',
    startDate: '',
    endDate: '',
    budget: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createProject(form, () => {
      setForm({
        name: '',
        department: user?.department || '',
        urgency: 'low',
        startDate: '',
        endDate: '',
        budget: 0
      });
    });
  };

  return (
    <div className="project-section">
      <h2>Create New Project</h2>
      <form className="project-form" onSubmit={handleSubmit}>
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
        <button type="submit" className="create-button" disabled={loading}>
          {loading ? 'Creating...' : 'Create Project'}
        </button>
      </form>
    </div>
  );
}

export default ProjectForm; 