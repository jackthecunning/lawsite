import AttorneyImage from '../AttorneyImage';
import { getFirstName } from '../../utils/nameUtils';

const AttorneyHeroSection = ({ attorney, onScheduleConsultation }) => {
  return (
    <section className="attorney-detailed section-light">
      <div className="container">
        <div className="attorney-detail-content">
          <div className="attorney-detail-image">
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
                {attorney.office} Office
              </p>
              <button onClick={onScheduleConsultation} className="btn btn-primary btn-full-width">
                Schedule Consultation
              </button>
            </div>
          </div>
          <div className="attorney-detail-info">
            <div className="attorney-bio">
              <h1>{attorney.name}</h1>
              <h2 className="attorney-title">{attorney.title}</h2>
              {attorney.practiceAreas && (
                <p className="attorney-specialization">
                  <i className="fas fa-gavel"></i> {attorney.practiceAreas}
                </p>
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

export default AttorneyHeroSection;