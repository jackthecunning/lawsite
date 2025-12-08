import { Link } from 'react-router-dom';
import '../styles/about-pages.css';

const LondonOffice = () => {
  const office = {
    name: 'London Office',
    address: '10 Fleet Place',
    city: 'London EC4M 7RB, United Kingdom',
    phone: '+44 20 7123 4500',
    fax: '+44 20 7123 4501',
    email: 'london@swartzcampbell.com',
    hours: 'Monday - Friday: 9:00 AM - 5:00 PM GMT'
  };

  return (
    <>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <h1>{office.name}</h1>
          <p>Serving the United Kingdom and Europe</p>
        </div>
      </section>

      {/* Office Details Section */}
      <section className="content-section section-light">
        <div className="container">
          <div className="office-detail-layout">
            <div className="office-main-info">
              <div className="section-header">
                <h2>Contact Information</h2>
              </div>

              <div className="office-card">
                <div className="office-details">
                  <p>
                    <i className="fas fa-map-marker-alt"></i>
                    <span>
                      {office.address}<br />
                      {office.addressLine2 && <>{office.addressLine2}<br /></>}
                      {office.city}
                    </span>
                  </p>
                  <p>
                    <i className="fas fa-phone"></i>
                    <a href={`tel:${office.phone.replace(/\s/g, '')}`}>{office.phone}</a>
                  </p>
                  <p>
                    <i className="fas fa-fax"></i>
                    <span>Fax: {office.fax}</span>
                  </p>
                  <p>
                    <i className="fas fa-envelope"></i>
                    <a href={`mailto:${office.email}`}>{office.email}</a>
                  </p>
                  <p>
                    <i className="fas fa-clock"></i>
                    <span>{office.hours}</span>
                  </p>
                </div>
              </div>

              <div className="section-header" style={{ marginTop: '50px' }}>
                <h2>About Our London Office</h2>
              </div>

              <div className="office-description">
                <p>
                  Our London office is situated at 10 Fleet Place in the heart of the City of London,
                  providing strategic access to the UK's legal and financial districts. Located near the
                  Royal Courts of Justice and major financial institutions, our office serves as the firm's
                  European hub for international legal matters.
                </p>
                <p>
                  The London office specializes in cross-border transactions, international arbitration,
                  and complex commercial matters involving UK and EU law. Our team works closely with our
                  US offices to provide seamless representation for clients with transatlantic business
                  interests. We serve clients throughout the United Kingdom and maintain strong
                  relationships with legal professionals across Europe.
                </p>
              </div>

              <div className="office-cta">
                <h3>Need Legal Assistance?</h3>
                <p>Contact our London office to discuss your legal needs.</p>
                <div className="cta-buttons">
                  <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="btn btn-primary">
                    Call {office.phone}
                  </a>
                  <a href="/#contact" className="btn btn-secondary">
                    Contact Us Online
                  </a>
                </div>
              </div>
            </div>

            <div className="office-sidebar">
              <div className="sidebar-section">
                <h3>Directions</h3>
                <p>
                  Located in the City of London, our office is accessible via multiple transport options.
                  The nearest Underground stations are St. Paul's (Central Line) and Blackfriars
                  (Circle and District Lines). City Thameslink railway station is also nearby.
                </p>
                <a
                  href="https://www.google.com/maps/dir//10+Fleet+Place,+London+EC4M+7RB,+United+Kingdom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  Get Directions
                </a>
              </div>

              <div className="sidebar-section">
                <h3>Our Other Offices</h3>
                <Link to="/offices/philadelphia" className="office-link">
                  <i className="fas fa-map-marker-alt"></i>
                  Philadelphia Office
                </Link>
                <Link to="/offices/pittsburgh" className="office-link">
                  <i className="fas fa-map-marker-alt"></i>
                  Pittsburgh Office
                </Link>
                <Link to="/offices/newyork" className="office-link">
                  <i className="fas fa-map-marker-alt"></i>
                  New York Office
                </Link>
                <Link to="/offices" className="office-link">
                  <i className="fas fa-building"></i>
                  View All Offices
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LondonOffice;
