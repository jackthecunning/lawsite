import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { services } from '../data/firmData';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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

  useEffect(() => {
    const handleWheel = (e) => {
      if (!contentRef.current) return;

      const rect = contentRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;

      if (!isInView) return;

      // Prevent default scroll behavior when in the practice areas section
      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }

      const deltaY = e.deltaY;

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set timeout to allow scroll change
      scrollTimeoutRef.current = setTimeout(() => {
        if (Math.abs(deltaY) > 5) { // Threshold to prevent tiny scrolls
          if (deltaY > 0 && currentIndex < services.length - 1) {
            // Scroll down
            e.preventDefault();
            isScrollingRef.current = true;
            setCurrentIndex(prev => prev + 1);
            setTimeout(() => { isScrollingRef.current = false; }, 800);
          } else if (deltaY < 0 && currentIndex > 0) {
            // Scroll up
            e.preventDefault();
            isScrollingRef.current = true;
            setCurrentIndex(prev => prev - 1);
            setTimeout(() => { isScrollingRef.current = false; }, 800);
          }
        }
      }, 50);
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (contentElement) {
        contentElement.removeEventListener('wheel', handleWheel);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentIndex]);

  const handleItemClick = (index) => {
    setCurrentIndex(index);
  };

  const currentService = services[currentIndex];

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
        <div className="services-sidebar-layout" ref={contentRef}>
          <div className="practice-areas-sidebar">
            <div className="sidebar-list">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={`sidebar-item ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => handleItemClick(index)}
                >
                  <i className={service.icon}></i>
                  <span>{service.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="practice-areas-content">
            <div className="content-icon">
              <i className={currentService.icon}></i>
            </div>
            <h3>{currentService.title}</h3>
            <p className="content-description">{currentService.description}</p>
            {currentService.features && (
              <ul className="content-features">
                {currentService.features.map((feature, idx) => (
                  <li key={idx}>
                    <i className="fas fa-check-circle"></i>
                    {feature}
                  </li>
                ))}
              </ul>
            )}
            <Link
              to={`/practice-areas/${currentService.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}
              className="btn btn-primary learn-more-btn"
            >
              Learn More <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;