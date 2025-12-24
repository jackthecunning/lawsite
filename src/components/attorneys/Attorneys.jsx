// #region Imports
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { loadAllAttorneyProfiles } from '../../utils/attorneyLoader';
import AttorneyCarousel from './AttorneyCarousel';
import './Attorneys.css';
// #endregion

const Attorneys = () => {
  // #region State & Refs
  const [attorneys, setAttorneys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanding, setIsExpanding] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  // #endregion

  // #region Effects
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
  // #endregion

  // #region Data Filtering
  // Show only partners on home page
  const featuredAttorneys = attorneys.filter(attorney =>
    attorney.title && attorney.title.toLowerCase().includes('partner')
  );
  // #endregion

  // #region Handler Functions
  const handleExpandToTeam = (e) => {
    e.preventDefault();
    setIsExpanding(true);
    navigate('/team', { state: { fromHomepage: true } });
  };
  // #endregion

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

        <AttorneyCarousel attorneys={featuredAttorneys} isVisible={isVisible} />

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