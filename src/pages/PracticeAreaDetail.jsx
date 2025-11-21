import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { services } from '../data/firmData';

const PracticeAreaDetail = () => {
  const { area } = useParams();
  const [practiceArea, setPracticeArea] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Convert URL parameter back to service title
    const areaTitle = area
      .replace(/-/g, ' ')
      .replace(/\band\b/g, '&')
      .replace(/\b\w/g, l => l.toUpperCase());

    const foundArea = services.find(service =>
      service.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and') === area
    );

    setPracticeArea(foundArea);
    setLoading(false);
    window.scrollTo(0, 0);
  }, [area]);

  const scrollToContact = () => {
    window.location.href = '/#contact';
  };

  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '120px', textAlign: 'center' }}>
        <h2>Loading Practice Area Details...</h2>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!practiceArea) {
    return (
      <div className="container" style={{ paddingTop: '120px', textAlign: 'center' }}>
        <h2>Practice Area Not Found</h2>
        <p>The practice area you're looking for doesn't exist.</p>
        <Link to="/practice-areas" className="btn btn-primary">Back to Practice Areas</Link>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <section className="practice-detail-breadcrumb">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to="/practice-areas">Practice Areas</Link>
            <i className="fas fa-chevron-right"></i>
            <span>{practiceArea.title}</span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="practice-detail-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <div className="practice-hero-icon">
              <i className={practiceArea.icon}></i>
            </div>
            <h1>{practiceArea.title}</h1>
            <p className="hero-subtitle">
              Expert legal representation with a track record of success
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="practice-detail-content">
        <div className="container">
          <div className="practice-content-grid">
            {/* Main Content */}
            <div className="practice-main-content">
              <div className="practice-overview">
                <h2>Overview</h2>
                <p>{practiceArea.description}</p>
                <p>
                  At Swartz Campbell, we understand that legal matters in {practiceArea.title.toLowerCase()}
                  require both expertise and sensitivity. Our experienced attorneys provide comprehensive
                  legal services tailored to your specific needs, ensuring that your rights are protected
                  and your objectives are achieved.
                </p>
              </div>

              <div className="practice-services">
                <h2>Our {practiceArea.title} Services</h2>
                <div className="services-grid">
                  {practiceArea.features.map((feature, index) => (
                    <div key={index} className="service-item">
                      <div className="service-icon">
                        <i className="fas fa-check-circle"></i>
                      </div>
                      <div className="service-content">
                        <h4>{feature}</h4>
                        <p>
                          Comprehensive legal support for {feature.toLowerCase()} with attention
                          to detail and commitment to achieving the best possible outcomes.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="practice-approach">
                <h2>Our Approach</h2>
                <p>
                  We believe in providing personalized attention to every client. Our approach combines
                  extensive legal knowledge with practical solutions, ensuring that we not only address
                  your immediate legal needs but also help you plan for the future.
                </p>
                <div className="approach-points">
                  <div className="approach-point">
                    <i className="fas fa-handshake"></i>
                    <h4>Client-Centered Service</h4>
                    <p>We prioritize your needs and keep you informed throughout the legal process.</p>
                  </div>
                  <div className="approach-point">
                    <i className="fas fa-shield-alt"></i>
                    <h4>Proven Experience</h4>
                    <p>Over 104 years of combined experience handling complex legal matters.</p>
                  </div>
                  <div className="approach-point">
                    <i className="fas fa-target"></i>
                    <h4>Results-Driven</h4>
                    <p>We focus on achieving practical, effective solutions for your legal challenges.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="practice-sidebar">
              <div className="contact-card">
                <h3>Need Legal Help?</h3>
                <p>Contact us today for a consultation about your {practiceArea.title.toLowerCase()} matter.</p>
                <button onClick={scrollToContact} className="btn btn-primary btn-full-width">
                  Schedule Consultation
                </button>
                <div className="contact-info">
                  <p><i className="fas fa-phone"></i> (555) 123-4567</p>
                  <p><i className="fas fa-envelope"></i> info@swartzcampbell.com</p>
                </div>
              </div>

              <div className="related-areas">
                <h3>Related Practice Areas</h3>
                <div className="related-links">
                  {services
                    .filter(service => service.id !== practiceArea.id)
                    .map(service => (
                      <Link
                        key={service.id}
                        to={`/practice-areas/${service.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}
                        className="related-link"
                      >
                        <i className={service.icon}></i>
                        <span>{service.title}</span>
                      </Link>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="practice-detail-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>
              Don't let legal challenges overwhelm you. Our experienced {practiceArea.title.toLowerCase()}
              attorneys are here to help you navigate your situation with confidence.
            </p>
            <div className="cta-buttons">
              <button onClick={scrollToContact} className="btn btn-primary">
                Free Consultation
              </button>
              <Link to="/practice-areas" className="btn btn-secondary">
                View All Practice Areas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PracticeAreaDetail;