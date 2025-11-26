import AttorneyImage from '../AttorneyImage';

const AttorneyHeroSection = ({ attorney, onScheduleConsultation }) => {
  const getFirstName = (fullName) => {
    return fullName.split(' ')[0];
  };

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
              <p className="attorney-specialization">
                <i className="fas fa-gavel"></i> {attorney.specialization}
              </p>
              <h3>About {getFirstName(attorney.name)}</h3>
              <p>{attorney.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttorneyHeroSection;