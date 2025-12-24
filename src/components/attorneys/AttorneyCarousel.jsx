import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AttorneyImage from '../attorney-image';

const AttorneyCarousel = ({ attorneys, isVisible }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cardsToShow, setCardsToShow] = useState(3);

  const totalCards = attorneys.length;

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

    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, totalCards - cardsToShow);
      return prevIndex === 0 ? maxIndex : prevIndex - 1;
    });

    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };

  const getCarouselTransform = () => {
    const cardWidth = 320;
    const gap = 30;
    const slideDistance = cardWidth + gap;
    const translateX = -(currentIndex * slideDistance);
    return `translateX(${translateX}px)`;
  };

  return (
    <>
      <div className="attorneys-carousel-wrapper">
        {attorneys.length > cardsToShow && (
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
            {attorneys.map((attorney) => (
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

        {attorneys.length > cardsToShow && (
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={nextSlide}
            aria-label="Next attorneys"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        )}
      </div>

      {attorneys.length > cardsToShow && (
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
    </>
  );
};

export default AttorneyCarousel;
