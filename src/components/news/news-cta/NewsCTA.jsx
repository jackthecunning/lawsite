import { Link } from 'react-router-dom';
import './NewsCTA.css';

const NewsCTA = () => {
  const scrollToContact = () => {
    window.location.href = '/#contact';
  };

  return (
    <section className="news-cta">
      <div className="container">
        <div className="cta-content">
          <h2>Stay Updated on Legal Developments</h2>
          <p>Get notified about our latest case victories and important legal updates that could affect you.</p>
          <div className="cta-buttons">
            <button onClick={scrollToContact} className="btn btn-primary">
              Contact Us
            </button>
            <Link to="/team" className="btn btn-secondary">
              Meet Our Team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsCTA;
