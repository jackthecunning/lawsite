import './OfficeContactCard.css';

const OfficeContactCard = ({ office }) => {
  return (
    <div className="office-card redesigned-contact">
      <div className="office-details">
        <div className="contact-row">
          <i className="fas fa-map-marker-alt"></i>
          <div className="contact-info">
            <strong>Address:</strong><br />
            {office.address}<br />
            {office.addressLine2 && <>{office.addressLine2}<br /></>}
            {office.city}
          </div>
        </div>
        <div className="contact-row">
          <i className="fas fa-phone"></i>
          <div className="contact-info">
            <strong>Phone:</strong><br />
            <a href={`tel:${office.phone.replace(/[^0-9]/g, '')}`}>{office.phone}</a>
          </div>
        </div>
        <div className="contact-row">
          <i className="fas fa-envelope"></i>
          <div className="contact-info">
            <strong>Email:</strong><br />
            <a href={`mailto:${office.email}`}>{office.email}</a>
          </div>
        </div>
        <div className="contact-row">
          <i className="fas fa-clock"></i>
          <div className="contact-info">
            <strong>Hours:</strong><br />
            {office.hours}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeContactCard;
