import React from 'react';
import './Dashboard.css';

function DashboardHeader({ user, onLogout }) {
  return (
    <header className="dashboard-header">
      <div className="header-content">
        <h1>UrbanSync Dashboard</h1>
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