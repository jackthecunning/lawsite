import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { newsArticles } from '../data/newsData';

const HomeNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    try {
      // Sort articles by date (newest first) and take first 3
      const sortedNews = [...newsArticles]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);
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

  return (
    <section ref={sectionRef} className={`home-news ${isVisible ? 'animate-in' : ''}`}>
      <div className="container">
        <div className={`section-header ${isVisible ? 'header-animate' : ''}`}>
          <h2>Latest News & Updates</h2>
          <p>Stay informed about our latest case results, firm news, and legal insights</p>
        </div>

        <div className={`news-grid ${animateCards ? 'cards-animate' : ''}`}>
          {news.map((article) => (
            <Link
              key={article.id}
              to={`/news/${article.id}`}
              className="news-card-link"
            >
              <article className="news-card">
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
                    {article.excerpt.length > 150
                      ? `${article.excerpt.substring(0, 150)}...`
                      : article.excerpt
                    }
                  </p>
                </div>

                <div className="news-card-footer">
                  <span className="read-more">
                    Read More <i className="fas fa-arrow-right"></i>
                  </span>
                </div>
              </article>
            </Link>
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