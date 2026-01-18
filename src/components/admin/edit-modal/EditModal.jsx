import { useState } from 'react';
import AttorneyForm from '../attorney-form';
import NewsForm from '../news-form';
import OfficeForm from '../office-form';
import PracticeAreaForm from '../practice-area-form';
import './EditModal.css';

function EditModal({ item, type, onSave, onCancel }) {
  const [formData, setFormData] = useState(item);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSaveClick = () => {
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Edit {type === 'attorneys' ? 'Attorney' : type === 'offices' ? 'Office' : type === 'practice-areas' ? 'Practice Area' : 'Article'}</h2>
          <button onClick={onCancel} className="modal-close">&times;</button>
        </div>
        <div className="modal-body">
          {type === 'attorneys' ? (
            <AttorneyForm formData={formData} onChange={handleChange} />
          ) : type === 'offices' ? (
            <OfficeForm formData={formData} onChange={handleChange} />
          ) : type === 'practice-areas' ? (
            <PracticeAreaForm formData={formData} onChange={handleChange} />
          ) : (
            <NewsForm formData={formData} onChange={handleChange} />
          )}
        </div>
        <div className="modal-footer">
          <button onClick={onCancel} className="btn-secondary">Cancel</button>
          <button onClick={handleSaveClick} className="btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
