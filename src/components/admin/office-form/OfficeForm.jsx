import './OfficeForm.css';

function OfficeForm({ formData, onChange }) {
  return (
    <div className="form">
      <div className="form-group">
        <label>Office Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => onChange('name', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => onChange('address', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Address Line 2</label>
        <input
          type="text"
          value={formData.addressLine2 || ''}
          onChange={(e) => onChange('addressLine2', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>City, State ZIP</label>
        <input
          type="text"
          value={formData.city}
          onChange={(e) => onChange('city', e.target.value)}
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
        <label>Fax</label>
        <input
          type="tel"
          value={formData.fax || ''}
          onChange={(e) => onChange('fax', e.target.value)}
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
        <label>Hours</label>
        <input
          type="text"
          value={formData.hours || ''}
          onChange={(e) => onChange('hours', e.target.value)}
        />
      </div>
    </div>
  );
}

export default OfficeForm;
