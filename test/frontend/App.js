import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/projects';

function App() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    name: '',
    department: '',
    urgency: 'low',
    startDate: '',
    endDate: '',
    budget: 0
  });

  const fetchProjects = async () => {
    const res = await axios.get(API);
    setProjects(res.data);
  };

  const createProject = async () => {
    try {
      await axios.post(`${API}/create`, form);
      fetchProjects();
    } catch (err) {
      alert(err.response?.data?.msg || 'Error creating project');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>UrbanSync: Create Project</h2>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} /><br />
      <input placeholder="Department" onChange={e => setForm({ ...form, department: e.target.value })} /><br />
      <select onChange={e => setForm({ ...form, urgency: e.target.value })}>
        <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
      </select><br />
      <input type="date" onChange={e => setForm({ ...form, startDate: e.target.value })} /><br />
      <input type="date" onChange={e => setForm({ ...form, endDate: e.target.value })} /><br />
      <input type="number" placeholder="Budget" onChange={e => setForm({ ...form, budget: Number(e.target.value) })} /><br />
      <button onClick={createProject}>Create</button>

      <h3>Existing Projects</h3>
      {projects.map(p => (
        <div key={p._id} style={{ border: '1px solid gray', margin: 5, padding: 5 }}>
          <b>{p.name}</b> ({p.department})<br />
          {p.startDate.slice(0, 10)} → {p.endDate.slice(0, 10)}<br />
          Priority: {p.urgency} | Budget: ₹{p.budget}
        </div>
      ))}
    </div>
  );
}

export default App;
