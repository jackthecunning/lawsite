import './ContentPanel.css';

function ContentPanel({ onBack }) {
  return (
    <div className="panel">
      <div className="panel-header">
        <h2>Site Content Management</h2>
        <div className="panel-actions">
          <button className="btn-secondary" onClick={onBack}>← Back to Settings</button>
        </div>
      </div>

      <div className="content-sections">
        <div className="content-section">
          <h3>Firm Information</h3>
          <p>Edit firm name, tagline, contact information, and social media links</p>
          <button className="btn-secondary">Edit Firm Info</button>
        </div>

        <div className="content-section">
          <h3>History Content</h3>
          <p>Manage firm history timeline and content</p>
          <button className="btn-secondary">Edit History</button>
        </div>

        <div className="content-section">
          <h3>Diversity Content</h3>
          <p>Update diversity and inclusion content</p>
          <button className="btn-secondary">Edit Diversity</button>
        </div>

        <div className="content-section">
          <h3>Women of SC Content</h3>
          <p>Manage Women of Swartz Campbell content</p>
          <button className="btn-secondary">Edit Women of SC</button>
        </div>

        <div className="content-section">
          <h3>Home Page</h3>
          <p>Edit home page hero content and featured sections</p>
          <button className="btn-secondary">Edit Home Page</button>
        </div>

        <div className="content-section">
          <h3>Careers Page</h3>
          <p>Update careers page content and job listings</p>
          <button className="btn-secondary">Edit Careers</button>
        </div>
      </div>
    </div>
  );
}

export default ContentPanel;
