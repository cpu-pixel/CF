import React from 'react';
import ProjectCard from './ProjectCard';
import './Dashboard.css';
import { useDashboard } from './DashboardContext';

function ProjectList() {
  const { projects } = useDashboard();
  return (
    <div className="projects-section">
      <h3>Projects ({projects.length})</h3>
      <div className="projects-grid">
        {projects.map(project => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default ProjectList; 