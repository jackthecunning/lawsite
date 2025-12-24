import AttorneyImage from '../../attorney-image';
import { getFirstName } from '../../../utils/nameUtils';
import './AttorneyHero.css';

const AttorneyHero = ({ attorney }) => {
  return (
    <section className="attorney-detailed section-light">
      <div className="container">
        <div className="attorney-detail-content">
          <div className="attorney-detail-sidebar">
            <div className="attorney-image-wrapper uncropped">
              <AttorneyImage
                src={attorney.image}
                alt={attorney.name}
              />
            </div>
            <div className="attorney-quick-contact">
              <h4>Contact {getFirstName(attorney.name)}</h4>
              <p>
                <i className="fas fa-envelope"></i>
                <a href={`mailto:${attorney.email}`}>{attorney.email}</a>
              </p>
              <p>
                <i className="fas fa-phone"></i>
                <a href={`tel:${attorney.phone}`}>{attorney.phone}</a>
              </p>
              <p>
                <i className="fas fa-map-marker-alt"></i>
                {attorney.offices ? attorney.offices.join(', ') : attorney.office} Office{attorney.offices && attorney.offices.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <div className="attorney-detail-info">
            <div className="attorney-bio">
              <h1>{attorney.name}</h1>
              <h2 className="attorney-title">{attorney.title}</h2>
              {attorney.practiceAreas && attorney.practiceAreas.length > 0 && (
                <div className="attorney-practice-areas">
                  {attorney.practiceAreas.map((area, index) => (
                    <span key={index} className="practice-area-tag">
                      <i className="fas fa-gavel"></i> {area}
                    </span>
                  ))}
                </div>
              )}
              <h3>About {getFirstName(attorney.name)}</h3>
              {attorney.bio && attorney.bio.split('\n').map((paragraph, index) => (
                paragraph.trim() && <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttorneyHero;
