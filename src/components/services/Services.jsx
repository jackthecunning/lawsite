// #region Imports
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { services } from '../../data/firmData';
import './Services.css';
// #endregion

const Services = () => {
  // #region State & Refs
  const [isVisible, setIsVisible] = useState(false);
  const [itemsVisible, setItemsVisible] = useState([]);
  const sectionRef = useRef(null);
  // #endregion

  // #region Effects
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Trigger staggered animation for each item
            services.forEach((_, index) => {
              setTimeout(() => {
                setItemsVisible(prev => [...prev, index]);
              }, index * 50); // 50ms delay between each item
            });
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
  // #endregion

  // Sort services alphabetically by title
  const sortedServices = [...services].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <section
      id="services"
      ref={sectionRef}
      className={`services ${isVisible ? 'animate-in' : ''}`}
    >
      <div className="container">
        <div className={`section-header ${isVisible ? 'header-animate' : ''}`}>
          <h2>Practice Areas</h2>
        </div>
        <div className="practice-areas-simple-list">
          {sortedServices.map((service, index) => (
            <Link
              key={service.id}
              to={`/practice-areas?area=${service.id}`}
              className={`practice-area-name ${itemsVisible.includes(index) ? 'item-visible' : ''}`}
            >
              <i className={service.icon}></i>
              <span>{service.title}</span>
              <span className="practice-arrow">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
  // #endregion
};

export default Services;