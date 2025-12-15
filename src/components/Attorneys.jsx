// #region Imports
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { loadAllAttorneyProfiles } from '../utils/attorneyLoader';
import AttorneyImage from './AttorneyImage';
// #endregion

const Attorneys = () => {
  // #region State & Refs
  const [attorneys, setAttorneys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanding, setIsExpanding] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  // #endregion

  // #region Effects
  useEffect(() => {
    const loadAttorneys = async () => {
      try {
        const loadedAttorneys = await loadAllAttorneyProfiles();
        setAttorneys(loadedAttorneys);
      } catch (error) {
        console.error('Error loading attorneys:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAttorneys();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Don't trigger card animation for carousel - cards should be visible by default
            // setTimeout(() => setAnimateCards(true), 400);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '-60px 0px'
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

  // #region Data Filtering
  // Show only partners on home page
  const featuredAttorneys = attorneys.filter(attorney =>
    attorney.title && attorney.title.toLowerCase().includes('partner')
  );

  // Responsive cards per view
  const [cardsToShow, setCardsToShow] = useState(3);
  const totalCards = featuredAttorneys.length;
  const totalPages = Math.ceil(totalCards / cardsToShow);
  // #endregion

  // #region Handler Functions
  // Update cards to show based on screen size
  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth <= 768) {
        setCardsToShow(1); // Mobile: 1 card
      } else {
        setCardsToShow(3); // Desktop/Tablet: 3 cards
      }
    };

    updateCardsToShow();
    window.addEventListener('resize', updateCardsToShow);

    return () => window.removeEventListener('resize', updateCardsToShow);
  }, []);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // Move to next card, ensuring we don't go beyond available cards
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, totalCards - cardsToShow);
      const nextIndex = prevIndex + 1;
      return nextIndex > maxIndex ? 0 : nextIndex;
    });

    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // Move to previous card
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, totalCards - cardsToShow);
      return prevIndex === 0 ? maxIndex : prevIndex - 1;
    });

    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };

  const getCarouselTransform = () => {
    const cardWidth = 320; // Card width in pixels
    const gap = 30; // Gap between cards in pixels
    const slideDistance = cardWidth + gap; // Distance to slide per card
    const translateX = -(currentIndex * slideDistance);
    return `translateX(${translateX}px)`;
  };

  const handleExpandToTeam = (e) => {
    e.preventDefault();
    setIsExpanding(true);

    // Navigate immediately without waiting for animation or scrolling
    // The Team page will handle scrolling to top
    navigate('/team', { state: { fromHomepage: true } });
  };

  if (loading) {
    return (
      <section id="attorneys" className="attorneys">
        <div className="container">
          <div className="section-header">
            <h2>Our Legal Team</h2>
            <p>Loading our experienced professionals...</p>
          </div>
          <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="attorneys"
      ref={sectionRef}
      className={`attorneys ${isExpanding ? 'expanding' : ''} ${isVisible ? 'animate-in' : ''}`}
    >
      {/* <div className="progress-indicator">
        <div className="progress-bar"></div>
      </div> */}
      <div className="container">
        <div className={`section-header ${isVisible ? 'header-animate' : ''}`}>
          <h2>Our Legal Team</h2>
          <p>Experienced Professionals Dedicated to Your Success</p>
        </div>
        <div className="attorneys-carousel-wrapper">
          {featuredAttorneys.length > cardsToShow && (
            <button
              className="carousel-arrow carousel-arrow-left"
              onClick={prevSlide}
              aria-label="Previous attorneys"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
          )}

          <div className="attorneys-carousel-container">
            <div
              className="attorneys-carousel-track"
              style={{ transform: getCarouselTransform() }}
            >
              {featuredAttorneys.map((attorney, index) => (
                <Link
                  key={attorney.id}
                  to={`/attorney/${attorney.slug}`}
                  className="team-card-link"
                >
                  <div className="team-card">
                    <div className="team-card-image">
                      <AttorneyImage
                        src={attorney.image}
                        alt={attorney.name}
                      />
                    </div>
                    <div className="team-card-info">
                      <h3>{attorney.name}</h3>
                      <p className="title">{attorney.title}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {featuredAttorneys.length > cardsToShow && (
            <button
              className="carousel-arrow carousel-arrow-right"
              onClick={nextSlide}
              aria-label="Next attorneys"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          )}
        </div>

        {featuredAttorneys.length > cardsToShow && (
          <div className="carousel-indicators">
            {Array.from({ length: Math.max(0, totalCards - cardsToShow) + 1 }, (_, i) => (
              <button
                key={i}
                className={`indicator ${currentIndex === i ? 'active' : ''}`}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to position ${i + 1}`}
              />
            ))}
          </div>
        )}
        <div className={`attorneys-cta ${isVisible ? 'cta-animate' : ''}`}>
          <button onClick={handleExpandToTeam} className="btn btn-primary team-expand-btn">
            Meet Our Full Team
          </button>
        </div>
      </div>
    </section>
  );
  // #endregion
};

export default Attorneys;