import { Link } from 'react-router-dom';
import { services } from '../data/firmData';

const PracticeAreas = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="practice-areas-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Our Practice Areas</h1>
          <p>Comprehensive legal services tailored to meet your needs with expertise and dedication</p>
        </div>
      </section>

      {/* Practice Areas Overview */}
      <section className="practice-areas-overview">
        <div className="container">
          <div className="section-header">
            <h2>Legal Excellence Across Multiple Disciplines</h2>
            <p>
              With over 104 years of combined experience, Swartz Campbell provides comprehensive
              legal representation across a diverse range of practice areas. Our team of skilled
              attorneys is dedicated to delivering results-driven solutions for individuals,
              families, and businesses.
            </p>
          </div>

          <div className="practice-areas-grid">
            {services.map((service) => (
              <Link
                key={service.id}
                to={`/practice-areas/${service.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}
                className="practice-area-card"
              >
                <div className="practice-area-icon">
                  <i className={service.icon}></i>
                </div>
                <div className="practice-area-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="practice-area-features">
                    <h4>Our Services Include:</h4>
                    <ul>
                      {service.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="learn-more">
                    <span>Learn More</span>
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="practice-areas-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Discuss Your Legal Needs?</h2>
            <p>
              Contact us today. Our experienced attorneys are here to help
              you navigate your legal challenges with confidence and expertise.
            </p>
            <div className="cta-buttons">
              <a href="#contact" className="btn btn-primary">
                Contact Us
              </a>
              <Link to="/team" className="btn btn-secondary">
                Meet Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PracticeAreas;