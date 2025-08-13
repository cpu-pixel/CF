import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { DashboardProvider, useDashboard } from './DashboardContext';
import './Dashboard.css';
import DashboardHeader from './DashboardHeader';
import ProjectFilter from './ProjectFilter';
import ProjectList from './ProjectList';

function ProjectsContent({ user, logout }) {
  const {
    projects,
    filters,
    setFilters,
    loading,
    error,
    fetchProjects
  } = useDashboard();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchProjects(filters);
    }
    // eslint-disable-next-line
  }, [user]);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchProjects(filters);
  };

  const handleCreateProject = () => {
    navigate('/create-project');
  };

  const handleLogout = () => {
    logout();
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="dashboard-container">
      <DashboardHeader user={user} onLogout={handleLogout} />
      <div className="dashboard-content">
        <div className="projects-header">
          <h1>Projects Management</h1>
          <p>View, search, and manage all projects</p>
          <button 
            onClick={handleCreateProject}
            className="create-project-btn"
          >
            + Create New Project
          </button>
        </div>
        <div className="main-content">
          <ProjectFilter filters={filters} setFilters={setFilters} onFilter={handleFilter} />
          <ProjectList projects={projects} />
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const { user, logout } = useAuth();
  return (
    <DashboardProvider>
      <ProjectsContent user={user} logout={logout} />
    </DashboardProvider>
  );
}

export default Projects; 