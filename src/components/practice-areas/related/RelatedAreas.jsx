import { Link } from 'react-router-dom';
import './RelatedAreas.css';

const RelatedAreas = ({ services, currentPracticeAreaId }) => {
  return (
    <div className="related-areas">
      <h3>Our Other Practice Areas</h3>
      <div className="related-links">
        {services
          .filter(service => service.id !== currentPracticeAreaId)
          .map(service => (
            <Link
              key={service.id}
              to={`/practice-areas/${service.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}
              className="related-link"
            >
              <i className={service.icon}></i>
              <span>{service.title}</span>
            </Link>
          ))
        }
      </div>
    </div>
  );
};

export default RelatedAreas;
