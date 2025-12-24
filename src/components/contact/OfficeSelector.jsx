import { offices } from '../../data/firmData';

const OfficeSelector = ({ selectedOffice, setSelectedOffice }) => {
  return (
    <div className="office-locations">
      <h3>Our Office Locations</h3>
      <p>
        For general inquiries, use the contact information above. If you need to reach a specific
        office location, select an office below to view its direct contact details:
      </p>

      <div className="office-tabs">
        {offices.map((office) => (
          <button
            key={office.id}
            className={`office-tab ${selectedOffice?.id === office.id ? 'active' : ''}`}
            onClick={() => setSelectedOffice(selectedOffice?.id === office.id ? null : office)}
          >
            <i className="fas fa-map-marker-alt"></i>
            {office.name}
          </button>
        ))}
      </div>

      {selectedOffice && (
        <div className="office-details-card">
          <h4>{selectedOffice.fullName}</h4>
          <div className="office-contact-details">
            <div className="detail-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <strong>Address</strong>
                <p>
                  {selectedOffice.address}<br />
                  {selectedOffice.addressLine2 && <>{selectedOffice.addressLine2}<br /></>}
                  {selectedOffice.city}
                </p>
              </div>
            </div>
            <div className="detail-item">
              <i className="fas fa-phone"></i>
              <div>
                <strong>Phone</strong>
                <p>
                  <a href={`tel:${selectedOffice.phone.replace(/[^0-9]/g, '')}`}>
                    {selectedOffice.phone}
                  </a>
                </p>
              </div>
            </div>
            <div className="detail-item">
              <i className="fas fa-fax"></i>
              <div>
                <strong>Fax</strong>
                <p>{selectedOffice.fax}</p>
              </div>
            </div>
            <div className="detail-item">
              <i className="fas fa-envelope"></i>
              <div>
                <strong>Email</strong>
                <p>
                  <a href={`mailto:${selectedOffice.email}`}>
                    {selectedOffice.email}
                  </a>
                </p>
              </div>
            </div>
            <div className="detail-item">
              <i className="fas fa-clock"></i>
              <div>
                <strong>Hours</strong>
                <p>{selectedOffice.hours}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfficeSelector;
