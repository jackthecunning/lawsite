import { Link } from 'react-router-dom';
import { offices } from '../data/firmData';
import '../styles/about-pages.css';

const Offices = () => {

  return (
    <>
      {/* Hero Section */}
      <section className="page-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <h1>Our Offices</h1>
          <p>Conveniently Located to Serve You</p>
        </div>
      </section>

      {/* Offices Content */}
      <section className="content-section section-light">
        <div className="container">
          <div className="section-header">
            <h2>Visit Us</h2>
            <p>We have offices worldwide to better serve our clients</p>
          </div>

          <div className="offices-grid">
            {offices.map((office, index) => (
              <Link
                key={index}
                to={`/offices/${office.id}`}
                className="office-card-link"
              >
                <div className="office-card">
                  <h3>{office.name}</h3>
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
                      <a href={`tel:${office.phone.replace(/[^0-9]/g, '')}`} onClick={(e) => e.stopPropagation()}>{office.phone}</a>
                    </p>
                    <p>
                      <i className="fas fa-envelope"></i>
                      <a href={`mailto:${office.email}`} onClick={(e) => e.stopPropagation()}>{office.email}</a>
                    </p>
                    <p>
                      <i className="fas fa-clock"></i>
                      <span>{office.hours}</span>
                    </p>
                  </div>
                  <div className="office-card-footer">
                    <span>View Details <i className="fas fa-arrow-right"></i></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Offices;
