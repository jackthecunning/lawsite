import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { newsArticles } from '../data/newsData';
import { loadNewsArticle, formatDate } from '../utils/newsLoader';
import '../styles/news-detail.css';

const NewsDetail = () => {
  const { id } = useParams();
  const article = newsArticles.find(art => art.id === parseInt(id));
  const [articleContent, setArticleContent] = useState([]);
  const [loading, setLoading] = useState(true);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load article content when component mounts
  useEffect(() => {
    const loadContent = async () => {
      if (article && article.articleFile) {
        setLoading(true);
        const content = await loadNewsArticle(article.articleFile);
        setArticleContent(content);
        setLoading(false);
      }
    };

    loadContent();
  }, [article]);

  const scrollToContact = () => {
    window.location.href = '/#contact';
  };

  if (!article) {
    return (
      <div className="container" style={{ paddingTop: '120px', textAlign: 'center' }}>
        <h2>Article Not Found</h2>
        <p>The article you're looking for doesn't exist.</p>
        <Link to="/news" className="btn btn-primary">Back to News</Link>
      </div>
    );
  }

  // Get related articles (same category, excluding current)
  const relatedArticles = newsArticles
    .filter(art => art.category === article.category && art.id !== article.id)
    .slice(0, 3);

  return (
    <>
      {/* Article Header */}
      <section className="article-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/news">News</Link>
            <i className="fas fa-chevron-right"></i>
            <span>{article.category}</span>
          </div>

          <div className="article-meta">
            <span className="category-badge">{article.category}</span>
            <span className="date">{formatDate(article.date)}</span>
          </div>

          <h1>{article.title}</h1>

          <div className="article-image">
            <img src={`/${article.image}`} alt={article.title} />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="article-content">
        <div className="container">
          <div className="article-body">
            {loading ? (
              <p>Loading article content...</p>
            ) : (
              articleContent.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            )}
          </div>

          {/* Article Footer */}
          <div className="article-footer">
            <div className="article-actions">
              <Link to="/news" className="btn btn-secondary">
                <i className="fas fa-arrow-left"></i> Back to News
              </Link>
              <button onClick={scrollToContact} className="btn btn-primary">
                Contact Our Team
              </button>
            </div>

            <div className="share-section">
              <h4>Share This Article</h4>
              <div className="share-buttons">
                <button className="share-btn linkedin" title="Share on LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </button>
                <button className="share-btn twitter" title="Share on Twitter">
                  <i className="fab fa-twitter"></i>
                </button>
                <button className="share-btn facebook" title="Share on Facebook">
                  <i className="fab fa-facebook"></i>
                </button>
                <button className="share-btn email" title="Share via Email">
                  <i className="fas fa-envelope"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="related-articles">
              <h3>Related Articles</h3>
              <div className="related-grid">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    to={`/news/${relatedArticle.id}`}
                    className="related-card"
                  >
                    <div className="related-image">
                      <img src={`/${relatedArticle.image}`} alt={relatedArticle.title} />
                    </div>
                    <div className="related-content">
                      <div className="related-meta">
                        <span className="category">{relatedArticle.category}</span>
                        <span className="date">{formatDate(relatedArticle.date)}</span>
                      </div>
                      <h4>{relatedArticle.title}</h4>
                      <p>{relatedArticle.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="article-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Questions About This Case?</h2>
            <p>Contact our legal team to discuss how our experience might help with your situation.</p>
            <div className="cta-buttons">
              <button onClick={scrollToContact} className="btn btn-primary">
                Free Consultation
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

export default NewsDetail;