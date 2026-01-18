import { useState } from 'react';
import './PracticeAreasPanel.css';

function PracticeAreasPanel({ practiceAreas, onEdit, onDelete, onExport, onBack }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAreas = practiceAreas.filter(area => {
    const matchesSearch = area.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         area.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Manage Practice Areas</h2>
        <div className="panel-actions">
          <button className="btn-secondary" onClick={onBack}>← Back to Settings</button>
          <button className="btn-primary">+ Add Practice Area</button>
          <button className="btn-secondary" onClick={onExport}>Export Data</button>
        </div>
      </div>

      <div className="panel-filters">
        <input
          type="text"
          placeholder="Search practice areas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Icon</th>
              <th>Description</th>
              <th>Features</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAreas.map((area) => (
              <tr key={area.id}>
                <td>{area.title}</td>
                <td><i className={area.icon}></i> {area.icon}</td>
                <td>{area.description}</td>
                <td>{area.features?.length || 0} items</td>
                <td className="actions">
                  <button onClick={() => onEdit(area)} className="btn-edit">Edit</button>
                  <button onClick={() => onDelete(area)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PracticeAreasPanel;
