import React from 'react';
import './Dashboard.css';

function DashboardStats({ totalProjects, department, role }) {
  return (
    <div className="stats-section">
      <div className="stat-card">
        <h3>Total Projects</h3>
        <p>{totalProjects}</p>
      </div>
      <div className="stat-card">
        <h3>Your Department</h3>
        <p>{department}</p>
      </div>
      <div className="stat-card">
        <h3>Your Role</h3>
        <p>{role}</p>
      </div>
    </div>
  );
}

export default DashboardStats; 