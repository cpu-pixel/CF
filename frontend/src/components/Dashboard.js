import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { DashboardProvider, useDashboard } from './DashboardContext';
import './Dashboard.css';
import DashboardHeader from './DashboardHeader';
import DashboardStats from './DashboardStats';
import GanttChart from './GanttChart';

function DashboardContent({ user, logout }) {
  const { fetchProjects, projects } = useDashboard();

  useEffect(() => {
    if (user) {
      // Fetch projects when dashboard mounts
      fetchProjects();
    }
  }, [user, fetchProjects]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader user={user} onLogout={handleLogout} />
      <div className="dashboard-content">
        <DashboardStats totalProjects={projects.length} department={user?.department} role={user?.role} />
        <div className="main-content">
          <div className="dashboard-welcome">
            <h2>Welcome to UrbanSync Dashboard</h2>
            <p>Manage your projects and track progress efficiently</p>
            <div className="dashboard-actions">
              <Link to="/projects" className="dashboard-action-btn">
                View All Projects
              </Link>
              <Link to="/create-project" className="dashboard-action-btn secondary">
                Create New Project
              </Link>
            </div>
          </div>
          
          <GanttChart />
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