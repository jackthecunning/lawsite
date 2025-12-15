// #region Imports
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Attorneys from '../components/Attorneys';
import Services from '../components/Services';
import HomeNews from '../components/HomeNews';
// #endregion

const Home = () => {
  // #region State & Refs
  const [statsVisible, setStatsVisible] = useState(false);
  const [quickAccessVisible, setQuickAccessVisible] = useState(false);
  const statsRef = useRef(null);
  // #endregion

  // #region Effects
  useEffect(() => {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    // Show quick access cards on scroll
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setQuickAccessVisible(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (statsRef.current) {
        statsObserver.unobserve(statsRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // #endregion

  // #region Helper Functions
  const getYearsSinceFounding = () => {
    const foundingYear = 1921;
    const currentYear = new Date().getFullYear();
    return currentYear - foundingYear;
  };
  // #endregion

  // #region JSX Return
  return (
    <>
      <Hero />

      {/* Quick Access Section */}
      <section className="home-quick-access">
        <div className="container">
          <div className={`quick-access-grid ${quickAccessVisible ? 'visible' : ''}`}>
            <Link to="/team" className="quick-access-card primary-card">
              <div className="card-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Our Attorneys</h3>
              <p>Find contact information for our attorneys</p>
              <span className="card-arrow">→</span>
            </Link>

            {/* <Link to="/careers" className="quick-access-card accent-card">
              <div className="card-icon">
                <i className="fas fa-briefcase"></i>
              </div>
              <h3>Join Our Team</h3>
              <p>Explore career opportunities at Swartz Campbell</p>
              <span className="card-arrow">→</span>
            </Link> */}

            <Link to="/practice-areas" className="quick-access-card">
              <div className="card-icon">
                <i className="fas fa-gavel"></i>
              </div>
              <h3>Practice Areas</h3>
              <p>View our areas of legal expertise</p>
              <span className="card-arrow">→</span>
            </Link>

            <Link to="/offices" className="quick-access-card">
              <div className="card-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3>Office Locations</h3>
              <p>Philadelphia • Pittsburgh • New York • London</p>
              <span className="card-arrow">→</span>
            </Link>

            <Link to="/history" className="quick-access-card">
              <div className="card-icon">
                <i className="fas fa-landmark"></i>
              </div>
              <h3>History</h3>
              <p>Explore our rich history as we build an even brighter future. But something less dumb</p>
              <span className="card-arrow">→</span>
            </Link>

          </div>
        </div>
      </section>

      {/* Firm Heritage Section */}
      <section className="home-heritage">
        <div className="container">
          <div className="heritage-content">
            <div className="heritage-text">
              <div className="heritage-badge">
                <span className="badge-year">Est. 1921</span>
              </div>
              <h2>A Century of Legal Excellence & Jets</h2>
              <p className="lead-text">
                For over {getYearsSinceFounding()} years, Swartz Campbell has been a cornerstone
                of the legal community, serving clients with unwavering dedication and expertise.
              </p>
              <p>
                Our firm's longevity is a testament to the quality of our work and the strength of
                our professional relationships. We are trusted by individuals, businesses, and
                fellow legal professionals throughout the region and beyond.
              </p>
              <p>Obviously, the jets explain themselves.</p>
              <div className="heritage-stats">
                <div className="heritage-stat">
                  <div className="stat-number">{getYearsSinceFounding()}+</div>
                  <div className="stat-label">Years in Practice</div>
                </div>
                <div className="heritage-stat">
                  <div className="stat-number">4</div>
                  <div className="stat-label">Office Locations</div>
                </div>
                <div className="heritage-stat">
                  <div className="stat-number">12</div>
                  <div className="stat-label">Practice Areas</div>
                </div>
              </div>
            </div>
            <div className="heritage-image">
              <div className="image-frame">
                <img src="/images/fighter-jet.jpg" alt="Fighter Jet" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <Services />

      {/* Attorney Showcase */}
      <Attorneys />

      {/* News & Updates */}
      <HomeNews />

      {/* Professional Contact Section */}
      <section id="contact" className="home-professional-contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p className="lead-text">
                Whether you're a client, professional colleague, or prospective team member,
                we're here to help.
              </p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">
                    <i className="fas fa-building"></i>
                  </div>
                  <div className="method-details">
                    <h4>Main Office</h4>
                    <p>Philadelphia, PA</p>
                    <a href="tel:+12155551234">(215) 555-1234</a>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="method-details">
                    <h4>General Inquiries</h4>
                    <a href="mailto:info@swartzcampbell.com">info@swartzcampbell.com</a>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">
                    <i className="fas fa-user-tie"></i>
                  </div>
                  <div className="method-details">
                    <h4>Find Your Attorney</h4>
                    <Link to="/team">View Attorney Directory →</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="office-links">
              <h3>Our Offices</h3>
              <div className="office-list">
                <Link to="/offices/philadelphia" className="office-link">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Philadelphia Office</span>
                  <i className="fas fa-chevron-right"></i>
                </Link>
                <Link to="/offices/pittsburgh" className="office-link">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Pittsburgh Office</span>
                  <i className="fas fa-chevron-right"></i>
                </Link>
                <Link to="/offices/newyork" className="office-link">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>New York Office</span>
                  <i className="fas fa-chevron-right"></i>
                </Link>
                <Link to="/offices/london" className="office-link">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>London Office</span>
                  <i className="fas fa-chevron-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
  // #endregion
};

export default Home;