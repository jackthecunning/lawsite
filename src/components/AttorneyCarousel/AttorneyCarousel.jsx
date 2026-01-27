import { useState, useEffect } from 'react';
import AttorneyCarouselCard from '../AttorneyCarouselCard/AttorneyCarouselCard';
import './AttorneyCarousel.css';

const AttorneyCarousel = ({ attorneys }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cardsToShow, setCardsToShow] = useState(3);

  const totalCards = attorneys.length;


  // Dynamically set cardsToShow based on container width and card width
  useEffect(() => {
    function updateCardsToShow() {
      const container = document.querySelector('.attorneys-carousel-container');
      const card = document.querySelector('.attorney-carousel-card');
      const track = document.querySelector('.attorneys-carousel-track');
      if (container && card && track) {
        // Get computed gap from CSS
        const trackStyles = window.getComputedStyle(track);
        const gap = parseInt(trackStyles.gap) || 0;
        const cardWidth = card.offsetWidth;
        const containerWidth = container.offsetWidth;
        // Calculate how many cards fit
        const possible = Math.floor((containerWidth + gap) / (cardWidth + gap));
        setCardsToShow(Math.max(1, possible));
      } else {
        setCardsToShow(1);
      }
    }
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
    const card = document.querySelector('.attorney-carousel-card');
    const track = document.querySelector('.attorneys-carousel-track');
    let cardWidth = 340;
    let gap = 30;
    if (card && track) {
      cardWidth = card.offsetWidth;
      const trackStyles = window.getComputedStyle(track);
      gap = parseInt(trackStyles.gap) || 0;
    }
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
              <AttorneyCarouselCard key={attorney.id} attorney={attorney} />
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
