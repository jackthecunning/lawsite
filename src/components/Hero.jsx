import { useState, useEffect } from 'react';
import { firmInfo } from '../data/firmData';
import BannerImage from './BannerImage';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    'images/banner/philly_1.png',
    'images/banner/philly_2.png',
    'images/banner/philly_3.png'
  ];

  // Calculate years since founding (1921)
  const getYearsSinceFounding = () => {
    const foundingYear = 1921;
    const currentYear = new Date().getFullYear();
    return currentYear - foundingYear;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <BannerImage
              src={slide}
              alt={`Philadelphia Law Firm Banner ${index + 1}`}
              className="hero-banner-image"
            />
          </div>
        ))}
      </div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-text-wrapper">
          <h1 className="firm-name">
            <span className="firm-name-main">Swartz Campbell</span>
          </h1>
          <div className="anniversary-wrapper">
            <p className="anniversary-text">
              <span className="celebrating">Celebrating</span>
              <span className="years-number">{getYearsSinceFounding()}</span>
              <span className="years-label">Years</span>
            </p>
          </div>
        </div>
        <div className="hero-buttons">
          <button onClick={scrollToServices} className="btn btn-secondary">
            Our Services
          </button>
        </div>

      </div>

    </section>
  );
};

export default Hero;