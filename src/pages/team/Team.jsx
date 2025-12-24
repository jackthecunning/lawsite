import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { loadAllAttorneyProfiles } from '../../utils/attorneyLoader';
import TeamSearch from '../../components/team/team-search';
import LocationFilter from '../../components/team/location-filter';
import TeamCard from '../../components/team/team-card';
import TeamCTA from '../../components/team/team-cta';
import './Team.css';

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
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
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

      const getCardsPerRow = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 768) return 2;
        if (screenWidth <= 1200) return 3;
        return 4;
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

    if (isTransitioning) {
      setTimeout(calculateStaggerDelays, ANIMATION_TIMINGS.staggerCalculationDelay);
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
  const locations = ['All', ...new Set(attorneys.flatMap(attorney => attorney.offices || [attorney.office]).filter(Boolean))];

  // Unified attorney filtering function
  const getFilteredAttorneys = (location = selectedLocation, query = searchQuery) => {
    if (!attorneys || attorneys.length === 0) return [];

    let filtered = location === 'All'
      ? attorneys
      : attorneys.filter(attorney => {
          const officeList = attorney.offices || (attorney.office ? [attorney.office] : []);
          return officeList.includes(location);
        });

    if (query && query.trim()) {
      const searchTerm = query.toLowerCase();
      filtered = filtered.filter(attorney =>
        attorney?.name?.toLowerCase().includes(searchTerm) ||
        attorney?.specialization?.toLowerCase().includes(searchTerm) ||
        attorney?.title?.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  };

  // Get search suggestions
  const getSearchSuggestions = () => {
    if (!searchQuery || !searchQuery.trim() || !attorneys || attorneys.length === 0) return [];

    const suggestions = new Set();
    const query = searchQuery.toLowerCase();

    attorneys.forEach(attorney => {
      if (!attorney) return;
      if (attorney.name && attorney.name.toLowerCase().includes(query)) {
        suggestions.add(attorney.name);
      }
      if (attorney.specialization && attorney.specialization.toLowerCase().includes(query)) {
        suggestions.add(attorney.specialization);
      }
      if (attorney.title && attorney.title.toLowerCase().includes(query)) {
        suggestions.add(attorney.title);
      }
    });

    return Array.from(suggestions).slice(0, 5);
  };

  const searchSuggestions = getSearchSuggestions();

  // Unified function for handling filter transitions
  const handleFilterTransition = (updateCallback) => {
    if (isAnimating) return;

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
    if (location === selectedLocation || isAnimating) return;

    handleFilterTransition(() => {
      setSelectedLocation(location);
      setDisplayedAttorneys(getFilteredAttorneys(location, searchQuery));
    });
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowSuggestions(query.trim().length > 0);
    setDisplayedAttorneys(getFilteredAttorneys(selectedLocation, query));
  };

  const handleSuggestionClick = (suggestion) => {
    if (isAnimating) return;
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setDisplayedAttorneys(getFilteredAttorneys(selectedLocation, suggestion));
  };

  const clearSearch = () => {
    if (isAnimating) return;
    setSearchQuery('');
    setShowSuggestions(false);
    setDisplayedAttorneys(getFilteredAttorneys(selectedLocation, ''));
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
      <section className={`team-overview ${isTransitioning ? 'entering-from-home' : ''}`}>
        <div className="container">
          <div className="section-header">
            <h2 className="team-title-underlined">Meet Our Team</h2>
          </div>

          <TeamSearch
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onClearSearch={clearSearch}
            onFocus={() => setShowSuggestions(searchQuery.trim().length > 0)}
            onClick={(e) => e.stopPropagation()}
            showSuggestions={showSuggestions}
            suggestions={searchSuggestions}
            onSuggestionClick={handleSuggestionClick}
          />

          <LocationFilter
            locations={locations}
            selectedLocation={selectedLocation}
            onLocationChange={handleLocationChange}
            displayedCount={displayedAttorneys.length}
            totalCount={attorneys.length}
          />

          <div className={`team-cards-grid ${animationClass}`}>
            {displayedAttorneys.map((attorney, index) => (
              <TeamCard key={attorney.id} attorney={attorney} index={index} />
            ))}
          </div>
        </div>
      </section>

      <TeamCTA onContactClick={scrollToContact} isTransitioning={isTransitioning} />
    </>
  );
};

export default Team;
