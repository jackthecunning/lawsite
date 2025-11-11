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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

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
        <h1>Experienced Legal Representation You Can Trust</h1>
        <p>Providing exceptional legal services with integrity, dedication, and results for over 25 years</p>
        <div className="hero-buttons">
          <button onClick={scrollToContact} className="btn btn-primary">
            Free Consultation
          </button>
          <button onClick={scrollToServices} className="btn btn-secondary">
            Our Services
          </button>
        </div>
      </div>
      <div className="hero-stats">
        {firmInfo.stats.map((stat, index) => (
          <div key={index} className="stat">
            <h3>{stat.number}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;