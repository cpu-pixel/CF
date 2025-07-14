import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';
import DashboardHeader from './DashboardHeader';
import DashboardStats from './DashboardStats';
import ProjectForm from './ProjectForm';
import ProjectFilter from './ProjectFilter';
import ProjectList from './ProjectList';
import { DashboardProvider, useDashboard } from './DashboardContext';

function DashboardContent({ user, logout }) {
  const {
    projects,
    filters,
    setFilters,
    loading,
    error,
    fetchProjects,
    createProject
  } = useDashboard();

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

  const handleLogout = () => {
    logout();
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="dashboard-container">
      <DashboardHeader user={user} onLogout={handleLogout} />
      <div className="dashboard-content">
        <DashboardStats totalProjects={projects.length} department={user?.department} role={user?.role} />
        <div className="main-content">
          <ProjectForm user={user} onCreate={createProject} />
          <ProjectFilter filters={filters} setFilters={setFilters} onFilter={handleFilter} />
          <ProjectList projects={projects} />
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <DashboardProvider>
      <DashboardContent user={user} logout={logout} />
    </DashboardProvider>
  );
}

export default Dashboard; 