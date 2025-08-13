import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { DashboardProvider, useDashboard } from './DashboardContext';
import './Dashboard.css';
import DashboardHeader from './DashboardHeader';

function CreateProjectContent({ user, logout }) {
  const { createProject } = useDashboard();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    department: user?.department || '',
    urgency: 'medium',
    startDate: '',
    endDate: '',
    budget: '',
    status: 'pending'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createProject(formData, () => {
        navigate('/projects');
      });
    } catch (err) {
      setError(err.message || 'Error creating project');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/projects');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader user={user} onLogout={handleLogout} />
      <div className="dashboard-content">
        <div className="create-project-header">
          <h1>Create New Project</h1>
          <p>Fill in the details below to create a new project</p>
        </div>
        
        <div className="main-content">
          <div className="create-project-form-container">
            <form onSubmit={handleSubmit} className="create-project-form">
              <div className="form-section">
                <h3>Basic Information</h3>
                <div className="form-grid">
                  <div className="form-row">
                    <label htmlFor="name">Project Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter project name"
                    />
                  </div>
                  
                  <div className="form-row">
                    <label htmlFor="description">Description *</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      placeholder="Describe the project"
                      rows="4"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Project Details</h3>
                <div className="form-grid">
                  <div className="form-row">
                    <label htmlFor="department">Department *</label>
                    <input
                      type="text"
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                      placeholder="Enter department"
                    />
                  </div>
                  
                  <div className="form-row">
                    <label htmlFor="urgency">Urgency Level *</label>
                    <select
                      id="urgency"
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleChange}
                      required
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  
                  <div className="form-row">
                    <label htmlFor="startDate">Start Date *</label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-row">
                    <label htmlFor="endDate">End Date *</label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-row">
                    <label htmlFor="budget">Budget</label>
                    <input
                      type="number"
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="Enter budget amount"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  
                  <div className="form-row">
                    <label htmlFor="status">Status *</label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      required
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="on-hold">On Hold</option>
                    </select>
                  </div>
                </div>
              </div>

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <div className="form-actions">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="cancel-button"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="create-button"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreateProject() {
  const { user, logout } = useAuth();
  return (
    <DashboardProvider>
      <CreateProjectContent user={user} logout={logout} />
    </DashboardProvider>
  );
}

export default CreateProject; 