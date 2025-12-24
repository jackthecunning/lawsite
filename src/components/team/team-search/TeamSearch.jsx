import './TeamSearch.css';

const TeamSearch = ({
  searchQuery,
  onSearchChange,
  onClearSearch,
  onFocus,
  onClick,
  showSuggestions,
  suggestions,
  onSuggestionClick
}) => {
  return (
    <div className="search-section">
      <div className="search-container">
        <div className="search-input-wrapper">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Search attorneys by name, specialization, or title..."
            value={searchQuery}
            onChange={onSearchChange}
            onFocus={onFocus}
            onClick={onClick}
            className="search-input"
          />
          {searchQuery && (
            <button onClick={onClearSearch} className="clear-search">
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className="search-suggestions" onClick={(e) => e.stopPropagation()}>
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => onSuggestionClick(suggestion)}
              >
                <i className="fas fa-search suggestion-icon"></i>
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamSearch;
