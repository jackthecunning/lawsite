import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { loadAllAttorneyProfiles } from '../utils/attorneyLoader';
import AttorneyImage from './AttorneyImage';

const Attorneys = () => {
  const [attorneys, setAttorneys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanding, setIsExpanding] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const sectionRef = useRef(null);
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => setAnimateCards(true), 400);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '-60px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
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
    <section
      id="attorneys"
      ref={sectionRef}
      className={`attorneys ${isExpanding ? 'expanding' : ''} ${isVisible ? 'animate-in' : ''}`}
    >
      <div className="container">
        <div className={`section-header ${isVisible ? 'header-animate' : ''}`}>
          <h2>Our Legal Team</h2>
          <p>Experienced Professionals Dedicated to Your Success</p>
        </div>
        <div className={`attorneys-scroll-container ${animateCards ? 'cards-animate' : ''}`}>
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
        <div className={`attorneys-cta ${isVisible ? 'cta-animate' : ''}`}>
          <button onClick={handleExpandToTeam} className="btn btn-primary team-expand-btn">
            Meet Our Full Team
          </button>
        </div>
      </div>
    </section>
  );
};

export default Attorneys;