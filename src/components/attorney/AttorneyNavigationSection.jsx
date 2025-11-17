import { Link } from 'react-router-dom';

const AttorneyNavigationSection = () => {
  return (
    <section id="attorney-navigation" className="attorney-navigation-section section-dark">
      <div className="container">
        <div className="nav-content">
          <Link to="/team" className="btn btn-secondary">
            <i className="fas fa-arrow-left"></i>
            Back to Our Team
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AttorneyNavigationSection;