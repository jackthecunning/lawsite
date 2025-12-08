import { Link } from 'react-router-dom';
import '../styles/about-pages.css';

const PhiladelphiaOffice = () => {
  const office = {
    name: 'Philadelphia Office',
    address: '2001 Market Street, Suite 2815',
    city: 'Philadelphia, PA 19103',
    phone: '(215) 564-5190',
    email: 'jmccarron@swartzcampbell.com',
    hours: 'Monday - Friday: 9:00 AM - 5:00 PM'
  };

  return (
    <>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <h1>{office.name}</h1>
          <p>Serving the Greater Philadelphia Area</p>
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
                <h2>About Our Philadelphia Office</h2>
              </div>

              <div className="office-description">
                <p>
                  Our Philadelphia office is strategically located in Center City at 2001 Market Street,
                  providing convenient access to clients throughout the Delaware Valley region. The office
                  is situated in a modern professional building with easy access to public transportation
                  and nearby parking facilities.
                </p>
                <p>
                  The Philadelphia office serves as one of our primary locations, housing a full team of
                  experienced attorneys and support staff dedicated to providing exceptional legal services
                  across our practice areas. Our location allows us to efficiently serve clients in
                  Philadelphia, Montgomery, Delaware, Chester, and Bucks counties.
                </p>
              </div>

              <div className="office-cta">
                <h3>Need Legal Assistance?</h3>
                <p>Contact our Philadelphia office to discuss your legal needs.</p>
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
                  Located in the heart of Center City Philadelphia, our office is easily accessible
                  via SEPTA Regional Rail, Market-Frankford Line, and multiple bus routes.
                  Parking is available in nearby garages.
                </p>
                <a
                  href="https://www.google.com/maps/dir//2001+Market+Street,+Suite+2815,+Philadelphia,+PA+19103"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  Get Directions
                </a>
              </div>

              <div className="sidebar-section">
                <h3>Our Other Offices</h3>
                <Link to="/offices/pittsburgh" className="office-link">
                  <i className="fas fa-map-marker-alt"></i>
                  Pittsburgh Office
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

export default PhiladelphiaOffice;
