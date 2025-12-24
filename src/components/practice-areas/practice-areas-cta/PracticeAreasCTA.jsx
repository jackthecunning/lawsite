import { Link } from 'react-router-dom';
import './PracticeAreasCTA.css';

const PracticeAreasCTA = () => {
  return (
    <section className="practice-areas-cta">
      <div className="container">
        <div className="cta-content">
          <h2>Ready to Discuss Your Legal Needs?</h2>
          <p>
            Contact us today. Our experienced attorneys are here to help
            you navigate your legal challenges with confidence and expertise.
          </p>
          <div className="cta-buttons">
            <a href="#contact" className="btn btn-primary">
              Contact Us
            </a>
            <Link to="/team" className="btn btn-secondary">
              Meet Our Team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticeAreasCTA;
