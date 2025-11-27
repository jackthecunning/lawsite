import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { newsArticles } from '../data/newsData';

const HomeNews = () => {
  const [news, setNews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const [slideDirection, setSlideDirection] = useState('');
  const sectionRef = useRef(null);

  useEffect(() => {
    try {
      // Sort articles by date (newest first) and take first 10
      const sortedNews = [...newsArticles]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10);
      setNews(sortedNews);
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => setAnimateCards(true), 350);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '-40px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handlePrevious = () => {
    setSlideDirection('slide-right');
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? news.length - 1 : prevIndex - 1
    );
    setTimeout(() => setSlideDirection(''), 800);
  };

  const handleNext = () => {
    setSlideDirection('slide-left');
    setCurrentIndex((prevIndex) =>
      prevIndex === news.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setSlideDirection(''), 800);
  };

  const getVisibleArticles = () => {
    if (news.length === 0) return [];
    if (news.length === 1) return [null, news[0], null];
    if (news.length === 2) return [news[1], news[0], news[1]];

    const prevIndex = currentIndex === 0 ? news.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === news.length - 1 ? 0 : currentIndex + 1;

    return [news[prevIndex], news[currentIndex], news[nextIndex]];
  };

  if (loading) {
    return (
      <section className="home-news">
        <div className="container">
          <div className="section-header">
            <h2>Latest News & Updates</h2>
            <p>Loading latest firm news...</p>
          </div>
          <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  if (news.length === 0) {
    return (
      <section className="home-news">
        <div className="container">
          <div className="section-header">
            <h2>Latest News & Updates</h2>
            <p>Stay informed about our latest case results, firm news, and legal insights</p>
          </div>
          <div className="no-news-message">
            <p>No news articles available at the moment. Check back soon for updates!</p>
          </div>
        </div>
      </section>
    );
  }

  const visibleArticles = getVisibleArticles();

  return (
    <section ref={sectionRef} className={`home-news ${isVisible ? 'animate-in' : ''}`}>
      <div className="container">
        <div className={`section-header ${isVisible ? 'header-animate' : ''}`}>
          <h2>Latest News & Updates</h2>
          <p>Stay informed about our latest case results, firm news, and legal insights</p>
        </div>

        <div className="news-carousel-container">
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={handlePrevious}
            aria-label="Previous news article"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <div className={`news-carousel-track ${animateCards ? 'cards-animate' : ''} ${slideDirection}`}>
            {visibleArticles.map((article, index) => {
              if (!article) return <div key={`empty-${index}`} className="news-card-spacer" />;

              const position = index === 0 ? 'left' : index === 1 ? 'center' : 'right';
              const isCenter = index === 1;

              return (
                <Link
                  key={`${article.id}-${index}`}
                  to={`/news/${article.id}`}
                  className={`news-card-link ${position}`}
                  onClick={(e) => {
                    if (!isCenter) {
                      e.preventDefault();
                      if (position === 'left') {
                        handlePrevious();
                      } else {
                        handleNext();
                      }
                    }
                  }}
                >
                  <article className={`news-card ${isCenter ? 'featured-news' : 'side-news'}`}>
                    <div className="news-card-header">
                      <div className="news-category">
                        <span className={`category-badge ${article.category.toLowerCase().replace(/\s+/g, '-')}`}>
                          {article.category}
                        </span>
                      </div>
                      <time className="news-date">
                        {new Date(article.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>

                    <div className="news-card-content">
                      <h3>{article.title}</h3>
                      <p className="news-excerpt">
                        {isCenter
                          ? article.excerpt
                          : article.excerpt.length > 80
                            ? `${article.excerpt.substring(0, 80)}...`
                            : article.excerpt
                        }
                      </p>
                      {isCenter && article.author && (
                        <p className="news-author">
                          <i className="fas fa-user"></i> {article.author}
                        </p>
                      )}
                    </div>

                    <div className="news-card-footer">
                      <span className="read-more">
                        {isCenter ? 'Read Full Story' : 'View Story'} <i className="fas fa-arrow-right"></i>
                      </span>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>

          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={handleNext}
            aria-label="Next news article"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        <div className="news-indicators">
          {news.map((_, index) => (
            <button
              key={index}
              className={`indicator-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => {
                setSlideDirection(index > currentIndex ? 'slide-left' : 'slide-right');
                setCurrentIndex(index);
                setTimeout(() => setSlideDirection(''), 300);
              }}
              aria-label={`Go to news article ${index + 1}`}
            />
          ))}
        </div>

      </div>

      <div className="news-cta">
        <div className="container">
          <Link to="/news" className="btn btn-primary">
            View All News & Updates
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeNews;