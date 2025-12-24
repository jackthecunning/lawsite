import { Link } from 'react-router-dom';
import './PracticeAreaCTA.css';

const PracticeAreaCTA = ({ practiceAreaTitle, onContactClick }) => {
  return (
    <section className="practice-detail-cta">
      <div className="container">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>
            Don't let legal challenges overwhelm you. Our experienced {practiceAreaTitle.toLowerCase()}
            attorneys are here to help you navigate your situation with confidence.
          </p>
          <div className="cta-buttons">
            <button onClick={onContactClick} className="btn btn-primary">
              Contact Us
            </button>
            <Link to="/practice-areas" className="btn btn-secondary">
              View All Practice Areas
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticeAreaCTA;
