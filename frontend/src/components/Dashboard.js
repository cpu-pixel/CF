import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './Dashboard.css';
import DashboardHeader from './DashboardHeader';
import DashboardStats from './DashboardStats';
import ProjectForm from './ProjectForm';
import ProjectFilter from './ProjectFilter';
import ProjectList from './ProjectList';

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
  const [filters, setFilters] = useState({
    department: '',
    urgency: '',
    startDate: '',
    endDate: ''
  });

  const fetchProjects = useCallback(async (filterParams = {}) => {
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
  }, [logout]);

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
  }, [user, filters, fetchProjects]);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchProjects(filters);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader user={user} onLogout={handleLogout} />
      <div className="dashboard-content">
        <DashboardStats totalProjects={projects.length} department={user?.department} role={user?.role} />
        <div className="main-content">
          <ProjectForm form={form} setForm={setForm} onCreate={createProject} user={user} />
          <ProjectFilter filters={filters} setFilters={setFilters} onFilter={handleFilter} />
          <ProjectList projects={projects} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 