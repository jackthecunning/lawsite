import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { newsArticles, newsCategories } from '../data/newsData';

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedArticles, setDisplayedArticles] = useState(newsArticles);

  // Filter articles based on category and search
  const getFilteredArticles = () => {
    let filtered = selectedCategory === 'All'
      ? newsArticles
      : newsArticles.filter(article => article.category === selectedCategory);

    if (searchQuery.trim()) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort by date (newest first)
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  // Update displayed articles when filters change
  useEffect(() => {
    setDisplayedArticles(getFilteredArticles());
  }, [selectedCategory, searchQuery]);

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const scrollToContact = () => {
    window.location.href = '/#contact';
  };

  // Get featured articles for hero section
  const featuredArticles = newsArticles.filter(article => article.featured).slice(0, 2);

  return (
    <>
      {/* News Overview Section */}
      <section className="news-overview">
        <div className="container">
          <div className="section-header">
            <h1>Legal News & Updates</h1>
            <p>Stay informed about our latest cases, victories, and legal insights</p>
          </div>

          {/* Featured Articles */}
          {featuredArticles.length > 0 && (
            <div className="featured-news">
              <h2>Featured Stories</h2>
              <div className="featured-grid">
                {featuredArticles.map((article) => (
                  <Link
                    key={article.id}
                    to={`/news/${article.id}`}
                    className="featured-article"
                  >
                    <div className="featured-image">
                      <img src={`/${article.image}`} alt={article.title} />
                      <div className="featured-badge">Featured</div>
                    </div>
                    <div className="featured-content">
                      <div className="article-meta">
                        <span className="category">{article.category}</span>
                        <span className="date">{formatDate(article.date)}</span>
                      </div>
                      <h3>{article.title}</h3>
                      <p>{article.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Search and Filter Section */}
          <div className="news-controls">
            <div className="search-section">
              <div className="search-container">
                <div className="search-input-wrapper">
                  <i className="fas fa-search search-icon"></i>
                  <input
                    type="text"
                    placeholder="Search news articles..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-input"
                  />
                  {searchQuery && (
                    <button onClick={clearSearch} className="clear-search">
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="category-filter">
              <h3>Filter by Category:</h3>
              <div className="filter-buttons">
                {newsCategories.map((category) => (
                  <button
                    key={category}
                    className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="filter-results">
                Showing {displayedArticles.length} of {newsArticles.length} articles
              </div>
            </div>
          </div>

          {/* News Articles Grid */}
          <div className="news-grid">
            {displayedArticles.map((article) => (
              <Link
                key={article.id}
                to={`/news/${article.id}`}
                className="news-card"
              >
                <div className="news-image">
                  <img src={`/${article.image}`} alt={article.title} />
                  <div className="category-badge">{article.category}</div>
                </div>
                <div className="news-content">
                  <div className="article-meta">
                    <span className="date">{formatDate(article.date)}</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <div className="read-more">
                    Read Full Article <i className="fas fa-arrow-right"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {displayedArticles.length === 0 && (
            <div className="no-results">
              <i className="fas fa-newspaper"></i>
              <h3>No articles found</h3>
              <p>Try adjusting your search terms or category filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="news-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Stay Updated on Legal Developments</h2>
            <p>Get notified about our latest case victories and important legal updates that could affect you.</p>
            <div className="cta-buttons">
              <button onClick={scrollToContact} className="btn btn-primary">
                Contact Us
              </button>
              <Link to="/team" className="btn btn-secondary">
                Meet Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default News;