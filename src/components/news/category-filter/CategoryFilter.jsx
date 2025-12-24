import './CategoryFilter.css';

const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
  displayedCount,
  totalCount
}) => {
  return (
    <div className="category-filter">
      <h3>Filter by Category:</h3>
      <div className="filter-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="filter-results">
        Showing {displayedCount} of {totalCount} articles
      </div>
    </div>
  );
};

export default CategoryFilter;
