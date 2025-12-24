import { Link } from 'react-router-dom';
import './NewsCard.css';

const NewsCard = ({ article, formatDate }) => {
  return (
    <Link to={`/news/${article.id}`} className="news-card">
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
  );
};

export default NewsCard;
