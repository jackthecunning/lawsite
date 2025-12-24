import { Link } from 'react-router-dom';
import './PracticeAreaCard.css';

const PracticeAreaCard = ({ service }) => {
  const slug = service.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');

  return (
    <Link to={`/practice-areas/${slug}`} className="practice-area-card">
      <div className="practice-area-icon">
        <i className={service.icon}></i>
      </div>
      <div className="practice-area-content">
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <div className="practice-area-features">
          <h4>Our Services Include:</h4>
          <ul>
            {service.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className="learn-more">
          <span>Learn More</span>
          <i className="fas fa-arrow-right"></i>
        </div>
      </div>
    </Link>
  );
};

export default PracticeAreaCard;
