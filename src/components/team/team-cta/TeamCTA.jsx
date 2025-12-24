import './TeamCTA.css';

const TeamCTA = ({ onContactClick, isTransitioning }) => {
  return (
    <section className={`team-cta ${isTransitioning ? 'cta-entering-from-page' : ''}`}>
      <div className="container">
        <div className="cta-content">
          <h2>Ready to Work with Our Team?</h2>
          <p>Contact us today and let us put our experience to work for you.</p>
          <div className="cta-buttons">
            <button onClick={onContactClick} className="btn btn-primary">
              Contact Us
            </button>
            <a href="tel:555-123-4567" className="btn btn-secondary">
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamCTA;
