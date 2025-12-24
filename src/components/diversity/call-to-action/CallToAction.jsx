import { Link } from 'react-router-dom';
import './CallToAction.css';

const CallToAction = ({ title, description, buttonText, buttonLink }) => {
  return (
    <div className="cta-section">
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={buttonLink} className="btn btn-primary">
        {buttonText}
      </Link>
    </div>
  );
};

export default CallToAction;
