import React, { useEffect, useState } from 'react';
import { useDashboard } from './DashboardContext';
import './Dashboard.css';

function GanttChart() {
  const { projects, loading, error } = useDashboard();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    console.log('GanttChart: projects received:', projects);
    if (projects && projects.length > 0) {
      // Process projects for Gantt chart display
      const processedData = projects.map(project => ({
        id: project._id,
        name: project.name,
        start: new Date(project.startDate),
        end: new Date(project.endDate),
        progress: project.progress || 0,
        urgency: project.urgency || 'medium',
        department: project.department || 'General'
      }));
      console.log('GanttChart: processed data:', processedData);
      setChartData(processedData);
    } else {
      setChartData([]);
    }
  }, [projects]);

  // Show loading state
  if (loading) {
    return (
      <div className="gantt-chart-container">
        <h3>Project Timeline</h3>
        <div className="no-projects-gantt">
          <p>Loading projects...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="gantt-chart-container">
        <h3>Project Timeline</h3>
        <div className="no-projects-gantt">
          <p>Error loading projects: {error}</p>
        </div>
      </div>
    );
  }

  // Show no projects state
  if (!projects || projects.length === 0) {
    return (
      <div className="gantt-chart-container">
        <h3>Project Timeline</h3>
        <div className="no-projects-gantt">
          <p>No projects available to display in timeline</p>
          <p>Create projects to see them visualized here</p>
        </div>
      </div>
    );
  }

  // Show no chart data state (in case processing failed)
  if (chartData.length === 0) {
    return (
      <div className="gantt-chart-container">
        <h3>Project Timeline</h3>
        <div className="no-projects-gantt">
          <p>No project data available to display</p>
          <p>Check if projects have valid start and end dates</p>
        </div>
      </div>
    );
  }

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return '#ff4757';
      case 'medium': return '#ffa502';
      case 'low': return '#2ed573';
      default: return '#3742fa';
    }
  };

  const getDepartmentColor = (department) => {
    const colors = ['#3742fa', '#ff4757', '#2ed573', '#ffa502', '#ff6b6b', '#5352ed'];
    const index = department.length % colors.length;
    return colors[index];
  };

  const today = new Date();
  const minDate = new Date(Math.min(...chartData.map(p => p.start)));
  const maxDate = new Date(Math.max(...chartData.map(p => p.end)));
  const totalDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)) + 1;

  console.log('GanttChart: rendering with data:', {
    chartDataLength: chartData.length,
    minDate,
    maxDate,
    totalDays
  });

  return (
    <div className="gantt-chart-container">
      <h3>Project Timeline ({chartData.length} projects)</h3>
      <div className="gantt-chart">
        <div className="gantt-header">
          <div className="gantt-header-cell project-name-header">Project</div>
          <div className="gantt-header-cell department-header">Department</div>
          <div className="gantt-header-cell progress-header">Progress</div>
          <div className="gantt-header-cell timeline-header">Timeline</div>
        </div>
        
        <div className="gantt-body">
          {chartData.map((project, index) => {
            const startOffset = Math.floor((project.start - minDate) / (1000 * 60 * 60 * 24));
            const duration = Math.ceil((project.end - project.start) / (1000 * 60 * 60 * 24)) + 1;
            const progressWidth = (project.progress / 100) * duration;
            const isOverdue = project.end < today;
            
            return (
              <div key={project.id} className="gantt-row">
                <div className="gantt-cell project-name">
                  <span className="project-name-text">{project.name}</span>
                  <span className={`urgency-badge ${project.urgency}`}>
                    {project.urgency}
                  </span>
                </div>
                
                <div className="gantt-cell department">
                  <span 
                    className="department-tag"
                    style={{ backgroundColor: getDepartmentColor(project.department) }}
                  >
                    {project.department}
                  </span>
                </div>
                
                <div className="gantt-cell progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{project.progress}%</span>
                </div>
                
                <div className="gantt-cell timeline">
                  <div className="timeline-container">
                    <div 
                      className="timeline-bar"
                      style={{
                        left: `${(startOffset / totalDays) * 100}%`,
                        width: `${(duration / totalDays) * 100}%`,
                        backgroundColor: getUrgencyColor(project.urgency),
                        opacity: isOverdue ? 0.6 : 1
                      }}
                    >
                      <div 
                        className="progress-indicator"
                        style={{
                          width: `${Math.min(progressWidth / duration, 1) * 100}%`,
                          backgroundColor: '#fff'
                        }}
                      ></div>
                      {isOverdue && <div className="overdue-indicator">!</div>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="gantt-timeline-scale">
          {Array.from({ length: Math.min(8, totalDays) }, (_, i) => {
            const date = new Date(minDate);
            date.setDate(date.getDate() + Math.floor((i * totalDays) / 8));
            return (
              <div key={i} className="timeline-marker">
                {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GanttChart; 