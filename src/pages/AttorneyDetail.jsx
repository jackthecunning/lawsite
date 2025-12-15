import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { loadAllAttorneyProfiles } from '../utils/attorneyLoader';
import AttorneyImage from '../components/AttorneyImage';
import { getFirstName } from '../utils/nameUtils';
import {
  AttorneyHeroSection,
  AttorneyCredentialsSection,
  AttorneyPracticeSection,
  AttorneyContactSection,
  AttorneyNavigationSection
} from '../components/AttorneyDetailSections';

const AttorneyDetail = () => {
  const { id } = useParams(); // This is now the slug
  const [attorney, setAttorney] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load attorney data on component mount
  useEffect(() => {
    const loadAttorney = async () => {
      try {
        const attorneys = await loadAllAttorneyProfiles();
        const foundAttorney = attorneys.find(att => att.slug === id);
        setAttorney(foundAttorney);
      } catch (error) {
        console.error('Error loading attorney:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAttorney();
    window.scrollTo(0, 0);
  }, [id]);

  const scrollToContact = () => {
    window.location.href = '/#contact';
  };

  const getPersonalBio = () => {
    if (attorney.personalBio && attorney.personalBio.trim()) {
      return attorney.personalBio;
    }
    return `${getFirstName(attorney.name)} lives a private life, which we respect and support.`;
  };

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '120px', textAlign: 'center' }}>
        <h2>Loading Attorney Details...</h2>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!attorney) {
    return (
      <div className="container" style={{ paddingTop: '120px', textAlign: 'center' }}>
        <h2>Attorney Not Found</h2>
        <p>The attorney you're looking for doesn't exist.</p>
        <Link to="/team" className="btn btn-primary">Back to Our Team</Link>
      </div>
    );
  }

  const hasPersonalPhoto = attorney.personalPhoto && attorney.personalPhoto.trim();

  return (
    <>
      {/* Hero Section */}
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

      {/* Personal Life Section */}
      <section id="attorney-personal" className="attorney-personal-section section-white">
        <div className="container">
          <div className="personal-section-wrapper">
            <div className="section-header">
              <h2>
                <i className="fas fa-heart"></i>
                Outside the Office
              </h2>
            </div>
            <div className="section-content">
              {hasPersonalPhoto ? (
                <div className="personal-content-with-photo">
                  <div className="personal-bio">
                    <p>{getPersonalBio()}</p>
                  </div>
                  <div className="personal-photo">
                    <AttorneyImage
                      src={attorney.personalPhoto}
                      alt={`${attorney.name} personal photo`}
                      className="personal-photo-image"
                    />
                  </div>
                </div>
              ) : (
                <div className="personal-content-no-photo">
                  <p>{getPersonalBio()}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      {attorney.education && attorney.education.length > 0 && (
        <section id="attorney-education" className="attorney-credentials-section section-light">
          <div className="container">
            <div className="section-header">
              <h2>
                <i className="fas fa-graduation-cap"></i>
                Education
              </h2>
            </div>
            <div className="section-content">
              <div className="credentials-grid">
                {attorney.education.map((item, index) => (
                  <div key={index} className="credential-item">
                    <i className="fas fa-check-circle"></i>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Bar Admissions Section */}
      {attorney.barAdmissions && attorney.barAdmissions.length > 0 && (
        <section id="attorney-bar" className="attorney-credentials-section section-white">
          <div className="container">
            <div className="section-header">
              <h2>
                <i className="fas fa-gavel"></i>
                Bar Admissions
              </h2>
            </div>
            <div className="section-content">
              <div className="credentials-grid">
                {attorney.barAdmissions.map((item, index) => (
                  <div key={index} className="credential-item">
                    <i className="fas fa-check-circle"></i>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Court Admissions Section */}
      {attorney.courtAdmissions && attorney.courtAdmissions.length > 0 && (
        <section id="attorney-court" className="attorney-credentials-section section-light">
          <div className="container">
            <div className="section-header">
              <h2>
                <i className="fas fa-landmark"></i>
                Court Admissions
              </h2>
            </div>
            <div className="section-content">
              <div className="credentials-grid">
                {attorney.courtAdmissions.map((item, index) => (
                  <div key={index} className="credential-item">
                    <i className="fas fa-check-circle"></i>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Awards and Honors Section */}
      {attorney.awards && attorney.awards.length > 0 && (
        <section id="attorney-awards" className="attorney-credentials-section section-white">
          <div className="container">
            <div className="section-header">
              <h2>
                <i className="fas fa-trophy"></i>
                Awards and Honors
              </h2>
            </div>
            <div className="section-content">
              <div className="credentials-grid">
                {attorney.awards.map((item, index) => (
                  <div key={index} className="credential-item">
                    <i className="fas fa-award"></i>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Professional Organizations Section */}
      {attorney.professionalOrganizations && attorney.professionalOrganizations.length > 0 && (
        <section id="attorney-organizations" className="attorney-credentials-section section-light">
          <div className="container">
            <div className="section-header">
              <h2>
                <i className="fas fa-users"></i>
                Professional Organizations
              </h2>
            </div>
            <div className="section-content">
              <div className="credentials-grid">
                {attorney.professionalOrganizations.map((item, index) => (
                  <div key={index} className="credential-item">
                    <i className="fas fa-check-circle"></i>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Publications Section */}
      {attorney.publications && attorney.publications.length > 0 && (
        <section id="attorney-publications" className="attorney-credentials-section section-white">
          <div className="container">
            <div className="section-header">
              <h2>
                <i className="fas fa-book"></i>
                Publications
              </h2>
            </div>
            <div className="section-content">
              <div className="credentials-grid">
                {attorney.publications.map((item, index) => (
                  <div key={index} className="credential-item">
                    <i className="fas fa-file-alt"></i>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pro Bono Work Section */}
      {attorney.proBono && attorney.proBono.length > 0 && (
        <section id="attorney-probono" className="attorney-credentials-section section-light">
          <div className="container">
            <div className="section-header">
              <h2>
                <i className="fas fa-hands-helping"></i>
                Pro Bono Work
              </h2>
            </div>
            <div className="section-content">
              <div className="credentials-grid">
                {attorney.proBono.map((item, index) => (
                  <div key={index} className="credential-item">
                    <i className="fas fa-heart"></i>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Credentials Section */}
      {attorney.credentials && attorney.credentials.length > 0 && (
        <section id="attorney-credentials" className="attorney-credentials-section section-white">
          <div className="container">
            <div className="section-header">
              <h2>
                <i className="fas fa-certificate"></i>
                Credentials
              </h2>
            </div>
            <div className="section-content">
              <div className="credentials-grid">
                {attorney.credentials.map((item, index) => (
                  <div key={index} className="credential-item">
                    <i className="fas fa-check-circle"></i>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {attorney.certifications && attorney.certifications.length > 0 && (
        <section id="attorney-certifications" className="attorney-credentials-section section-light">
          <div className="container">
            <div className="section-header">
              <h2>
                <i className="fas fa-award"></i>
                Certifications
              </h2>
            </div>
            <div className="section-content">
              <div className="credentials-grid">
                {attorney.certifications.map((item, index) => (
                  <div key={index} className="credential-item">
                    <i className="fas fa-check-circle"></i>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Military Service Section */}
      {attorney.military && attorney.military.length > 0 && (
        <section id="attorney-military" className="attorney-credentials-section section-white">
          <div className="container">
            <div className="section-header">
              <h2>
                <i className="fas fa-flag-usa"></i>
                Military Service
              </h2>
            </div>
            <div className="section-content">
              <div className="credentials-grid">
                {attorney.military.map((item, index) => (
                  <div key={index} className="credential-item">
                    <i className="fas fa-medal"></i>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Practice Focus Section */}
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

      {/* Contact Section */}
      <section id="attorney-contact" className="attorney-contact-section section-light">
        <div className="container">
          <div className="section-header">
            <h2>Ready to Work with {getFirstName(attorney.name)}?</h2>
            <p>Get in touch to discuss your legal needs and see how we can help.</p>
          </div>
          <div className="section-content">
            <div className="contact-methods">
              <div className="contact-method">
                <i className="fas fa-envelope"></i>
                <h4>Get in Touch</h4>
                <button onClick={scrollToContact} className="btn btn-primary">
                  Contact Us
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

      {/* Navigation Section */}
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
    </>
  );
};

export default AttorneyDetail;
