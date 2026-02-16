import './LocationFilter.css';

const LocationFilter = ({
  locations,
  selectedLocation,
  onLocationChange,
  displayedCount,
  totalCount
}) => {
  return (
    <div className="location-filter-mot">
      <h3>Filter by Office Location:</h3>
      <div className="filter-buttons-mot">
        {locations.map((location) => (
          <button
            key={location}
            className={`filter-btn-mot${selectedLocation === location ? ' active-mot' : ''}`}
            onClick={() => onLocationChange(location)}
          >
            {location}
          </button>
        ))}
      </div>
      <div className="filter-results-mot">
        Showing {displayedCount} of {totalCount} attorneys
      </div>
    </div>
  );
};

export default LocationFilter;
