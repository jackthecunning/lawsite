import { Link } from 'react-router-dom';
import '../styles/about-pages.css';

const NewYorkOffice = () => {
  const office = {
    name: 'New York Office',
    address: '350 Fifth Avenue, Suite 4820',
    city: 'New York, NY 10118',
    phone: '(212) 555-7300',
    fax: '(212) 555-7301',
    email: 'nyoffice@swartzcampbell.com',
    hours: 'Monday - Friday: 9:00 AM - 6:00 PM'
  };

  return (
    <>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <h1>{office.name}</h1>
          <p>Serving New York and the Tri-State Area</p>
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
                    <a href={`tel:${office.phone.replace(/[^0-9]/g, '')}`}>{office.phone}</a>
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
                <h2>About Our New York Office</h2>
              </div>

              <div className="office-description">
                <p>
                  Our New York office is strategically located at 350 Fifth Avenue in Midtown Manhattan,
                  placing us at the center of one of the world's most important business and legal hubs.
                  The office provides convenient access to federal and state courts, as well as major
                  corporate headquarters throughout the region.
                </p>
                <p>
                  The New York office serves clients throughout the tri-state area, including New York,
                  New Jersey, and Connecticut. Our Manhattan presence allows us to efficiently handle
                  complex commercial litigation, corporate transactions, and high-stakes legal matters
                  that require proximity to major financial institutions and regulatory agencies.
                </p>
              </div>

              <div className="office-cta">
                <h3>Need Legal Assistance?</h3>
                <p>Contact our New York office to discuss your legal needs.</p>
                <div className="cta-buttons">
                  <a href={`tel:${office.phone.replace(/[^0-9]/g, '')}`} className="btn btn-primary">
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
                  Located in the Empire State Building vicinity, our office is easily accessible
                  via multiple subway lines (B, D, F, M, N, Q, R, W at 34th Street-Herald Square).
                  Penn Station is within walking distance for regional rail access.
                </p>
                <a
                  href="https://www.google.com/maps/dir//350+Fifth+Avenue,+Suite+4820,+New+York,+NY+10118"
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
                <Link to="/offices/london" className="office-link">
                  <i className="fas fa-map-marker-alt"></i>
                  London Office
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

export default NewYorkOffice;
