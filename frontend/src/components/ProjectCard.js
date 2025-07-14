import React from 'react';
import './Dashboard.css';

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="project-header">
        <h4>{project.name}</h4>
        <span className={`urgency-badge ${project.urgency}`}>
          {project.urgency}
        </span>
      </div>
      <div className="project-details">
        <p><strong>Department:</strong> {project.department}</p>
        <p><strong>Duration:</strong> {project.startDate ? project.startDate.slice(0, 10) : ''} → {project.endDate ? project.endDate.slice(0, 10) : ''}</p>
        <p><strong>Budget:</strong> ₹{project.budget?.toLocaleString()}</p>
        <p><strong>Priority Weight:</strong> {project.weight?.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default ProjectCard; 