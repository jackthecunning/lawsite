import { useState } from 'react';
import './AttorneysPanel.css';

function AttorneysPanel({ attorneys, onEdit, onDelete, onExport }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOffice, setFilterOffice] = useState('all');

  const offices = [...new Set(attorneys.map(a => a.office))];

  const filteredAttorneys = attorneys.filter(attorney => {
    const matchesSearch = attorney.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         attorney.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOffice = filterOffice === 'all' || attorney.office === filterOffice;
    return matchesSearch && matchesOffice;
  });

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Manage Attorneys</h2>
        <div className="panel-actions">
          <button className="btn-primary">+ Add Attorney</button>
          <button className="btn-secondary" onClick={onExport}>Export Data</button>
        </div>
      </div>

      <div className="panel-filters">
        <input
          type="text"
          placeholder="Search attorneys..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterOffice}
          onChange={(e) => setFilterOffice(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Offices</option>
          {offices.map(office => (
            <option key={office} value={office}>{office}</option>
          ))}
        </select>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Office</th>
              <th>Practice Areas</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttorneys.map((attorney, index) => (
              <tr key={index}>
                <td>{attorney.name}</td>
                <td>{attorney.title}</td>
                <td>{attorney.office}</td>
                <td>{attorney.practiceAreas?.join(', ')}</td>
                <td className="actions">
                  <button onClick={() => onEdit(attorney)} className="btn-edit">Edit</button>
                  <button onClick={() => onDelete(attorney)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttorneysPanel;
