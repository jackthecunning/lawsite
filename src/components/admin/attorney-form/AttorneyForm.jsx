import './AttorneyForm.css';

function AttorneyForm({ formData, onChange }) {
  return (
    <div className="form">
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => onChange('name', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => onChange('title', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Office</label>
        <input
          type="text"
          value={formData.office}
          onChange={(e) => onChange('office', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => onChange('email', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => onChange('phone', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Practice Areas (comma-separated)</label>
        <input
          type="text"
          value={formData.practiceAreas?.join(', ')}
          onChange={(e) => onChange('practiceAreas', e.target.value.split(',').map(s => s.trim()))}
        />
      </div>
      <div className="form-group">
        <label>Bio</label>
        <textarea
          rows="6"
          value={formData.bio}
          onChange={(e) => onChange('bio', e.target.value)}
        />
      </div>
    </div>
  );
}

export default AttorneyForm;
