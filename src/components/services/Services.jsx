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
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);
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
              }, index * 100); // 100ms delay between each item
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
          <h2 className="services-title">Practice Areas</h2>
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
  // #endregion
};

export default Services;