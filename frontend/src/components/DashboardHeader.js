import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Dashboard.css';

function DashboardHeader({ user, onLogout }) {
  const location = useLocation();
  
  return (
    <header className="dashboard-header">
      <div className="header-content">
        <div className="header-left">
          <h1>UrbanSync</h1>
          <nav className="header-navigation">
            <Link 
              to="/dashboard" 
              className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/projects" 
              className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`}
            >
              Projects
            </Link>
          </nav>
        </div>
        <div className="user-info">
          <span>Welcome, {user?.name}</span>
          <span className="user-role">({user?.role})</span>
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader; 