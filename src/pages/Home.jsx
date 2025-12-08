import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Attorneys from '../components/Attorneys';
import Services from '../components/Services';
import HomeNews from '../components/HomeNews';

const Home = () => {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
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
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const getYearsSinceFounding = () => {
    const foundingYear = 1921;
    const currentYear = new Date().getFullYear();
    return currentYear - foundingYear;
  };

  return (
    <>
      <Hero />

      {/* Quick Access Section */}
      <section className="home-quick-access">
        <div className="container">
          <div className="quick-access-grid">
            <Link to="/team" className="quick-access-card primary-card">
              <div className="card-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Our Attorneys</h3>
              <p>Find contact information for our attorneys</p>
              <span className="card-arrow">→</span>
            </Link>

            <Link to="/careers" className="quick-access-card accent-card">
              <div className="card-icon">
                <i className="fas fa-briefcase"></i>
              </div>
              <h3>Join Our Team</h3>
              <p>Explore career opportunities at Swartz Campbell</p>
              <span className="card-arrow">→</span>
            </Link>

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
              <h2>A Century of Legal Excellence</h2>
              <p className="lead-text">
                For over {getYearsSinceFounding()} years, Swartz Campbell has been a cornerstone
                of the legal community, serving clients with unwavering dedication and expertise.
              </p>
              <p>
                Our firm's longevity is a testament to the quality of our work and the strength of
                our professional relationships. We are trusted by individuals, businesses, and
                fellow legal professionals throughout the region and beyond.
              </p>
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
                <img src="/images/office-exterior.jpg" alt="Swartz Campbell Office" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Attorney Showcase */}
      <Attorneys />

      {/* Culture & Careers Section */}
      <section className="home-careers-spotlight">
        <div className="container">
          <div className="careers-content">
            <div className="careers-visual">
              <div className="visual-grid">
                <div className="visual-item">
                  <i className="fas fa-balance-scale"></i>
                  <span>Professional Growth</span>
                </div>
                <div className="visual-item">
                  <i className="fas fa-users"></i>
                  <span>Collaborative Culture</span>
                </div>
                <div className="visual-item">
                  <i className="fas fa-trophy"></i>
                  <span>Challenging Work</span>
                </div>
                <div className="visual-item">
                  <i className="fas fa-graduation-cap"></i>
                  <span>Mentorship</span>
                </div>
              </div>
            </div>
            <div className="careers-text">
              <h2>Build Your Career with Us</h2>
              <p className="lead-text">
                We're seeking exceptional attorneys to join our established practice.
              </p>
              <div className="careers-features">
                <div className="feature-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Work alongside experienced partners and senior counsel</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Handle sophisticated legal matters for established clients</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Benefit from over a century of institutional knowledge</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Competitive compensation and comprehensive benefits</span>
                </div>
              </div>
              <div className="careers-cta">
                <Link to="/careers" className="btn btn-primary btn-large">
                  <i className="fas fa-arrow-right"></i>
                  View Career Opportunities
                </Link>
                <Link to="/diversity" className="btn btn-outline btn-large">
                  Our Commitment to Diversity
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <Services />

      {/* News & Updates */}
      <HomeNews />

      {/* Professional Contact Section */}
      <section className="home-professional-contact">
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
};

export default Home;