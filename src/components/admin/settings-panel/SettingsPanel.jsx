import './SettingsPanel.css';

function SettingsPanel({ onEditOffices, onEditPracticeAreas, onEditContent }) {
  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Site Settings</h2>
      </div>
      <div className="settings-grid">
        <div className="setting-card">
          <h3>Image Management</h3>
          <p>Upload and manage images for attorneys, news, and content</p>
          <button className="btn-secondary">Manage Images</button>
        </div>
        <div className="setting-card">
          <h3>Practice Areas</h3>
          <p>Configure practice areas and service descriptions</p>
          <button className="btn-secondary" onClick={onEditPracticeAreas}>Edit Practice Areas</button>
        </div>
        <div className="setting-card">
          <h3>Office Locations</h3>
          <p>Manage office addresses and contact information</p>
          <button className="btn-secondary" onClick={onEditOffices}>Edit Offices</button>
        </div>
        <div className="setting-card">
          <h3>Site Content</h3>
          <p>Update history, diversity content, and other pages</p>
          <button className="btn-secondary" onClick={onEditContent}>Edit Content</button>
        </div>
        <div className="setting-card">
          <h3>Backup & Export</h3>
          <p>Create backups of all site data</p>
          <button className="btn-secondary">Create Backup</button>
        </div>
        <div className="setting-card">
          <h3>Import Data</h3>
          <p>Import content from JSON or CSV files</p>
          <button className="btn-secondary">Import</button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPanel;
