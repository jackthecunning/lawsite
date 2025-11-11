import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { loadAllAttorneyProfiles } from '../utils/attorneyLoader';
import AttorneyImage from '../components/AttorneyImage';

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

  return (
    <>
      {/* Attorney Details Section */}
      <section className="attorney-detailed">
        <div className="container">
          <div className="attorney-detail-content">
            <div className="attorney-detail-image">
              <AttorneyImage
                src={attorney.image}
                alt={attorney.name}
              />

              {/* Quick Contact Card */}
              <div className="attorney-quick-contact">
                <h4>Contact {attorney.name.split(' ')[0]}</h4>
                <p>
                  <i className="fas fa-envelope"></i>
                  <a href={`mailto:${attorney.email}`}>
                    {attorney.email}
                  </a>
                </p>
                <p>
                  <i className="fas fa-phone"></i>
                  <a href={`tel:${attorney.phone}`}>
                    {attorney.phone}
                  </a>
                </p>
                <p>
                  <i className="fas fa-map-marker-alt"></i>
                  {attorney.office} Office
                </p>
                <button onClick={scrollToContact} className="btn btn-primary btn-full-width">
                  Schedule a Consultation
                </button>
              </div>
            </div>

            <div className="attorney-detail-info">
              <div className="attorney-bio">
                <h3>About {attorney.name.split(' ')[0]}</h3>
                <p>{attorney.bio}</p>
              </div>

              <div className="attorney-credentials">
                <h3>Education & Credentials</h3>
                <ul>
                  {attorney.credentials.map((credential, index) => (
                    <li key={index}>{credential}</li>
                  ))}
                </ul>
              </div>

              <div className="attorney-practice-areas">
                <h3>Practice Areas</h3>
                <p>
                  <strong>{attorney.specialization}</strong> - {attorney.name.split(' ')[0]} focuses on
                  providing comprehensive legal services in this area, bringing years of experience
                  and a deep understanding of the legal complexities involved.
                </p>
              </div>
            </div>
          </div>

          {/* Back to Team Button */}
          <div className="back-to-team">
            <Link to="/team" className="btn btn-secondary">
              <i className="fas fa-arrow-left"></i> Back to Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="attorney-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Work with {attorney.name.split(' ')[0]}?</h2>
            <p>Contact {attorney.name.split(' ')[0]} directly for a consultation about your legal matter.</p>
            <div className="cta-buttons">
              <button onClick={scrollToContact} className="btn btn-primary">
                Free Consultation
              </button>
              <a href={`tel:${attorney.phone}`} className="btn btn-secondary">
                Call {attorney.name.split(' ')[0]}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AttorneyDetail;
