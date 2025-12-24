import { Link } from 'react-router-dom';
import './FeaturedArticles.css';

const FeaturedArticles = ({ articles, formatDate }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="featured-news">
      <h2>Featured Stories</h2>
      <div className="featured-grid">
        {articles.map((article) => (
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
  );
};

export default FeaturedArticles;
