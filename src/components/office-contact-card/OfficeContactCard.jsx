import './OfficeContactCard.css';

const OfficeContactCard = ({ office }) => {
  return (
    <div className="office-card">
      <div className="office-details">
        <p>
          <i className="fas fa-map-marker-alt"></i>
          <span>
            {office.address}<br />
            {office.addressLine2 && <>{office.addressLine2}<br /></>}
            {office.city}
          </span>
        </p>
        <p>
          <i className="fas fa-phone"></i>
          <a href={`tel:${office.phone.replace(/[^0-9]/g, '')}`}>{office.phone}</a>
        </p>
        <p>
          <i className="fas fa-envelope"></i>
          <a href={`mailto:${office.email}`}>{office.email}</a>
        </p>
        <p>
          <i className="fas fa-clock"></i>
          <span>{office.hours}</span>
        </p>
      </div>
    </div>
  );
};

export default OfficeContactCard;
