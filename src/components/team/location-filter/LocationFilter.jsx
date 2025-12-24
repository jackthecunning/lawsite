import './LocationFilter.css';

const LocationFilter = ({
  locations,
  selectedLocation,
  onLocationChange,
  displayedCount,
  totalCount
}) => {
  return (
    <div className="location-filter">
      <h3>Filter by Office Location:</h3>
      <div className="filter-buttons">
        {locations.map((location) => (
          <button
            key={location}
            className={`filter-btn ${selectedLocation === location ? 'active' : ''}`}
            onClick={() => onLocationChange(location)}
          >
            {location}
          </button>
        ))}
      </div>
      <div className="filter-results">
        Showing {displayedCount} of {totalCount} attorneys
      </div>
    </div>
  );
};

export default LocationFilter;
