import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadAllAttorneyProfiles } from '../utils/attorneyLoader';
import AttorneyImage from '../components/AttorneyImage';

const Team = () => {
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedAttorneys, setDisplayedAttorneys] = useState([]);
  const [attorneys, setAttorneys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [animationClass, setAnimationClass] = useState('fade-in');

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

  // Filter attorneys based on selected location and search query
  const getFilteredAttorneys = () => {
    let filtered = selectedLocation === 'All'
      ? attorneys
      : attorneys.filter(attorney => attorney.office === selectedLocation);

    if (searchQuery.trim()) {
      filtered = filtered.filter(attorney =>
        attorney.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attorney.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attorney.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredAttorneys = getFilteredAttorneys();

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

  const handleLocationChange = (location) => {
    if (location === selectedLocation) return;

    // Start fade out animation
    setIsAnimating(true);
    setAnimationClass('fade-out');

    // After fade out completes, update content and start fade in
    setTimeout(() => {
      setSelectedLocation(location);

      // Calculate new filtered attorneys based on updated location and current search
      let newFilteredAttorneys = location === 'All'
        ? attorneys
        : attorneys.filter(attorney => attorney.office === location);

      if (searchQuery.trim()) {
        newFilteredAttorneys = newFilteredAttorneys.filter(attorney =>
          attorney.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          attorney.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
          attorney.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setDisplayedAttorneys(newFilteredAttorneys);

      // Start fade in with stagger effect
      setTimeout(() => {
        setAnimationClass('fade-in');
        setIsAnimating(false);
      }, 50);
    }, 300);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowSuggestions(query.trim().length > 0);

    setIsAnimating(true);
    setAnimationClass('fade-out');

    setTimeout(() => {
      // Calculate filtered attorneys based on current location and new search query
      let newFilteredAttorneys = selectedLocation === 'All'
        ? attorneys
        : attorneys.filter(attorney => attorney.office === selectedLocation);

      if (query.trim()) {
        newFilteredAttorneys = newFilteredAttorneys.filter(attorney =>
          attorney.name.toLowerCase().includes(query.toLowerCase()) ||
          attorney.specialization.toLowerCase().includes(query.toLowerCase()) ||
          attorney.title.toLowerCase().includes(query.toLowerCase())
        );
      }

      setDisplayedAttorneys(newFilteredAttorneys);

      setTimeout(() => {
        setAnimationClass('fade-in');
        setIsAnimating(false);
      }, 50);
    }, 300);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);

    setIsAnimating(true);
    setAnimationClass('fade-out');

    setTimeout(() => {
      // Calculate filtered attorneys based on current location and selected suggestion
      let newFilteredAttorneys = selectedLocation === 'All'
        ? attorneys
        : attorneys.filter(attorney => attorney.office === selectedLocation);

      newFilteredAttorneys = newFilteredAttorneys.filter(attorney =>
        attorney.name.toLowerCase().includes(suggestion.toLowerCase()) ||
        attorney.specialization.toLowerCase().includes(suggestion.toLowerCase()) ||
        attorney.title.toLowerCase().includes(suggestion.toLowerCase())
      );

      setDisplayedAttorneys(newFilteredAttorneys);

      setTimeout(() => {
        setAnimationClass('fade-in');
        setIsAnimating(false);
      }, 50);
    }, 300);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowSuggestions(false);

    setIsAnimating(true);
    setAnimationClass('fade-out');

    setTimeout(() => {
      // Show all attorneys for current location when clearing search
      const newFilteredAttorneys = selectedLocation === 'All'
        ? attorneys
        : attorneys.filter(attorney => attorney.office === selectedLocation);

      setDisplayedAttorneys(newFilteredAttorneys);

      setTimeout(() => {
        setAnimationClass('fade-in');
        setIsAnimating(false);
      }, 50);
    }, 300);
  };

  // Initialize displayed attorneys and update when filters change
  useEffect(() => {
    setDisplayedAttorneys(filteredAttorneys);
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowSuggestions(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  const scrollToContact = () => {
    window.location.href = '/#contact';
  };

  if (loading) {
    return (
      <section className="team-overview">
        <div className="container">
          <div className="section-header">
            <h2>Our Attorneys</h2>
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
      <section className="team-overview">
        <div className="container">
          <div className="section-header">
            <h2>Our Attorneys</h2>
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
            {displayedAttorneys.map((attorney) => (
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
      <section className="team-cta">
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