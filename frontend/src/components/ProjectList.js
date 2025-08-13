import React from 'react';
import ProjectCard from './ProjectCard';
import './Dashboard.css';
import { useDashboard } from './DashboardContext';

function ProjectList() {
  const { projects, filters } = useDashboard();
  
  const hasActiveFilters = Object.values(filters).some(value => value);
  
  if (projects.length === 0) {
    return (
      <div className="projects-section">
        <h3>Projects ({projects.length})</h3>
        <div className="no-projects">
          {hasActiveFilters ? (
            <>
              <p>No projects found matching your current filters.</p>
              <p>Try adjusting your search criteria or clearing the filters.</p>
            </>
          ) : (
            <>
              <p>No projects available yet.</p>
              <p>Create your first project to get started!</p>
            </>
          )}
        </div>
      </div>
    );
  }

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