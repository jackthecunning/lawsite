import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { newsArticles } from '../../data/newsData';
import NewsCard from '../home/NewsCard';

const HomeNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
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
    // Set visible immediately as fallback
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearTimeout(timer);
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
            <h2>Latest News & Insights</h2>
            <p>Stay informed about our recent victories and legal updates</p>
          </div>
          <div className="no-news-message">
            <p>No news articles available at the moment. Check back soon for updates!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className={`home-news-modern ${isVisible ? 'visible' : ''}`}>
      <div className="container">
        <div className="news-header">
          <div className="news-header-content">
            <h2>Latest News & Insights</h2>
            <p>Recent victories, legal updates, and thought leadership from our team</p>
          </div>
          <Link to="/news" className="btn btn-primary">
            View All News
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>

        <div className="news-grid">
          {news.map((article, index) => (
            <NewsCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeNews;