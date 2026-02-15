import './TeamCTA.css';
import { Link } from 'react-router-dom';

const TeamCTA = ({ onContactClick, isTransitioning }) => {
  return (
    <section className={`team-cta ${isTransitioning ? 'cta-entering-from-page' : ''}`}>
      <div className="container">
        <div className="cta-content">
          <h2>Ready to Work with Our Team?</h2>
          <p>Contact us today and let us put our experience to work for you.</p>
          <div className="cta-buttons">
            <Link to="/careers" className="btn btn-primary">
              See Open Jobs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamCTA;
