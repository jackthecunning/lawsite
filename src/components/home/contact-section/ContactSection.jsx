import { useState } from 'react';
import { Link } from 'react-router-dom';
import { offices } from '../../../data/firmData';
import ContactForm from '../../contact-form';
import './ContactSection.css';

const ContactSection = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <>
      <section id="contact" className="home-professional-contact">
        <div className="container">
          <div className="contact-hero">
            <div className="contact-hero-content">
              {/* <div className="hero-badge">
                <i className="fas fa-phone-alt"></i>
                <span>Get in Touch</span>
              </div> */}
              <h2>Let's Get in Touch</h2>
              <p className="lead-text">
                Our experienced attorneys are here to provide the guidance and representation you need.
                Contact us today for a consultation.
              </p>

              <div className="hero-cta-buttons">
                <button
                  className="primary-cta-btn"
                  onClick={() => setIsContactFormOpen(true)}
                >
                  <span>Contact Us Now</span>
                  <i className="fas fa-arrow-right"></i>
                </button>
                <Link to="/offices" className="secondary-cta-btn">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>View Our Offices</span>
                </Link>
              </div>

              <div className="contact-quick-info">
                <div className="quick-info-item">
                  <i className="fas fa-clock"></i>
                  <span>Available Monday - Friday, 9AM - 5PM</span>
                </div>
                <div className="quick-info-item">
                  <i className="fas fa-building"></i>
                  <span>6 Locations Across the Region</span>
                </div>
                <div className="quick-info-item">
                  <i className="fas fa-shield-alt"></i>
                  <span>100+ Years of Combined Experience</span>
                </div>
              </div>
            </div>

            {/* <div className="contact-hero-features">
              <Link to="/offices" className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-map-marked-alt"></i>
                </div>
                <h4>Visit Our Offices</h4>
                <p>Find location details and directions to our 6 regional offices</p>
                <div className="feature-arrow">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </Link>

              <div className="feature-card" onClick={() => setIsContactFormOpen(true)}>
                <div className="feature-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <h4>Call Our Offices</h4>
                <p>Speak directly with our team at any of our 6 locations</p>
                <div className="feature-arrow">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>

              <Link to="/team" className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-user-tie"></i>
                </div>
                <h4>Find an Attorney</h4>
                <p>Browse our directory of experienced legal professionals</p>
                <div className="feature-arrow">
                  <i className="fas fa-arrow-right"></i>
                </div>
              </Link>
            </div> */}
          </div>
        </div>
      </section>

      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
      />
    </>
  );
};

export default ContactSection;
