import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { services } from '../data/firmData';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Stagger the card animations
            setTimeout(() => setAnimateCards(true), 300);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className={`services ${isVisible ? 'animate-in' : ''}`}
    >
      <div className="container">
        <div className={`section-header ${isVisible ? 'header-animate' : ''}`}>
          <h2>Practice Areas</h2>
          <p>Comprehensive Legal Services</p>
        </div>
        <div
          ref={cardsRef}
          className={`services-grid ${animateCards ? 'cards-animate' : ''}`}
        >
          {services.map((service) => (
            <Link
              key={service.id}
              to={`/practice-areas/${service.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}
              className="service-card"
            >
              <i className={service.icon}></i>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <div className="service-card-footer">
                <span className="learn-more-link">
                  Learn More <i className="fas fa-arrow-right"></i>
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="services-cta">
          <Link to="/practice-areas" className="btn btn-primary">
            View All Practice Areas
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;