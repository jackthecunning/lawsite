import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { loadAllAttorneyProfiles } from '../utils/attorneyLoader';
import AttorneyImage from './AttorneyImage';

const Attorneys = () => {
  const [attorneys, setAttorneys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanding, setIsExpanding] = useState(false);
  const navigate = useNavigate();

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

  // Show only partners on home page
  const featuredAttorneys = attorneys.filter(attorney =>
    attorney.title && attorney.title.toLowerCase().includes('partner')
  );

  const handleExpandToTeam = (e) => {
    e.preventDefault();
    setIsExpanding(true);

    // Navigate immediately without waiting for animation or scrolling
    // The Team page will handle scrolling to top
    navigate('/team', { state: { fromHomepage: true } });
  };

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
    <section id="attorneys" className={`attorneys ${isExpanding ? 'expanding' : ''}`}>
      <div className="container">
        <div className="section-header">
          <h2>Our Legal Team</h2>
          <p>Experienced Professionals Dedicated to Your Success</p>
        </div>
        <div className="attorneys-scroll-container">
          {featuredAttorneys.map((attorney) => (
            <Link
              key={attorney.id}
              to={`/attorney/${attorney.slug}`}
              className="team-card-link"
            >
              <div className="team-card">
                <div className="team-card-image">
                  <AttorneyImage
                    src={attorney.image}
                    alt={attorney.name}
                  />
                </div>
                <div className="team-card-info">
                  <h3>{attorney.name}</h3>
                  <p className="title">{attorney.title}</p>
                  <p className="specialization">{attorney.specialization}</p>
                  <p className="office">
                    <i className="fas fa-map-marker-alt"></i>
                    {attorney.office} Office
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button onClick={handleExpandToTeam} className="btn btn-primary team-expand-btn">
            Meet Our Full Team
          </button>
        </div>
      </div>
    </section>
  );
};

export default Attorneys;