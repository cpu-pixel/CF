import React from 'react';
import './Dashboard.css';
import { useDashboard } from './DashboardContext';

function ProjectFilter() {
  const { filters, setFilters, fetchProjects } = useDashboard();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchProjects(filters);
  };

  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleClearFilters = () => {
    setFilters({
      department: '',
      urgency: '',
      startDate: '',
      endDate: '',
      search: ''
    });
    fetchProjects({});
  };

  return (
    <div className="filter-section">
      <h3>Search & Filter Projects</h3>
      <form className="filter-form" onSubmit={handleSubmit}>
        <div className="search-row">
          <input
            type="text"
            placeholder="Search projects by name, description, or department..."
            value={filters.search || ''}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        <div className="filter-row">
          <input
            placeholder="Department"
            value={filters.department}
            onChange={e => setFilters({ ...filters, department: e.target.value })}
          />
          <select
            value={filters.urgency}
            onChange={e => setFilters({ ...filters, urgency: e.target.value })}
          >
            <option value="">All Urgencies</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="date"
            value={filters.startDate}
            onChange={e => setFilters({ ...filters, startDate: e.target.value })}
          />
          <input
            type="date"
            value={filters.endDate}
            onChange={e => setFilters({ ...filters, endDate: e.target.value })}
          />
        </div>
        <div className="filter-actions">
          <button type="submit" className="filter-button">Apply Filters</button>
          <button type="button" className="clear-button" onClick={handleClearFilters}>
            Clear All
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProjectFilter; 