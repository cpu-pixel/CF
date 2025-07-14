import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

const DashboardContext = createContext();

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const API = `${API_BASE_URL}/api/projects`;

export const DashboardProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({
    department: '',
    urgency: '',
    startDate: '',
    endDate: ''
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async (filterParams = filters) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const res = await axios.get(`${API}?${params.toString()}`);
      setProjects(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching projects');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const createProject = async (form, onSuccess) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(`${API}/create`, form);
      await fetchProjects(filters);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        projects,
        filters,
        setFilters,
        selectedProject,
        setSelectedProject,
        loading,
        error,
        fetchProjects,
        createProject
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}; 