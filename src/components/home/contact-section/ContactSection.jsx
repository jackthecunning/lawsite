import { Link } from 'react-router-dom';
import { offices } from '../../../data/firmData';
import './ContactSection.css';

const ContactSection = () => {
  return (
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
              {offices.map((office) => (
                <Link key={office.id} to={`/offices/${office.id}`} className="office-link">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{office.fullName}</span>
                  <i className="fas fa-chevron-right"></i>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
