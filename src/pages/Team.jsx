import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { loadAllAttorneyProfiles } from '../utils/attorneyLoader';
import AttorneyImage from '../components/AttorneyImage';

const Team = () => {
  // Animation timing constants
  const ANIMATION_TIMINGS = {
    fadeOutDuration: 300,
    fadeInDelay: 50,
    homepageTransition: 1000,
    staggerCalculationDelay: 100,
    baseStaggerDelay: 0.35,
    rowStaggerIncrement: 0.2
  };

  const [selectedLocation, setSelectedLocation] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedAttorneys, setDisplayedAttorneys] = useState([]);
  const [attorneys, setAttorneys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [animationClass, setAnimationClass] = useState('fade-in');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  // Handle homepage transition
  useEffect(() => {
    const isFromHomepage = location.state?.fromHomepage;

    if (isFromHomepage) {
      // Immediately scroll to top
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

      // Set transition state
      setIsTransitioning(true);
      setTimeout(() => {
        setIsTransitioning(false);
      }, ANIMATION_TIMINGS.homepageTransition);
    }
  }, [location]);

  // Calculate dynamic stagger delays for team cards
  useEffect(() => {
    const calculateStaggerDelays = () => {
      const cards = document.querySelectorAll('.team-overview.entering-from-home .team-cards-grid .team-card');

      if (cards.length === 0) return;

      // Determine cards per row based on responsive breakpoints
      const getCardsPerRow = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 768) return 2; // Mobile
        if (screenWidth <= 1200) return 3; // Tablet
        return 4; // Desktop
      };

      const cardsPerRow = getCardsPerRow();
      const baseDelay = ANIMATION_TIMINGS.baseStaggerDelay;
      const rowIncrement = ANIMATION_TIMINGS.rowStaggerIncrement;

      cards.forEach((card, index) => {
        const rowIndex = Math.floor(index / cardsPerRow);
        const delay = baseDelay + (rowIndex * rowIncrement);
        card.style.setProperty('--stagger-delay', `${delay}s`);
      });
    };

    // Calculate delays when transitioning from homepage
    if (isTransitioning) {
      // Small delay to ensure DOM is ready
      setTimeout(calculateStaggerDelays, ANIMATION_TIMINGS.staggerCalculationDelay);

      // Recalculate on window resize
      const handleResize = () => calculateStaggerDelays();
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isTransitioning, displayedAttorneys]);

  // Load attorneys on component mount
  useEffect(() => {
    const loadAttorneys = async () => {
      try {
        const loadedAttorneys = await loadAllAttorneyProfiles();
        setAttorneys(loadedAttorneys);
        setDisplayedAttorneys(loadedAttorneys);
      } catch (error) {
        console.error('Error loading attorneys:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAttorneys();
  }, []);

  // Get unique office locations
  const locations = ['All', ...new Set(attorneys.map(attorney => attorney.office))];

  // Unified attorney filtering function
  const getFilteredAttorneys = (location = selectedLocation, query = searchQuery) => {
    let filtered = location === 'All'
      ? attorneys
      : attorneys.filter(attorney => attorney.office === location);

    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      filtered = filtered.filter(attorney =>
        attorney.name.toLowerCase().includes(searchTerm) ||
        attorney.specialization.toLowerCase().includes(searchTerm) ||
        attorney.title.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  };

  // Get search suggestions
  const getSearchSuggestions = () => {
    if (!searchQuery.trim()) return [];

    const suggestions = new Set();
    const query = searchQuery.toLowerCase();

    attorneys.forEach(attorney => {
      // Add name matches
      if (attorney.name.toLowerCase().includes(query)) {
        suggestions.add(attorney.name);
      }
      // Add specialization matches
      if (attorney.specialization.toLowerCase().includes(query)) {
        suggestions.add(attorney.specialization);
      }
      // Add title matches
      if (attorney.title.toLowerCase().includes(query)) {
        suggestions.add(attorney.title);
      }
    });

    return Array.from(suggestions).slice(0, 5); // Limit to 5 suggestions
  };

  const searchSuggestions = getSearchSuggestions();

  // Unified function for handling filter transitions
  const handleFilterTransition = (updateCallback) => {
    // Clear any existing stagger delays from cards
    const allCards = document.querySelectorAll('.team-cards-grid .team-card');
    allCards.forEach(card => {
      card.style.removeProperty('--stagger-delay');
    });

    setIsAnimating(true);
    setAnimationClass('fade-out');

    setTimeout(() => {
      updateCallback();
      setTimeout(() => {
        setAnimationClass('fade-in');
        setIsAnimating(false);
      }, ANIMATION_TIMINGS.fadeInDelay);
    }, ANIMATION_TIMINGS.fadeOutDuration);
  };

  const handleLocationChange = (location) => {
    if (location === selectedLocation) return;

    handleFilterTransition(() => {
      setSelectedLocation(location);
      setDisplayedAttorneys(getFilteredAttorneys(location, searchQuery));
    });
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowSuggestions(query.trim().length > 0);

    handleFilterTransition(() => {
      setDisplayedAttorneys(getFilteredAttorneys(selectedLocation, query));
    });
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);

    handleFilterTransition(() => {
      setDisplayedAttorneys(getFilteredAttorneys(selectedLocation, suggestion));
    });
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowSuggestions(false);

    handleFilterTransition(() => {
      setDisplayedAttorneys(getFilteredAttorneys(selectedLocation, ''));
    });
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowSuggestions(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  const scrollToContact = () => {
    window.location.href = '/#contact';
  };

  if (loading && !isTransitioning) {
    return (
      <section className="team-overview">
        <div className="container">
          <div className="section-header">
            <h2 className="team-title-underlined">Our Attorneys</h2>
            <p>Loading attorney profiles...</p>
          </div>
          <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Team Section */}
      <section className={`team-overview ${isTransitioning ? 'entering-from-home' : ''}`}>
        <div className="container">
          <div className="section-header">
            <h2 className="team-title-underlined">Our Attorneys</h2>
            <p>Click on any attorney to learn more about their background and expertise</p>
          </div>

          {/* Search Bar */}
          <div className="search-section">
            <div className="search-container">
              <div className="search-input-wrapper">
                <i className="fas fa-search search-icon"></i>
                <input
                  type="text"
                  placeholder="Search attorneys by name, specialization, or title..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setShowSuggestions(searchQuery.trim().length > 0)}
                  onClick={(e) => e.stopPropagation()}
                  className="search-input"
                />
                {searchQuery && (
                  <button onClick={clearSearch} className="clear-search">
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>

              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="search-suggestions" onClick={(e) => e.stopPropagation()}>
                  {searchSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <i className="fas fa-search suggestion-icon"></i>
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Location Filter */}
          <div className="location-filter">
            <h3>Filter by Office Location:</h3>
            <div className="filter-buttons">
              {locations.map((location) => (
                <button
                  key={location}
                  className={`filter-btn ${selectedLocation === location ? 'active' : ''}`}
                  onClick={() => handleLocationChange(location)}
                >
                  {location}
                </button>
              ))}
            </div>
            <div className="filter-results">
              Showing {displayedAttorneys.length} of {attorneys.length} attorneys
            </div>
          </div>

          {/* Attorney Cards Grid */}
          <div className={`team-cards-grid ${animationClass}`}>
            {displayedAttorneys.map((attorney, index) => (
              <Link
                key={attorney.id}
                to={`/attorney/${attorney.slug}`}
                className="team-card-link"
              >
                <div
                  className="team-card"
                  style={{ '--card-index': index }}
                >
                  <div className="team-card-image">
                    <AttorneyImage
                      src={attorney.image}
                      alt={attorney.name}
                    />
                  </div>
                  <div className="team-card-info">
                    <h3>{attorney.name}</h3>
                    <p className="title">{attorney.title}</p>
                    <p className="specialization">{attorney.specialization}</p>
                    <p className="office">
                      <i className="fas fa-map-marker-alt"></i>
                      {attorney.office} Office
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className={`team-cta ${isTransitioning ? 'cta-entering-from-page' : ''}`}>
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Work with Our Team?</h2>
            <p>Contact us today for a free consultation and let us put our experience to work for you.</p>
            <div className="cta-buttons">
              <button onClick={scrollToContact} className="btn btn-primary">
                Free Consultation
              </button>
              <a href="tel:555-123-4567" className="btn btn-secondary">
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;