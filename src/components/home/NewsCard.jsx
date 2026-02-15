import { Link } from 'react-router-dom';

const NewsCard = ({ article, index }) => {
  const isFeatured = index === 0;

  return (
    <Link
      to={`/news/${article.id}`}
      className={`news-card-modern ${isFeatured ? 'featured' : ''}`}
      style={{ '--card-index': index }}
    >
      {isFeatured && article.image && (
        <div className="news-card-image">
          <img src={article.image} alt={article.title} loading="lazy" />
        </div>
      )}

      <div className="news-card-body">
        <time className="news-date-modern">
          {new Date(article.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </time>

        <h3 className="news-title-modern">{article.title}</h3>

        <p className="news-excerpt-modern">
          {article.excerpt}
        </p>

        {article.author && (
          <div className="news-author-modern">
            <i className="fas fa-user-circle"></i>
            <span>{article.author}</span>
          </div>
        )}
      </div>

      <div className="news-card-footer-modern">
        <span className="read-more-modern">
          Read Article
          <i className="fas fa-arrow-right"></i>
        </span>
      </div>
    </Link>
  );
};

export default NewsCard;
