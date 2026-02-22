import './Hero.css';

import { useState, useEffect } from 'react';
import BannerImage from '../banner-image';

// Import all banner images
import { getImageUrl } from '../../utils/imageUtils';
const bannerImagePaths = [
  'images/banner/Baltimore.jpeg',
  'images/banner/Cleveland.jpeg',
  'images/banner/NewYork.jpg',
  'images/banner/Philly.png',
  'images/banner/philly_2.png',
  'images/banner/philly_3.png',
  'images/banner/Pittsburg.jpg',
  'images/banner/Wilmington.jpeg'
];
const defaultBanner = getImageUrl('images/defaults/default-banner.svg');

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);

  // Dynamically load all banner images
  useEffect(() => {
    // Use getImageUrl to resolve all banner image paths
    const bannerImages = bannerImagePaths.map(getImageUrl);
    setSlides(bannerImages);
  }, []);

  // Calculate years since founding (1921)
  const getYearsSinceFounding = () => {
    const foundingYear = 1921;
    const currentYear = new Date().getFullYear();
    return currentYear - foundingYear;
  };

  useEffect(() => {
    if (slides.length === 0) return;

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
        {slides.length > 0 ? (
          slides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <BannerImage
                src={slide}
                alt={`Law Firm Banner ${index + 1}`}
                className="hero-banner-image"
              />
            </div>
          ))
        ) : (
          <div className="hero-slide active">
            <BannerImage
              src={defaultBanner}
              alt="Law Firm Banner"
              className="hero-banner-image"
            />
          </div>
        )}
      </div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-text-wrapper">
          <h1 className="firm-name">
            <span className="firm-name-main"><span className="capital-letter">S</span>wartz <span className="capital-letter">C</span>ampbell</span>
          </h1>
          <div className="anniversary-wrapper">
            <p className="anniversary-text">
              <span className="celebrating">Celebrating </span>
              <span className="years-number">{getYearsSinceFounding()} </span>
              <span className="years-label">Years</span>
            </p>
            <p className="legal-excellence">of Legal Excellence</p>
          </div>
        </div>

      </div>

    </section>
  );
};

export default Hero;