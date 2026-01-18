import { useState } from 'react';
import './OfficesPanel.css';

function OfficesPanel({ offices, onEdit, onDelete, onExport, onBack }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOffices = offices.filter(office => {
    const matchesSearch = office.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         office.city.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Manage Office Locations</h2>
        <div className="panel-actions">
          <button className="btn-secondary" onClick={onBack}>← Back to Settings</button>
          <button className="btn-primary">+ Add Office</button>
          <button className="btn-secondary" onClick={onExport}>Export Data</button>
        </div>
      </div>

      <div className="panel-filters">
        <input
          type="text"
          placeholder="Search offices..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Office Name</th>
              <th>Address</th>
              <th>City</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOffices.map((office) => (
              <tr key={office.id}>
                <td>{office.name}</td>
                <td>{office.address}{office.addressLine2 ? `, ${office.addressLine2}` : ''}</td>
                <td>{office.city}</td>
                <td>{office.phone}</td>
                <td>{office.email}</td>
                <td className="actions">
                  <button onClick={() => onEdit(office)} className="btn-edit">Edit</button>
                  <button onClick={() => onDelete(office)} className="btn-delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OfficesPanel;
