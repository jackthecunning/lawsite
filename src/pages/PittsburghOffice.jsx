import { Link } from 'react-router-dom';
import '../styles/about-pages.css';

const PittsburghOffice = () => {
  const office = {
    name: 'Pittsburgh Office',
    address: 'Koppers Building, 436 7th Avenue, Floors 7 & 8',
    city: 'Pittsburgh, PA 15219',
    phone: '(412) 232-9800',
    email: 'largento@swartzcampbell.com',
    hours: 'Monday - Friday: 9:00 AM - 5:00 PM'
  };

  return (
    <>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <h1>{office.name}</h1>
          <p>Serving Western Pennsylvania</p>
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
                <h2>About Our Pittsburgh Office</h2>
              </div>

              <div className="office-description">
                <p>
                  Our Pittsburgh office is located in the historic Koppers Building in downtown Pittsburgh,
                  spanning Floors 7 and 8 at 436 7th Avenue. This iconic landmark provides a distinguished
                  setting for serving our Western Pennsylvania clients, with convenient access to the
                  courthouse district and business community.
                </p>
                <p>
                  The Pittsburgh office maintains a full complement of legal professionals capable of
                  handling complex matters across all our practice areas. Our presence in Pittsburgh
                  allows us to effectively serve clients throughout Allegheny, Westmoreland, Washington,
                  Butler, and surrounding counties in Western Pennsylvania.
                </p>
              </div>

              <div className="office-cta">
                <h3>Need Legal Assistance?</h3>
                <p>Contact our Pittsburgh office to discuss your legal needs.</p>
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
                  Located in downtown Pittsburgh's cultural district, the Koppers Building is
                  accessible via multiple bus routes and the T light rail system. Several parking
                  garages are available nearby for client convenience.
                </p>
                <a
                  href="https://www.google.com/maps/dir//Koppers+Building,+436+7th+Avenue,+Pittsburgh,+PA+15219"
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
                <Link to="/offices/newyork" className="office-link">
                  <i className="fas fa-map-marker-alt"></i>
                  New York Office
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

export default PittsburghOffice;
