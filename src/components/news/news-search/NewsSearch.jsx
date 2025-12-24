import './NewsSearch.css';

const NewsSearch = ({ searchQuery, onSearchChange, onClearSearch }) => {
  return (
    <div className="search-section">
      <div className="search-container">
        <div className="search-input-wrapper">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Search news articles..."
            value={searchQuery}
            onChange={onSearchChange}
            className="search-input"
          />
          {searchQuery && (
            <button onClick={onClearSearch} className="clear-search">
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsSearch;
