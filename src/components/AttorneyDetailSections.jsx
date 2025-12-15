import { Link } from 'react-router-dom';
import AttorneyImage from './AttorneyImage';
import { getFirstName } from '../utils/nameUtils';

// Hero Section Component
export const AttorneyHeroSection = ({ attorney, onScheduleConsultation }) => {
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
                {attorney.offices ? attorney.offices.join(', ') : attorney.office} Office{attorney.offices && attorney.offices.length > 1 ? 's' : ''}
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

// Credentials Section Component
export const AttorneyCredentialsSection = ({ attorney }) => {
  return (
    <section id="attorney-credentials" className="attorney-credentials-section section-light">
      <div className="container">
        <div className="section-header">
          <h2>
            <i className="fas fa-graduation-cap"></i>
            Education & Credentials
          </h2>
        </div>
        <div className="section-content">
          <div className="credentials-grid">
            {attorney.credentials.map((credential, index) => (
              <div key={index} className="credential-item">
                <i className="fas fa-check-circle"></i>
                <span>{credential}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Practice Section Component
export const AttorneyPracticeSection = ({ attorney }) => {
  return (
    <section id="attorney-practice" className="attorney-practice-section section-dark">
      <div className="container">
        <div className="section-header">
          <h2>
            <i className="fas fa-briefcase"></i>
            Practice Focus
          </h2>
        </div>
        <div className="section-content">
          <h3 className="practice-area-title">{attorney.specialization}</h3>
          <p>
            {getFirstName(attorney.name)} focuses on providing comprehensive legal services in this area,
            bringing years of experience and a deep understanding of the legal complexities involved.
          </p>
        </div>
      </div>
    </section>
  );
};

// Contact Section Component
export const AttorneyContactSection = ({ attorney, onScheduleConsultation }) => {
  return (
    <section id="attorney-contact" className="attorney-contact-section section-light">
      <div className="container">
        <div className="section-header">
          <h2>Ready to Work with {getFirstName(attorney.name)}?</h2>
          <p>Get in touch to discuss your legal needs and see how we can help.</p>
        </div>
        <div className="section-content">
          <div className="contact-methods">
            <div className="contact-method">
              <i className="fas fa-calendar-alt"></i>
              <h4>Schedule Consultation</h4>
              <button onClick={onScheduleConsultation} className="btn btn-primary">
                Free Consultation
              </button>
            </div>
            <div className="contact-method">
              <i className="fas fa-phone"></i>
              <h4>Call Directly</h4>
              <a href={`tel:${attorney.phone}`} className="btn btn-secondary">
                {attorney.phone}
              </a>
            </div>
            <div className="contact-method">
              <i className="fas fa-envelope"></i>
              <h4>Send Email</h4>
              <a href={`mailto:${attorney.email}`} className="btn btn-outline">
                {attorney.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Navigation Section Component
export const AttorneyNavigationSection = () => {
  return (
    <section id="attorney-navigation" className="attorney-navigation-section section-dark">
      <div className="container">
        <div className="nav-content">
          <Link to="/team" className="btn btn-secondary">
            <i className="fas fa-arrow-left"></i>
            Back to Our Team
          </Link>
        </div>
      </div>
    </section>
  );
};
