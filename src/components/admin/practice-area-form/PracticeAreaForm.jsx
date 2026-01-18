import './PracticeAreaForm.css';

function PracticeAreaForm({ formData, onChange }) {
  const handleFeatureChange = (value) => {
    const features = value.split('\n').filter(f => f.trim());
    onChange('features', features);
  };

  return (
    <div className="form">
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => onChange('title', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Icon Class (FontAwesome)</label>
        <input
          type="text"
          value={formData.icon}
          onChange={(e) => onChange('icon', e.target.value)}
          placeholder="fas fa-balance-scale"
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          rows="3"
          value={formData.description}
          onChange={(e) => onChange('description', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Features (one per line)</label>
        <textarea
          rows="6"
          value={formData.features?.join('\n') || ''}
          onChange={(e) => handleFeatureChange(e.target.value)}
          placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
        />
      </div>
    </div>
  );
}

export default PracticeAreaForm;
