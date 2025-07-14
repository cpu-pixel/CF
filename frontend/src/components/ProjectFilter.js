import React from 'react';
import './Dashboard.css';

function ProjectFilter({ filters, setFilters, onFilter }) {
  return (
    <div className="filter-section">
      <h3>Filter Projects</h3>
      <form className="filter-form" onSubmit={onFilter}>
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
        <button type="submit" className="filter-button">Apply Filters</button>
      </form>
    </div>
  );
}

export default ProjectFilter; 