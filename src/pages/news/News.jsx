import { useState, useEffect } from 'react';
import { newsArticles, newsCategories } from '../../data/newsData';
import NewsHeader from '../../components/news/news-header';
import FeaturedArticles from '../../components/news/featured-articles';
import NewsSearch from '../../components/news/news-search';
import CategoryFilter from '../../components/news/category-filter';
import NewsCard from '../../components/news/news-card';
import NewsCTA from '../../components/news/news-cta';
import './news.css';

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

  // Get featured articles for hero section
  const featuredArticles = newsArticles.filter(article => article.featured).slice(0, 2);

  return (
    <>
      {/* News Overview Section */}
      <section className="news-overview">
        <div className="container">
          <NewsHeader />

          {/* Featured Articles */}
          <FeaturedArticles
            articles={featuredArticles}
            formatDate={formatDate}
          />

          {/* Search and Filter Section */}
          <div className="news-controls">
            <NewsSearch
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onClearSearch={clearSearch}
            />

            <CategoryFilter
              categories={newsCategories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              displayedCount={displayedArticles.length}
              totalCount={newsArticles.length}
            />
          </div>

          {/* News Articles Grid */}
          <div className="news-grid">
            {displayedArticles.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                formatDate={formatDate}
              />
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
      <NewsCTA />
    </>
  );
};


export default News;