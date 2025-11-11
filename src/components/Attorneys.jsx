import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { loadAllAttorneyProfiles } from '../utils/attorneyLoader';
import AttorneyImage from './AttorneyImage';

const Attorneys = () => {
  const [attorneys, setAttorneys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAttorneys = async () => {
      try {
        const loadedAttorneys = await loadAllAttorneyProfiles();
        setAttorneys(loadedAttorneys);
      } catch (error) {
        console.error('Error loading attorneys:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAttorneys();
  }, []);

  // Show only first 4 attorneys on home page
  const featuredAttorneys = attorneys.slice(0, 4);

  if (loading) {
    return (
      <section id="attorneys" className="attorneys">
        <div className="container">
          <div className="section-header">
            <h2>Our Legal Team</h2>
            <p>Loading our experienced professionals...</p>
          </div>
          <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="attorneys" className="attorneys">
      <div className="container">
        <div className="section-header">
          <h2>Our Legal Team</h2>
          <p>Experienced Professionals Dedicated to Your Success</p>
        </div>
        <div className="attorneys-grid">
          {featuredAttorneys.map((attorney) => (
            <div key={attorney.id} className="attorney-card">
              <AttorneyImage src={attorney.image} alt={attorney.name} />
              <div className="attorney-info">
                <h3>{attorney.name}</h3>
                <p className="title">{attorney.title}</p>
                <p className="specialization">{attorney.specialization}</p>
                {/* <p className="bio">{attorney.bio.about[0].substring(0, 150)}...</p> */}
                <div className="attorney-contact">
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
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/team" className="btn btn-primary">
            Meet Our Full Team
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Attorneys;