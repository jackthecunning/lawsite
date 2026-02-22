import AttorneyImage from '../../attorney-image';
import './AttorneySummary.css';

const AttorneySummary = ({ attorney }) => {
  return (
    <div className="team-detail-sidebar">
      <div className="attorney-image-wrapper uncropped">
        <AttorneyImage
          src={attorney.image}
          alt={attorney.name}
        />
      </div>
      <div className="attorney-summary">
        <h4>{attorney.name}</h4>
        <h5 className="attorney-title">{attorney.title}</h5>
        {attorney.practiceAreas && attorney.practiceAreas.length > 0 && (
          <div className="attorney-practice-areas">
            {attorney.practiceAreas.map((area, index) => (
              <span key={index}>
                <i className="fas fa-gavel"></i> {area}
              </span>
            ))}
          </div>
        )}
        <p>
          <i className="fas fa-map-marker-alt"></i>
          {attorney.offices ? attorney.offices.join(', ') : attorney.office} Office{attorney.offices && attorney.offices.length > 1 ? 's' : ''}
        </p>
        <p>
          <i className="fas fa-envelope"></i>
          <a href={`mailto:${attorney.email}`}>{attorney.email}</a>
        </p>
        <p>
          <i className="fas fa-phone"></i>
          <a href={`tel:${attorney.phone}`}>{attorney.phone}</a>
        </p>
        {attorney.fax && (
          <p>
            <i className="fas fa-fax"></i>
            <a href={`fax:${attorney.fax}`}>{attorney.fax}</a>
          </p>
        )}

      </div>
    </div>
  );
};

export default AttorneySummary;
